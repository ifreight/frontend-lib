<template>
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="`ic-arrow-circle-${direction}`"
  >
    <circle
      cx="16.5"
      cy="16.25"
      r="16"
      fill="#FFE800"
      class="ic-arrow-circle-bg"
    />
    <path
      d="M16.7273 23.7756L15.2642 22.3267L19.6463 17.9446H9V15.8281H19.6463L15.2642 11.4531L16.7273 9.99716L23.6165 16.8864L16.7273 23.7756Z"
      fill="currentColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'IcArrowCircle',
  props: {
    direction: {
      type: String,
      default: 'right',
      validator(value) {
        return ['right', 'left', 'up', 'down'].includes(value);
      },
    },
  },
};
</script>

<style>
.ic-arrow-circle {
  &-left {
    transform: rotateZ(180deg);
  }

  &-down {
    transform: rotateZ(90deg);
  }

  &-up {
    transform: rotateZ(-90deg);
  }
}
</style>
