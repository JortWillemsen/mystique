import { Browser, ParsedCSSValue } from "webdriverio";
import { WebdriverWrapper } from "../../src/wrappers/webdriverioWrapper.js";

export class WebdriverWrapperMock implements WebdriverWrapper {
  browser: Browser;

  constructor() {}

  async setBrowser() { }
  async setUrl(url: string) {}
  async select(selector: string, property: string) {
    const result: ParsedCSSValue = { parsed: {} };

    return result;
  }
}
