<template>
  <transition
    ref="drawerRef"
    name="slide-fade"
  >
    <div
      v-if="value"
      class="i-drawer-container"
      v-bind="$attrs"
      :style="{
        top: top,
        position: position,
      }"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'IDrawer',
  props: {
    value: Boolean,
    top: {
      type: String,
      default: '54px',
    },
    position: {
      type: String,
      default: 'absolute',
    },
  },
  emits: ['input'],
  watch: {
    value(val) {
      if (val) {
        document.addEventListener('click', this.handleClickOutside, true);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
  },
  beforeDestroy() {
    if (this.value) {
      document.removeEventListener('click', this.handleClickOutside);
    }
  },
  methods: {
    closeDrawer() {
      if (this.value) {
        this.$emit('input', false);
      }
    },
    handleClickOutside(event) {
      const isClickInside = event.composedPath().includes(this.$refs.drawerRef);
      if (!isClickInside) {
        this.closeDrawer();
      }
    },
  },
};
</script>

<style>
.i-drawer-container {
  left: 0;
  z-index: 2000;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: var(--white);
  border: 2px solid var(--white);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 20px 0 rgb(0 0 0 / 10%);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(54px * -1);
}
</style>
