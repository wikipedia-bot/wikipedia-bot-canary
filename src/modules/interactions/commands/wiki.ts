import wiki from '../../wiki/functions';
import methods from '../methods';
import { interaction } from '../../../@types/interaction';

export const raw = {
  name: 'wiki',
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
  id: '802662348154339328',
  name: 'wiki',
  help: `Use thecommand as follows:

        [TODO] (<- if you see this and you are not a developer, plese let the developers know they forgot something)
    `,
  execute: async (
    interaction: interaction,
  ): Promise<void> => {
    // send an initial response to edit later

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returned: any = await methods.reply(
      interaction,
      'LOADING, PLEASE WAIT ...',
      4,
    );

    let searchValue;
    let searchLang = 'en';

    if (!interaction.data) return;

    for (const option in interaction.data.options) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const index: any = option;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const temp: any = interaction.data.options[index];
      if (temp.name === 'search-term') {
        searchValue = temp.value;
      }
      if (temp.name === 'language') {
        if (temp.value === '') return;
        searchLang = temp.value;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returnedObject: any = await wiki.getSummary(
      searchValue,
      searchLang,
    );

    if (returnedObject.error === true) {
      await methods.deleteOriginal(returned.data.token);
      await methods.embed.defaultErrorEmbed(
        returned.data.token,
        'Something went wrong .... :(  maybe try another search term and try again... ',
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const desc_long: any = await returnedObject.wiki.text;
      const desc = desc_long.substr(0, 1169) + '.....';

      await methods.deleteOriginal(returned.data.token);
      await methods.embed.defaultWikiEmbed(
        returned.data.token,
        {
          title: returnedObject.wiki.title,
          url: returnedObject.wiki.url,
          thumb: returnedObject.wiki.image,
          desc,
        },
      );
    }
  },
};
