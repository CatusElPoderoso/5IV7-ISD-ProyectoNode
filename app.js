
// dotenv
require( 'dotenv' ).config();
const Server = require( './models/server' );

// servidor
const server = new Server();
server.listen();