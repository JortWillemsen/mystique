import Sinon from "sinon";
import { InstallService } from "../src/services/InstallService.js";
import fs from "fs";

test("constructor should set the working directory correctly", () => {
  const sut = new InstallService(console, fs);

  expect(sut.workingDir).toEqual(process.cwd());
});

test("installIntoProject should check the file system", () => {
  const fsStub = Sinon.stub(fs, "existsSync").returns(true);
  const consoleStub = Sinon.stub(console, "log");

  const sut = new InstallService(console, fs);

  sut.installIntoProject();

  expect(fsStub.called);
  expect(consoleStub.calledWith(`Installing Mystique into ${process.cwd()}`));

  fsStub.restore();
  consoleStub.restore();
});

test("installIntoProject with file should log that file exists", () => {
  const fsStub = Sinon.stub(fs, "existsSync").returns(true);
  const consoleStub = Sinon.stub(console, "log");

  const sut = new InstallService(console, fs);

  sut.installIntoProject();

  expect(fsStub.called);
  expect(consoleStub.calledWith("Mystique already installed... Skipping."));
  expect(consoleStub.calledWith("Mystique install complete!"));

  fsStub.restore();
  consoleStub.restore();
});

test("installIntoProject without file should install file", () => {
  const fsStub = Sinon.stub(fs, "existsSync").returns(false);
  const consoleStub = Sinon.stub(console, "log");

  const sut = new InstallService(console, fs);

  const stub = Sinon.stub(sut, "installConfig");

  sut.installIntoProject();

  expect(stub.called).toBe(true);
  expect(consoleStub.calledWith("Mystique install complete!"));

  fsStub.restore();
  consoleStub.restore();
  stub.restore();
});

test("checkStorybookInstall should log if no storybook was found", () => {
  const fsStub = Sinon.stub(fs, "existsSync").returns(true);
  const consoleStub = Sinon.stub(console, "log");

  const sut = new InstallService(console, fs);

  sut.checkStorybookInstall();

  expect(consoleStub.calledWith("Checking Storybook install...")).toBe(true);
  expect(
    consoleStub.calledWith(
      "Could not find Storybook inside the project. Beware, Mystique might not behave correctly"
    )
  ).toBe(true);

  fsStub.restore();
  consoleStub.restore();
});

test("checkStorybookInstall should return if storybook was found", () => {
  const fsStub = Sinon.stub(fs, "existsSync").returns(true);
  const consoleStub = Sinon.stub(console, "log");

  const sut = new InstallService(console, fs);
  sut.workingDir = process.cwd() + "/tests/assets";

  sut.checkStorybookInstall();

  expect(
    consoleStub.calledWith("Found Storybook inside the project! Continuing...")
  ).toBe(true);

  fsStub.restore();
  consoleStub.restore();
});

test("installConfig should copy the config file", () => {
  const fsStub = Sinon.stub(fs, "copyFile");
  const consoleStub = Sinon.stub(console, "log");

  const sut = new InstallService(console, fs);

  sut.installConfig();

  expect(fsStub.called).toBe(true);
  expect(
    consoleStub.calledWith("Succesfully copied config file into the project")
  ).toBe(true);

  fsStub.restore();
  consoleStub.restore();
});

afterEach(() => {
  Sinon.restore();
});

beforeEach(() => {
  Sinon.restore();
});
