import centra from 'centra';
import { ConvertedOption } from 'slash-create';

type Language = ConvertedOption;

export default class wikiClient {
  lang: Language;

  constructor(language: Language) {
    this.lang = language;
  }

  public async search(
    keyword: string | ConvertedOption,
  ): Promise<Record<'results' | 'links', string[]>> {
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
  }

  public async getSummary(
    keyword: string,
  ): Promise<Record<'extract', string>> {
    const res = await centra(
      `https://${this.lang}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&inprop=url&exintro=&explaintext=&titles=${keyword}`,
    ).send();

    const json = await res.json();
    console.log(
      json.query.pages[Object.keys(json.query.pages)[0]],
    );
    return {
      extract:
        json.query.pages[Object.keys(json.query.pages)[0]]
          .extract,
    };
  }
}
