const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 4200;

const server = createServer(app);
const wss = new WebSocket.Server({ server });

var clients = [];

wss.on('connection', function (ws) {
  if (clients.length >= 2) {

    ws.close();

  } else {

    console.log("client joined.");
    clients.push(ws);

    ws.on('message', function (data) {
      console.log("Message revieved from client: " + data.toString());

      //TODO Damit nur der andere client informiert wird, muss man hier ungleich dem eigenen Client prüfen!
      clients.forEach(connection => {
        if(connection != ws)
        {
          console.log("send message to other client: " + data.toString());
          connection.send(data.toString());
          
        }else if(clients.length == 1)
        {
          console.log("send message to back to me: " + data.toString());
          connection.send(data.toString());
        }
      });
    });

    ws.on('close', function () {
      console.log("client left.");
      clients = clients.filter((client) => {
        client != ws;
      })
    });

  }
});

server.listen(port, function () {
  console.log(`Listening on Port: ${port}`);
});
