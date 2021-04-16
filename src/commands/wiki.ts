import {
  CommandContext,
  SlashCommand,
  SlashCreator,
} from 'slash-create';
import wikiClient from '../classes/wikiclient';
import embeds from '../util/embeds';

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
    const wiki = new wikiClient(
      // if there was no language provided we fall back to the default langauge which in our case is english
      ctx.options.language ?? 'en',
    );
    const res = await wiki.search(ctx.options.keyword);
    console.log(res);
    if (res.results.length < 1) {
      return embeds.error(
        `There was nothing found matching: \n\n${ctx.options.keyword}`,
      );
    } else {
      const page = await wiki.getSummary(res.results[0]);
      if (!page)
        return embeds.error(
          `There was nothing found matching: \n\n${ctx.options.keyword}`,
        );
      if (page.extract === '')
        return embeds.error(
          `There was nothing found matching: \n\n${ctx.options.keyword}`,
        );
      return embeds.wiki(res.links[0], page.extract);
    }
  }
};
