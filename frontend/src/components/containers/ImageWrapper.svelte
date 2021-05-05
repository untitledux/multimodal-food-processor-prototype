<script>
  import Image from 'components/containers/Image.svelte';

  export let id;
  export let clickableOverlay;
  export let active;
  export let url;

  $: console.log(url);
</script>

<div class="imageWrapper">
  <Image {url} {id} />
</div>

<style lang="scss">
  .imageWrapper {
    max-width: 500px;
  }
</style>
