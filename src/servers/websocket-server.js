const wsModule = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new wsModule.WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log(`received: ${data}`);
    ws.send(JSON.stringify(`Thanks for the ${data}`));
  });
});

server.listen(6789);