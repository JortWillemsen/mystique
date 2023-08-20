import { spawnSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

interface PackageInfo {
  name: string;
  version: string;
  dependencies: [];
}

export class InstallService {
  workingDir: string;
  console: Console;
  fs: any;

  constructor(console: Console, fs: any) {
    this.workingDir = process.cwd();
    this.console = console;
    this.fs = fs;
  }

  public static inject = ["console", "fs"] as const;

  installIntoProject() {
    console.log(`Installing Mystique into ${this.workingDir}`);

    if (this.fs.existsSync(import.meta.url + "/public/sample.config.json")) {
      console.log("Mystique already installed... Skipping.");
      console.log("Mystique install complete!");
      return;
    }

    this.checkStorybookInstall();
    this.installConfig();

    console.log("Mystique install complete!");
  }

  checkStorybookInstall(): Boolean {
    console.log("Checking Storybook install...");

    const shell =
      process.platform === "win32"
        ? "C:\\Windows\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe"
        : undefined;

    const response = spawnSync("npm", ["list", "storybook", "--json"], {
      cwd: this.workingDir,
      env: process.env,
      shell,
    });

    let packageInfo: PackageInfo = JSON.parse(
      response.stdout.toString().trim()
    );
    if (packageInfo.dependencies) {
      console.log("Found Storybook inside the project! Continuing...");
      return true;
    }

    console.log(
      "Could not find Storybook inside the project. Beware, Mystique might not behave correctly"
    );
    return false;
  }

  installConfig() {
    this.fs.copyFile(
      dirname(fileURLToPath(import.meta.url)) +
        "/../../public/sample.config.json",
      this.workingDir + "/mystique.config.json",
      (error: any) => {
        if (error) {
          throw error;
        }
      }
    );

    console.log("Succesfully copied config file into the project");
  }
}
