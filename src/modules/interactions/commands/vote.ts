import methods from '../methods';
import { interaction } from '../../../@types/interaction';

export const raw = {
  name: 'vote',
  description: 'Returns the votelinks for the bot',
};

export const command = {
  // the id that discord returned us, we will need this
  // for the interaction handler
  id: '803380783858319442',
  name: 'vote',
  help: 'useful commanddescription to show in help menu',
  execute: async (
    interaction: interaction,
  ): Promise<void> => {
    methods.embed.defaultEmbed(interaction.token, {
      title: 'Vote Links',
      desc:
        'With your help, the bot will reach a much greater popularity and will be used by more people.\n' +
        'Please vote on one or on all of the three sites:\n* https://top.gg/bot/554751047030013953/vote **(recommended)**\n* https://bots.ondiscord.xyz/bots/554751047030013953  \n* https://discordbotlist.com/bots/554751047030013953/upvote \n\n' +
        '> Thank you very much! :)',
    });
  },
};
