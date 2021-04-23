import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const { Readable } = require('stream');
const wav = require('node-wav');
let socketClient;
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const ss = require('socket.io-stream');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// MQTT
const mqtt = require('mqtt');
const mqtt_options = {
  host: 'rhasspy',
  port: 12183,
  protocol: 'mqtt',
};

var mqtt_client = mqtt.connect(mqtt_options);

/////// Subscription Test - topic: audioFrame
mqtt_client.subscribe('hermes/audioServer/default/audioFrame', function (err) {
  if (!err) {
    console.log('subscribe to rhasspy MQTT success');
    socketClient
      ? client.emit('mqtt_setup', `MQTT subscription: successfull`)
      : null;
  } else {
    console.log(err);
    if (socketClient)
      socketClient
        ? client.emit('mqtt_setup', `MQTT subscription: ${err}`)
        : null;
  }
});

// When audioFrame is published  - you get message here
mqtt_client.on('message', function (topic, message) {
  // message is Buffer
  // console.log('topic: ' + topic.toString());
  // console.log('message: ' + Buffer.from(message));
});
///////

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World Sonja!');
});

io.on('connection', (client) => {
  socketClient = client;
  console.log('client connected');
  client.on('disconnect', () => {
    socketClient = null;
    console.log('client disconnected');
  });
  client.emit('server_setup', `Server connected [id=${client.id}]`);

  // when the client sends 'stream' events
  ss(client).on('stream', async (stream, data) => {
    console.log('STREAM');
    // get the name of the stream
    const filename = path.basename(data.name);
    // pipe the filename to the stream
    stream.pipe(fs.createWriteStream(filename));
    stream.on('data', (chunk) => {
      console.log(chunk);
      mqtt_client.publish('hermes/audioServer/default/audioFrame', chunk);
    });
    stream.on('end', () => {
      console.log('END');
    });

    stream.on('err', (err) => {
      console.log(err);
    });
  });
});

server.listen(PORT, HOST, () =>
  console.log(`Example app listening on host ${HOST} and port ${PORT}!`)
);
