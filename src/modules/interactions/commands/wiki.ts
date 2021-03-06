import wiki from '../../wiki/functions';
// import { logger } from '../../../utils';
import methods from '../methods';
import { interaction } from '../../../@types/interaction';
import returnobject from '../../../@types/returnobject';
import { Command, CommandRaw } from '../../../@types/cmd';

export const raw: CommandRaw = {
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

export const command: Command = {
  // the id that discord returned us, we will need this
  // for the interaction handler
  id: '802662348154339328',
  name: 'wiki',
  help: `Use the command as follows:

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

    const returnedObject: returnobject = await wiki.getWikiObject(
      searchValue,
      searchLang,
    );

    if (returnedObject.error) {
      let errormsg =
        'Something went wrong .... :(  maybe try another search term and try again... \n';
      if (returnedObject.errormsg)
        errormsg += `Heres the errormessage to show to the developers: \n\n\`\`\`${returnedObject.errormsg}\`\`\``;
      await methods.deleteOriginal(returned.data.token);
      await methods.embed.defaultErrorEmbed(
        returned.data.token,
        errormsg,
      );
    } else {
      const desc_long: string | undefined =
        returnedObject.wiki?.text;
      const desc = desc_long?.substr(0, 1169) + '.....';

      await methods.deleteOriginal(returned.data.token);
      // TODO Somehow the deletion works but it doesnt send an embed
      // FIXME see above
      await methods.embed.defaultWikiEmbed(
        returned.data.token,
        {
          title: returnedObject.wiki?.title,
          url: returnedObject.wiki?.url,
          thumb: returnedObject.wiki?.image,
          desc,
        },
      );
    }
  },
};
