<script>
  import { createEventDispatcher } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import {
    images,
    currRecipe,
    currRecipeStep,
    dialogueManager,
  } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  export let url;
  export let id;

  const dispatch = createEventDispatcher();

  // Make functions available in parent
  export const overlayFunctions = {
    nextStep({ screenId, actionId, voice }) {
      let idx = $currRecipe.steps.findIndex((obj) => obj.id === screenId);
      setActiveToFalse($images, screenId);
      $currRecipe.steps[idx + 1].active = true;
      currRecipeStep.increment();
      console.log('currstep', $currRecipeStep);
      $images = $images;
      if (voice) {
        dispatch('TTS', {
          text: `You are now on step ${$currRecipeStep + 1} of the recipe ${
            $currRecipe.name
          }`,
        });
      }
    },
    cancelRecipe({ screenId, actionId, voice, slots, sessionId }) {
      console.log(screenId);
      if (voice) {
        let intentFilter;
        let text;
        let topic;
        let data;

        if (!slots) {
          setActiveToFalse($images, screenId);
          let activeModal = $images.modals.find((obj) => obj.id === actionId);
          activeModal.active = true;
          $images = $images;
          console.log('this intention has no slots');
          $dialogueManager = true;
          topic = 'hermes/dialogueManager/continueSession';
          text = 'Do you really want to cancel the recipe?';
          intentFilter = ['CancelRecipe'];
          data = {
            sessionId,
            text,
            intentFilter,
          };

          dispatch('DialogueManager', {
            topic,
            data,
          });
        } else {
          let answer = slots[0].value.value;
          topic = 'hermes/dialogueManager/endSession';
          text = 'Okay';
          setActiveToFalse($images, screenId);
          if (answer == 'yes') {
            text =
              'Okay I canceled the recipe and you are now back on the menu.';
            $images.home.active = true;
            currRecipeStep.reset();
            currRecipe.set(null);
          } else {
            $currRecipe.steps[$currRecipeStep].active = true;
            text = 'Okay you can continue cooking';
          }
          console.log($images);
          $images = $images;

          data = {
            sessionId,
            text,
          };

          dispatch('DialogueManager', {
            topic,
            data,
          });
        }
      }
    },
  };
</script>

<Image {url} {id} />
