import Sinon from "sinon";
import { WebdriverHelper } from "../src/helpers/WebdriverHelper.js";
import * as webdriver from "webdriverio";
import { jest } from "@jest/globals";
import { WebdriverWrapperMock } from "./mocks/webdriverWrapperMock.js";
import { MystiqueTest } from "../src/services/RunnerService.js";

test("Constructor should create a webdriver", () => {
  const wrapper = new WebdriverWrapperMock();
  const spy = Sinon.spy(wrapper.setBrowser);

  const sut = new WebdriverHelper(wrapper);

  expect(spy.called);
});

test("Constructor should set webdriver wrapper", () => {
  const wrapper = new WebdriverWrapperMock();

  const sut = new WebdriverHelper(wrapper);

  expect(sut.webdriver).toBe(wrapper);
});

test("findPropertyBySelector should call the webdriver with correct arguments", () => {
  const wrapper = new WebdriverWrapperMock();
  const spy = Sinon.spy(wrapper.select);
  const sut = new WebdriverHelper(wrapper);

  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };

  sut.findPropertyBySelector(test);

  expect(spy.calledWith("test"));
});

test("findPropertyBySelector should console log when erroring", () => {
  const wrapper = new WebdriverWrapperMock();
  const spy = Sinon.stub(wrapper, "select").throwsException();
  const sut = new WebdriverHelper(wrapper);

  const test: MystiqueTest = {
    name: "test",
    componentName: "test",
    componentUrl: "test",
    selector: "test",
    property: "test",
    value: "test",
  };

  sut.findPropertyBySelector(test);

  expect(spy.calledOnce);
});

beforeEach(() => {
  Sinon.restore();
});
