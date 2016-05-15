'use strict';

module.exports = expenseRoutes;

function expenseRoutes(app) {
  app.get('/api/expense', require('./getS.js'));
  app.post('/api/expense', require('./post.js'));
}