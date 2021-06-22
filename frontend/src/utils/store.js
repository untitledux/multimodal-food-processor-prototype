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
    url: 'https://ik.imagekit.io/CookingAssistant/CHOOSE_RECIPE_SCREEN_vifCA6IlK1H.png',
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
          TTSDuration: '2 hours 25minutes',
          TTSIngredients:
            'For this recipe you need the following ingredients: 150ml Milk, 1/2 Lemon, 1 prise Cinnamon, 40g Powdered Sugar, 2 Egg Yolks, 10g Cornstarch 2EL Brown sugar',
          TTSrecommendations: 'start the recipe or to adjust the portions',
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/2_PORTION_SCREEN_6WYr3CD1c_C.png',
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
          TTSDuration: '2 hours 25minutes',
          TTSIngredients:
            'For this recipe you need the following ingredients: 150ml Milk, 1/2 Lemon, 1 prise Cinnamon, 40g Powdered Sugar, 2 Egg Yolks, 10g Cornstarch 2EL Brown sugar',
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/3_PORTION_SCREEN_1__q643ODANEfg.png',
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
          url: 'https://ik.imagekit.io/CookingAssistant/4_PORTION_SCREEN_ZUTATEN_4yKZtYX9k_0d.png',
          active: false,
          startSession: false,
          TTSrecommendations: 'start the recipe or to adjust the portions',
          TTSDuration: '2 hours 25minutes',
          TTSIngredients:
            'For this recipe you need the following ingredients: 150ml Milk, 1/2 Lemon, 1 prise Cinnamon, 40g Powdered Sugar, 2 Egg Yolks, 10g Cornstarch 2EL Brown sugar',
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
          TTSDuration: '2 hours 25minutes',
          TTSrecommendations: 'start the recipe or to adjust the portions',
          TTSIngredients:
            'For this recipe you need the following ingredients: 150ml Milk, 1/2 Lemon, 1 prise Cinnamon, 40g Powdered Sugar, 2 Egg Yolks, 10g Cornstarch 2EL Brown sugar',
          url: 'https://ik.imagekit.io/CookingAssistant/5_PORTION_SCREEN_wIRz3xylH.png',
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
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_1_BawgCdKiuI.png',
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
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_2_UCdSbbD1SPJ.png',
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
          id: 'CatalanCream_Step_3',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_3_eBKO6neu5.png',
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
        {
          id: 'CatalanCream_Step_4',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_4_pBA3js3dRKbU.png',
          active: false,
          startTTS:
            'Shut the lid, insert the measuring cup into the lid, and mix all ingredients together.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'ModalMixing1',
            },
            select: {
              actionId: 'ModalMixing1',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_3',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_5',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_5_ziVjFaGrWi.png',
          active: false,
          startTTS: 'Measure out 20g of cornstarch into the bowl. ',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_6',
            },
            select: {
              actionId: 'CatalanCream_Step_6',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_4',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_6',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_6_aWtna9V_eh.png',
          active: false,
          startTTS: 'Close the lid and mix ingredients again.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_7',
            },
            select: {
              actionId: 'CatalanCream_Step_7',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_5',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_7',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_7_7FXqV6EKAN9V.png',
          active: false,
          startTTS:
            'Remove the measuring cup from the lid. Make sure the lid is shut and mix the ingredients together again.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_8',
            },
            select: {
              actionId: 'CatalanCream_Step_8',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_6',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_8',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_8_I2TosV5pHX.png',
          active: false,
          startTTS: 'Cook the Catalan Cream.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'ModalCooking1',
            },
            select: {
              actionId: 'ModalCooking1',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_7',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_9',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_9_7EJNkoHqOKFr.png',
          active: false,
          startTTS: 'Remove the double whisk attachment.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_10',
            },
            select: {
              actionId: 'CatalanCream_Step_10',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_8',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_10',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_10_6_oGwq1z5O.png',
          active: false,
          startTTS: 'Pour the cream into the ramekins and cool for two hours.',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_12',
            },
            select: {
              actionId: 'CatalanCream_Step_12',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_9',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_12',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_12_lE5WtcNWef-G.png',
          active: false,
          startTTS:
            'Sprinkle around 1 tbsp brown sugar onto the cream. Caramelize the sugar with the culinary torch and enjoy!',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: 'CatalanCream_Step_13',
            },
            select: {
              actionId: 'CatalanCream_Step_13',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: 'CatalanCream_Step_10',
            },
            cancel: {
              actionId: 'ModalCancelRecipe',
            },
          },
        },
        {
          id: 'CatalanCream_Step_13',
          cp: RecipesSteps,
          startSession: false,
          url: 'https://ik.imagekit.io/CookingAssistant/RECIPE_STEP_13_DNrsswzHru.png',
          active: false,
          startTTS: 'Enjoy!',
          actionDone: false,
          clickableOverlay: {
            overlay: 'clickOverlay2',
            next: {
              actionId: '',
            },
            select: {
              actionId: '',
            },
            scale: {
              actionId: '',
            },
            prev: {
              actionId: '',
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
      intentFilter: ['CancelRecipe'],
      startSession: false,
      active: false,
      clickableOverlay: {
        overlay: 'modalOverlay1',
        cancel: {
          actionId: 'SelectRecipe',
        },
      },
      url: 'https://ik.imagekit.io/CookingAssistant/CANCEL_RECIPE_SCREEN_naiQaiudlDC.png',
    },
    {
      id: 'ModalAlertSugar',
      cp: ModalRecipes,
      startSession: true,
      intentFilter: ['ReactionToDisplay'],
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
      url: 'https://ik.imagekit.io/CookingAssistant/ALERT_FOR_LESS_SUGAR_ADDED_2Rg7IeuvJC.png',
    },
    {
      id: 'ModalMixing1',
      cp: ModalRecipes,
      startSession: true,
      intentFilter: ['ReactMixingDisplay'],
      startTTS:
        'Do you want to start the mixing process for 10 seconds on Level 4?',
      active: false,
      clickableOverlay: {
        overlay: 'modalOverlay3',
        cancel: {
          actionId: 'CatalanCream_Step_4',
        },
        continue: {
          actionId: 'ModalMixing2',
        },
      },
      url: 'https://ik.imagekit.io/CookingAssistant/Feedback_Mixing_ADlY380ds.png',
    },
    {
      id: 'ModalMixing2',
      cp: ModalRecipes,
      startSession: true,
      startTTS: 'Ok Im mixing for 10 seconds on level 4 ',
      active: false,
      clickableOverlay: {
        transitionTime: 5,
        overlay: 'modalOverlay4',
        continue: {
          actionId: 'CatalanCream_Step_5',
        },
      },
      url: 'https://ik.imagekit.io/CookingAssistant/Feedback_Mixing_2_JYmMhAJg88E.png',
    },
    {
      id: 'ModalCooking1',
      cp: ModalRecipes,
      startSession: true,
      intentFilter: ['ReactMixingDisplay'],
      startTTS:
        'Do you want to start the cooking process for 10 seconds on Level 4?',
      active: false,
      clickableOverlay: {
        overlay: 'modalOverlay3',
        cancel: {
          actionId: 'CatalanCream_Step_8',
        },
        continue: {
          actionId: 'ModalCooking2',
        },
      },
      url: 'https://ik.imagekit.io/CookingAssistant/Feedback_cooking_-2tDxeZdqr6.png',
    },
    {
      id: 'ModalCooking2',
      cp: ModalRecipes,
      startSession: true,
      startTTS: 'Ok Im cooking for 10 seconds on level 4 ',
      active: false,
      clickableOverlay: {
        transitionTime: 5,
        overlay: 'modalOverlay4',
        continue: {
          actionId: 'CatalanCream_Step_9',
        },
      },
      url: 'https://ik.imagekit.io/CookingAssistant/Feedbkack_cooking_2__AEdQessLydJ.png',
    },
  ],
  extras: [
    {
      id: 'CatalanCream_Step_2_Green_Signal',
      cp: RecipesSteps,
      startSession: false,
      url: 'https://ik.imagekit.io/CookingAssistant/GREEN_SIGNAL_RIGHT_AMOUNT_KFWJt5Rbq.png',
      active: false,
      startTTS: 'Weigh out 80g of powdered sugar into the bowl',
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

export const insights = writable([
  {
    insightId: 1,
    recipeStep: 0,
    screenId: 'SelectRecipe',
    insight: `When starting the interaction with the Cookit via voice: </br>
  1. the users would prefer the option to name (wake word) the Cookit by themselves. </br>
  2. the users would say "Hello/Let's go/Hey Cookit".
  `,
    commands: 'Say <i>Hey Cookit!</i> to wake up the system.',
  },
  {
    insightId: 2,
    recipeStep: 0,
    screenId: 'SelectRecipe',
    insight: `When searching for a recipe the users would imagine doing this by voice (e.g. searching for a specific ingredient in recipes) and/ or by screen (e.g. scrolling through the recipes with pictures and overviews).`,
    commands:
      'Say <i>Select Catalan Cream recipe</i> or select it with <i>mouse</i>.',
  },
  {
    insightId: 3,
    recipeStep: 0,
    screenId: 'RecipeOverview_2P',
    insight: `Users perceive it as good, that Cookit read out loud the ingredients list before cooking.`,
    commands:
      'Say <i>What do I need for this recipe?</i> or <i>What ingredients do I need?</i>.',
  },
  {
    insightId: 4,
    recipeStep: 1,
    screenId: 'CatalanCream_Step_1',
    insight: `When missing some parts of an instruction: </br> 1. the users would tell the Cookit to repeat the step (e.g."repeat step"). </br> 2. the users would like to see the instruction via screen (click on a back-button, a checklist/overview).`,
    commands:
      'Say e.g. <i>Repeat this step</i> or <i>Explain it again please</i>.',
  },
  {
    insightId: 5,
    recipeStep: 2,
    screenId: 'CatalanCream_Step_2',
    insight: `If the weighting is wrong the users would like the following feedback, via screen, with a sound, the opportunity to continue with the wrong amount or visual feedback in form of light.`,
    commands:
      'Say e.g. <i>Go to the next step</i> to see that the weighting is wrong.',
  },
  {
    insightId: 6,
    recipeStep: 4,
    screenId: 'CatalanCream_Step_4',
    insight: `When the users finished a step, they would like to continue via the screen, they would say it directly to the CookIt or the device should sense it.`,
    commands: 'Say e.g. <i>Mix it</i> or <i>Next</i>.',
  },
  {
    insightId: 7,
    recipeStep: 6,
    screenId: 'CatalanCream_Step_7',
    insight: `When the users finished a step, they would like to continue on via the screen, they would say it directly to the CookIt or the device should sense it.
    `,
    commands: `Say e.g. <i>Go next</i> or <i>What's next?</i>.`,
  },
  {
    insightId: 8,
    recipeStep: 8,
    screenId: 'CatalanCream_Step_8',
    insight: `The CookIt should give Feedback, when it is  finished with a step/recipe, via screen/ voice/ sound (e.g. warning/ success sound)`,
    commands:
      'Say e.g. <i>Start cooking</i> or <i>Go next</i> to start the process.',
  },
  {
    insightId: 9,
    recipeStep: 3,
    screenId: 'CatalanCream_Step_3',
    insight: `When canceling a recipe the users would like to do this by voice (e.g. cancel this recipe) and/ or by screen.
  `,
    commands:
      'Say <i>Cancel this recipe</i> to cancel it or click the close icon in the left upper corner.',
  },
]);

export const currRecipe = writable({});
export const filter = writable('');
export const currRecipeStep = createCount();
export const modalOpen = writable(false);
export const imageHeight = writable(0);
