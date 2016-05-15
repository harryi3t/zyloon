/**
 * ExpenseController
 *
 * @description :: Server-side logic for managing Expenses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var db = require('../services/db.js');

var mongoose = require('mongoose');

var expense = mongoose.model('Expense');

module.exports = {

    create: function(req, res) {
        var params = req.body;
        try {
            // var expense = db.ExpenseModel(params);
            console.log(JSON.stringify(params,null,1));
            expense.create(params, function(err, result) {
                if (err)
                    return res.json(400, { success: false, error: err });
                return res.json(201, { success: true, result: result });
            });
        } catch (exception) {
            return res.json(500, { success: true, exception: exception });
        }
    },

    find: function(req, res) {
        var params = {};
        var id = req.param('id');
        params._id = id;
        if (id) {
            try {
                expense.findOne(params, function(err, result) {
                    if (err)
                        return res.json(400, { success: false, error: err });
                    return res.json(200, { success: true, result, result });
                });
            } catch (exception) {
                return res.json(500, { success: true, exception: exception });
            }
        } else {
            try {
                expense.find({}).exec(function(err, result) {
                    if (err)
                        return res.json(400, { success: false, error: err });
                    return res.json(200, { success: true, result: result });
                });
            } catch (exception) {
                return res.json(500, { success: true, exception: exception });
            }
        }

    },

    update: function(req, res) {
        var upadteObject = req.body;
        var whereObject = {};
        var id = req.param('id');
        whereObject._id = id;
        var options = {};
        options.new = true;
        if (!id)
            return res.json(400, { success: false, message: "Please give id" });
        try {
            expense.findOneAndUpdate(whereObject, upadteObject, options, function(err, result) {
                if (err)
                    return res.json(400, { success: false, error: err });
                return res.json(200, { success: true, result: result });
            });
        } catch (exception) {
            return res.json(500, { success: true, exception: exception });
        }
    },

    delete: function(req, res) {
        var params = {};
        params._id = req.param('id');
        try {
            var expense = db.ExpenseModel(params);
            expense.remove(function(err, result) {
                if (err)
                    return res.json(400, { success: false, error: err });
                return res.json(200, { success: true, result: result });
            });
        } catch (exception) {
            return res.json(500, { success: true, exception: exception });
        }
    }

};
