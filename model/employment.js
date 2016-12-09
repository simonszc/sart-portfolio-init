'use strict';

const mongoose = require('mongoose');

const Employment = new mongoose.Schema({
  name: {type: String, required: true},
  title: {type: String, true},
  location: {type: String},
  startDate: {type: String},
  endDate: {type: String},
  description: {type: Array}
});

module.exports = mongoose.model('employment', Employment);
