const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('sartfolio:presenceRouter');

const Presence = require('../model/presence.js');
const routeFunctions = require('../lib/route-functions.js');

const presenceRouter = module.exports = new Router;

presenceRouter.post('/api/presence', jsonParser, function(req, res, next) {
  debug('hit POST /api/presence route');
  // new presence(req.body).save()
  // .then(presence => res.json(presence))
  // .catch(err => {
  //   next(err);
  // })
  routeFunctions.postRoute(req, res, next, Presence);
});

presenceRouter.get('/api/presence/:id', function(req, res, next) {
  debug('hit GET /api/presence/:id route');
  // presence.findById(req.params.id)
  // .then(presence => res.json(presence))
  // .catch(next)
  routeFunctions.getSingleRoute(req, res, next, Presence);
});

presenceRouter.put('/api/presence/:id', jsonParser, function(req, res, next) {
  debug('hit PUT /api/presence route');
  // presence.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .then(presence => res.json(presence))
  // .catch( err => {
  //   if (err.name === 'ValidationError') return next(err);
  //   next(createError(404, err.message));
  // })
  routeFunctions.putRoute(req, res, next, Presence);
});

presenceRouter.delete('/api/presence/:id', function(req, res, next) {
  debug('hit DELETE /api/presence route');
  // presence.findByIdAndRemove(req.params.id)
  // .then(() => {
  //   res.status(204).send()
  // })
  // .catch(err => next(createError(404, err.message)))
  routeFunctions.deleteRoute(req, res, next, Presence);
});

presenceRouter.get('/api/presence/', function(req, res, next) {
  debug('hit GET /api/presence route');
  // presence.find({})
  // .then( presences => res.json(presences))
  // .catch(next)
  routeFunctions.getRoute(res, next, Presence);
});

module.exports = presenceRouter;
