<template>
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="`ic-angle-circle-${direction}`"
  >
    <circle
      cx="10.9141"
      cy="10.875"
      r="10"
      fill="currentColor"
    />
    <path
      d="M8.50781 6.06152L13.3212 10.8749L8.50781 15.6883"
      stroke="white"
      stroke-width="2"
    />
  </svg>
</template>

<script>
export default {
  name: 'IcAngleCircle',
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
.ic-angle-circle {
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
