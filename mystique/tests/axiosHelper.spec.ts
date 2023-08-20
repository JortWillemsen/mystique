import { jest } from "@jest/globals";
import Sinon from "sinon";
import axios from "axios";
import { AxiosHelper } from "../src/helpers/AxiosHelper.js";

test("Constructor should create axios instance", async () => {
  // Arrange
  const axiosHelper = new AxiosHelper(axios);
  const create = Sinon.stub(axios, "create");

  // Act
  axiosHelper.setAxiosInstance("abc");

  // Assert
  expect(create.calledOnce).toBe(true);
  create.restore();
});

test("GetRequest should make a get request on the given url", async () => {
  const axiosHelper = new AxiosHelper(axios);
  await axiosHelper.setAxiosInstance("abc");

  const get = Sinon.spy(axiosHelper.instance, "get");

  await axiosHelper.getRequest("http://google.com");

  expect(get.calledWith("http://google.com")).toBe(true);
  get.restore();
});

test("GetTokens should call Figma Api", async () => {
  // Arrange
  const instance = axios.create({
    baseURL: "http://google.com",
    timeout: 2000,
  });

  const axiosMock = axios;

  const post = Sinon.stub(instance, "post").returns(
    Promise.resolve({ data: "test" })
  );
  const create = Sinon.stub(axiosMock, "create").returns(instance);
  const axiosHelper = new AxiosHelper(axiosMock);

  // Act
  const result = await axiosHelper.getTokens("id", "secret", "code");

  // Assert
  expect(
    create.calledWith({
      baseURL: "https://www.figma.com/api",
      timeout: 2000,
    })
  ).toBe(true);

  expect(result).toBe("test");
  post.restore();
  create.restore();
});

beforeEach(() => {
  Sinon.restore();
});
