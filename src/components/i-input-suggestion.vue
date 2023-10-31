<template>
  <div
    ref="suggestion"
    class="suggestion-wrapper"
  >
    <div
      tabindex="0"
      class="suggestion-container"
      :class="isVisible ? 'visible' : ''"
      @click="toggleDropdown"
    >
      <i-input
        ref="inputRef"
        class="suggestion-input"
        type="text"
        :value="value"
        :input-id="inputId"
        :name="name"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :read-only="readOnly"
        :invalid="invalid"
        :dark-mode="darkMode"
        :borderless="borderless"
        :size="size"
        @keyup="onInputKeyup"
      >
        <template #prepend>
          <slot name="prepend" />
        </template>
      </i-input>
    </div>

    <i-dropdown-options
      :visible="isVisible"
      :options="dropdownOptions"
      :option-key="optionKey"
      :option-value="optionValue"
      :max-height="dropdownMaxHeight"
      @selectedValue="handleSelected"
    >
      <template #header>
        <slot name="dropdownHeader" />
      </template>
    </i-dropdown-options>
  </div>
</template>

<script>
import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInput from './i-input.vue';

export default {
  name: 'IInputSuggestion',
  components: {
    IInput,
    IDropdownOptions,
  },
  props: {
    value: {
      type: [String, Number],
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
    placeholder: {
      type: String,
      default: '',
    },
    displayValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionKey: {
      type: String,
      default: 'id',
    },
    optionValue: {
      type: String,
      default: 'name',
    },
    disabled: Boolean,
    readOnly: Boolean,
    invalid: Boolean,
    borderless: Boolean,
    darkMode: Boolean,
    wide: Boolean,
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    hideAfterInput: {
      type: Number,
      default: 1,
    },
    dropdownMaxHeight: {
      type: String,
      default: '264px',
    },
  },
  data() {
    return {
      isVisible: false,
      inputValue: null,
    };
  },
  computed: {
    dropdownOptions() {
      let options = [];
      if (this.options && this.options.length) {
        const [firstOption] = this.options;
        if (typeof firstOption !== 'object') {
          options = this.options.map((option) => ({
            id: option,
            name: option,
          }));
        } else {
          options = [...this.options];
        }
      }

      return options;
    },
    customSelectedClass() {
      return {
        'custom-selected': true,
        borderless: this.borderless,
        dark: this.darkMode,
        sm: this.size === 'sm',
      };
    },
  },
  watch: {
    isVisible() {
      if (this.isVisible) {
        document.addEventListener('click', this.handleClickOutside);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
  },
  beforeDestroy() {
    if (this.isVisible) {
      document.removeEventListener('click', this.handleClickOutside);
    }
  },
  methods: {
    changeSelected(option) {
      if (!option) {
        this.inputValue = undefined;

        this.$emit('input', undefined);
        this.$emit('change', undefined);
        return;
      }

      this.inputValue = option[this.optionKey];
      this.$emit('input', option[this.optionKey]);
      this.$emit('change', option);
    },
    resetInputValue() {
      this.changeSelected(undefined);
    },
    showDropdown() {
      if (!this.disabled && !this.readOnly) {
        this.isVisible = true;
        this.$emit('focus');
        if (this.$refs.inputRef) {
          this.$refs.inputRef.$el.querySelector('input').focus();
        }
      }
    },
    hideDropdown() {
      if (this.isVisible) {
        this.isVisible = false;
        this.$emit('blur');
        if (this.$refs.inputRef) {
          this.$refs.inputRef.$el.querySelector('input').blur();
        }
      }
    },
    toggleDropdown() {
      switch (this.isVisible) {
        case true:
          this.hideDropdown();
          break;
        default:
          if (!this.value) {
            this.showDropdown();
          }
          break;
      }
    },
    onInputKeyup(event) {
      this.$emit('input', event.target.value);
      if (this.hideAfterInput > 0 && event.target.value.length >= this.hideAfterInput) {
        this.isVisible = false;
      } else if (event.target.value.length < this.hideAfterInput) {
        this.isVisible = true;
      }
    },
    handleSelected(option) {
      this.changeSelected(option);
      this.hideDropdown();
    },
    handleClickOutside(event) {
      const isClickInside = event.composedPath().includes(this.$refs.suggestion);
      if (!isClickInside) {
        this.hideDropdown();
      }
    },
  },
};
</script>

<style>
.suggestion-wrapper {
  position: relative;

  .suggestion-container,
  .suggestion-input {
    cursor: pointer;
  }

  .suggestion-container.visible ::v-deep .angle-icon svg {
    transform: rotateZ(180deg);
  }

  .custom-selected {
    height: 68px;
    padding-right: 16px;
    padding-left: 16px;
    border: 1px solid #a8a8a8;
    border-radius: 10px;

    &.sm {
      height: 60px;
    }

    &.dark {
      color: #ffffff;
      background-color: #2d2d2d;
      border-color: #ffffff;
    }

    &.borderless {
      border: none;
    }
  }
}
</style>
