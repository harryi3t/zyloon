var mongoose = require('mongoose');
var async = require('async');
var express = require('express');
var glob = require('glob');

var app = express();
var DB_URL = process.env.DB_URL || 'localhost/zyloon';

function createExpressApp() {
  async.series([
      _setupMiddlewares,
      _connectToMongo,
      _requireRoutes,
      _startListening
    ],
    function (err) {
      if (err)
        console.log('Error:', err);
    }
  );
}

function _setupMiddlewares(next) {
  var who = 'app.js|' + _setupMiddlewares.name;
  console.log('Inside', who);

  app.use(require('body-parser').json());

  return next();
}

function _connectToMongo(next) {
  var who = 'app.js|' + _connectToMongo.name;
  console.log('Inside', who);

  mongoose.connect(DB_URL, {},
    function (err) {
      if (!err)
        console.log('MongoDB: ' + DB_URL + ' connected.');
      return next(err);
    }
  );
}

function _requireRoutes(next) {
  var who = 'app.js|' + _requireRoutes.name;
  console.log('Inside', who);

  glob.sync( './api/**/Route.js').forEach(
    function (routeFile) {
      console.log('requiring', routeFile);
      require(routeFile)(app);
    }
  );

  app.use(express.static(__dirname + '/www/'));
  app.use(express.static(__dirname + '/bower_components/'));

  app.get('/bower_components/*', function (req, res, next) {
    res.sendFile(__dirname + '/' + req.path);
  });
  app.get('/static/*', function (req, res, next) {
    res.sendFile(__dirname + '/www/' + req.path);
  });

  return next();
}

function _startListening(next) {
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    return next();
  });
}

createExpressApp();