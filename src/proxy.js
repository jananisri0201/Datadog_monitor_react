// Listen on a specific host via the HOST environment letiable
let host = '127.0.0.1' || '0.0.0.0';
// Listen on a specific port via the PORT environment letiable
let port = process.env.PORT || 8080;

const corsProxy = require('cors-anywhere');
corsProxy.createServer({
    originWhitelist: ['http://127.0.0.1:3000'], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});