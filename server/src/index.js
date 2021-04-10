import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const ss = require('socket.io-stream');

const PORT = process.env.PORT;
const HOST = '127.0.0.1';

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (client) => {
  console.log('client connected');
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
  client.emit('server_setup', `Server connected [id=${client.id}]`);

  // when the client sends 'stream' events
  ss(client).on('stream', (stream, data) => {
    // get the name of the stream
    const filename = path.basename(data.name);
    // pipe the filename to the stream
    stream.pipe(fs.createWriteStream(filename));

    //TODO Pipe this stream to MQTT
  });
});

server.listen(PORT, HOST, () =>
  console.log(`Example app listening on host ${HOST} and port ${PORT}!`)
);
