const path = require('path');
const express = require('express');
const app = express();

const ws = require('ws');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
const server = app.listen(4001);

const wss = new ws.Server({ server: server});

wss.on('connection', (socket, req) => {
	console.log("a socket is connected");
	socket.on('message', (data, isBinary) => {
		const msg = isBinary ? data : data.toString();
		//console.log(msg);

		// broadcast
		const clients = wss.clients;
		for (let client of clients) {
			//console.log(client);
			if (client !== socket && client.readyState === ws.OPEN) {
				client.send(msg);
			}
		}
	})

	// heartbeat
	// setInterval(() => {
	// 	socket.ping("ping", false, () => {
	// 		console.log("ping");
	// 	}, 1000);
	// });
	
	// socket.on('pong', (msg) => {
	// 	console.log('pong: ', msg.toString());
	// })
});



