const path = require('path');
const express = require('express');
const app = express();

const ws = require('ws');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
const server = app.listen(4001);

const wss = new ws.Server({ server: server});
//const wss = new ws.Server({ port: 4000});
//const wss = new ws.Server({ host:'localhost', port: 4000});
// backlog : waiting room
// wss.clients all connected client

//console.log(wss.address());
//console.log(wss.clients);
wss.on('connection', (socket, req) => {
  console.log("a socket is connected");
  socket.on('message', (data, isBinary) => {
    const msg = isBinary ? data : data.toString();
    console.log(msg);
  })
  socket.send('hello welcome !');
});

// wss.on('headers', (headers, req) => {
//     console.log(headers);
// })

wss.on('listening', () => {
  console.log('wss is listening')
})