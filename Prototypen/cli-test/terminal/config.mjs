import fs from "fs";

export function findConfig(dir) {
  var files = fs.readdirSync(dir);
  console.log(files)
  console.log(dir)
  if(files.includes('mystique.config.jsx')) {
    console.log("Found a config!");
    var config = import("file://" + dir + "/mystique.config.js");
    return config;
  }
}