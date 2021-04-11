(async () => {
  (await import('dotenv')).config();
})();

import path from 'path';
import express from 'express';
import { SlashCreator, ExpressServer } from 'slash-create';

const app = express();

app.use(express.json());

app.listen(3333);

const creator = new SlashCreator({
  applicationID: process.env.APPLICATION_ID ?? '',
  publicKey: process.env.PUBLIC_KEY ?? '',
  token: process.env.TOKEN ?? '',
});

creator
  .withServer(
    new ExpressServer(app, {
      alreadyListening: true,
    }),
  )
  // Depending on what server is used, this may not be needed.

  // Registers all of your commands in the ./commands/ directory
  .registerCommandsIn(path.join(__dirname, 'commands'))
  // This will sync commands to Discord, it must be called after commands are loaded.
  // This also returns itself for more chaining capabilities.
  .syncCommands();
