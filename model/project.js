'use strict';

const mongoose = require('mongoose');

const Project = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: String, required: true},
  link: {type: String, required: true},
  description: {type: Array, required: true}
});

module.exports = mongoose.model('project', Project);
