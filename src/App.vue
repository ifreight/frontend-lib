<template>
  <div id="app">
    <span>Frontend Lib</span>

    <i-box
      label="Test Box"
      class="p-5"
    >
      Test
    </i-box>

    <i-button>
      Test
    </i-button>

    <div class="p-5">
      <i-checkbox label="toggle" />
    </div>

    <i-sort-caret v-model="sortCaretValue" />
  </div>
</template>

<script>
import IBox from './components/i-box.vue';
import IButton from './components/i-button.vue';
import ICheckbox from './components/i-checkbox.vue';
import ISortCaret from './components/i-sort-caret.vue';

export default {
  name: 'App',
  components: {
    IBox,
    IButton,
    ICheckbox,
    ISortCaret,
  },
  data() {
    return {
      sortCaretValue: null,
    };
  },
};
</script>

<style>
</style>
