'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('sartfolio:employmentRouter');

const Employment = require('../model/employment.js');
const routeFunctions = require('../lib/route-functions.js');

const employmentRouter = module.exports = new Router;

employmentRouter.post('/api/employment', jsonParser, function(req, res, next) {
  debug('hit POST /api/employment route');
  // new employment(req.body).save()
  // .then(employment => res.json(employment))
  // .catch(err => {
  //   next(err);
  // })
  routeFunctions.postRoute(req, res, next, Employment);
});

employmentRouter.get('/api/employment/:id', function(req, res, next) {
  debug('hit GET /api/employment/:id route');
  // employment.findById(req.params.id)
  // .then(employment => res.json(employment))
  // .catch(next)
  routeFunctions.getSingleRoute(req, res, next, Employment);
});

employmentRouter.put('/api/employment/:id', jsonParser, function(req, res, next) {
  debug('hit PUT /api/employment route');
  // employment.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .then(employment => res.json(employment))
  // .catch( err => {
  //   if (err.name === 'ValidationError') return next(err);
  //   next(createError(404, err.message));
  // })
  routeFunctions.putRoute(req, res, next, Employment);
});

employmentRouter.delete('/api/employment/:id', function(req, res, next) {
  debug('hit DELETE /api/employment route');
  // employment.findByIdAndRemove(req.params.id)
  // .then(() => {
  //   res.status(204).send()
  // })
  // .catch(err => next(createError(404, err.message)))
  routeFunctions.deleteRoute(req, res, next, Employment);
});

employmentRouter.get('/api/employment/', function(req, res, next) {
  debug('hit GET /api/employment route');
  // employment.find({})
  // .then( employments => res.json(employments))
  // .catch(next)
  routeFunctions.getRoute(res, next, Employment);
});

module.exports = employmentRouter;
