import centra from 'centra';
import wtf_wikipedia from 'wtf_wikipedia';
import { ConvertedOption } from 'slash-create';

type Language = ConvertedOption;

export default class wikiClient {
  lang: Language;
  search: (
    keyword: string | ConvertedOption,
  ) => Promise<Record<'results' | 'links', string[]>>;
  page: (
    keyword: string | ConvertedOption,
  ) => Promise<unknown>;
  constructor(language: Language) {
    this.lang = language;

    this.search = async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      keyword: string | ConvertedOption,
    ): Promise<Record<'results' | 'links', string[]>> => {
      const url = `https://${this.lang}.wikipedia.org/w/api.php?action=opensearch&search=${keyword}&format=json`;
      const res = await centra(url).send();
      /**
       * returns an array with:
       * [ {keyword}, [Matching articles], [idk tbh?], [links corresponding to first array with articles] ]
       */
      const json = await res.json();
      return {
        results: json[1],
        links: json[3],
      };
    };

    this.page = async (
      keyword: string | ConvertedOption,
    ): Promise<unknown> => {
      const url = `https://${this.lang}.wikipedia.org/api/rest_v1/page/summary/${keyword}`;
      const res = await centra(url)
        .header('Accept', 'application/json')
        .send();
      const json = await res.json();
      console.log(json);
      return json;
    };

    /**
     * mainImage
     */
  }
  public async mainImage(keyword: string): Promise<string> {
    const doc = await wtf_wikipedia.fetch(keyword);
    if (!doc) return '';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    doc.json();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    console.log(doc.sections[0].paragraphs);
    return '';
  }

  public async getSummary(
    keyword: string,
  ): Promise<Record<'extract' | 'image', string>> {
    const res = await centra(
      `https://${this.lang}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|info|images&inprop=url&exintro=&explaintext=&titles=${keyword}`,
    ).send();

    const json = await res.json();
    console.log(
      json.query.pages[Object.keys(json.query.pages)[0]],
    );
    return {
      extract:
        json.query.pages[Object.keys(json.query.pages)[0]]
          .extract,
      image: `${
        json.query.pages[Object.keys(json.query.pages)[0]]
          .fullurl
      }#/media/${
        json.query.pages[Object.keys(json.query.pages)[0]]
          .images[0].title
      }`,
    };
  }
}
