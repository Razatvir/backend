'use strict';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (app) {
    const controller = await import(pathToFileURL(path.join(__dirname, '../controllers/example_login.controller.js')));
    app.post("/api/login", controller.login)
};
