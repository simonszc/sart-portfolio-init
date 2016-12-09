'use strict';

const mongoose = require('mongoose');

const Info = new mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String},
  email: {type: String},
  phoneNumber: {type: String},
  linkedIn: {type: String},
  gitHub: {type: String},
  statement: {type: String}
});

module.exports = mongoose.model('info', Info);
