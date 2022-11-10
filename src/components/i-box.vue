<template>
  <div class="i-box">
    <div
      v-if="label"
      class="i-box-label"
      :class="color"
    >
      {{ label }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IBox',
  props: {
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'dark'].includes(value);
      },
    },
  },
};
</script>

<style>
.i-box {
  border: 1px solid var(--gray-400);
  border-radius: 8px;

  @apply mt-3 relative w-full;

  .i-box-label {
    position: absolute;
    max-width: 70%;
    top: -12px;
    padding: 3px 8px 4px 8px;

    @apply truncate font-bold text-3xs rounded-b;

    &.primary {
      @apply bg-yellow-300 text-gray-900;
    }
    &.dark {
      @apply bg-gray-900 text-white;
    }
  }
}
</style>
