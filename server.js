const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 4200;

const server = createServer(app);
const wss = new WebSocket.Server({ server });

var clients = [];

wss.on('connection', function connection(ws) {
  if (clients.length >= 2) {

    ws.close();
    console.log("Refused connection. Already two clients connected.");

  } else {

    console.log("client joined.");
    clients.push(ws);

    ws.on('message', function message(data) {
      console.log("Message recieved from client: " + data.toString());

      clients.forEach(connection => {
        if(connection != ws)
        {
          console.log("send message to other client: " + data.toString());
          connection.send(data.toString());
          
        }else if(clients.length == 1)
        {
          console.log("send message to same client: " + data.toString());
          connection.send(data.toString());
        }
      });
    });

    ws.on('close', function () {
      console.log("client left.");

      if(clients.length == 2)
      {
        clients.forEach(connection => {
          if(connection != ws)
          {
            console.log("One of two clients left. End EncryptionState.");
            connection.send("EndEncryption");
          }
        });
      }

      clients = clients.filter((client) => {
        client != ws;
      })
    });

    ws.send("Greetings from the server!");

    if(clients.length == 2)
    {
      console.log("Two clients connected. Send message to start encryption.");
      clients.forEach(connection => {
        connection.send('StartEncryption');
      });
    }

  }
});

server.listen(port, function () {
  console.log(`Listening on Port: ${port}`);
});
