const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('sartfolio:infoRouter');

const Info = require('../model/info.js');
const routeFunctions = require('../lib/route-functions.js');

const infoRouter = module.exports = new Router;

infoRouter.post('/api/info', jsonParser, function(req, res, next) {
  debug('hit POST /api/info route');
  // new info(req.body).save()
  // .then(info => res.json(info))
  // .catch(err => {
  //   next(err);
  // })
  routeFunctions.postRoute(req, res, next, Info);
});

infoRouter.get('/api/info/:id', function(req, res, next) {
  debug('hit GET /api/info/:id route');
  // info.findById(req.params.id)
  // .then(info => res.json(info))
  // .catch(next)
  routeFunctions.getSingleRoute(req, res, next, Info);
});

infoRouter.put('/api/info/:id', jsonParser, function(req, res, next) {
  debug('hit PUT /api/info route');
  // info.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .then(info => res.json(info))
  // .catch( err => {
  //   if (err.name === 'ValidationError') return next(err);
  //   next(createError(404, err.message));
  // })
  routeFunctions.putRoute(req, res, next, Info);
});

infoRouter.delete('/api/info/:id', function(req, res, next) {
  debug('hit DELETE /api/info route');
  // info.findByIdAndRemove(req.params.id)
  // .then(() => {
  //   res.status(204).send()
  // })
  // .catch(err => next(createError(404, err.message)))
  routeFunctions.deleteRoute(req, res, next, info);
});

infoRouter.get('/api/info/', function(req, res, next) {
  debug('hit GET /api/info route');
  // info.find({})
  // .then( infos => res.json(infos))
  // .catch(next)
  routeFunctions.getRoute(res, next, Info);
});

module.exports = infoRouter;
