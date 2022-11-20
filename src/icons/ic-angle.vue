<template>
  <svg
    width="9"
    height="15"
    viewBox="0 0 9 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="`ic-angle-${direction}`"
  >
    <path
      d="M1 0.498047L8 7.49805L1 14.498"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IcAngle',
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
.ic-angle {
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
