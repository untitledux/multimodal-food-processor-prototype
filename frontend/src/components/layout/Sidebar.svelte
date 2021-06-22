<script>
  import {
    images,
    insights,
    currRecipe,
    currRecipeStep,
    imageHeight,
  } from 'utils/store.js';
  import { setActiveToFalse, setToActive } from 'utils/util.js';
  let activeTab;
  let sidebar;

  const handleInsight = (i, idx, screenId) => {
    activeTab = i;
    if ($currRecipeStep > idx) {
      let distance = $currRecipeStep - idx;
      for (let i = 0; i < distance; i++) {
        currRecipeStep.decrement();
      }
    } else if ($currRecipeStep < idx) {
      let distance = idx - $currRecipeStep;
      for (let i = 0; i < distance; i++) {
        currRecipeStep.increment();
      }
    }
    currRecipe.set($images.recipes.find((obj) => obj.id === 'CatalanCream'));
    setActiveToFalse({ obj: $images, key: 'active', value: true });
    setToActive({ obj: $images, key: 'id', value: screenId });
    $images = $images;
  };
</script>

<div class="sidebar-wrapper">
  <div
    class="sidebar dem-display-flex dem-justify-content-center dem-align-items-center"
    on:click={() => (sidebar = !sidebar)}
  >
    <img
      src="/assets/chevron-right.svg"
      width="35"
      alt=""
      style="transform: rotate({sidebar ? '180deg' : '0'}"
    />
  </div>
  <div class="insights-wrapper" class:open={sidebar}>
    <div
      class="dem-padding-all-l"
      style="border-bottom: 1px solid #f3f3f3; {sidebar
        ? 'border-right: 1px solid #f3f3f3;'
        : ''}"
    >
      <div class="header">Research Recommendations</div>
      <div class="text">
        Browse through some of the insights we gathered during our research. You
        can click on each Insight to go to the corresponding screen and give it
        a try!
      </div>
    </div>

    <div class="insight-inner-wrapper ">
      {#each $insights as insight, i}
        <div
          on:click={() =>
            handleInsight(i, insight.recipeStep, insight.screenId)}
          class:selected={activeTab === i}
          class="insight-tab dem-padding-horizontal-l dem-padding-vertical-xl dem-display-flex dem-justify-content-center dem-align-items-center"
        >
          <div
            class="dem-display-flex dem-justify-content-center dem-align-items-center"
          >
            <div class="insight-number dem-margin-right-l ">{i + 1}</div>
            <div class="dem-display-flex dem-flex-direction-column">
              <div>
                {@html insight.insight}
              </div>
              <div class="spech-recommendition">
                &#x2192; {@html insight.commands}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .sidebar-wrapper {
    display: flex;
    @media screen and (max-width: 1348px) {
      display: none;
    }
  }
  .sidebar {
    height: var(--height);
    cursor: pointer;
    width: 50px;
    background-color: #e2e2e2;
  }

  .spech-recommendition {
    color: rgba(105, 105, 105, 1);
  }

  .insights-wrapper {
    width: 0px;
    transition: width 0.3s;
    // height: var(--height);
    height: 450px;
    background-color: white;
    overflow-y: hidden;
    flex-direction: column;
    display: flex;
    overflow: hidden;
    &.open {
      width: 400px;
    }
  }

  .insight-inner-wrapper {
    font-weight: 300;
    cursor: pointer;
    line-height: 1.4;
    overflow-y: auto;
  }

  .insight-number {
    font-size: 40px;
    font-weight: 700;
  }

  .text {
    font-weight: 300;
    line-height: 1.4;
    color: rgba(105, 105, 105, 1);
  }

  .insight-tab {
    &.selected {
      background-color: #f1f1f1;
    }
  }
</style>
