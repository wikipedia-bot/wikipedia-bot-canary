import dotenv from 'dotenv';
import c from 'centra';

import { logger } from './../../utils/logger';
import Constants from '../constants/Constants';

import * as Sentry from '@sentry/node';
import { interaction } from '../../@types/interaction';
import { Snowflake } from 'slash-commands';

// load our process vars
dotenv.config();

const appIdRaw: string = process.env.APPLICATION_ID;
const appId: string = appIdRaw.toString();

const endpointGenerator = {
  reply: (
    txt: string,
    interactionid: string | Snowflake,
    interactiontoken: string,
  ) => {
    return txt
      .replace('<interaction_id>', interactionid)
      .replace('<interaction_token>', interactiontoken);
  },
  send: (txt: string, interactiontoken: string) => {
    return txt
      .replace('<interaction_token>', interactiontoken)
      .replace('<application_id>', appId);
  },
};

export default {
  // use this for initial reply and edit the response later on
  reply: async (
    interaction: interaction,
    msg: string,
    type = 3,
  ): Promise<unknown> => {
    // TODO: return interaction id and token to edit this interaction later on
    const returnobject = { error: false, data: {} };
    const endpoint = endpointGenerator.reply(
      Constants.interactionEndpoints.replyurl,
      interaction.id,
      interaction.token,
    );

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await c(endpoint, 'POST')
        .body(
          {
            type,
            data: {
              embeds: [
                {
                  color: Constants.Colors['BLUE'],
                  title: msg,
                  author: {
                    icon_url: Constants.wiki_logo,
                    name: 'Wikipedia',
                  },
                },
              ],
            },
          },
          'json',
        )
        .send();

      if (res.statusCode >= 200) {
        returnobject.data = {
          id: interaction.id,
          token: interaction.token,
        };
      }
      return returnobject;
    } catch (e) {
      returnobject.error = true;
      logger.error(e);
      Sentry.captureException(e);
      return returnobject;
    }
  },
  send: async (
    interactionToken: string,
    data: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type = 3,
  ): Promise<unknown> => {
    const endpoint = endpointGenerator.send(
      Constants.interactionEndpoints.create_followup_msg,
      interactionToken,
    );
    return await c(endpoint, 'POST')
      .body({ data }, 'json')
      .send();
  },
  deleteOriginal: async (
    interactionToken: string,
  ): Promise<unknown> => {
    const endpoint = endpointGenerator.send(
      Constants.interactionEndpoints.delete_original_msg,
      interactionToken,
    );
    return await c(endpoint, 'DELETE').send();
  },
  embed: {
    // edit and reply
    defaultWikiEmbed: async (
      interactionToken: string,
      embedobj: Record<string, unknown>,
    ): Promise<unknown> => {
      const color: unknown = Constants.Colors['BLUE'];

      const endpoint = endpointGenerator.send(
        Constants.interactionEndpoints.create_followup_msg,
        interactionToken,
      );

      return await c(endpoint, 'POST')
        .body(
          {
            embeds: [
              {
                color,
                title: embedobj.title,
                description: embedobj.desc,
                author: {
                  icon_url: Constants.wiki_logo,
                  name: 'Wikipedia',
                },
                timestamp: new Date(),
                url: embedobj.url,
                thumbnail: {
                  url: embedobj.thumb,
                },
                footer: {
                  icon_url: Constants.wiki_logo,
                  text: 'Example footer text, edit later',
                },
              },
            ],
          },
          'json',
        )
        .send();
    },

    defaultEmbed: async (
      interactionToken: string,
      { title, desc }: { title: string; desc: string },
    ): Promise<unknown> => {
      const color: unknown = Constants.Colors['BLUE'];

      const endpoint = endpointGenerator.send(
        Constants.interactionEndpoints.create_followup_msg,
        interactionToken,
      );

      return await c(endpoint, 'POST')
        .body(
          {
            embeds: [
              {
                color,
                title: title,
                description: desc,
                author: {
                  name: 'Wikipedia',
                  icon_url: Constants.wiki_logo,
                },
              },
            ],
          },
          'json',
        )
        .send();
    },
    defaultErrorEmbed: async (
      interactionToken: string,
      errormessage: string,
    ): Promise<unknown> => {
      const color: unknown = Constants.Colors['RED'];

      const endpoint = endpointGenerator.send(
        Constants.interactionEndpoints.create_followup_msg,
        interactionToken,
      );

      return await c(endpoint, 'POST')
        .body(
          {
            embeds: [
              {
                color,
                title: errormessage,
                author: {
                  icon_url: Constants.wiki_logo,
                  name: '❌ Error',
                },
              },
            ],
          },
          'json',
        )
        .send();
    },
  },
};
