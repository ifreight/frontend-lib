<template>
  <div
    class="i-textarea"
    :class="classes"
  >
    <i-input-label
      :label="label"
      :input-id="inputId"
      :dark="dark"
      :force-active="isLabelActive"
      :disabled="readOnly || disabled"
      :invalid="invalid"
      top
    >
      <textarea
        v-bind="$attrs"
        :id="inputId"
        ref="textAreaRef"
        :name="name"
        :value="value || ''"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readOnly"
        :autocomplete="autoComplete"
        class="textarea"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
      />
    </i-input-label>

    <span
      v-if="isTextLimitVisible"
      class="i-textarea-limit"
    >
      {{ textLength }}/{{ maxTextLength }}
    </span>
  </div>
</template>

<script>
import IInputLabel from './i-input-label.vue';

export default {
  name: 'ITextArea',
  components: {
    IInputLabel,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    inputId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['base', 'lg'].includes(value);
      },
    },
    readOnly: Boolean,
    invalid: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    dark: Boolean,
    borderless: Boolean,
    showTextLimit: Boolean,
  },
  computed: {
    filled() {
      return this.value != null && this.value !== '';
    },
    classes() {
      const classObject = {
        dark: this.dark,
        disabled: this.disabled,
        invalid: this.invalid || !!this.errorMessage,
        filled: this.filled,
        borderless: this.borderless,
        sm: this.size === 'sm',
      };

      if (this.size !== 'base') {
        classObject[this.size] = true;
      }

      return classObject;
    },
    textLength() {
      return (this.value || '').length;
    },
    maxTextLength() {
      return this.$attrs.maxlength;
    },
    isTextLimitVisible() {
      return this.showTextLimit && this.maxTextLength && !this.disabled && !this.readOnly;
    },
    isLabelActive() {
      return this.filled || !!this.placeholder;
    },
  },
  methods: {
    onInput(event) {
      const { value } = event.target;
      this.$emit('input', value);
    },
    onFocus() {
      this.$emit('focus');
    },
    onBlur() {
      this.$emit('blur');
    },
  },
};
</script>

<style>
.i-textarea {
  position: relative;
  height: 120px;
  padding: 16px 16px 0;
  background-color: var(--white);
  border: 1px solid var(--gray-400);
  border-radius: 10px;

  .textarea {
    width: 100%;
    height: 90px;
    padding: 0;
    font-size: 16px;
    color: var(--gray-900);
    text-overflow: ellipsis;
    resize: none;
    border: none;

    &:focus-visible,
    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--gray-400);
      opacity: 1; /* Firefox */
    }

    &:-webkit-input-placeholder {
      /* Internet Explorer 10-11 */
      color: var(--gray-400);
    }

    &::-webkit-input-placeholder {
      /* Microsoft Edge */
      color: var(--gray-400);
    }

    &:disabled {
      color: var(--gray-400);
      background-color: transparent;
    }
  }

  &:focus-within {
    border-color: var(--gray-900);
  }

  &.disabled {
    background-color: var(--gray-50);
  }

  &.filled:not(.disabled) {
    border-color: var(--gray-900);
  }

  &.invalid,
  &.invalid.filled,
  &.invalid.dark {
    border-color: var(--red-400);

    .label {
      color: var(--red-400);
    }
  }

  &.dark {
    color: var(--white);
    background-color: var(--gray-900);
    border-color: var(--white);

    .textarea {
      color: var(--white);
      background-color: var(--gray-900);
    }
  }

  &.borderless {
    border: none;
  }

  &.lg {
    height: 180px;

    .textarea {
      height: 150px;
    }
  }

  .i-textarea-limit {
    position: absolute;
    right: 10px;
    bottom: 5px;
    font-size: var(--size-xs);
    color: var(--gray-400);
  }
}
</style>
