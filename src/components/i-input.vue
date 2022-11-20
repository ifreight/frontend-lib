<template>
  <div class="i-input">
    <div
      class="i-input-container"
      :class="classes"
    >
      <div
        v-show="$slots.prepend"
        class="prepend-container"
      >
        <slot name="prepend" />
      </div>
      <i-input-label
        :label="label"
        :input-id="inputId"
        :dark="dark"
        :force-active="isLabelActive"
        :disabled="readOnly || disabled"
        :invalid="invalid"
      >
        <template #label>
          <slot name="label" />
        </template>

        <component
          ref="inputRef"
          v-bind="maskAttributes"
          :is="inputComponent"
          :id="inputId"
          :name="name"
          :value="displayModelValue"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readOnly"
          :autocomplete="autoComplete"
          :maxlength="maxlength"
          class="input"
          @input="onInput"
          @keyup="$emit('keyup', $event)"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
        />
      </i-input-label>
      <div
        v-show="$slots.append"
        class="append-container"
      >
        <slot name="append" />
      </div>
    </div>

    <div
      v-if="!!errorMessage"
      class="i-input-error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { IMaskComponent } from 'vue-imask';
import IInputLabel from './i-input-label.vue';

export default {
  name: 'IInput',
  components: {
    IInputLabel,
    ImaskInput: IMaskComponent,
  },
  props: {
    value: {
      type: [String, Number, Date, Object],
      default: undefined,
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
    type: {
      type: String,
      default: 'text',
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
    currency: {
      type: Boolean,
      default: false,
    },
    readOnly: Boolean,
    invalid: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    dark: Boolean,
    borderless: Boolean,
    dateLocale: {
      type: String,
      default: 'en',
    },
    dateFormat: {
      type: String,
      default: 'dddd, D MMM, YYYY', // format follow dayjs
    },
    mask: {
      type: String,
      default: undefined,
      validator(value) {
        return ['number', 'decimal', 'npwp'].includes(value);
      },
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    maxlength: {
      type: Number,
      default: null,
    },
  },
  computed: {
    inputComponent() {
      return this.mask ? 'imask-input' : 'input';
    },
    filled() {
      return this.value != null && this.value !== '';
    },
    classes() {
      return {
        dark: this.dark,
        disabled: this.disabled,
        invalid: this.invalid || !!this.errorMessage,
        append: !!this.$slots.append,
        prepend: !!this.$slots.prepend,
        filled: this.filled,
        borderless: this.borderless,
        sm: this.size === 'sm',
      };
    },
    isLabelActive() {
      return this.filled || !!this.placeholder;
    },
    displayModelValue() {
      if (this.value && this.value instanceof Date) {
        return dayjs(this.value).locale(this.dateLocale).format(this.dateFormat);
      }
      if (typeof this.value === 'number') {
        return this.value.toString();
      }

      return this.value || '';
    },
    maskAttributes() {
      switch (this.mask) {
        case 'number':
          return {
            mask: Number,
            thousandsSeparator: '.',
            radix: ',',
            mapToRadix: ['.'],
            scale: 0,
            unmask: true,
            lazy: true,
          };
        case 'decimal':
          return {
            mask: Number,
            thousandsSeparator: '.',
            radix: ',',
            mapToRadix: ['.'],
            scale: 2,
            unmask: true,
            lazy: true,
          };
        case 'npwp':
          return {
            mask: '00.000.000.0-000-000',
            lazy: true,
          };
        default:
          return null;
      }
    },
  },
  watch: {
    displayModelValue: {
      immediate: true,
      handler(value) {
        if (this.$refs.inputRef && !this.mask) {
          this.$refs.inputRef.value = value == null ? '' : value;
        }
      },
    },
  },
  methods: {
    onInput(event) {
      let inputValue = event;

      if (this.mask) {
        switch (this.mask) {
          case 'number':
          case 'decimal':
            inputValue = (inputValue != null && inputValue !== '') ? Number(inputValue) : undefined;
            break;
          default:
            break;
        }
      } else {
        inputValue = event.target.value;
      }

      this.$emit('input', inputValue);
    },
    onChange() {
      this.$emit('change', this.value);
    },
    onFocus() {
      this.$emit('focus');
    },
    onBlur() {
      this.$emit('blur');
    },
    triggerInputFocus() {
      if (this.$refs.inputRef.$el) {
        this.$refs.inputRef.$el.focus();
      } else {
        this.$refs.inputRef.focus();
      }
    },
  },
};
</script>

<style>
.i-input {
  .i-input-container {
    border: 1px solid var(--gray-400);
    border-radius: 10px;
    padding-left: 16px;
    padding-right: 8px;
    height: 68px;
    background-color: var(--white);
    color: var(--gray-900);

    &.sm {
      height: 60px;
    }

    .input {
      border: none;
      padding: 0;
      width: 100%;
      color: var(--gray-900);
      font-size: 16px;
      line-height: 16px;
      text-overflow: ellipsis;
      height: 100%;
      padding-top: 16px;

      &:focus-visible,
      &:focus {
        outline: none;
      }

      &::placeholder {
        color: var(--gray-400);
        opacity: 1; /* Firefox */
      }

      &:input-placeholder {
        /* Internet Explorer 10-11 */
        color: var(--gray-400);
      }

      &::input-placeholder {
        /* Microsoft Edge */
        color: var(--gray-400);
      }

      &:disabled {
        background-color: transparent;
        color: var(--gray-400);
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type="number"] {
        -moz-appearance: textfield;
      }
    }

    /* modifier to parent div */
    &.append,
    &.prepend {
      display: flex;

      .append-container,
      .prepend-container {
        align-self: center;
      }
    }

    &.prepend .prepend-container {
      margin-right: 12px;
    }

    &.append .append-container {
      margin-left: 12px;
      margin-right: 8px;
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
      border-color: var(--white);
      background-color: var(--gray-900);
      color: var(--white);

      .input {
        background-color: var(--gray-900);
        color: var(--white);
      }
    }

    &.borderless {
      border: none;

      height: 66px;

      &.sm {
        height: 58px;
      }
    }
  }

  .i-input-error {
    padding-top: 8px;
    font-size: var(--size-xs);
    line-height: var(--size-sm);
    color: var(--red-400);
  }
}
</style>
