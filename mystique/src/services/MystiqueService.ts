import yargs from "yargs";
import { MystiqueTest, RunnerService } from "./RunnerService.js";
import chalk from "chalk";
import { InstallService } from "./InstallService.js";
import { ConfigService } from "./ConfigService.js";
import { FigmaApiService } from "./FigmaApiService.js";
import express from "express";
import { FigmaFile } from "../helpers/FigmaFileHelper.js";
import { ReporterService } from "./ReporterService.js";

export class MystiqueService {
  installService: InstallService;
  configService: ConfigService;
  figmaApiService: FigmaApiService;
  runnerService: RunnerService;
  reporterService: ReporterService;

  constructor(
    installService: InstallService,
    configService: ConfigService,
    figmaApiService: FigmaApiService,
    runnerService: RunnerService,
    reporterService: ReporterService
  ) {
    this.installService = installService;
    this.configService = configService;
    this.figmaApiService = figmaApiService;
    this.runnerService = runnerService;
    this.reporterService = reporterService;
  }

  public static inject = [
    "installService",
    "configService",
    "figmaApiService",
    "runnerService",
    "reporterService"
  ] as const;

  async main(options: any) {
    if (options.install !== undefined) {
      this.installService.installIntoProject();

      process.exit(0);
    }

    this.configService.findConfig();
    const tests = this.configService.getTests();
    const app = express();

    app.get("/authenticated", async (req, res) => {
      var fileUrl = new URL(
        "../../public/authenticated.html",
        import.meta.url
      ).href.substring(8);
      res.sendFile(fileUrl);

      if (this.figmaApiService.state === Number(req.query.state)) {
        this.figmaApiService.setCode(req.query.code.toString());
      }
      await this.figmaApiService.getAccessToken();
      await this.afterAuthenticated(tests, options);
    });

    app.listen(3000);

    if (options.file !== undefined) {
      await this.figmaApiService.authenticate(options.token);
      if (options.token !== undefined) {
        await this.afterAuthenticated(tests, options);
      }
    } else {
      await this.startTesting(tests);
    }
  }

  async afterAuthenticated(tests: MystiqueTest[], options: any) {
    const file = await this.figmaApiService.findFile(options.file);
    const generatedTests = await this.figmaApiService.generateTestsForFile(
      file as FigmaFile
    );

    generatedTests.forEach((test) => tests.push(test));

    await this.startTesting(tests);
  }

  async prepareTesting() {
    await this.runnerService.webdriverHelper.webdriver.setBrowser();
  }

  async startTesting(tests: MystiqueTest[]) {
    await this.prepareTesting();

    const results = await this.runnerService.runSuite(tests);

    this.reporterService.logResults(results);

    if (results.filter(result => result.error).length > 0) {
      process.exit(1);
    }

    process.exit(0);
  }
}
