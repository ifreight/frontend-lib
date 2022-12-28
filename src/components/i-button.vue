<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click.stop="$emit('click')"
  >
    <slot name="prepend" />
    <slot />
    <slot name="append" />
  </button>
</template>

<script>
export default {
  name: 'IButton',
  props: {
    plain: Boolean,
    disabled: Boolean,
    error: Boolean,
    text: Boolean,
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['xs', 'sm', 'base', 'lg'].includes(value);
      },
    },
    badge: Boolean,
  },
  computed: {
    buttonClasses() {
      const classes = [];

      if (this.text) {
        classes.push('i-button-text');
      } else {
        classes.push('i-button');

        if (this.plain) {
          classes.push('plain');
        }
        if (this.badge) {
          classes.push('badge');
        }
      }

      if (this.disabled) {
        classes.push('disabled');
      }
      if (this.error) {
        classes.push('error');
      }

      if (this.size !== 'base') {
        classes.push(`${this.size}`);
      }

      return classes;
    },
  },
};
</script>

<style>
.i-button {
  @apply w-full rounded-md bg-yellow-300 border border-yellow-300 h-[53px] p-2 cursor-pointer;
  @apply relative font-semibold text-base text-gray-900 flex justify-center items-center;

  &.disabled {
    @apply bg-gray-200 text-gray-400 border-gray-200 pointer-events-none;
  }

  &.error {
    @apply border-2 border-red-400;
  }

  &.plain {
    @apply bg-white;
  }

  &.badge::before {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    content: '';
    background-color: var(--red-400);
    border-radius: 4px;
  }

  &:hover,
  &:active {
    @apply text-ochre-700;
  }

  &.lg {
    @apply text-lg;
  }

  &.sm {
    @apply text-sm leading-4 h-[41px];
  }

  &.xs {
    @apply text-xs h-[41px];
  }
}

.i-button-text {
  @apply flex justify-center items-center p-0 border-0 text-yellow-700 font-medium bg-transparent cursor-pointer;

  &.disabled {
    @apply text-gray-400 pointer-events-none;
  }

  &.lg {
    @apply text-lg;
  }

  &.sm {
    @apply text-sm;
  }

  &.xs {
    @apply text-xs;
  }

  &:hover,
  &:active {
    @apply underline;
  }
}
</style>
