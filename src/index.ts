// import environmental variables
import { config } from 'dotenv';
config();

import path from 'path';
import express from 'express';
import helmet from 'helmet';
import { SlashCreator, ExpressServer } from 'slash-create';

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.PORT, () => {
  console.log(
    `
    App is listening on port: ${process.env.PORT}
    
    Interaction Endpoint:
    
        http://localhost:${process.env.PORT}/interactions`,
  );
});

const creator = new SlashCreator({
  applicationID: process.env.APPLICATION_ID ?? '',
  publicKey: process.env.PUBLIC_KEY,
  token: process.env.TOKEN,
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
