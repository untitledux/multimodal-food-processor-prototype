<script>
  import { createEventDispatcher } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import { images, currRecipe, currRecipeStep } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  export let url;
  export let id;

  const dispatch = createEventDispatcher();

  // Make functions available in parent
  export const overlayFunctions = {
    startRecipe({ screenId, actionId, voice }) {
      setActiveToFalse($images, screenId);
      let step = $currRecipe.steps.find((obj) => obj.id === actionId);
      step.active = true;
      $images = $images;
      if (voice) {
        dispatch('TTS', {
          text: `You are now on step ${$currRecipeStep + 1} of ${
            $currRecipe.name
          }`,
        });
      }
    },
  };
</script>

<Image {url} {id} />
