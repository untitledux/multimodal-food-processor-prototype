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
      steps:[
        {
          id: 'CatalanCream_Step_1',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_1_BawgCdKiuI.png',
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
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_2_UCdSbbD1SPJ.png',
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
        {
          id: 'CatalanCream_Step_3',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_2_1_aJTdx7rtME7_.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_4',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_4',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_2_1_sucess_4KHrLL2WDT.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_5',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_5',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_3_OPhF79UEn3.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_6',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_6',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_4_pBA3js3dRKbU.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_7',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_7',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_5_ziVjFaGrWi.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_8',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_8',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_6_aWtna9V_eh.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_9',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_9',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_7_7FXqV6EKAN9V.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_10',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_10',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_8_I2TosV5pHX.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_11',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_11',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_9_7EJNkoHqOKFr.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_12',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_12',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_10_6_oGwq1z5O.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_13',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_13',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_11_R_-FXXTYYPZB.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_14',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_14',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_12_lE5WtcNWef-G.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_15',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_15',
          cp: RecipesSteps,
          url:
            'https://ik.imagekit.io/nuicookit/RECIPE_STEP_13_DNrsswzHru.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream',
            },
            cancel: {
              actionId: 'CancelRecipe',
            },
          },
        },
      ]
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
      intentFilter: ['AddOrContinue'],
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
