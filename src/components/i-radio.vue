<template>
  <label
    class="i-radio"
    :class="classes"
  >
    <input
      type="radio"
      class="i-radio-input"
      :name="name"
      :value="label"
      :checked="value === label"
      :disabled="disabled"
      :class="radioClasses"
      @input="onInput"
    />
    <slot />
  </label>
</template>
<script>
export default {
  name: 'IRadio',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: '',
      required: true,
    },
    label: {
      type: [String, Number, Boolean],
      default: '',
      required: true,
    },
    name: {
      type: String,
      default: 'i-radio',
    },
    radioClasses: {
      type: String,
      default: '',
    },
    disabled: Boolean,
  },
  emits: ['input'],
  computed: {
    classes() {
      return {
        'i-radio--checked': this.value === this.label,
        disabled: this.disabled,
      };
    },
  },
  methods: {
    onInput() {
      this.$emit('input', this.label);
    },
  },
};
</script>

<style>
.i-radio {
  @apply flex items-center text-sm mb-0 font-normal cursor-pointer;

  &--checked {
    @apply font-bold;
  }

  &.disabled {
    @apply text-gray-400 cursor-auto;
  }

  .i-radio-input {
    @apply accent-gray-900;
  }
}
</style>
