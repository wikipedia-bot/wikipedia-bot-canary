export default {
  headers: {
    'User-Agent':
      'wikipedia-bot-requests (https://julianyaman.de; julianyaman@posteo.eu) requests.js',
  },
  // All languages supported by the bot.
  // Before adding any additional API URLs, add an alias for this new language in commands/wiki.js.
  apiUrl: {
    // german
    de: 'https://de.wikipedia.org/w/api.php',
    // english
    en: 'https://en.wikipedia.org/w/api.php',
    // spanish
    es: 'https://es.wikipedia.org/w/api.php',
    // french
    fr: 'https://fr.wikipedia.org/w/api.php',
    // russian
    ru: 'https://ru.wikipedia.org/w/api.php',
    // slovak
    sl: 'https://sl.wikipedia.org/w/api.php',
    // turkish
    tr: 'https://tr.wikipedia.org/w/api.php',
    // yiddish
    yi: 'https://yi.wikipedia.org/w/api.php',
  },

  // Wikipedia Logo, used in Bot Footers and as author picture in some embeds
  wiki_logo:
    'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',

  // Color-Map for easier embed creation in interactions
  Colors: {
    DEFAULT: 0x000000,
    WHITE: 0xffffff,
    AQUA: 0x1abc9c,
    GREEN: 0x2ecc71,
    BLUE: 0x3498db,
    YELLOW: 0xffff00,
    PURPLE: 0x9b59b6,
    LUMINOUS_VIVID_PINK: 0xe91e63,
    GOLD: 0xf1c40f,
    ORANGE: 0xe67e22,
    RED: 0xe74c3c,
    GREY: 0x95a5a6,
    NAVY: 0x34495e,
    DARK_AQUA: 0x11806a,
    DARK_GREEN: 0x1f8b4c,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368a,
    DARK_VIVID_PINK: 0xad1457,
    DARK_GOLD: 0xc27c0e,
    DARK_ORANGE: 0xa84300,
    DARK_RED: 0x992d22,
    DARK_GREY: 0x979c9f,
    DARKER_GREY: 0x7f8c8d,
    LIGHT_GREY: 0xbcc0c0,
    DARK_NAVY: 0x2c3e50,
    BLURPLE: 0x7289da,
    GREYPLE: 0x99aab5,
    DARK_BUT_NOT_BLACK: 0x2c2f33,
    NOT_QUITE_BLACK: 0x23272a,
  },

  interactionEndpoints: {
    // POST
    replyurl:
      'https://discord.com/api/v8/interactions/<interaction_id>/<interaction_token>/callback',
    // PATCH
    edit_initial_response:
      'https://discord.com/api/v8/webhooks/<application_id>/<interaction_token>/messages/@original',
    // DELETE
    delete_original_msg:
      'https://discord.com/api/v8/webhooks/<application_id>/<interaction_token>/messages/@original',
    // POST
    create_followup_msg:
      'https://discord.com/api/v8/webhooks/<application_id>/<interaction_token>',
  },
};
