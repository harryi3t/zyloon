/**
 * We load mongoose
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-autoinc');
var connection = mongoose.connect('mongodb://127.0.0.1:27017/zyloon');

/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
var db = mongoose.connection;

console.log('Trying to connect to MongoDB via Mongoose ...');

autoIncrement.initialize(connection, mongoose);

db.on('error', console.error.bind(console, 'Mongoose connection error:'));

db.once('open', function callback() {

    console.log('Connected to MongoDB !\n\n');

});

/**
 * Let's make our Mongodb Schemas/Models
 */

module.exports = {

    ExpenseModel: require('../models/Expense.js')(mongoose)

}