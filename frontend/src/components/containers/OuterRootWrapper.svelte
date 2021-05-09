<script>
  import { createEventDispatcher } from 'svelte';
  import { dialogueManager } from 'utils/store.js';
  export let id;
  export let cp;
  export let clickableOverlay;
  export let url;
  export let slots;
  export let sessionId;
  export let intent;

  $: console.log(intent);
  $: console.log($dialogueManager);

  let savedIntent;

  let overlayFunctions;
  const dispatch = createEventDispatcher();

  //Handle Intent
  $: if (intent && intent !== savedIntent) {
    console.log('IM IN INTENT');
    switch (intent) {
      case 'SelectRecipe':
        overlayFunctions.selectRecipe({
          screenId: id,
          actionId: slots,
          voice: true,
        });
        break;
      case 'StartRecipe':
        overlayFunctions.startRecipe({
          screenId: id,
          actionId: clickableOverlay.select.actionId,
          voice: true,
        });
        break;
      case 'NextStep':
        overlayFunctions.nextStep({
          screenId: id,
          actionId: clickableOverlay.next.actionId,
          voice: true,
        });
        break;
      case 'CancelRecipe':
        console.log('FIRE 1');
        overlayFunctions.cancelRecipe({
          screenId: id,
          sessionId,
          actionId: clickableOverlay.cancel.actionId,
          slots,
          voice: true,
        });
        break;
      case 'CancelRecipeResponse':
        overlayFunctions.cancelRecipe({
          screenId: id,
          sessionId,
          actionId: clickableOverlay.cancel.actionId,
          slots,
          voice: true,
        });
        break;
    }
    savedIntent = intent;
  }

  const handleClickOnScreen = (screenId, actionId) => {
    console.log(screenId);
    switch (screenId) {
      case 'SelectRecipe':
        //call function in child compoenent
        overlayFunctions.selectRecipe({ screenId, actionId, voice: false });
        break;
      case 'RecipeOverview':
        //call function in child compoenent
        overlayFunctions.startRecipe({ actionId, voice: false });
        break;
    }
  };
</script>

<div class="imageWrapper">
  {#if clickableOverlay && clickableOverlay.overlay === 'clickOverlay1'}
    <div
      class="select-btn"
      on:click={() => handleClickOnScreen(id, clickableOverlay.select.actionId)}
    />
  {:else if clickableOverlay && clickableOverlay.overlay === 'clickOverlay2'}
    <div />
  {/if}

  <div class="imageWrapper">
    <svelte:component
      this={cp}
      on:TTS
      on:DialogueManager
      bind:overlayFunctions
      {url}
      {id}
      {intent}
    />
  </div>
</div>

<style lang="scss">
  .imageWrapper {
    display: flex;
    position: relative;
    max-width: 800px;
    width: 100%;
  }

  .select-btn {
    position: absolute;
    bottom: 5px;
    z-index: 100;
    height: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    border-radius: 30%;
    cursor: pointer;
  }
</style>
