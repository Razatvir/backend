'use strict';
import compression from 'compression';
import colors from 'colors';
import body from 'body-parser';
const { urlencoded, json } = body;
import cors from "cors";
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initialise as initialiseMongoose } from './mongoose.js';
import configureRoutes from './routes.js';
dotenv.config()

export default function (app) {
  const env = process.env.ENVIRONMENT;
  console.log(colors.blue('Starting server in ' + env + ' environment'));

  //Setting application local variables
  app.locals.env = env;
  app.use(compression());
  app.use(urlencoded({ extended: false, limit: '5mb' }));
  const corsConfig = {
    credentials: true,
    origin: true,
  };
  app.use(cors(corsConfig));
  app.use(json({ limit: '5mb' }));
  app.disable('x-powered-by');
  app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'));

  initialiseMongoose(); //Import all of the Mongo models
  console.log("yyyyyyyyyyyyyyy")

  configureRoutes(app); //Import all of the routes

  //import('../crons/example.cron.js'); if you want to add cron job.


  app.use(function (err, req, res, next) {
    if (!err) {
      return next();
    }
  });
};