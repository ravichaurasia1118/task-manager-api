var debug = require('debug')(`${process.env.APP_NAME}:server`);
exports.normalizePort = (val) => {
   var port = parseInt(val, 10);
   if (isNaN(port)) {
      return val;
   }
   if (port >= 0) {
      return port;
   }
   return false;
}

exports.onError = (error) => {
   if (error.syscall !== 'listen') {
      throw error;
   }
   var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use');
         process.exit(1);
         break;
      default:
         throw error;
   }
}

exports.onListening = (server) => {
   var addr = server.address();
   var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
   debug('Listening on ' + bind);
}

