import { Browser } from "webdriverio";
import { MystiqueTest } from "./../services/RunnerService.js";
import { WebdriverWrapper } from "../wrappers/webdriverioWrapper.js";

export class WebdriverHelper {
  webdriver: WebdriverWrapper;

  constructor(webdriver: WebdriverWrapper) {
    this.webdriver = webdriver;
  }

  public static inject = ["webdriverWrapper"] as const;

  async findPropertyBySelector(test: MystiqueTest): Promise<string[]> {
    try {
      await this.webdriver.setUrl(test.componentUrl);
      
      const values = await this.webdriver.select(test.selector, test.property);
      return values.map(v => v === undefined ? undefined : v.value);
    } catch (error) {
      console.log(
        "├─ " + error
      );

      return [undefined, undefined, undefined];
    }
  }
}
