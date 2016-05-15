'use strict';

var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true
  },
  date: {
    type: Date, require: true
  },
  type: {
    type: String,
    enum: ['cash', 'credit'],
    require: true
  },
  amount: {
    type: Number,
    require: true
  }
});

var expenseModel = mongoose.model('expense', expenseSchema);

module.exports = expenseModel;