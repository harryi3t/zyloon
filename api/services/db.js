/**
 * We load mongoose
 */
var DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/zyloon';
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-autoinc');
var connection = mongoose.connect(DB_URL);

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