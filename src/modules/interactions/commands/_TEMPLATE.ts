/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// ^ ^ ^ ^ ^  remove those 3 lines when copying the template file

import wiki from '../../wiki/functions';
import { logger } from '../../../utils';
import methods from '../methods';
import { interaction } from '../../../@types/interaction';

export const raw = {
  name: 'name',
  description: 'Returns the summary of a wikipedia article',
  options: [
    {
      name: 'Search-Term',
      description: 'The search term you want to search for',
      required: true,
      type: 3,
    },
    {
      name: 'Language',
      description:
        'The language in which you want to search',
      type: 3,
      choices: [
        {
          name: 'English',
          value: 'en',
        },
        {
          name: 'German',
          value: 'de',
        },
        {
          name: 'Spanish',
          value: 'es',
        },
        {
          name: 'French',
          value: 'fr',
        },
        {
          name: 'Russian',
          value: 'ru',
        },
        {
          name: 'Slovak',
          value: 'sl',
        },
        {
          name: 'Turkish',
          value: 'tr',
        },
        {
          name: 'Yiddish',
          value: 'yi',
        },
      ],
    },
  ],
};

export const command = {
  // the id that discord returned us, we will need this
  // for the interaction handler
  id: 'ID',
  name: 'name',
  help: 'useful commanddescription to show in help menu',
  execute: async (interaction: interaction): Promise<void> => {},
};
