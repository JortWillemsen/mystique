import Sinon from "sinon";
import {
  FigmaDocument,
  FigmaFile,
  FigmaFileHelper,
  FigmaNode,
  FigmaRectangle,
} from "../src/helpers/FigmaFileHelper.js";
import { GeneratorHelper } from "../src/helpers/GeneratorHelper.js";
import { ConfigService } from "../src/services/ConfigService.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { text } from "stream/consumers";

const configService = new ConfigService(console, fs);
configService.config = {
  storybookUrl: "http://localhost:6006",
  components: [],
};
const generatorHelper = new GeneratorHelper(configService);

test("Constructor should set properties correctly", async () => {
  const sut = new FigmaFileHelper(generatorHelper);

  expect(sut.testableNodes).toEqual([]);
  expect(sut.tests).toEqual([]);
});

test("findTestableNodes should throw if file is undefined", async () => {
  const sut = new FigmaFileHelper(generatorHelper);

  const test = () => {
    sut.findTestableNodes(undefined as unknown as FigmaFile);
  };

  expect(test).toThrow("File not found!");
});

test("findTestableNodes should find testable nodes", async () => {
  const sut = new FigmaFileHelper(generatorHelper);

  const data = fs.readFileSync(
    new URL("./assets/file.json", import.meta.url),
    "utf-8"
  );

  sut.findTestableNodes(JSON.parse(data));

  expect(sut.testableNodes.length).toBe(2);
});

test.each([
  ["TEXT", true],
  ["RECTANGLE", true],
  ["FRAME", false],
  ["CANVAS", false],
  ["DOCUMENT", false],
])(
  "checkTestableNode should correctly determine '%s' to be testable or not",
  (nodeType, result) => {
    const text = `{
    "id": "1",
    "name": "frame",
    "type": "${nodeType}"
  }`;

    const sut = new FigmaFileHelper(generatorHelper);
    sut.checkTestableNode(JSON.parse(text));
    expect(sut.testableNodes.length === 1).toBe(result);
  }
);

test("checkTestableNode should test again if the node has children", () => {
  const node = `{
    "id": "1",
    "name": "text",
    "type": "TEXT",
    "children": [
      {
        "id": "2",
        "name": "rectangle",
        "type": "RECTANGLE"
      }
    ]
  }`;

  const sut = new FigmaFileHelper(generatorHelper);
  sut.checkTestableNode(JSON.parse(node));
  expect(sut.testableNodes.length).toBe(2);
});

test("findTests should access generator", () => {
  const rectangleSpy = Sinon.spy(generatorHelper, "generateRectangleTests");
  const textSpy = Sinon.spy(generatorHelper, "generateTextTests");
  const sut = new FigmaFileHelper(generatorHelper);
  const data = fs.readFileSync(
    new URL("./assets/file.json", import.meta.url),
    "utf-8"
  );

  const result = sut.findTests(JSON.parse(data));

  expect(rectangleSpy.calledOnce).toBe(true);
  expect(textSpy.calledOnce).toBe(true);

  expect(result.length).toBeGreaterThanOrEqual(1);
});

beforeEach(() => {
  Sinon.restore();
});
