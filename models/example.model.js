'use strict';

import { Schema, addModel, getModel } from "../configuration/database.js";


const exampleUser = new Schema({
  first_name: { type: String, required: true , index: true},
  last_name: { type: String, required: true,},
  email: { type: String, unique: true , required: true},
  password: { type: String, required: true },


});

addModel('User', exampleUser, 'user');
const User = getModel('User');

export default User;