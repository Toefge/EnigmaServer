const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT;

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws) {
  console.log("client joined.");

  // send "hello world" interval
  const textInterval = setInterval(() => ws.send("hello world!"), 100);

  // send random bytes interval
  const binaryInterval = setInterval(() => ws.send(crypto.randomBytes(8).buffer), 110);

  ws.on('message', function(data) {
    if (typeof(data) === "string") {
      // client sent a string
      console.log("string received from client -> '" + data + "'");

    } else {
      console.log("binary received from client -> " + Array.from(data).join(", ") + "");
    }
  });

  ws.on('close', function() {
    console.log("client left.");
    clearInterval(textInterval);
    clearInterval(binaryInterval);
  });
});

server.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`);
});

/*
const WebSocket = require('wss')

const wss = new WebSocket.Server({ port: 4200 },()=>
{
    console.log('server started')
})

wss.on('connection', function connection(ws) 
{
   ws.on('message', (data) => 
   {
      console.log('data received: ' + data.toString())
      ws.send(data.toString());
   })
})

wss.on('listening',()=>
{
   console.log('listening on 4200')
})
*/