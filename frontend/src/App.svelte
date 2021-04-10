<script>
  import { io } from 'socket.io-client';
  import RecordRTC from 'recordrtc';
  const ENDPOINT = 'http://0.0.0.0:3000';

  let socket = io(ENDPOINT, { reconnection: true });

  socket.on('server_setup', (data) => {
    console.log(data);
  });

  let recordAudio;

  const streamer = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordAudio = RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/webm',
      sampleRate: 44100, //should be the same then in the server code
      desiredSampRate: 16000,
      recorderType: RecordRTC.StereoAudioRecorder,
      numberOfAudioChannels: 1,

      // get intervals based blobs
      // value in milliseconds
      // as you might not want to make detect calls every seconds
      timeSlice: 2000,
      ondataavailable: (blob) => {
        // making use of socket.io-stream for bi-directional
        // streaming, create a stream
        let stream = ss.createStream();
        // stream directly to server
        // it will be temp. stored locally
        ss(socket).emit('stream', stream, {
          name: 'stream.wav',
          size: blob.size,
        });
        // pipe the audio blob to the read stream
        ss.createBlobReadStream(blob).pipe(stream);
      },
    });
    recordAudio.startRecording();
  };

  const stopStreamer = () => {
    console.log('stop');
    recordAudio.stopRecording();
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
