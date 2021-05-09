<script>
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import RecordRTC from 'recordrtc';
  import OuterRootWrapper from 'components/containers/OuterRootWrapper.svelte';
  import { images, currRecipe, dialogueManager } from 'utils/store.js';

  const ENDPOINT = 'http://0.0.0.0:3000';
  let socket = io(ENDPOINT, { reconnection: true });
  let activeObject;
  let socketId;
  let intentName;
  let sessionId;
  let slots;
  let recordAudio;
  let streaming = false;
  let mediaStream;

  onMount(() => {
    //Enable streaming on page load
    streamer();
  });

  // Run reactive everytime when store images change
  $: {
    setActiveImage({ obj: $images, key: 'active', value: true });
  }

  const setActiveImage = ({ obj, key: keyExpected, value }) => {
    Object.keys(obj).forEach((key) => {
      if (key === keyExpected && obj[key] === value) {
        console.log('IN ACTIVE OBJECT');
        activeObject = obj;
      } else if (typeof obj[key] === 'object') {
        setActiveImage({ obj: obj[key], key: keyExpected, value });
      }
    });
  };

  socket.on('server_setup', (data) => {
    console.log('Server connected: id:', data);
    socketId = data;
  });

  socket.on('mqtt_setup', (data) => {
    console.log(data);
  });

  socket.on('intent', (data) => {
    console.log('SOCKET INTENT');
    processIntent(data);
  });

  socket.on('intentNotRecognized', (data) => {
    console.log('Intent not recognized');
  });

  const handleTTS = (event) => {
    socket.emit('tts', event.detail.text);
  };

  socket.on('results', function (data) {
    playOutput(data);
  });

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
    console.log(data);
    try {
      if ($dialogueManager) {
        $dialogueManager = false;
        console.log('IIIIIIINNNNN ');
        intentName = data.intent.intentName + 'Response';
      } else {
        intentName = data.intent.intentName;
      }
      slots = data.slots.length ? data.slots : null;
      sessionId = data.sessionId;
    } catch (err) {
      console.error(err);
    }
  };

  const handleDialogueManager = (event) => {
    let topic = event.detail.topic;
    let data = event.detail.data;
    socket.emit('mqttpublish', { topic, data });
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
            // console.log(blob);
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

<div
  class="wrapper dem-display-flex dem-justify-content-center dem-align-items-center"
>
  <OuterRootWrapper
    on:TTS={handleTTS}
    on:DialogueManager={handleDialogueManager}
    {...activeObject}
    intent={intentName}
    {sessionId}
    {slots}
  />
</div>

<style lang="scss">
  .wrapper {
    padding: 100px;
    height: 100vh;
    width: 100vw;
    background-color: #d2d2d2;
    @media screen and (max-width: 800px) {
      padding: 50px;
    }
  }
</style>
