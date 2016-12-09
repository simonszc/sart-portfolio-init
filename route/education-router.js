'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('sartfolio:educationRouter');

const Education = require('../model/education.js');
const routeFunctions = require('../lib/route-functions.js');

const educationRouter = module.exports = new Router;

educationRouter.post('/api/education', jsonParser, function(req, res, next) {
  debug('hit POST /api/education route');
  // new education(req.body).save()
  // .then(education => res.json(education))
  // .catch(err => {
  //   next(err);
  // })
  routeFunctions.postRoute(req, res, next, Education);
});

educationRouter.get('/api/education/:id', function(req, res, next) {
  debug('hit GET /api/education/:id route');
  // education.findById(req.params.id)
  // .then(education => res.json(education))
  // .catch(next)
  routeFunctions.getSingleRoute(req, res, next, Education);
});

educationRouter.put('/api/education/:id', jsonParser, function(req, res, next) {
  debug('hit PUT /api/education route');
  // education.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .then(education => res.json(education))
  // .catch( err => {
  //   if (err.name === 'ValidationError') return next(err);
  //   next(createError(404, err.message));
  // })
  routeFunctions.putRoute(req, res, next, Education);
});

educationRouter.delete('/api/education/:id', function(req, res, next) {
  debug('hit DELETE /api/education route');
  // education.findByIdAndRemove(req.params.id)
  // .then(() => {
  //   res.status(204).send()
  // })
  // .catch(err => next(createError(404, err.message)))
  routeFunctions.deleteRoute(req, res, next, Education);
});

educationRouter.get('/api/education/', function(req, res, next) {
  debug('hit GET /api/education route');
  // education.find({})
  // .then( educations => res.json(educations))
  // .catch(next)
  routeFunctions.getRoute(res, next, Education);
});

module.exports = educationRouter;
