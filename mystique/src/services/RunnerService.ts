import { replaceAt } from "../helpers/GenericHelper.js";
import { WebdriverHelper } from "../helpers/WebdriverHelper.js";
import chalk from "chalk";
import { ReporterService } from './ReporterService.js';
import { Browser } from 'webdriverio';

export interface MystiqueTest {
  name: string;
  componentUrl: string;
  componentName: string;
  selector: string;
  property: string;
  value: string;
}

export interface MystiqueResult {
  test: MystiqueTest;
  startTime: Date;
  endTime: Date;
  browsers: BrowserResult[];
}

export interface BrowserResult {
  result: "PASS" | "FAIL";
  error?: string;
  browser: "chrome" | "edge" | "safari" | "firefox"
}

export class RunnerService {
  webdriverHelper: WebdriverHelper;
  reporterService: ReporterService;

  constructor(webdriverHelper: WebdriverHelper, reporterService: ReporterService) {
    this.webdriverHelper = webdriverHelper;
    this.reporterService = reporterService;
  }

  public static inject = ["webdriverHelper", "reporterService"] as const;

  async runTest(test: MystiqueTest): Promise<MystiqueResult> {
    const startTime = new Date();

    const values = await this.webdriverHelper.findPropertyBySelector(test);
    const result: MystiqueResult = {
      test: test,
      startTime: startTime,
      endTime: new Date(),
      browsers: []
    };

    if (values === undefined) {
      result.browsers.push({
        result: "FAIL",
        browser: "chrome",
        error: "Could not access property"
      })
      result.browsers.push({
        result: "FAIL",
        browser: "edge",
        error: "Could not access property"
      })
      result.browsers.push({
        result: "FAIL",
        browser: "firefox",
        error: "Could not access property"
      })

      return result;
    }

    if (values[0] !== undefined && this.assertValue(values[0], test.value)) {
      result.browsers.push({
        result: "PASS",
        browser: "chrome"
      })
    } else {
      result.browsers.push({
        result: "FAIL",
        browser: "chrome",
        error: `Actual: ${chalk.bgRedBright.white(values[0])}, is not equal to expected: ${chalk.bgRedBright.white(test.value)}.`,
      })
    }

    if (values[1] !== undefined && this.assertValue(values[1], test.value)) {
      result.browsers.push({
        result: "PASS",
        browser: "edge"
      })
    } else {
      result.browsers.push({
        result: "FAIL",
        browser: "edge",
        error: `Actual: ${chalk.bgRedBright.white(values[1])}, is not equal to expected: ${chalk.bgRedBright.white(test.value)}.`,
      })
    }

    if (values[2] !== undefined && this.assertValue(values[2], test.value)) {
      result.browsers.push({
        result: "PASS",
        browser: "firefox"
      })
    } else {
      result.browsers.push({
        result: "FAIL",
        browser: "firefox",
        error: `Actual: ${chalk.bgRedBright.white(values[2])}, is not equal to expected: ${chalk.bgRedBright.white(test.value)}.`,
      })
    }

    return result;
  }

  assertValue(expected: string, actual: string): boolean {
    return expected.toLowerCase() === actual.toLowerCase();
  }

  async runSuite(tests: MystiqueTest[]): Promise<MystiqueResult[]> {
    this.reporterService.logBanner(tests.length, new Set(tests.map((test) => test.componentName)).size);

    let results: MystiqueResult[] = [];

    for (const test of tests) {
      const result = await this.runTest(test);

      results.push(result);
    }

    return results;
  }
}
