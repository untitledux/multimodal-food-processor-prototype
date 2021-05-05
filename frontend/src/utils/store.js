import { writable, derived } from 'svelte/store';

export const images = writable({
  home: {
    id: 'ChooseRecipe',
    url:
      'https://ik.imagekit.io/andreasriedel/Cookit/Choose-Recipe_qzy_kH0yZYNX.png',
    active: true,
    clickableOverlay: {
      overlay: 'clickOverlay1',
      actionId: 'CatalanaCream',
    },
  },
  recipes: [
    {
      id: 'CatalanaCream',
      name: 'Catalana Creame',
      overview: [
        {
          id: 'RecipeOverview',
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Recipe-Overview_aCiMUnc3DN3.png',
          active: false,
          clickableOverlay: {
            overlay: 'clickOverlay1',
            actionId: 'RecipeOverview_1',
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
          id: 'CatalenCream_Step_1',
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Step1_RXmX1JE1D8.png',
          active: false,
          clickableOverlay: 'clickOverlay2',
        },
        {
          id: 'CatalenCream_Step_2',
          url:
            'https://ik.imagekit.io/andreasriedel/Cookit/Step2_n2P9E8QbmZ.png',
          active: false,
          clickableOverlay: 'clickOverlay2',
        },
      ],
    },
  ],
});
