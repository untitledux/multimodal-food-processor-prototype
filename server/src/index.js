import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const { Readable } = require('stream');
const wav = require('node-wav');
const axios = require('axios');
let sessionid;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const MQTTHOST = process.env.MQTTHOST || '3.88.213.87';
const RHASSPY_PORT = process.env.RHASSPY_PORT || 12183;

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == 'prod' ? '.env' : '.env.docker'
  ),
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const ss = require('socket.io-stream');

// MQTT
const mqtt = require('mqtt');
const mqtt_options = {
  host: MQTTHOST,
  port: RHASSPY_PORT,
  protocol: 'mqtt',
};

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World Sonja!');
});

const mqtt_client = mqtt.connect(mqtt_options);

// Subscribe 'intent recognition'
mqtt_client.subscribe('hermes/intent/#', function (err) {
  if (!err) {
    console.log('subscribe success hermes intent');
  }
});

// Subscribe 'get audio buffer from tts'
mqtt_client.subscribe('hermes/audioServer/default/playBytes/#', function (err) {
  if (!err) {
    console.log('subscribe to rhasspy MQTT success');
    sessionid
      ? io.to(sessionid).emit('mqtt_setup', `MQTT subscription: successfull`)
      : null;
  } else {
    console.log(err);
    sessionid
      ? io.to(sessionid).emit('mqtt_setup', `MQTT subscription: ${err}`)
      : null;
  }
});

// When subscribed topic is published  - you get message here
mqtt_client.on('message', function (topic, message) {
  if (topic.indexOf('hermes/intent/') === 0) {
    // get 'intent recognition' message
    console.log('topic: ' + topic);
    console.log('message: ' + message);

    let intent_json = JSON.parse(message);

    // send intent json to svelte
    if (sessionid) {
      io.to(sessionid).emit('intent', intent_json);
    }

    // sample code for intent json parsing
    console.log('input: ' + intent_json.input);
    console.log('intentName: ' + intent_json.intent.intentName);
    if (intent_json.slots[0] == undefined) {
      console.log('this intention has no slots');
    } else {
      for (var i in intent_json.slots) {
        console.log('entity: ' + intent_json.slots[i].entity);
        console.log('value: ' + intent_json.slots[i].value.value);
      }
    }

    // send text to tts (sample code)
    let msg = 'hello world';
    const host_path =
      'http://' + process.env.MQTTHOST + ':12101/api/text-to-speech';

    axios
      .post(host_path, msg)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        //console.log(res)
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (topic.indexOf('hermes/audioServer/default/playBytes/') === 0) {
    // get audio buffer from tts
    console.log('topic: ' + topic);

    fs.writeFile('result.wav', message, function (err) {
      if (!err) {
        console.log('audio write success');
      }
    });
  }
});

io.on('connection', (client) => {
  console.log('client connected');
  client.on('disconnect', () => {
    socketClient = null;
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
