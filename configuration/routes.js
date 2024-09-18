"use strict";
import path from "path";
import globArray from "glob-array";
import colors from "colors";
import { fileURLToPath, pathToFileURL } from 'url';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export default function (app) {
  console.log(colors.yellow("Loading Server Routes files"));
  loadApiRoutes(app);
};

function loadApiRoutes(app) {
  //Locate the routes files using the glob-array module
  const routesFiles = globArray.sync([
    path.join(__dirname, "../routes/*.routes.js"),
  ]);

  routesFiles.forEach(async function (routePath) {
    console.log(colors.cyan(path.basename(routePath)));
    import(pathToFileURL(routePath))
    .then((module) => module.default(app))
    .catch((error) => {
      throw error
    })
  })
}
