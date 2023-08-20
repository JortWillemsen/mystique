import chalk from "chalk";
import { replaceAt } from "../helpers/GenericHelper.js";
import { MystiqueResult } from "./RunnerService.js";

export class ReporterService {
  console: Console;

  constructor(console: Console) {
    this.console = console;
  }

  public static inject = ["console"] as const;

  logBanner(totalTests: number, totalComponents: number) {
    this.console.log(`
███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
█░░░░░░██████████░░░░░░█░░░░░░░░██░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░███░░░░░░██░░░░░░█░░░░░░░░░░░░░░█
█░░▄▀░░░░░░░░░░░░░░▄▀░░█░░▄▀▄▀░░██░░▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
█░░▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀░░█░░░░▄▀░░██░░▄▀░░░░█░░▄▀░░░░░░░░░░█░░░░░░▄▀░░░░░░█░░░░▄▀░░░░█░░▄▀░░░░░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░█
█░░▄▀░░░░░░▄▀░░░░░░▄▀░░███░░▄▀▄▀░░▄▀▄▀░░███░░▄▀░░█████████████░░▄▀░░███████░░▄▀░░███░░▄▀░░██░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░█████████
█░░▄▀░░██░░▄▀░░██░░▄▀░░███░░░░▄▀▄▀▄▀░░░░███░░▄▀░░░░░░░░░░█████░░▄▀░░███████░░▄▀░░███░░▄▀░░██░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░█
█░░▄▀░░██░░▄▀░░██░░▄▀░░█████░░░░▄▀░░░░█████░░▄▀▄▀▄▀▄▀▄▀░░█████░░▄▀░░███████░░▄▀░░███░░▄▀░░██░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
█░░▄▀░░██░░░░░░██░░▄▀░░███████░░▄▀░░███████░░░░░░░░░░▄▀░░█████░░▄▀░░███████░░▄▀░░███░░▄▀░░██░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░█
█░░▄▀░░██████████░░▄▀░░███████░░▄▀░░███████████████░░▄▀░░█████░░▄▀░░███████░░▄▀░░███░░▄▀░░██░░▄▀░░███░░▄▀░░██░░▄▀░░█░░▄▀░░█████████
█░░▄▀░░██████████░░▄▀░░███████░░▄▀░░███████░░░░░░░░░░▄▀░░█████░░▄▀░░█████░░░░▄▀░░░░█░░▄▀░░░░░░▄▀░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█
█░░▄▀░░██████████░░▄▀░░███████░░▄▀░░███████░░▄▀▄▀▄▀▄▀▄▀░░█████░░▄▀░░█████░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
█░░░░░░██████████░░░░░░███████░░░░░░███████░░░░░░░░░░░░░░█████░░░░░░█████░░░░░░░░░░█░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█
███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████`);

    const runInfo = `Found ${totalTests} tests for ${totalComponents} components.`;
    const separationLine = "─".repeat(runInfo.length);
    this.console.log(separationLine);
    this.console.log(chalk.blueBright(runInfo));
    this.console.log(replaceAt(separationLine, 0, "┌"));
  }

  //┬├─│

  logResults(results: MystiqueResult[]) {
    const components = new Set(results.map((result) => result.test.componentName));

    components.forEach(name => {
      this.console.log(`├─ ${chalk.blueBright(name)}`)
      let separationLine = "─".repeat(6);
      separationLine = replaceAt(separationLine, 0, "└")
      this.console.log(replaceAt(separationLine, 5, "┐"))

      const tests = results.filter(result => result.test.componentName === name);
      tests.forEach(result => {
        console.log(`${result.browsers.every(r => r.result === 'PASS') ? chalk.bgGreen("PASS") : chalk.bgRedBright("FAIL")} │ ${result.test.name} (${result.endTime.getTime() - result.startTime.getTime()}ms) - chrome: ${result.browsers.find(b => b.browser === "chrome").result === "PASS" ? chalk.green("✓") : chalk.red("X")}, edge: ${result.browsers.find(b => b.browser === "edge").result === "PASS" ? chalk.green("✓") : chalk.red("X")}, firefox: ${result.browsers.find(b => b.browser === "firefox").result === "PASS" ? chalk.green("✓") : chalk.red("X")}`)
        result.browsers.forEach(b => {
          if (b.error !== undefined) {
            this.console.log(`     ├─ ${chalk.redBright(b.browser + ": " + b.error)}`)
          }
        })
      })
      this.console.log(replaceAt(replaceAt("─".repeat(6), 5, "┘"), 0, "┌"))
    })

    const totalTestTime = results[results.length - 1].endTime.getTime() - results[0].startTime.getTime();

    this.console.log(`└ Total of ${results.length} tests run; ${chalk.bgGreen.black(`${results.filter(r => r.browsers.every(b => b.result === "PASS")).length} passed;`)} ${chalk.bgRedBright.black(`${results.filter(r => r.browsers.some(b => b.result === "FAIL")).length} failed;`)} (${(totalTestTime / 1000).toFixed(2)}s)`)
  }
}