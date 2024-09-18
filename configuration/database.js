'use strict';

import colors from 'colors';
import dotenv from 'dotenv'
dotenv.config();
import { createConnection, set, Schema, Types } from "mongoose";

const connectionString = process.env.MONGOURI;
const connection = createConnection(connectionString);

connection.on('error', () => {

  console.error(colors.bgRed('Mongo database connection error when connecting to ' + connectionString + '...'));
});

connection.once('open', () => {
  console.log(colors.green('Mongo database connection opened for: ' + connectionString));
  set('autoIndex', false);
});

const enheduNewsConnection = connection.useDb(process.env.DB_NAME);

function addModel(schemaName, schema, collectionName) {
  return enheduNewsConnection.model(schemaName, schema, collectionName);
}
function getModel(schemaName) {
  return enheduNewsConnection.model(schemaName);
}

export { Types, addModel, getModel, Schema };
