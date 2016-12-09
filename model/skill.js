'use strict';

const mongoose = require('mongoose');

const Skill = new mongoose.Schema({
  name: {type: String, required: true},
  skillLevel: {type: String}
});

module.exports = mongoose.model('skill', Skill);
