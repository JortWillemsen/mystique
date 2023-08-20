import Sinon from "sinon";
import { ConfigService } from "../src/services/ConfigService.js";
import fs from "fs";

const config = `
{
  "storybookUrl": "http://localhost:6006",
  "components": [
    {
      "name": "Button",
      "tests": [
        {
          "name": "Background color should be red",
          "selector": ".background",
          "property": "background-color",
          "value": "rgb(255,0,0)"
        }
      ]
    }
  ]
}`;

test("Constructor should set config correctly", () => {
  const sut = new ConfigService(console, fs);

  expect(sut.pathToConfig).toMatch("mystique.config.json");
});

test("findConfig should ask fs for the config", () => {
  const stub = Sinon.stub(fs, "readFileSync").returns(
    Buffer.from(config, "utf-8")
  );
  const sut = new ConfigService(console, fs);

  sut.findConfig();

  expect(stub.called);
  stub.restore();
});

test("findConfig should exit if config is not found", () => {
  const stub = Sinon.stub(fs, "readFileSync").throws({ code: "ENOENT" });
  const consoleStub = Sinon.stub(console, "log");
  const sut = new ConfigService(console, fs);

  const sutStub = Sinon.stub(sut, "exit");

  sut.findConfig();

  expect(stub.called);
  expect(consoleStub.calledWith("No config file found... Aborting run"));
});

test("getTest should find tests from the config object", () => {
  const sut = new ConfigService(console, fs);
  sut.config = {
    storybookUrl: "http://localhost:6006",
    components: [
      {
        name: "Button",
        tests: [
          {
            name: "Background color should be red",
            selector: ".background",
            property: "background-color",
            value: "rgb(255,0,0)",
          },
        ],
      },
    ],
  };

  const tests = sut.getTests();

  expect(tests.length).toBeGreaterThan(0);
});

beforeEach(() => {
  Sinon.restore();
});
