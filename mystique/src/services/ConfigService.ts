import { MystiqueTest } from "./RunnerService.js";

interface MystiqueConfig {
  storybookUrl: string;
  components: MystiqueComponentConfig[];
}

interface MystiqueComponentConfig {
  name: string;
  tests: MystiqueConfigTest[];
}

interface MystiqueConfigTest {
  name: string;
  selector: string;
  property: string;
  value: string;
}

export class ConfigService {
  console: Console;
  fs: any;
  pathToConfig: string;
  config: MystiqueConfig;

  constructor(console: Console, fs: any) {
    this.console = console;
    this.fs = fs;
    this.pathToConfig = process.cwd() + "/mystique.config.json";
  }

  public static inject = ["console", "fs"] as const;

  findConfig() {
    let raw;

    try {
      raw = this.fs.readFileSync(this.pathToConfig);
    } catch (error) {
      if (error.code === "ENOENT") {
        this.console.log("No config file found... Aborting run");
        this.exit();

        return;
      }
    }
    this.config = JSON.parse(raw.toString());
  }

  getTests(): MystiqueTest[] {
    var tests: MystiqueTest[] = [];

    this.config.components.forEach((component) => {
      component.tests.forEach((configTest) => {
        const test = {
          name: configTest.name,
          componentName: component.name,
          componentUrl:
            this.config.storybookUrl +
            `/iframe.html?args=&id=${component.name.toLowerCase()}&viewMode=story`,
          selector: configTest.selector,
          property: configTest.property,
          value: configTest.value,
        };

        tests.push(test);
      });
    });

    return tests;
  }

  exit() {
    process.exit(1);
  }
}
