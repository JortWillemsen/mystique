import Sinon from "sinon";
import { WebdriverHelper } from "../src/helpers/WebdriverHelper.js";
import { MystiqueTest, RunnerService } from "../src/services/RunnerService.js";
import { WebdriverWrapperMock } from "./mocks/webdriverWrapperMock.js";

test("Constructor should set properties", () => {
  const webdriverHelper = new WebdriverHelper(new WebdriverWrapperMock());

  const sut = new RunnerService(webdriverHelper, console);

  expect(sut.webdriverHelper).toBe(webdriverHelper);
});

test("runTest should find property from webdriver", async () => {
  const webdriverHelper = new WebdriverHelper(new WebdriverWrapperMock());
  const stub = Sinon.stub(webdriverHelper, "findPropertyBySelector").resolves(
    "test"
  );

  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };

  const sut = new RunnerService(webdriverHelper, console);

  const result = await sut.runTest(test);

  expect(stub.called).toBe(true);
});

test("runTest should return passed test if values match", async () => {
  const webdriverHelper = new WebdriverHelper(new WebdriverWrapperMock());
  const stub = Sinon.stub(webdriverHelper, "findPropertyBySelector").resolves(
    "test"
  );

  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };

  const sut = new RunnerService(webdriverHelper, console);

  const result = await sut.runTest(test);

  expect(result.result).toEqual("PASS");
});

test("runTest should find property from webdriver", async () => {
  const webdriverHelper = new WebdriverHelper(new WebdriverWrapperMock());
  const stub = Sinon.stub(webdriverHelper, "findPropertyBySelector").resolves(
    "false"
  );

  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };

  const sut = new RunnerService(webdriverHelper, console);

  const result = await sut.runTest(test);

  expect(result.result).toEqual("FAIL");
});

test("runTest should generate error message", async () => {
  const webdriverHelper = new WebdriverHelper(new WebdriverWrapperMock());
  const stub = Sinon.stub(webdriverHelper, "findPropertyBySelector").resolves(
    "false"
  );

  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };

  const sut = new RunnerService(webdriverHelper, console);

  const result = await sut.runTest(test);

  expect(result.error).toBeDefined();
});

test("runSuite should log the banner to the console", () => {
  const webdriverHelper = new WebdriverHelper(new WebdriverWrapperMock());
  const consoleStub = Sinon.stub(console, "log");
  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };
  const sut = new RunnerService(webdriverHelper, console);
  const stub = Sinon.stub(sut, "runTest");

  sut.runSuite([test]);

  expect(consoleStub.args[0][0]).toMatch(`
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
});

test("runSuite should run the tests", async () => {
  const webdriverHelper = new WebdriverHelper(new WebdriverWrapperMock());
  const consoleStub = Sinon.stub(console, "log");
  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };
  const sut = new RunnerService(webdriverHelper, console);
  const stub = Sinon.stub(sut, "runTest");

  const results = await sut.runSuite([test]);

  expect(results).toHaveLength(1);
});

beforeEach(() => {
  Sinon.restore();
});

afterEach(() => {
  Sinon.restore();
});
