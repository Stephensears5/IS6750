const http = require("http");
const routes = require('./routes');
const server = http.createServer(routes.handler);
//3000 = port we're running on.
server.listen(3000);
