import { MessageOptions } from 'slash-create/lib/context';
import Constants from '../Constants';

const embeds = {
  error: (msg: string): Record<'embeds', unknown[]> => {
    return {
      embeds: [
        {
          title: 'Error',
          description: `\`\`${msg}\`\`\``,
          color: Constants.Colors.RED,
        },
      ],
    };
  },
  wiki: (link: string, msg: string): MessageOptions => {
    return {
      embeds: [
        {
          title: 'Read the full Article',
          url: link,
          color: Constants.Colors.BLUE,
          author: {
            icon_url: Constants.wiki_logo,
            name: 'Wikipedia',
          },
          description:
            msg.length > 2000
              ? msg.slice(0, 2000) + '...'
              : msg,
        },
      ],
    };
  },
};

export default embeds;
