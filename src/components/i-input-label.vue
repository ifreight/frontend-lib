<template>
  <div
    class="i-input-label"
    :class="top && 'label-top'"
  >
    <label
      :for="inputId"
      class="i-input-label-text"
      :class="classes"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'IInputLabel',
  props: {
    label: {
      type: String,
      default: '',
    },
    inputId: {
      type: String,
      default: '',
    },
    top: Boolean,
    forceActive: Boolean,
    disabled: Boolean,
    dark: Boolean,
    invalid: Boolean,
  },
  computed: {
    classes() {
      return {
        active: this.forceActive,
        dark: this.dark,
        invalid: this.invalid,
        disabled: this.disabled,
      };
    },
  },
};
</script>

<style>
.i-input-label {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  .i-input-label-text {
    position: absolute;
    z-index: 1;
    width: 100%;
    margin: 0;
    overflow: hidden;
    font-size: 16px;
    font-weight: normal;
    color: var(--gray-400);
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: text;
    transition: all 0.1s ease-in-out;
    transform: translate(0, 0) scale(1);
    transform-origin: top left;

    &.dark {
      color: var(--gray-400);
    }

    &.invalid {
      color: var(--red-400);
    }

    > * {
      vertical-align: middle;
    }
  }

  &:focus-within .i-input-label-text:not(.disabled),
  .i-input-label-text.active {
    font-size: 12px;
    transform: translate(0, -10px) scale(1);

    svg {
      max-width: 10px;
      height: 8px;
    }
  }

  &.label-top {
    justify-content: start;

    .i-input-label-container {
      top: 0;
      padding-top: 8px;
    }
  }
}
</style>
