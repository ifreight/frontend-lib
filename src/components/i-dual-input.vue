<template>
  <div
    class="i-dual-input"
    :class="classes"
  >
    <div
      :class="firstInputClass"
      :style="firstInputStyle"
    >
      <slot name="first-input" />
    </div>

    <div
      v-show="!hideDivider"
      class="divider"
    >
      <span class="vl" />
      <div class="icon">
        <slot name="icon" />
      </div>
    </div>

    <div
      :class="secondInputClass"
      :style="secondInputStyle"
    >
      <slot name="second-input" />
    </div>
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
    firstInputWidth: {
      type: [String, Number],
      default: '100%',
    },
    firstInputClass: {
      type: String,
      default: '',
    },
    secondInputWidth: {
      type: [String, Number],
      default: '100%',
    },
    secondInputClass: {
      type: String,
      default: '',
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
    firstInputStyle() {
      return `width: ${this.firstInputWidth}`;
    },
    secondInputStyle() {
      return `width: ${this.secondInputWidth}`;
    },
  },
};
</script>

<style>
.i-dual-input {
  position: relative;
  display: flex;
  align-content: flex-start;
  align-items: center;
  width: auto;
  height: 68px;
  background-color: var(--white);
  border: 1px solid var(--gray-400);
  border-radius: 10px;

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
    background-color: var(--gray-900);
    border-color: var(--white);
  }

  &.invalid,
  &.invalid.filled,
  &.invalid.dark {
    border-color: var(--red-400);
  }

  .divider {
    position: relative;

    .vl {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 52px;
      border-left: 1px solid var(--gray-400);
      transform: translateY(-50%) translateX(-50%);
    }

    .icon {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
