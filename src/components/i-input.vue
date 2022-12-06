<template>
  <div class="i-input">
    <div
      class="i-input-container"
      :class="classes"
    >
      <div
        v-if="$slots.prepend"
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
          v-bind="maskAttributes"
          :is="inputComponent"
          :id="inputId"
          ref="inputRef"
          :name="name"
          :value="displayModelValue"
          :type="type"
          :placeholder="placeholder || placeholderValue"
          :disabled="disabled"
          :readonly="readOnly"
          :autocomplete="autoComplete"
          :maxlength="maxlength"
          :class="inputClasses"
          @input="onInput"
          @keyup="$emit('keyup', $event)"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
        />
      </i-input-label>

      <div
        v-if="clearable"
        v-show="filled"
        class="append-container"
      >
        <ic-times-circle
          class="icon-clear"
          @click.native="onClear"
        />
      </div>
      <div
        v-else
        v-show="!!$slots.append"
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
import IcTimesCircle from '@/icons/ic-times-circle.vue';

import IInputLabel from './i-input-label.vue';

export default {
  name: 'IInput',
  components: {
    IcTimesCircle,
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
    placeholderValue: {
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
    maskOptions: {
      type: Object,
      default: () => null,
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
    clearable: Boolean,
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
        prepend: !!this.$slots.prepend,
        append: !!this.$slots.append || this.clearable,
        filled: this.filled,
        borderless: this.borderless,
        sm: this.size === 'sm',
      };
    },
    isLabelActive() {
      return this.filled || !!this.placeholder || !!this.placeholderValue;
    },
    displayModelValue() {
      if (this.value && this.value instanceof Date) {
        return dayjs(this.value).locale(this.dateLocale).format(this.dateFormat);
      }
      if (typeof this.value === 'number') {
        if (Object.is(this.value, -0)) {
          return '-0';
        }
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
            ...this.maskOptions,
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
            ...this.maskOptions,
          };
        case 'npwp':
          return {
            mask: '00.000.000.0-000-000',
            lazy: true,
            ...this.maskOptions,
          };
        default:
          return this.maskOptions;
      }
    },
    inputClasses() {
      return {
        input: true,
        'placeholder-value': this.placeholderValue,
      };
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
            inputValue = inputValue != null && inputValue !== '' ? Number(inputValue) : undefined;
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
    onClear() {
      let clearedValue = '';
      if (this.value == null || typeof this.value === 'number') {
        clearedValue = undefined;
      }
      this.$emit('input', clearedValue);
      this.$emit('clear');
    },
  },
};
</script>

<style>
.i-input {
  .i-input-container {
    height: 68px;
    padding-right: 16px;
    padding-left: 16px;
    color: var(--gray-900);
    background-color: var(--white);
    border: 1px solid var(--gray-400);
    border-radius: 10px;

    &.sm {
      height: 60px;
    }

    .input {
      width: 100%;
      height: 100%;
      padding: 0;
      padding-top: 16px;
      font-size: 16px;
      line-height: 16px;
      color: var(--gray-900);
      text-overflow: ellipsis;
      border: none;

      &:focus-visible,
      &:focus {
        outline: none;
      }

      &::placeholder {
        color: var(--gray-400);
        opacity: 1; /* Firefox */
      }

      &.placeholder-value {
        &::placeholder {
          color: var(--gray-900);
        }

        &:focus::placeholder {
          opacity: 0;
        }
      }

      &:disabled {
        color: var(--gray-400);
        background-color: transparent;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }

      &[type='number'] {
        appearance: textfield;
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

      .icon-clear {
        color: var(--gray-400);
        cursor: pointer;
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

      .input {
        color: var(--white);
        background-color: var(--gray-900);
      }
    }

    &.borderless {
      height: 66px;
      padding: 0;
      border: none;

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
