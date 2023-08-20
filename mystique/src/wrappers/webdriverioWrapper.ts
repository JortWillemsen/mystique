import { Browser, MultiRemoteBrowser, MultiRemoteElement, ParsedCSSValue, multiremote, remote } from "webdriverio";

interface MyRemoteElement extends MultiRemoteElement {
  firefoxBrowser: WebdriverIO.Element;
  edgeBrowser: WebdriverIO.Element;
  chromeBrowser: WebdriverIO.Element;
}

export class WebdriverWrapper {
  browser: MultiRemoteBrowser;

  constructor() { }

  async setBrowser() {
    this.browser = await multiremote({
      chromeBrowser: {
        logLevel: "silent",
        capabilities: {
          browserName: "chrome",
          // "goog:chromeOptions": {
          //   args: ["headless", "disable-gpu"],
          // },
          logLevel: 'silent'
        },
      },
      edgeBrowser: {
        logLevel: "silent",
        capabilities: {
          browserName: "MicrosoftEdge",
          'ms:edgeOptions': {
            args: ['--headless']
          },
          logLevel: 'silent'
        },
      },
      firefoxBrowser: {
        capabilities: {
          browserName: "firefox",
          "moz:firefoxOptions": {
            args: ['-headless'],
            binary: "C:/Program Files/Mozilla Firefox/firefox.exe"
          },
        },
        logLevel: 'silent'
      }
    })
  }

  async setUrl(url: string) {
    await this.browser.url(url);
  }

  async select(selector: string, property: string): Promise<ParsedCSSValue[]> {
    const item = await this.browser.$(selector) as MyRemoteElement;
    
    try {
      var chromeResult = await item.chromeBrowser.getCSSProperty(property);
    } catch(error) {
      chromeResult = undefined;
    }

    try {
      var edgeResult = await item.edgeBrowser.getCSSProperty(property);
    } catch(error) {
      edgeResult = undefined;
    }

    try {
      var firefoxResult = await item.firefoxBrowser.getCSSProperty(property);
    } catch(error) {
      firefoxResult = undefined;
    }
    
    return [chromeResult, edgeResult, firefoxResult];
  }
}
