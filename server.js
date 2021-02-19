// var express = require('express');
// var app = express();
const port = process.env.PORT || 8080;
const WebSocket = require('ws');
// const server = require('http').createServer(app);
// const wss = new WebSocket.Server({ server });
const wss = new WebSocket.Server({
    port: port
  });
// console.log(server);
wss.on('connection', function connection(ws) {
    console.log('New Client Joined');
    ws.on('message', function incoming(message) {
      console.log('received:');
      console.log(message);
      // ws.send('Get Your Msg');
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
    
});

// app.get('/',  (req, res) => {
//   res.send('Hello World!');
// });
// app.listen(port,  () => {
//   console.log('Example app listening on port 3000!');
// });
console.log("WS port : "+port);
