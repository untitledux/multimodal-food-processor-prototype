import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const { Readable } = require('stream');
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
  host: '3.88.213.87',
  port: 12183,
  protocol: 'mqtt',
};

var mqtt_client = mqtt.connect(mqtt_options);

/////// Subscription Test - topic: audioFrame
mqtt_client.subscribe('hermes/audioServer/default/audioFrame', function (err) {
  if (!err) {
    console.log('subscribe success');
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
  console.log('client connected');
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
  client.emit('server_setup', `Server connected [id=${client.id}]`);

  // when the client sends 'stream' events
  ss(client).on('stream', async (stream, data) => {
    // get the name of the stream
    const filename = path.basename(data.name);
    // pipe the filename to the stream
    stream.pipe(fs.createWriteStream(filename));
    const readable = Readable.from(stream);
    //or do we need readable.on('data) here?
    stream.on('data', (chunk) => {
      console.log('chunk is in', chunk);
      mqtt_client.publish('hermes/audioServer/default/audioFrame', chunk);
    });

    readable.on('error', (err) => {
      console.log('Stream error', err);
    });

    // function streamToString (stream) {
    //   const chunks = [];
    //   return new Promise((resolve, reject) => {
    //     stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    //     stream.on('error', (err) => reject(err));
    //     stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    //   })
    // }

    // const result = await streamToString(stream)
  });
});

server.listen(PORT, HOST, () =>
  console.log(`Example app listening on host ${HOST} and port ${PORT}!`)
);
