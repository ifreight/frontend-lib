<template>
  <label
    class="i-checkbox"
    :class="classes"
  >
    <span
      class="i-checkbox-input"
      :class="inputCheckboxClasses"
    >
      <input
        type="checkbox"
        name="checkbox"
        :value="value"
        :checked="value"
        :disabled="disabled"
        @input="onInput"
      />
      <ic-check class="i-checkbox-icon" />
    </span>

    <slot>
      <span>{{ label }}</span>
    </slot>
  </label>
</template>

<script>
import IcCheck from '@/icons/ic-check.vue';

export default {
  name: 'ICheckbox',
  components: {
    IcCheck,
  },
  props: {
    value: Boolean,
    label: {
      type: String,
      default: '',
    },
    inputCheckboxClasses: {
      type: String,
      default: '',
    },
    invalid: Boolean,
    disabled: Boolean,
  },
  computed: {
    classes() {
      return {
        checked: this.value,
        invalid: this.invalid,
        disabled: this.disabled,
      };
    },
  },
  methods: {
    onInput() {
      this.$emit('input', this.value === false);
    },
  },
};
</script>

<style>
.i-checkbox {
  z-index: 1;

  @apply flex items-center cursor-pointer m-0 relative;

  .i-checkbox-input {
    @apply w-4 h-4 flex items-center justify-center;
    @apply border border-gray-900 rounded-sm mr-4 bg-white;

    .i-checkbox-icon {
      @apply opacity-0 text-white;
    }

    input[type='checkbox'] {
      @apply hidden;

      &:checked {
        + .i-checkbox-icon {
          @apply opacity-100;
        }
      }
    }

    &::before {
      position: absolute;
      z-index: -1;
      width: 16px;
      height: 16px;
      content: '';
      background-color: transparent;
      border-radius: 50%;
      box-shadow: 0 0 0 8px rgb(0 0 0 / 60%);
      opacity: 0;
    }
  }

  &.checked .i-checkbox-input {
    @apply bg-gray-900;
  }

  &.invalid .i-checkbox-input {
    @apply border-red-400;
  }

  &.disabled {
    cursor: default;

    .i-checkbox-input {
      border-color: #e2e2e2;
    }
  }

  &:hover .i-checkbox-input::before {
    opacity: 0.2;
  }
}
</style>
