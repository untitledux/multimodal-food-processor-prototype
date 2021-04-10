<script>
  import { io } from "socket.io-client";
  let streaming = false;
  const ENDPOINT = "http://0.0.0.0:3000"
  
  let socket = io(ENDPOINT);

  const stream = () => {
    if (streaming) {
    } else {
    }

    streaming = !streamin;
  };
</script>

<div>
  <div>
    <button on:click={stream} class="stream-btn">Record</button>
  </div>
</div>

<style lang="scss">
</style>
