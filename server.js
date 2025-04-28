const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const ws = require('ws');

const image = fs.readFileSync('./images/picture.png');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
const server = app.listen(4001);

const wss = new ws.Server({ server: server});

wss.on('connection', (socket, req) => {
	socket.send(image, { binary: true })
});



