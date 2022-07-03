const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 4200;

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) 
{
  console.log("client joined.");

  ws.on('message', function (data) 
  {
    console.log("Message revieved from client: " + data.toString());
  });

  ws.on('close', function () 
  {
    console.log("client left.");
  });
});

server.listen(port, function () {
  console.log(`Listening on Port: ${port}`);
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