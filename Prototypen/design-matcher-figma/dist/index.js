#!/usr/bin/env node
import { FigmaApiService } from "./services/FigmaApiService.js";
import express from "express";
import * as dotenv from "dotenv";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FigmaFileHelper } from "./helpers/FigmaFileHelper.js";
import yargs from "yargs"; // findConfig(process.cwd());
const options = yargs(process.argv.slice(2)).option("f", { alias: "file", describe: "Figma file to read out", type: "string", demandOption: true }).help(true).argv;
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var figmaService = new FigmaApiService();
const app = express();
// app.use(express.static('src/website'));
app.get("/authenticated", async (req, res) => {
    res.sendFile(path.join(__dirname + "/authenticated.html"));
    if (figmaService.state === Number(req.query.state)) {
        figmaService.setCode(req.query.code.toString());
    }
    await figmaService.getAccessToken();
    var file = await figmaService.findFile(options.file);
    const fileHelper = new FigmaFileHelper(file);
    fileHelper.findTestableNodes();
});
app.listen(3000);
await figmaService.authenticate();
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
//# sourceMappingURL=index.js.map