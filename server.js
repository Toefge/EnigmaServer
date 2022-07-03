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