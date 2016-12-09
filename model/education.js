'use strict';

const mongoose = require('mongoose');

const Education = new mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true},
  degree: {type: String, required: true},
  graduationYear: {type: String, required: true},
  honors: {type: Array}
});

module.exports = mongoose.model('education', Education);
