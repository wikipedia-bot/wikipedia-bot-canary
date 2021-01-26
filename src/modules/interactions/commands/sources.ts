import wiki from '../../wiki/functions';
//import { logger } from '../../../utils';
//import methods from '../methods';
import { interaction } from '../../../@types/interaction';
import returnobject from '../../../@types/returnobject';

export const raw = {
  name: 'sources',
  description:
    'Returns the sources/references of a given wikipedia article',
  options: [
    {
      name: 'Search-Term',
      description:
        'The wikipedia article you want the sources of.',
      required: true,
      type: 3,
    },
  ],
};

export const command = {
  // the id that discord returned us, we will need this
  // for the interaction handler
  id: '803362420210663464',
  name: 'sources',
  help: 'useful commanddescription to show in help menu',
  execute: async (
    interaction: interaction,
  ): Promise<void> => {
    if (!interaction.data) return;
    if (!interaction.data.options) return;
    if (interaction.data.options[0].value === '') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchTerm: any =
      interaction.data.options[0].value;
    const returnedObject: returnobject = await wiki.getReferences(
      searchTerm,
    );
    console.log(returnedObject);
    // TODO
  },
};
