import axios, { AxiosResponse } from "axios";
import fs from "fs";
import { AxiosHelper } from "../src/helpers/AxiosHelper.js";
import { FigmaApiService } from "../src/services/FigmaApiService.js";
import { FigmaFile, FigmaFileHelper } from "../src/helpers/FigmaFileHelper.js";
import { GeneratorHelper } from "../src/helpers/GeneratorHelper.js";
import { ConfigService } from "../src/services/ConfigService.js";
import Sinon from "sinon";
import { OpenWrapper } from "../src/wrappers/openWrapper.js";
import { tokensResponse } from "../src/services/FigmaApiService.js";

test("Constructor should set state to a random number", () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  expect(sut.state).toBeLessThan(999999999);
  expect(sut.state).toBeGreaterThan(0);
});

test("Constructor should set injected properties correctly", () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  expect(sut.axiosHelper).toBe(axiosHelper);
  expect(sut.figmaFileHelper).toBe(figmaHelper);
});

test("Authenticate should open in browser", () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const openStub = Sinon.stub(openWrapper, "openUrl");

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  sut.authenticate();

  expect(openStub.called);

  openStub.restore();
});

test("Authenticate should only set pat if access token is passed", () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const openStub = Sinon.stub(openWrapper, "openUrl");

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  sut.authenticate("abc");

  expect(openStub.notCalled);
  expect(sut.axiosHelper.pat).toEqual("abc");

  openStub.restore();
});

test("getAccessToken should set correct access tokens", async () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const stub = Sinon.stub(axiosHelper, "getTokens").resolves({
    access_token: "access",
    refresh_token: "refresh",
  });

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  const tokens: any = await sut.getAccessToken();

  expect(tokens).toMatchObject({
    access_token: "access",
    refresh_token: "refresh",
  });
  expect(sut.accessToken).toEqual("access");
  expect(sut.refreshToken).toEqual("refresh");
});

test("setCode should set code", () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  sut.setCode("test");

  expect(sut.code).toEqual("test");
});

test("findFile should create new axios instance", async () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const setStub = Sinon.stub(axiosHelper, "setAxiosInstance");
  const getStub = Sinon.stub(axiosHelper, "getRequest").returns(
    Promise.resolve({ data: { test: "test" } }) as any
  );

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  const response = await sut.findFile("key");

  expect(setStub.called);
  expect(getStub.called);
  expect(response).toEqual({ test: "test" });
});

test("generateTestsForFile should call findTests", () => {
  const axiosHelper = new AxiosHelper(axios);
  const figmaHelper = new FigmaFileHelper(
    new GeneratorHelper(new ConfigService(console, fs))
  );
  const openWrapper = new OpenWrapper();

  const stub = Sinon.stub(figmaHelper, "findTests");

  const sut = new FigmaApiService(axiosHelper, figmaHelper, openWrapper, fs);

  const data = fs.readFileSync(
    new URL("./assets/file.json", import.meta.url),
    "utf-8"
  );

  sut.generateTestsForFile(JSON.parse(data) as FigmaFile);

  expect(stub.called);
});
