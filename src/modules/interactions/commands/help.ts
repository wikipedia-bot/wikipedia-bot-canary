import methods from '../methods';
import { interaction } from '../../../@types/interaction';

export const raw = {
  name: 'help',
  description: 'Tells you how to use the bot',
  options: [
    {
      name: 'Command',
      description:
        'The command you want specific information about',
      type: 3,
      choices: [
        {
          name: 'wiki',
          value: 'wiki',
        },
        {
          name: 'wiki-info',
          value: 'wiki-info',
        },
        {
          name: 'donate',
          value: 'donate',
        },
        {
          name: 'github',
          value: 'github',
        },
        {
          name: 'info',
          value: 'info',
        },
        {
          name: 'sources',
          value: 'sources',
        },
        {
          name: 'vote',
          value: 'vote',
        },
        {
          name: 'ctl',
          value: 'ctl',
        },
        {
          name: 'partners',
          value: 'partners',
        },
        {
          name: 'placeholder',
          value: 'placeholder',
        },
      ],
    },
  ],
};

export const command = {
  // the id that discord returned us, we will need this
  // for the interaction handler
  id: '802899683835117568',
  name: 'help',
  help: 'help',
  execute: async (
    interaction: interaction,
  ): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returned: any = await methods.reply(
      interaction,
      'LOADING, PLEASE WAIT ...',
    );

    if (interaction.data && interaction.data.options) {
      // display help for specific command here
      const commandname = interaction.data.options[0].value;
      // eslint-disable-next-line prettier/prettier
      const { command } = await import('../commands/' + commandname +'.js'); 
      if (!command.help || command.help === '') {
        methods.embed.defaultErrorEmbed(
          returned.data.token,
          `There seems to be no documentation for the command
        
          __**[${commandname}]**__`,
        );
      } else {
        await methods.embed.defaultEmbed(
          returned.data.token,
          {
            title: 'Help',
            desc: command.help,
          },
        );
      }
      await methods.deleteOriginal(returned.data.token);
    } else {
      await methods.deleteOriginal(returned.data.token);
      await methods.embed.defaultEmbed(
        returned.data.token,
        {
          title: 'Help',
          desc: `
        __**Getring started:**__
        Get started by typing /wiki <keyword> <language>¹ 
        
        ¹optional
        __**Commands**__
        [Click here](https://www.notion.so/wikipediabot/Commands-37fa263b9af14332baf70197e4f33e3f) to see all commands.

        __**Invite**__
        [Click here](https://discordapp.com/oauth2/authorize?client_id=554751047030013953&scope=bot&permissions=3467328)

        __**Feedback&Support**__
        Join the [Discord Server](https://discord.gg/yAUmDNb) to get support if you\'re having problems with using the bot.
        `,
        },
      );
    }
  },
};
