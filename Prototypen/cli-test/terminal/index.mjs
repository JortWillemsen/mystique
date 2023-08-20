#!/usr/bin/env node
import express from 'express';
import { remote } from "webdriverio";
import { findConfig } from "./config.mjs";
import path from 'path';
import { exec } from "child_process";

// findConfig(process.cwd());

var figmaService = new FigmaApiService();

const app = express();

app.use(express.static('dist'));

app.listen(3000);

// const browser = await remote({
//   capabilities: {
//     browserName: "chrome",
//     "goog:chromeOptions": {
//       args: ["headless", "disable-gpu"],
//     },
//   },
// });

// await browser.url("http://localhost:3000/");

// let borderRadius = await browser.$(".react_button").getCSSProperty("border-radius");

// console.log(borderRadius.value);

// process.exit(0)