'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('sartfolio:projectRouter');

const Project = require('../model/project.js');
const routeFunctions = require('../lib/route-functions.js');

const projectRouter = module.exports = new Router;

projectRouter.post('/api/project', jsonParser, function(req, res, next) {
  debug('hit POST /api/project route');
  // new Project(req.body).save()
  // .then(project => res.json(project))
  // .catch(err => {
  //   next(err);
  // })
  routeFunctions.postRoute(req, res, next, Project);
});

projectRouter.get('/api/project/:id', function(req, res, next) {
  debug('hit GET /api/project/:id route');
  // Project.findById(req.params.id)
  // .then(project => res.json(project))
  // .catch(next)
  routeFunctions.getSingleRoute(req, res, next, Project);
});

projectRouter.put('/api/project/:id', jsonParser, function(req, res, next) {
  debug('hit PUT /api/project route');
  // Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .then(project => res.json(project))
  // .catch( err => {
  //   if (err.name === 'ValidationError') return next(err);
  //   next(createError(404, err.message));
  // })
  routeFunctions.putRoute(req, res, next, Project);
});

projectRouter.delete('/api/project/:id', function(req, res, next) {
  debug('hit DELETE /api/project route');
  // Project.findByIdAndRemove(req.params.id)
  // .then(() => {
  //   res.status(204).send()
  // })
  // .catch(err => next(createError(404, err.message)))
  routeFunctions.deleteRoute(req, res, next, Project);
});

projectRouter.get('/api/project/', function(req, res, next) {
  debug('hit GET /api/project route');
  // Project.find({})
  // .then( projects => res.json(projects))
  // .catch(next)
  routeFunctions.getRoute(res, next, Project);
});

module.exports = projectRouter;
