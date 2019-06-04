const http = require('http');
const app = require('../app');

const port = process.env.PORT || 3002;

const server = http.createServer(app);

server.on('clientError', (err, socket) => {
  console.log('Server: clientError', err);
  socket.end('HTTP/1.1 400 Bad request\r\n\r\n');
});

server.listen(port, () => {
  console.log(`User service is running on http://localhost:${port}`);
});
