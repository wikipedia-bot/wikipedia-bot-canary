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
    console.log(ctx.options.language);
    const wiki = new wikiClient(ctx.options.language);
    const res = await wiki.search(ctx.options.keyword);
    console.log(res);
    if (res.results.length < 1) {
      ctx.send('', {
        embeds: [
          {
            title: 'Error',
            description: `There was nothing found matching: \n\n\`\`\`${ctx.options.keyword}\`\`\``,
            color: Constants.Colors.RED,
          },
        ],
      });
    } else {
      const page = await wiki.getSummary(res.results[0]);
      console.log(page);
      if (typeof page === 'number') {
        ctx.send('', {
          embeds: [
            {
              title: 'Error',
              description: `There was nothing found matching: \n\n\`\`\`${ctx.options.keyword}\`\`\``,
              color: Constants.Colors.RED,
            },
          ],
        });
      }
      ctx.send('', {
        embeds: [
          {
            title: 'Read the full Article',
            url: page.link,
            color: Constants.Colors.BLUE,
            author: {
              icon_url: Constants.wiki_logo,
              name: 'Wikipedia',
            },
            description: page.extract,
          },
        ],
      });
    }
  }
};
