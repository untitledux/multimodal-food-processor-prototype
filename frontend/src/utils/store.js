import { writable, derived } from 'svelte/store';

import RecipesHomeWrapper from 'components/molecules/RecipesHomeWrapper.svelte';
import RecipesWrapper from 'components/molecules/RecipesWrapper.svelte';
import RecipesSteps from 'components/molecules/RecipesSteps.svelte';

export const images = writable({
  home: {
    id: 'SelectRecipe',
    cp: RecipesHomeWrapper,
    url:
      'https://ik.imagekit.io/andreasriedel/Cookit/Choose-Recipe_PlDYeV5LbEi.png',
    active: true,
    clickableOverlay: {
      overlay: 'clickOverlay1',
      select: {
        actionId: 'CatalanCream',
      },
    },
  },
  recipes: [
    {
      id: 'CatalanCream',
      cp: RecipesWrapper,
      name: 'Catalana Creame',
      overview: [
        {
          id: 'RecipeOverview',
          cp: RecipesWrapper,
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Recipe-Overview_aCiMUnc3DN3.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay1',
            select: {
              actionId: 'CatalanCream_Step_1',
            },
          },
        },
        {
          id: 'RecipeOverview_1',
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Recipe-Overview_1_n9kyRl4WEJ.png',
          active: false,
          clickableOverlay: 'clickOverlay1',
        },
        {
          id: 'RecipeOverview_2',
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Recipe-Overview_2_lW-LZnrp2V.png',
          active: false,
          clickableOverlay: 'clickOverlay1',
        },
      ],
      steps: [
        {
          id: 'CatalanCream_Step_1',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Step1_RXmX1JE1D8.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_2',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_2',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Step2_n2P9E8QbmZ.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_3',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
      ],
    },
  ],
  modals: [
    {
      id: 'CancelRecipe',
      cp: RecipesSteps,
      active: false,
      clickableOverlay: {
        overlay: 'clickOverlay2',
        cancel: {
          actionId: 'SelectRecipe',
        },
      },
      url:
        'https://ik.imagekit.io/andreasriedel/Cookit/Closing_Exit_IK0nuI_Ezl.png',
    },
  ],
});

function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
  };
}

export const currRecipe = writable({});
export const currRecipeStep = createCount();
export const dialogueManager = writable(false);
