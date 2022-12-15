<template>
  <div class="i-tab-pane">
    <slot v-if="isActive" />
  </div>
</template>

<script>
export default {
  name: 'ITabPane',
  inject: ['rootTabs'],
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.rootTabs.activeTab === this.name;
    },
  },
  updated() {
    this.$parent.$emit('tab-pane-update');
  },
};
</script>
