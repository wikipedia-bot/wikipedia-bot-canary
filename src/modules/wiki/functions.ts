/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import wiki from 'wikijs';
import Constants from '../constants/Constants';
import * as Sentry from '@sentry/node';
import returnobject from '../../@types/returnobject';

const returnobject: returnobject = { error: false };

export default {
  /**
   * Function that returns a returnobject with an error or the requested information
   * @function getSummary
   * @param {string} argument - Argument sent by the user (!wiki [argument])
   * @param {string} lang - Language in which the result should be sent.
   * @returns {returnobject} returnobject
   */
  getSummary: async (
    argument: string,
    lang = 'en',
  ): Promise<returnobject> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let apiUrl: any = Constants.apiUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const headers: any = Constants.headers;
    const apiString: string = apiUrl[lang];

    if (apiString === undefined)
      apiUrl = 'https://en.wikipedia.org/w/api.php';

    try {
      const search = await wiki({
        apiUrl: apiString,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        headers,
      }).search(argument);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wikiPage: any = await wiki({
        apiUrl: apiString,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        headers,
      }).page(search.results[0]);

      returnobject.wiki = {
        title: await wikiPage.raw.title,
        url: await wikiPage.raw.fullurl,
        image: await wikiPage.mainImage(),
        text: await wikiPage.summary(),
      };
    } catch (e) {
      returnobject.error = true;
      Sentry.captureException(e);
    }

    return returnobject;
  },
  // method to get the full article
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getFullArticle: async () => {},
  /**
   * @function getReferences
   * @param {string} argument - Keyword you want the references for
   * @returns {returnobject} returnobject with requested information
   *
   */
  getReferences: async (
    argument: string,
  ): Promise<returnobject> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const headers: any = Constants.headers;

    try {
      const sourceSearch = await wiki({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        headers,
      }).search(argument);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wikiPageSources: any = await wiki({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        headers,
      }).page(sourceSearch.results[0]);

      returnobject.wiki = {
        title: await wikiPageSources.raw.title,
        url: await wikiPageSources.raw.fullurl,
        image: await wikiPageSources.mainImage(),
        refs: await wikiPageSources.references(),
      };
    } catch (e) {
      returnobject.error = true;
      Sentry.captureException(e);
    }

    return returnobject;
  },
  /**
   * @function getShortInformation
   * @param {string} argument - argument you want to search for and get information on
   * @returns {returnobject} returnobject
   */
  getShortInformation: async (
    argument: string,
  ): Promise<returnobject> => {
    try {
      const data = await wiki().search(argument);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const page: any = await wiki().page(data.results[0]);
      const title = await page.raw.title;
      const url = await page.raw.fullurl;
      const image = await page.mainImage();
      const info = await page.fullInfo();

      returnobject.wiki = {
        title,
        url,
        image,
        page,
        info,
      };
    } catch (e) {
      returnobject.error = true;
      Sentry.captureException(e);
    }

    return returnobject;
  },
};
