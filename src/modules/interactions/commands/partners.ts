import methods from '../methods';
import { interaction } from '../../../@types/interaction';

export const raw = {
  name: 'partners',
  description:
    'Some projects from our developers and partners, worth checking out',
};

export const command = {
  // the id that discord returned us, we will need this
  // for the interaction handler
  id: '803394485278867466',
  name: 'partners',
  help: 'useful commanddescription to show in help menu',
  execute: async (
    interaction: interaction,
  ): Promise<void> => {
    methods.embed.defaultEmbed(interaction.token, {
      title: 'Partners',
      desc: `
        **[TODO]**
      `,
    });
  },
};
