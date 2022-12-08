<template>
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="`ic-angles-circle-${direction}`"
  >
    <circle
      cx="10.334"
      cy="10.1494"
      r="10"
      fill="currentColor"
    />
    <path
      d="M6.23926 5.64941L11.0393 10.4494L6.23926 15.2494"
      stroke="white"
    />
    <path
      d="M9.73926 5.64941L14.5393 10.4494L9.73926 15.2494"
      stroke="white"
    />
  </svg>
</template>

<script>
export default {
  name: 'IcAnglesCircle',
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
.ic-angles-circle {
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
