/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { interaction } from './../../../../@types/interaction';
import tweetnacl from 'tweetnacl';
import { logger } from '../../../../utils';

export const route = {
  name: 'interaction',
  method: 'POST',
  route: async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res: any,
    commands: Map<string, unknown>,
  ): Promise<void> => {
    // Your public key can be found on your application in the Developer Portal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let PUBLIC_KEY: any = process.env.PUBLIC_KEY;
    PUBLIC_KEY = PUBLIC_KEY.toString();

    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');
    const body = req.rawBody; // rawBody is expected to be a string, not raw bytes

    const isVerified = tweetnacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex'),
    );

    if (!isVerified) {
      return res
        .status(401)
        .end('invalid request signature');
    }

    if (isVerified) {
      res.status(200).send({ type: 1 });

      const interaction: interaction = req.body;

      if (!interaction.data) return;

      if (commands.has(interaction.data.id)) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const func: any = commands.get(
            interaction.data.id,
          );
          await func.execute(interaction);
          logger.info(
            `[INTERACTION] Received interaction: '${interaction.data.name}'; by user: '${interaction.member.user.username}#${interaction.member.user.discriminator}';`,
          );
        } catch (e) {
          console.error(e);
          logger.error(e);
        }
      }
    }
  },
};
