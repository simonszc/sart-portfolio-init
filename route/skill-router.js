const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('sartfolio:skillRouter');

const Skill = require('../model/skill.js');
const routeFunctions = require('../lib/route-functions.js');

const skillRouter = module.exports = new Router;

skillRouter.post('/api/skill', jsonParser, function(req, res, next) {
  debug('hit POST /api/skill route');
  // new skill(req.body).save()
  // .then(skill => res.json(skill))
  // .catch(err => {
  //   next(err);
  // })
  routeFunctions.postRoute(req, res, next, Skill);
});

skillRouter.get('/api/skill/:id', function(req, res, next) {
  debug('hit GET /api/skill/:id route');
  // skill.findById(req.params.id)
  // .then(skill => res.json(skill))
  // .catch(next)
  routeFunctions.getSingleRoute(req, res, next, Skill);
});

skillRouter.put('/api/skill/:id', jsonParser, function(req, res, next) {
  debug('hit PUT /api/skill route');
  // skill.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .then(skill => res.json(skill))
  // .catch( err => {
  //   if (err.name === 'ValidationError') return next(err);
  //   next(createError(404, err.message));
  // })
  routeFunctions.putRoute(req, res, next, Skill);
});

skillRouter.delete('/api/skill/:id', function(req, res, next) {
  debug('hit DELETE /api/skill route');
  // skill.findByIdAndRemove(req.params.id)
  // .then(() => {
  //   res.status(204).send()
  // })
  // .catch(err => next(createError(404, err.message)))
  routeFunctions.deleteRoute(req, res, next, Skill);
});

skillRouter.get('/api/skill/', function(req, res, next) {
  debug('hit GET /api/skill route');
  // skill.find({})
  // .then( skills => res.json(skills))
  // .catch(next)
  routeFunctions.getRoute(res, next, Skill);
});

module.exports = skillRouter;
