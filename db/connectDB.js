const mongoose = require("mongoose");
const config = require("../config/config.js");

// console.log(config.dbUrl());

mongoose
  .connect(config.dbUrl(), {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log("not connected to db", err));

module.exports = { mongoose };

//exports.mongoose = mongoose
// import mongoose from './connectdb.js';
