/**
 * Created by cstoy on 5/19/2016.
 */

var log = require('winston');

var serverUtils = function(app, server) {

	return {

		/**
		 * Event listener for HTTP server "error" event.
		 */
		onError: function (error) {
			if (error.syscall !== 'listen') {
				throw error;
			}

			var port = app.get('port');
			var bind = typeof port === 'string'
				? 'Pipe ' + port
				: 'Port ' + port;

			// handle specific listen errors with friendly messages
			switch (error.code) {
				case 'EACCES':
					log.error(bind + ' requires elevated privileges');
					process.exit(1);
					break;
				case 'EADDRINUSE':
					log.error(bind + ' is already in use');
					process.exit(1);
					break;
				default:
					throw error;
			}
		},

		/**
		 * Event listener for HTTP server "listening" event.
		 */
		onListening: function () {
			var addr = server.address();
			var bind = typeof addr === 'string'
				? 'pipe ' + addr
				: 'port ' + addr.port;
			log.info('- server is listening on port', bind);
		}
	}
};

module.exports = serverUtils;