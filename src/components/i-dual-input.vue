<template>
  <div
    class="i-dual-input"
    :class="classes"
  >
    <slot name="first-input" />

    <div
      v-show="!hideDivider"
      class="divider"
    >
      <span class="vl" />
      <div class="icon">
        <slot name="icon" />
      </div>
    </div>

    <slot name="second-input" />
  </div>
</template>

<script>
export default {
  name: 'IDualInput',
  props: {
    dark: Boolean,
    disabled: Boolean,
    invalid: Boolean,
    filled: Boolean,
    hideDivider: Boolean,
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
        dark: this.dark,
        disabled: this.disabled,
        invalid: this.invalid,
        filled: this.filled,
      };
    },
  },
};
</script>

<style>
.i-dual-input {
  position: relative;
  border: 1px solid var(--gray-400);
  border-radius: 10px;
  display: flex;
  align-items: center;
  align-content: flex-start;
  width: auto;
  background-color: var(--white);
  height: 68px;

  &.sm {
    height: 60px;
  }

  &.disabled {
    background-color: var(--gray-50);
  }

  &:focus-within,
  &.filled {
    border-color: var(--gray-900);
  }

  &.dark,
  &.dark.disabled {
    border-color: var(--white);
    background-color: var(--gray-900);
  }

  &.invalid,
  &.invalid.filled,
  &.invalid.dark {
    border-color: var(--red-400);
  }

  .divider {
    position: relative;
    width: 32px;

    .vl {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      height: 52px;
      border-left: 1px solid var(--gray-400);
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
}
</style>
