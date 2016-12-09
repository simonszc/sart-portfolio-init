'use strict';

const mongoose = require('mongoose');

const Presence = new mongoose.Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  description: {type: String}
});

module.exports = mongoose.model('presence', Presence);
