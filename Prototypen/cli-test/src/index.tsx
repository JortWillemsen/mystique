import React, { FunctionComponent } from "react";
import { renderToDom } from "./sandbox/react/renderer";
import { findConfig } from "../terminal/config.mjs";

var config = await findConfig(process.cwd());

interface ComponentConfig {
  name: String;
  component: FunctionComponent<Element>;
}

var rootElement = document.querySelector("#root");

if (rootElement != null) {
  renderToDom(config[0].component, rootElement, false);
}