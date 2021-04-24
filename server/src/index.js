import dotenv from "dotenv";
import cors from 'cors';
import express from 'express';
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const { Readable } = require('stream');
const wav = require('node-wav');

let sessionid;

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == "prod" ? ".env" : ".env.dev"
  )
});

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
  host: process.env.MQTTHOST,
  port: 12183,
  protocol: 'mqtt',
};

let mqtt_client = mqtt.connect(mqtt_options);

// Subscribe 'intent recognition'
mqtt_client.subscribe('hermes/intent/#', function (err) {
  if (!err) {
    console.log('subscribe success');
  }
});

// When subscribed topic is published  - you get message here
mqtt_client.on('message', function (topic, message) {
  // message is Buffer

  // get 'intent recognition' message
  if(topic.indexOf('hermes/intent/') == 0){    
    console.log('topic: ' + topic);
    console.log('message: ' + message);
    
    let intent_json = JSON.parse(message);

    // send intent json to svelte
    io.to(sessionid).emit('intent', intent_json);

    //io.emit('intent', intent_json.input);

    // sample code for intent json parsing
    console.log('input: ' + intent_json.input);
    console.log('intentName: ' + intent_json.intent.intentName);
    if(intent_json.slots[0]==undefined){
      console.log('this intention has no slots');
    } else {
      for (var i in intent_json.slots) {
        console.log('entity: ' + intent_json.slots[i].entity);
        console.log('value: ' + intent_json.slots[i].value.value);
      }
    }
    
  }
});

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

  sessionid = client.id;

  // when the client sends 'stream' events
  ss(client).on('stream', async (stream, data) => {
    // console.log('STREAM');
    // get the name of the stream
    const filename = path.basename(data.name);

    // pipe the filename to the stream
    stream.pipe(fs.createWriteStream(filename));
    stream.on('data', (chunk) => {
      //console.log(chunk);
      mqtt_client.publish('hermes/audioServer/default/audioFrame', chunk);
    });
    stream.on('end', () => {
      // console.log('END');
    });

    stream.on('err', (err) => {
      console.log(err);
    });
  });
});

server.listen(PORT, HOST, () =>
  console.log(`Example app listening on host ${HOST} and port ${PORT}!`)
);
