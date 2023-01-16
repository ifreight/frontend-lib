<template>
  <div
    class="i-scrollbar"
    :class="scrolling && 'scrolling'"
    @scroll="onScroll"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'IScrollbar',
  data() {
    return {
      scrolling: false,
      scrollTimer: null,
    };
  },
  methods: {
    onScroll() {
      if (this.scrollTimer !== null) {
        clearTimeout(this.scrollTimer);
      } else {
        this.scrolling = true;
      }

      this.scrollTimer = setTimeout(() => {
        this.scrolling = false;
        this.scrollTimer = null;
      }, 500);
    },
  },
};
</script>

<style>
.i-scrollbar {
  overflow-y: overlay;
  scrollbar-width: none;
  scrollbar-color: var(--gray-400) transparent;

  &::-webkit-scrollbar {
    display: none;
    width: 18px;
  }

  &.scrolling {
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      display: initial;
    }
  }

  &::-webkit-scrollbar-track {
    z-index: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(45 45 45 / 30%);
    background-clip: padding-box;
    border: 6px solid transparent;
    border-radius: 9999px;
  }
}
</style>
