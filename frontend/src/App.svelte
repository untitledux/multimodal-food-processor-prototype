<script>
  import { io } from 'socket.io-client';
  import RecordRTC from 'recordrtc';
  const ENDPOINT = 'http://0.0.0.0:3000';

  let socket = io(ENDPOINT, { reconnection: true });
  let socketId;
  let streaming = false;
  let mediaStream;
  let step = 1;
  socket.on('server_setup', (data) => {
    console.log('Server connected: id:', data);
    socketId = data;
  });

  socket.on('mqtt_setup', (data) => {
    console.log(data);
  });

  socket.on('intent', (data) => {
    console.log(data);
    processIntent(data);
  });

  socket.on('intentNotRecognized', (data) => {
    console.log('Intent not recognized');
  });

  socket.on('results', function (data) {
    playOutput(data);
  });
  let recordAudio;

  const playOutput = (arrayBuffer) => {
    let audioContext = new AudioContext();
    let outputSource;
    try {
      if (arrayBuffer.byteLength > 0) {
        audioContext.decodeAudioData(
          arrayBuffer,
          (buffer) => {
            audioContext.resume();
            outputSource = audioContext.createBufferSource();
            outputSource.connect(audioContext.destination);
            outputSource.buffer = buffer;
            outputSource.start(0);
          },
          () => {
            console.log(arguments);
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const processIntent = (data) => {
    try {
      let intentName = data.intent.intentName;
      let msg;
      switch (intentName) {
        case 'NextStep':
          msg = `You were on step ${step} now you are on step ${step + 1}  `;
          step++;
          break;

        case 'GetTime':
          const time = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Europe/Berlin',
          });
          console.log(time);
          msg = time;
          break;

        case 'Cancel':
          cancelRecipe(data);
          break;

        default:
          console.log('Intent not available');
          break;
      }
      if (msg) {
        socket.emit('tts', msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelRecipe = (msg) => {
    let intentFilter = '["Cancel"]';
    let text;
    let topic;
    let data;
    let sessionId = msg.sessionId;

    if (msg.slots[0] == undefined) {
      console.log('this intention has no slots');

      topic = 'hermes/dialogueManager/continueSession';
      text = 'do you really want to cancel the recipe?';

      data = {
        sessionId,
        text,
        intentFilter,
      };

      socket.emit('mqttpublish', { topic, data });
    } else {
      console.log('entity0: ' + msg.slots[0].entity); // answer
      console.log('value0: ' + msg.slots[0].value.value); // yes or no

      topic = 'hermes/dialogueManager/endSession';
      text = 'Okay';
      data = '{"sessionId": "' + sessionId + '", "text": "' + text + '"}';
      socket.emit('mqttpublish', { topic: topic, data: data });
    }
  };

  const streamer = async () => {
    if (!streaming) {
      try {
        console.log('STREAMING');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streaming = true;
        recordAudio = RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
          bufferSize: 16384,
          sampleRate: 44100, //should be the same then in the server code
          desiredSampRate: 16000,
          recorderType: RecordRTC.StereoAudioRecorder,
          numberOfAudioChannels: 1,

          // get intervals based blobs
          // value in milliseconds
          // as you might not want to make detect calls every seconds
          timeSlice: 0,
          ondataavailable: (blob) => {
            mediaStream = stream;
            // making use of socket.io-stream for bi-directional
            // streaming, create a stream
            let streamSS = ss.createStream();
            // stream directly to server
            // it will be temp. stored locally
            console.log(blob);
            ss(socket).emit('stream', streamSS, {
              name: 'stream.wav',
              socketId,
              size: blob.size,
            });
            // pipe the audio blob to the read stream
            ss.createBlobReadStream(blob).pipe(streamSS);
          },
        });
        recordAudio.startRecording();
      } catch (err) {
        console.error(err);
      }
    } else {
      await recordAudio.stopRecording();
      streaming = false;
      mediaStream.stop();
    }
  };
</script>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/socket.io-stream/0.9.1/socket.io-stream.js"></script>
</svelte:head>

<div>
  <div>
    <div
      class:active={streaming ? true : false}
      class="button"
      on:click={streamer}
    >
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
    </div>

    <div style="margin-top: 20px">
      Step: {step}
    </div>
  </div>
</div>

<style lang="scss">
  .button {
    height: 100px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 100px;
    background-color: red;
    border-radius: 50%;
    &.active > .bar {
      animation: sound 0ms -600ms linear infinite alternate;
    }
  }

  .bar {
    background: blue;
    bottom: 1px;
    height: 3px;
    width: 5px;
    margin: 0px 2px;
    border-radius: 5px;
  }

  @keyframes sound {
    0% {
      opacity: 0.35;
      height: 3px;
    }
    100% {
      opacity: 1;
      height: 50px;
    }
  }

  .bar:nth-child(1) {
    height: 10px;
    animation-duration: 474ms !important;
  }
  .bar:nth-child(2) {
    height: 30px;
    animation-duration: 433ms !important;
  }
  .bar:nth-child(3) {
    height: 50px;
    animation-duration: 407ms !important;
  }
  .bar:nth-child(4) {
    height: 70px;
    animation-duration: 458ms !important;
  }
  .bar:nth-child(5) {
    height: 50px;
    animation-duration: 400ms !important;
  }
  .bar:nth-child(6) {
    height: 30px;
    animation-duration: 427ms !important;
  }
  .bar:nth-child(7) {
    height: 10px;
    animation-duration: 441ms !important;
  }
</style>
