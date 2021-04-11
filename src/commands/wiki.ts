import {
  CommandContext,
  SlashCommand,
  SlashCreator,
} from 'slash-create';
import wikiClient from '../classes/wikiclient';
import Constants from '../Constanst';

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'wiki',
      description:
        'Returns information about the specified keyword.',
      options: [
        {
          name: 'keyword',
          type: 3,
          description:
            'The keyword you want to search wikipedia for.',
          required: true,
        },
        {
          name: 'language',
          type: 3,
          description:
            'The language your resulting article should have.',
          choices: [
            {
              name: 'german',
              value: 'de',
            },
            {
              name: 'english',
              value: 'en',
            },
          ],
        },
      ],
    });
    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    // send an initial response so we have time to make the requests
    ctx.defer();
    const wiki = new wikiClient(ctx.options.language);
    const res = await wiki.search(ctx.options.keyword);
    if (res.results.length < 1) {
      return {
        embeds: [
          {
            title: 'Error',
            description: `There was nothing found matching: \n\n\`\`\`${ctx.options.keyword}\`\`\``,
            color: Constants.Colors.RED,
          },
        ],
      };
    } else {
      const page = await wiki.getSummary(res.results[0]);
      if (!page) {
        return {
          embeds: [
            {
              title: 'Error',
              description: `There was nothing found matching: \n\n\`\`\`${ctx.options.keyword}\`\`\``,
              color: Constants.Colors.RED,
            },
          ],
        };
      }
      return {
        embeds: [
          {
            title: 'Read the full Article',
            url: res.links[0],
            color: Constants.Colors.BLUE,
            author: {
              icon_url: Constants.wiki_logo,
              name: 'Wikipedia',
            },
            thumbnail: {
              url: page.image,
            },
            description:
              page.extract.length > 2000
                ? page.extract.slice(0, 2000) + '...'
                : page.extract,
          },
        ],
      };
    }
  }
};
