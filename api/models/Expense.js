/**
 * Expense.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var schema = new mongoose.Schema({

        category: {
            type: String
        },

        date: {
            type: Date
        },

        type: {
            type: String,
            enum: ['cash', 'credit']
        },

        amount: {
            type: Number
        }

    });

    return mongoose.model('Expense', schema);

};
