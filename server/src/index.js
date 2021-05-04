import dotenv from 'dotenv';
const path = require('path');
dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == 'prod' ? '.env' : '.env.docker'
  ),
});
import cors from 'cors';
import express from 'express';
const app = express();

const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const axios = require('axios');
let sessionid;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const MQTTHOST = process.env.MQTTHOST || '3.94.213.112';
const RHASSPY_PORT = process.env.RHASSPY_PORT || 12183;

let sessionId_Mqtt;

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const ss = require('socket.io-stream');

console.log(process.env.MQTTHOST);

// MQTT
const mqtt = require('mqtt');
const mqtt_options = {
  host: MQTTHOST,
  port: RHASSPY_PORT,
  protocol: 'mqtt',
};

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const mqtt_client = mqtt.connect(mqtt_options);

// Subscribe 'intent recognition'
mqtt_client.subscribe('hermes/intent/#', (err) => {
  if (!err) {
    console.log('subscribe success hermes intent');
  } else {
    console.log(err);
  }
});

// Subscribe 'get audio buffer from tts'
mqtt_client.subscribe('hermes/audioServer/default/playBytes/#', (err) => {
  if (!err) {
    console.log(`subscribe to MQTT Audio Buffer Get`);
  } else {
    console.log(err);
  }
});

// Subscribe 'get tts finished'
mqtt_client.subscribe('hermes/tts/sayFinished', (err) => {
  if (!err) {
    console.log(`subscribe to MQTT ttsFinished`);
  } else {
    console.log(err);
  }
});

// When subscribed topic is published  - you get message here
mqtt_client.on('message', (topic, message) => {
  // get 'intent recognition' message
  console.log('topic: ' + topic);
  if (topic.indexOf('hermes/intent/') === 0) {
    processIntent(message);
  } else if (topic.indexOf('hermes/audioServer/default/playBytes/') == 0) {
    // get audio buffer from tts
    io.emit('results', message);
    fs.writeFile('result.wav', message, (err) => {
      if (!err) {
        console.log('audio write success');
      }
    });
  } else if(topic.indexOf('hermes/tts/sayFinished') === 0) {
    // end session
    let msg = '{\"sessionId\": \"'+sessionId_Mqtt+'\"}';
    //mqtt_client.publish('hermes/dialogueManager/endSession', msg);
    
    // send 'hotword detected message' to start session
    msg = '{\"modelId\": \"default\", \"modelVersion\": \"\", \"modelType\": \"personal\", \"currentSensitivity\": 1.0, \"siteId\": \"default\", \"sessionId\": null, \"sendAudioCaptured\": null, \"lang\": null, \"customEntities\": null}';
    //mqtt_client.publish('hermes/hotword/default/detected', msg);
  }
});

io.on('connection', (client) => {
  console.log('client connected');
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
  client.emit('server_setup', `${client.id}`);

  sessionid = client.id;
  console.log(sessionid);

  client.on('tts', (data) => {
    sendTTS(data);
  });

  // when the client sends 'stream' events
  ss(client).on('stream', async (stream, data) => {
    // console.log('STREAM');
    // get the name of the stream
    const filename = path.basename(data.name);

    // pipe the filename to the stream
    stream.pipe(fs.createWriteStream(filename));
    stream.on('data', (chunk) => {
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

// send text to tts (sample code)
const sendTTS = (msg) => {
  const host_path =
    'http://' + process.env.MQTTHOST + ':12101/api/text-to-speech';

  axios
    .post(host_path, msg)
    .then((res) => {
      console.log(`SEND TEXT statusCode: ${res.statusCode}`);
      // console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

const processIntent = (message) => {
  let intentJSON = JSON.parse(message);  
  // send intent json to frontend
  // if (sessionid) {
  //   io.to(sessionid).emit('intent', intentJSON);
  // }

  // sample code for intent json parsing
  // console.log('input: ' + intentJSON.input);
  // console.log('intentName: ' + intentJSON.intent.intentName);
  // sessionId_Mqtt = intentJSON.sessionId;
  // console.log('sessionId: ' + sessionId_Mqtt);
  // if (intentJSON.slots[0] == undefined) {
  //   console.log('this intention has no slots');
  // } else {
  //   for (var i in intentJSON.slots) {
  //     console.log('entity: ' + intentJSON.slots[i].entity);
  //     console.log('value: ' + intentJSON.slots[i].value.value);
  //   }
  // }

  sessionId_Mqtt = intentJSON.sessionId;
  console.log('sessionId: ' + sessionId_Mqtt);

  try {
    let intentName = intentJSON.intent.intentName;
    let msg = '';
    switch (intentName) {
      // case 'NextStep':
      //   msg = `You were on step ${step} now you are on step ${step + 1}  `;
      //   step++;
      //   break;

      case 'Cancel':
        cancelRecipe(intentJSON);
        break;

      case 'GetTime':
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Europe/Berlin',
        });
        console.log(time);
        msg = time;
        break;

      default:
        console.log('Intent not available');
        break;
    }
    //socket.emit('tts', msg);
    sendTTS(msg);
  } catch (err) {
    console.error(err);
  }
};

const cancelRecipe = (msg) => {
  
  let intentFilter = '[\"Cancel\"]';
  let text = 'do you really want to cancel the recipe?';

  let data;
  
  if (msg.slots[0] == undefined) {
    console.log('this intention has no slots');
    
    data = '{\"sessionId\": \"'+sessionId_Mqtt+'\", \"text\": \"'+text+'\", \"intentFilter\": '+intentFilter+'}';
    mqtt_client.publish('hermes/dialogueManager/continueSession', data);

  } else {          
    console.log('entity0: ' + msg.slots[0].entity); // answer
    console.log('value0: ' + msg.slots[0].value.value); // yes
    
    data = '{\"sessionId\": \"'+sessionId_Mqtt+'\", "text": "Okay"}';
    mqtt_client.publish('hermes/dialogueManager/endSession', data);
  }
  
};

server.listen(PORT, HOST, () =>
  console.log(`Example app listening on host ${HOST} and port ${PORT}!`)
);
