import { writable, derived } from 'svelte/store';

import RecipesHomeWrapper from 'components/molecules/RecipesHomeWrapper.svelte';
import RecipesWrapper from 'components/molecules/RecipesWrapper.svelte';
import RecipesSteps from 'components/molecules/RecipesSteps.svelte';
import ModalRecipes from 'components/molecules/ModalRecipes.svelte';

export const images = writable({
  home: {
    id: 'SelectRecipe',
    cp: RecipesHomeWrapper,
    startSession: false,
    url: 'https://ik.imagekit.io/nuicookit/CHOOSE_RECIPE_SCREEN_vifCA6IlK1H.png',
    active: true,
    clickableOverlay: {
      overlay: 'recipesWrapper',
      select: {
        actionId: 'CatalanCream',
      },
    },
  },
  recipes: [
    {
      id: 'CatalanCream',
      cp: RecipesWrapper,
      startSession: false,
      name: 'Catalana Creame',
      overview: [
        {
          id: 'RecipeOverview_2P',
          cp: RecipesWrapper,
          TTSrecommendations: 'start the recipe or to adjust the portions',
          startSession: false,
          url: 'https://ik.imagekit.io/nuicookit/2_PORTION_SCREEN_6WYr3CD1c_C.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay3',
            select: {
              actionId: 'CatalanCream_Step_1',
            },
            next: {
              actionId: 'CatalanCream_Step_1',
            },
            prev: {
              actionId: 'SelectRecipe',
            },
            add: {
              actionId: 'RecipeOverview_3P',
            },
            decr: {
              actionId: 'RecipeOverview_2P',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'RecipeOverview_3P',
          cp: RecipesWrapper,
          TTSrecommendations: 'start the recipe or to adjust the portions',
          startSession: false,
          url: 'https://ik.imagekit.io/nuicookit/3_PORTION_SCREEN_1__q643ODANEfg.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay3',
            select: {
              actionId: 'CatalanCream_Step_1',
            },
            next: {
              actionId: 'CatalanCream_Step_1',
            },
            prev: {
              actionId: 'SelectRecipe',
            },
            add: {
              actionId: 'RecipeOverview_4P',
            },
            decr: {
              actionId: 'RecipeOverview_2P',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'RecipeOverview_4P',
          cp: RecipesWrapper,
          url: 'https://ik.imagekit.io/nuicookit/4_PORTION_SCREEN_ZUTATEN_4yKZtYX9k_0d.png',
          active: false,
          startSession: false,
          TTSrecommendations: 'start the recipe or to adjust the portions',
          clickableOverlay: {
            overlay: 'clickOverlay3',
            select: {
              actionId: 'CatalanCream_Step_1',
            },
            next: {
              actionId: 'CatalanCream_Step_1',
            },
            prev: {
              actionId: 'SelectRecipe',
            },
            add: {
              actionId: 'RecipeOverview_5P',
            },
            decr: {
              actionId: 'RecipeOverview_3P',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'RecipeOverview_5P',
          cp: RecipesWrapper,
          startSession: false,
          TTSrecommendations: 'start the recipe or to adjust the portions',
          url: 'https://ik.imagekit.io/nuicookit/5_PORTION_SCREEN_wIRz3xylH.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay3',
            select: {
              actionId: 'CatalanCream_Step_1',
            },
            next: {
              actionId: 'CatalanCream_Step_1',
            },
            prev: {
              actionId: 'SelectRecipe',
            },
            add: {
              actionId: 'RecipeOverview_5P',
            },
            decr: {
              actionId: 'RecipeOverview_4P',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
      ],
      steps: [
        {
          id: 'CatalanCream_Step_1',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/nuicookit/RECIPE_STEP_1_BawgCdKiuI.png',
          active: false,
          startTTS: 'Insert the double whisk attachment.',
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_2',
            },
            select: {
              actionId: 'CatalanCream_Step_2',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'RecipeOverview_2P',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_2',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/nuicookit/RECIPE_STEP_2_UCdSbbD1SPJ.png',
          active: false,
          startTTS: 'Measure out 80g of powdered sugar into the bowl.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'ModalAlertSugar',
            },
            select: {
              actionId: 'ModalAlertSugar',
            },
            scale: {
              actionId: 'CatalanCream_Step_2_Green_Signal',
            },
            prev: {
              actionId: 'CatalanCream_Step_1',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_2_Green_Signal',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/nuicookit/GREEN_SIGNAL_RIGHT_AMOUNT_KFWJt5Rbq.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_3',
            },
            select: {
              actionId: 'CatalanCream_Step_3',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_1',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_3',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/nuicookit/RECIPE_STEP_3_eBKO6neu5.png',
          active: false,
          startTTS: 'Add 4 egg yolks.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_4',
            },
            select: {
              actionId: 'CatalanCream_Step_4',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_2',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
      ],
    },
  ],
  modals: [
    {
      id: 'ModalCancelRecipe',
      cp: ModalRecipes,
      startSession: false,
      active: false,
      clickableOverlay: {
        overlay: 'modalOverlay1',
        cancel: {
          actionId: 'SelectRecipe',
        },
      },
      url: 'https://ik.imagekit.io/nuicookit/CANCEL_RECIPE_SCREEN_naiQaiudlDC.png',
    },
    {
      id: 'ModalAlertSugar',
      cp: ModalRecipes,
      startSession: true,
      startTTS:
        'There is 21g less sugar than the recipe calls for. Would you like to continue with this amount, or add more?',
      active: false,
      clickableOverlay: {
        overlay: 'modalOverlay2',
        add: {
          actionId: 'CatalanCream_Step_2',
        },
        continue: {
          actionId: 'CatalanCream_Step_3',
        },
      },
      url: 'https://ik.imagekit.io/nuicookit/ALERT_FOR_LESS_SUGAR_ADDED_2Rg7IeuvJC.png',
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
