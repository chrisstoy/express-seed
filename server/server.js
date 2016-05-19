/**
 * ExpressJS Server
 */
(function () {
	'use strict';

	var express = require('express');
	var log = require('winston');

	var path = require('path');
	var favicon = require('serve-favicon');
	var morgan = require('morgan');
	var http = require('http');

	function normalizePort(val) {
		var port = parseInt(val, 10);
		if (isNaN(port)) {
			return val;
		}
		if (port >= 0) {
			return port;
		}
		return false;
	}

///////////////////////////////////////
// initialize the Express app
	log.info("-------------------------");
	log.info("Initializing Server...");
	log.info("-------------------------");

	var app = express();

	var isProduction = (app.get('NODE_ENV') === 'production');

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// set up the server view engine and path (ie, pages outside of the client)
	var serverViewsPath = path.join(__dirname, '/');
	log.info('serving view from: ', serverViewsPath);
	app.set('views', serverViewsPath);
	app.set('view engine', 'ejs');

	var port = normalizePort(process.env.PORT || '3000');
	app.set('port', port);

	var clientPath = path.join(__dirname, (isProduction ? '../client/dist' : '../client/app'));
	log.info("serving client from: ", clientPath);
	app.use(express.static(clientPath));

	// set the global error handler
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: (isProduction ? {} : err )
		});
	});

	//app.use(favicon(clientPath, 'favicon.ico'));
	app.use(morgan( isProduction ? 'combined' : 'dev'));

	///////////////////////////////////////
	// Create HTTP server to serve user requests
	var server = http.createServer(app);
	var serverUtils = require('./server-utils')(app, server);

	server.listen(port);
	server.on('error', serverUtils.onError);
	server.on('listening', serverUtils.onListening);

})();