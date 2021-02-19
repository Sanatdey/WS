// var express = require('express');
// var app = express();
const port = process.env.PORT || 8080;
const WebSocket = require('ws');
// const server = require('http').createServer(app);
// const wss = new WebSocket.Server({ server });
const wss = new WebSocket.Server({
    port: port,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed.
    }
  });
// console.log(server);
wss.on('connection', function connection(ws) {
    console.log('New Client Joined');
    ws.send('Client Connected');
    ws.on('message', function incoming(message) {
      console.log('received:');
      console.log(message);
      ws.send('Get Your Msg');
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
