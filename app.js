// importa el servidor
require( 'dotenv' ).config();
const Server = require( './models/server' );

// carga y escucha el servidor
const server = new Server();
server.listen();