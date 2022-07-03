const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 4200;

const server = createServer(app);
const wss = new WebSocket.Server({ server });

var clients = [];

wss.on('connection', function (ws) 
{
  console.log("client joined.");
  clients.push(ws);

  ws.on('message', function (data) 
  {
    console.log("Message revieved from client: " + data.toString());

    //TODO Damit nur der andere client informiert wird, muss man hier ungleich dem eigenen Client prüfen!
    clients.forEach(connection => {
      console.log("send message back: " + data.toString());
      connection.send(data.toString());
    });
  });

  ws.on('close', function () 
  {
    console.log("client left.");
    clients = clients.find(client => !(client.equals(ws)));
  });
});

server.listen(port, function () {
  console.log(`Listening on Port: ${port}`);
});
