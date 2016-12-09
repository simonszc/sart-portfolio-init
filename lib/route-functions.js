'use strict';

const debug = require('debug')('sartfolio:routerFunctions');

module.exports.postRoute = function(req, res, next, model) {
  let tempModel = new model(req.body);
  new model(req.body).save()
  .then(data => res.json(data))
  .catch(err => {
    next(err);
  })
};

module.exports.getRoute = function(res, next, model) {
  model.find({})
  .then(data => res.json(data))
  .catch(next)
};

module.exports.getSingleRoute = function(req, res, next, model) {
  model.findById(req.params.id)
  .then(model => res.json(model))
  .catch(next)
};

module.exports.putRoute = function(req, res, next, model) {
  model.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(data => res.json(data))
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  })
};

module.exports.deleteRoute = function(req, res, next, model) {
  model.findByIdAndRemove(req.params.id)
  .then(() => {
    res.status(204).send()
  })
  .catch(err => next(createError(404, err.message)))
};
