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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .i-input-label-text {
    font-weight: normal;
    cursor: text;
    font-size: 16px;
    color: var(--gray-400);
    transform-origin: top left;
    transform: translate(0, 0) scale(1);
    transition: all 0.1s ease-in-out;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    z-index: 1;
    position: absolute;
    margin: 0;
    display: flex;
    align-items: center;

    &.dark {
      color: var(--gray-400);
    }

    &.invalid {
      color: var(--red-400);
    }
  }

  &:focus-within .i-input-label-text:not(.disabled),
  .i-input-label-text.active
  {
    transform: translate(0, -10px) scale(1);
    font-size: 12px;

    svg {
      height: 8px;
      max-width: 10px;
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
