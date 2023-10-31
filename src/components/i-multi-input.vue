<template>
  <div
    class="i-multi-input"
    :class="classes"
  >
    <slot
      :disabled="disabled"
      :dark-mode="darkMode"
    />
  </div>
</template>

<script>
export default {
  name: 'IMultiInput',
  props: {
    invalid: Boolean,
    darkMode: Boolean,
    disabled: Boolean,
    filled: Boolean,
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
  },
  computed: {
    classes() {
      return {
        dark: this.darkMode,
        disabled: this.disabled,
        invalid: this.invalid,
        'is-filled': this.filled,
        sm: this.size === 'sm',
      };
    },
  },
};
</script>

<style>
.i-multi-input {
  position: relative;
  display: flex;
  align-content: flex-start;
  align-items: center;
  width: auto;
  height: 68px;
  background-color: #ffffff;
  border: 1px solid #a8a8a8;
  border-radius: 10px;

  &.sm {
    height: 60px;
  }

  &.disabled {
    background-color: #fbfbfd;
  }

  &:focus-within,
  &.is-filled {
    border-color: #2d2d2d;
  }

  &.dark,
  &.dark.disabled {
    background-color: #2d2d2d;
    border-color: #fffffd;
  }

  &.invalid,
  &.invalid.is-filled,
  &.invalid.dark {
    border-color: #ec7173;
  }
}

.i-multi-input > * {
  height: 100%;

  &:not(:first-child) {
    position: relative;

    &::before {
      position: absolute;
      bottom: 15%;
      left: 0;
      width: 1px;
      height: 70%;
      content: '';
      background-color: #a8a8a8;
    }
  }
}
</style>
