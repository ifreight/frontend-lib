<template>
  <div class="i-input-number">
    <button
      :disabled="disabledMin"
      :class="disabledMin ? 'disabled' : ''"
      class="i-input-number--subtract"
      @click="subtractNumber"
    >
      <div class="i-input-number--button">-</div>
    </button>
    <div class="i-input-number--text">
      <p>
        {{ value }}
      </p>
    </div>
    <button
      :disabled="disabledMax"
      :class="disabledMax ? 'disabled' : ''"
      class="i-input-number--add"
      @click="addNumber"
    >
      <div class="i-input-number--button">+</div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'IInputNumber',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
  },
  computed: {
    disabledMin() {
      if (this.min !== null && this.min >= this.value) {
        return true;
      }
      return false;
    },
    disabledMax() {
      if (this.max !== null && this.max <= this.value) {
        return true;
      }
      return false;
    },
  },
  watch: {
    value: {
      handler(val) {
        this.$emit('change', val);
      },
    },
  },
  methods: {
    subtractNumber() {
      this.$emit('input', this.value - 1);
    },
    addNumber() {
      this.$emit('input', this.value + 1);
    },
  },
};
</script>

<style>
.i-input-number {
  @apply flex items-center justify-center;

  &--subtract,
  &--add {
    @apply flex items-center justify-center text-gray-400 border-gray-400;

    &.disabled {
      @apply text-gray-200 border-gray-200;
    }
  }

  &--button {
    @apply leading-[15px] h-4;
  }

  &--text {
    @apply w-16 text-center;

    p {
      @apply font-medium mb-0;
    }
  }
}
</style>
