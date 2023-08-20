#!/usr/bin/env node
import yargs from "yargs";
import { MystiqueService } from "./services/MystiqueService.js";
import { createInjector } from "typed-inject";
import { AxiosHelper } from "./helpers/AxiosHelper.js";
import { FigmaFileHelper } from "./helpers/FigmaFileHelper.js";
import { GeneratorHelper } from "./helpers/GeneratorHelper.js";
import { WebdriverHelper } from "./helpers/WebdriverHelper.js";
import { ConfigService } from "./services/ConfigService.js";
import { FigmaApiService } from "./services/FigmaApiService.js";
import { InstallService } from "./services/InstallService.js";
import { RunnerService } from "./services/RunnerService.js";
import axios from "axios";
import { WebdriverWrapper } from "./wrappers/webdriverioWrapper.js";
import fs from "fs";
import { OpenWrapper } from "./wrappers/openWrapper.js";
import { ReporterService } from "./services/ReporterService.js";

const options = yargs(process.argv.slice(2))
  .options({
    file: {
      type: "string",
      demandOption: false,
      alias: "f",
      description: "Figma file ID used for test generation",
    },
    install: {
      type: "string",
      demandOption: false,
      alias: "i",
      description: "Install Mystique in project",
    },
    token: {
      type: "string",
      demandOption: false,
      alias: "t",
      description: "Personal access token",
    },
  })
  .parseSync();

const appInjector = createInjector()
  .provideValue("console", console)
  .provideValue("fs", fs)
  .provideValue("axios", axios)
  .provideClass("open", OpenWrapper)
  .provideClass("webdriverWrapper", WebdriverWrapper)
  .provideClass("axiosHelper", AxiosHelper)
  .provideClass("webdriverHelper", WebdriverHelper)
  .provideClass("configService", ConfigService)
  .provideClass("generatorHelper", GeneratorHelper)
  .provideClass("figmaFileHelper", FigmaFileHelper)
  .provideClass("reporterService", ReporterService)
  .provideClass("figmaApiService", FigmaApiService)
  .provideClass("installService", InstallService)
  .provideClass("runnerService", RunnerService);

const mystiqueService = appInjector.injectClass(MystiqueService);

async function main() {
  await mystiqueService.main(options);
}

main().catch();
