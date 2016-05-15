'use strict';

module.exports = getS;

var async = require('async');

var expenseModel = require('./Model.js');

function getS(req, res) {
  var bag = {
    resBody: [],
  };

  bag.who = 'expense|getS';
  console.log(bag.who, 'Starting');

  async.series([
      _mongoQuery.bind(null, bag),
    ],
    function (err) {
      console.log(bag.who, 'Completed');
      if (err)
        return res.err(err);
      return res.json(bag.resBody);
    }
  );
}

function _mongoQuery(bag, next) {
  var who = bag.who + '|' + _mongoQuery.name;
  console.log(who, 'Inside');

  expenseModel.find({},
    function (err, expenses) {
      bag.resBody = expenses;
      return next(err);
    }
  );
}