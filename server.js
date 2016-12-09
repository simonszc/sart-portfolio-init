'use strict';

const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('sartfolio:server');

const errorMiddleware = require('./lib/error-middleware.js');

const projectRouter = require('./route/project-router.js');
const skillRouter = require('./route/skill-router.js');
const presenceRouter = require('./route/presence-router.js');

const MONGODB_URI = 'mongodb://localhost/folio-dev';
const PORT = process.env.PORT || 3000;
const app = express();

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());

app.use(projectRouter);
app.use(skillRouter);
app.use(presenceRouter);

app.use(errorMiddleware);

const server = module.exports = app.listen(PORT, function() {
  debug(`server up on ${PORT}`);
});

server.isRunning = true;
