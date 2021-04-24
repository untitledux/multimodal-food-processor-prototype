<script>
  import { io } from 'socket.io-client';
  import RecordRTC from 'recordrtc';
  const ENDPOINT = 'http://0.0.0.0:3000';

  let socket = io(ENDPOINT, { reconnection: true });
  let socketId;
  let streaming = false;
  let mediaStream;
  socket.on('server_setup', (data) => {
    console.log('Server connected: id:', data);
    socketId = data;
  });

  socket.on('mqtt_setup', (data) => {
    console.log(data);
  });

  socket.on('intent', (data) => {
    console.log(data);
  });

  socket.on('intentNotRecognized', (data) => {
    console.log('Intent not recognized');
  });

  let recordAudio;

  const streamer = async () => {
    if (streaming) return;
    try {
      console.log('STREAMING');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
  };

  const stopStreamer = async () => {
    if (!streaming) return;
    await recordAudio.stopRecording();
    streaming = false;
    mediaStream.stop();
  };
</script>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/socket.io-stream/0.9.1/socket.io-stream.js"></script>
</svelte:head>

<div>
  <div>
    <button on:click={streamer} class="stream-btn">Record</button>
    <button on:click={stopStreamer} class="stream-btn">Stop</button>
  </div>
</div>

<style lang="scss">
</style>
