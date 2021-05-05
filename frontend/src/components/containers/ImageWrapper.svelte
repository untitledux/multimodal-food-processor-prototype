<script>
  import { createEventDispatcher } from 'svelte';
  import Image from 'components/containers/Image.svelte';
  import { images } from 'utils/store.js';
  export let id;
  export let clickableOverlay;
  export let active;
  export let url;
  export let slots;
  export let intent;

  const mapRecipes = [{ id: 'CatalanaCream', name: 'catalan cream' }];
  let currRecipe;
  let currStep = 0;
  const dispatch = createEventDispatcher();

  $: console.log(intent);

  //Handle Intent
  $: switch (intent) {
    case 'SelectRecipe':
      selectRecipe($images, slots, true);
      break;
    case 'StartRecipe':
      startRecipe(true);
  }

  const selectRecipe = (obj, slots, voice) => {
    setActiveToFalse($images);
    let id;
    let slot;
    if (voice) {
      slot = slots[0].rawValue;
      id = mapRecipes.find((o) => o.name === slot).id;
    } else {
      id = slots;
    }

    currRecipe = obj.recipes.find((obj) => obj.id === id);
    currRecipe.overview[0].active = true;
    $images = $images;
    if (voice) {
      dispatch('TTS', {
        text: `You are now on recipe ${slot}`,
      });
    }
  };

  const startRecipe = (voice) => {
    setActiveToFalse($images);
    currRecipe.steps[0].active = true;
    currStep = 0;
    $images = $images;
    if (voice) {
      dispatch('TTS', {
        text: `You are now on step 1 of ${currRecipe.name}`,
      });
    }
  };

  const setActiveToFalse = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (key === 'id' && obj[key] === id) {
        obj.active = false;
        $images = $images;
      } else if (typeof obj[key] === 'object') {
        setActiveToFalse(obj[key]);
      }
    });
  };

  const handleClickOnScreen = (screenId, actionId) => {
    console.log(screenId);
    switch (screenId) {
      case 'ChooseRecipe':
        selectRecipe($images, actionId, false);
        break;
      case 'RecipeOverview':
        startRecipe(false);
        break;
    }
  };
</script>

<div class="imageWrapper">
  {#if clickableOverlay.overlay === 'clickOverlay1'}
    <div
      class="select-btn"
      on:click={() => handleClickOnScreen(id, clickableOverlay.actionId)}
    />
  {/if}
  <Image {url} {id} />
</div>

<style lang="scss">
  .imageWrapper {
    position: relative;
    max-width: 500px;
  }

  .select-btn {
    position: absolute;
    bottom: 5px;
    height: 28px;
    left: 50%;
    transform: translateX(-50%);
    width: 102px;
    cursor: pointer;
  }
</style>
