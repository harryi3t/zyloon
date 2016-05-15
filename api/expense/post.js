'use strict';

module.exports = post;

var async = require('async');
var Model = require('./Model.js');

function post(req, res) {
  console.log('req', req.body);
  var bag = {
    reqBody: req.body,
    resBody: {},
    who: 'expense|post'
  };

  async.series([
      _checkInputParams.bind(null, bag),
      _post.bind(null, bag)
    ],
    function (err) {
      if (err)
        return res.status(500).json(err);
      return res.json(bag.resBody);
    }
  );
}

function _checkInputParams(bag, next) {
  if (!bag.reqBody)
    return next('body not found');
  if(!bag.reqBody.category)
    return next('category not found');
  if(!bag.reqBody.date)
    return next('date not found');
  if(!bag.reqBody.type)
    return next('type not found');
  if(!bag.reqBody.amount)
    return next('amount not found');
  return next();
}

function _post(bag, next) {
  var who = bag.who + '|' + _post.name;
  console.log('Inside', who);

  Model.create(bag.reqBody,
    function (err, expense) {
      console.log('err',expense);
      console.log('expense',expense);
      if(err)
        return next(err);

      bag.resBody = expense;
      return next();
    }
  );
}