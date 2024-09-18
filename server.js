'use strict';

import express from 'express';
import pkg from 'colors';
const { green } = pkg;
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Configure the express application
import configureExpress from './configuration/express.js';

configureExpress(app);

// Listening to SERVER
app.listen(process.env.PORT, () => {
    console.log(green(`Listening to port running ${process.env.PORT}`));
});