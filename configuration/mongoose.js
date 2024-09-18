'use strict';

import path from 'path';
import globArray from 'glob-array';
import colors from 'colors';
import dotenv from 'dotenv'
import { fileURLToPath, pathToFileURL } from 'url';
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initialise() {
    registerSchemas();
}

function registerSchemas() {
    // We need to make sure that the root path is used as it is different depending on whether
    // the application is runner from server.js or from specApi.js
    const schemaPath = path.join(__dirname, '../models', '*.model.js');
    const mongoSchemas = globArray.sync([schemaPath]);

    console.log(colors.yellow('Loading Mongo DB Schemas for: ' + process.env.DB_NAME + ' database'));
    mongoSchemas.forEach(async function (routePath) {
        console.log(colors.cyan(path.basename(routePath)));
        await import(pathToFileURL(routePath));
    });
}

function isValidId(id) {
    if (!id) {
        return false;
    }
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return true;
    }

    return false;
}

export { isValidId, initialise }