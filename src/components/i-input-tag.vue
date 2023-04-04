<template>
  <div
    class="i-input-tag"
    :class="classes"
  >
    <div
      v-if="!!label"
      class="i-input-tag-label"
    >
      <label>{{ label }}</label>
    </div>

    <div class="i-input-tag-body">
      <i-tag
        v-for="(val, idx) in value"
        :key="`input-tag-${idx}`"
        closable
        @close="onRemove(val)"
      >
        {{ val }}
      </i-tag>

      <div
        v-show="inputVisible"
        class="i-input-tag-input"
      >
        <input
          ref="input"
          v-model="inputValue"
          name="inputValue"
          :type="inputType"
          :class="inputValueError && 'invalid'"
          @keyup.enter="onSubmit"
          @blur="hideInput"
        />
      </div>

      <div
        v-show="!inputVisible && !readOnly && !disabled"
        class="i-input-tag-button"
      >
        <button
          type="button"
          @click="showInput"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ITag from './i-tag.vue';

export default {
  name: 'IInputTag',
  components: {
    ITag,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'Add',
    },
    name: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    disabled: Boolean,
    readOnly: Boolean,
    invalid: Boolean,
    darkMode: Boolean,
    borderless: Boolean,
  },
  emits: ['input'],
  data() {
    return {
      inputValue: '',
      inputValueError: false,
      inputVisible: false,
      isFocused: false,
    };
  },
  computed: {
    classes() {
      return {
        dark: this.darkMode,
        disabled: this.disabled,
        invalid: this.invalid,
        'is-focused': this.isFocused,
        'is-filled': !!this.value,
        borderless: this.borderless,
      };
    },
  },
  watch: {
    inputValue(value) {
      if (!this.inputVisible || this.inputType !== 'email') {
        return;
      }

      this.inputValueError = !this.validateEmail(value);
    },
  },
  methods: {
    async onSubmit() {
      if (!this.inputVisible) {
        return;
      }

      let valid = true;
      if (this.inputType === 'email') {
        valid = this.validateEmail(this.inputValue);
      }

      if (valid) {
        const updatedValue = this.value;
        updatedValue.push(this.inputValue);

        this.$emit('input', updatedValue);

        this.hideInput();
      }
    },
    async showInput() {
      this.inputVisible = true;
      await this.$nextTick();
      this.$refs.input.focus();
    },
    async hideInput() {
      this.inputVisible = false;
      this.inputValue = '';
      this.inputValueError = false;
      await this.$nextTick();
    },
    onRemove(value) {
      const updatedValue = this.value;
      updatedValue.splice(updatedValue.indexOf(value), 1);

      this.$emit('input', updatedValue);
    },
    validateEmail(email) {
      return !!String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    },
  },
};
</script>

<style>
.i-input-tag {
  min-height: 120px;
  padding: 16px 16px 0;
  line-height: 14px;
  background-color: var(--white);
  border: 1px solid var(--gray-400);
  border-radius: 10px;

  .i-input-tag-label label {
    @apply text-xs text-gray-400 font-normal mb-0;
  }

  .i-input-tag-body {
    @apply flex flex-wrap pt-3;

    & > div:not(last-child) {
      margin-right: 12px;
      margin-bottom: 12px;
    }

    .i-input-tag-input input,
    .i-input-tag-button button {
      height: 32px;
      padding: 8px 12px;
      background-color: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: 100px;

      @apply text-sm;
    }

    .i-input-tag-input input.invalid {
      border-color: var(--red-400);
    }
  }

  &.is-focused {
    border-color: var(--gray-900);
  }

  &.disabled {
    background-color: var(--gray-50);
  }

  &.invalid,
  &.invalid.is-filled,
  &.invalid.dark {
    border-color: var(--red-400);

    .label {
      color: var(--red-400);
    }
  }

  &.is-filled {
    border-color: var(--gray-900);
  }

  &.dark {
    background-color: var(--gray-900);

    .i-input-tag-input input,
    .i-input-tag-button button {
      color: var(--white);
      background-color: var(--gray-900);
    }
  }

  &.borderless {
    border: none;
  }
}
</style>
