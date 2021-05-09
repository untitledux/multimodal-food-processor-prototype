<script>
  import { createEventDispatcher } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import { images, currRecipe } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  const dispatch = createEventDispatcher();
  export let url;
  export let id;
  export let intent;

  const mapRecipes = [{ id: 'CatalanCream', name: 'catalan cream' }];

  // Make functions available in parent
  export const overlayFunctions = {
    selectRecipe({ screenId, actionId, voice }) {
      setActiveToFalse($images, screenId);
      let recipeId;
      let rawSlot;
      if (voice) {
        rawSlot = actionId[0].rawValue;
        recipeId = mapRecipes.find((o) => o.name === rawSlot).id;
      } else {
        recipeId = actionId;
      }

      currRecipe.set($images.recipes.find((obj) => obj.id === recipeId));
      $currRecipe.overview[0].active = true;
      $images = $images;

      if (voice) {
        dispatch('TTS', {
          text: `You are now on the ${rawSlot} recipe.`,
        });
      }
    },
  };
</script>

<Image {url} {id} />
