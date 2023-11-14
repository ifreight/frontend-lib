<template>
  <div
    ref="selectRef"
    class="i-select"
    :class="!borderless && !wide && 'inside'"
  >
    <div
      class="i-select-container"
      :class="isVisible ? 'visible' : ''"
      @click="toggleDropdown"
    >
      <template v-if="$scopedSlots.selected && Object.keys(selectedOption).length > 0">
        <i-input-label
          :label="label"
          :input-id="inputId"
          force-active
          :dark="dark"
          :invalid="invalid || errorMessage"
          :class="slotSelectedClass"
        >
          <slot
            name="selected"
            :selected-option="selectedOption"
            :is-visible="isVisible"
          />
        </i-input-label>
      </template>

      <i-input
        v-else
        ref="inputRef"
        class="i-select-input"
        :value="inputTextValue"
        type="text"
        :label="label"
        :input-id="inputId"
        :name="name"
        :placeholder="placeholder"
        :placeholder-value="placeholderValue"
        :disabled="disabled"
        :read-only="isInputReadOnly"
        :invalid="invalid || !!errorMessage"
        :dark="dark"
        :borderless="borderless"
        :size="size"
        :clearable="clearable"
        @keyup="onInputKeyup"
        @clear="onClear"
      >
        <template #prepend>
          <slot name="prepend" />
        </template>
        <template #append>
          <slot name="append">
            <template v-if="!filterable && !remote">
              <div
                class="i-select-arrow-container"
                @click="toggleDropdown"
              >
                <ic-angle :direction="isVisible ? 'up' : 'down'" />
              </div>
            </template>
          </slot>
        </template>
      </i-input>
    </div>

    <i-dropdown-options
      :visible="isVisible"
      :width="dropdownWidth"
      :options="dropdownOptions"
      :option-key="optionKey"
      :option-value="optionValue"
      :current-value="selectedOptionValue"
      :query="query"
      :filterable="filterable"
      :remote="remote"
      :remote-text="remoteText"
      :no-data-text="noDataText"
      :loading="isLoading"
      @selectedValue="handleSelected"
    >
      <template #header>
        <slot name="dropdownHeader" />
      </template>

      <template #optionsPrepend="{ option }">
        <slot
          name="dropdownOptionsPrepend"
          :option="option"
        />
      </template>
    </i-dropdown-options>

    <div
      v-if="!!errorMessage"
      class="i-input-error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import IcAngle from '@/icons/ic-angle.vue';
import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInputLabel from './i-input-label.vue';
import IInput from './i-input.vue';

export default {
  name: 'ISelect',
  components: {
    IInputLabel,
    IInput,
    IDropdownOptions,
    IcAngle,
  },
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    valueOption: {
      type: [String, Object],
      default: () => undefined,
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
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    placeholderValue: {
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
    remote: Boolean,
    remoteMethod: {
      type: Function,
      default: undefined,
    },
    remoteText: {
      type: String,
      default: 'Type to search.',
    },
    noDataText: {
      type: String,
      default: 'No results found.',
    },
    readOnly: Boolean,
    filterable: Boolean,
    invalid: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    loading: Boolean,
    borderless: Boolean,
    dark: Boolean,
    wide: Boolean,
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    clearable: Boolean,
    dropdownWidth: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      isVisible: false,
      query: '',
      inputValue: this.value,
      selectedOption: this.valueOption,
      remoteLoading: false,
      remoteOptions: [],
    };
  },
  computed: {
    isLoading() {
      return this.remote ? this.remoteLoading : this.loading;
    },
    dropdownOptions() {
      let options = [];
      if (this.remote) {
        options = this.remoteOptions || [];
      } else if (this.options && this.options.length) {
        const [firstOption] = this.options;
        if (typeof firstOption !== 'object') {
          options = this.options.map((option) => ({
            id: option,
            name: option,
          }));
        } else {
          ({ options } = this);
        }
      }

      if (!options.length && this.selectedOption) {
        if (typeof this.selectedOption !== 'object') {
          options = [
            {
              id: this.selectedOption,
              name: this.selectedOption,
            },
          ];
        } else {
          options = [this.selectedOption];
        }
      }

      return options;
    },
    selectedOptionValue() {
      return this.selectedOption ? this.selectedOption[this.optionKey] : undefined;
    },
    inputTextValue() {
      if (!this.inputValue) {
        return this.query;
      }

      return this.selectedOption ? this.selectedOption[this.optionValue] : this.query;
    },
    isInputReadOnly() {
      if (!this.isVisible) {
        return true;
      }
      return !this.filterable && !this.remote;
    },
    slotSelectedClass() {
      return {
        'i-select-slot-selected': true,
        borderless: this.borderless,
        dark: this.dark,
        sm: this.size === 'sm',
      };
    },
  },
  watch: {
    valueOption(value) {
      if ((!value && this.selectedOptionValue) || (value && this.selectedOptionValue !== value[this.optionKey])) {
        this.selectedOption = value;
      }
    },
    value(value) {
      if (value !== this.inputValue) {
        this.inputValue = value;

        if (this.selectedOptionValue !== value) {
          if (this.remote) {
            if (!value) {
              this.updateSelectedOption(undefined);
            }

            this.remoteLoading = true;
            this.handleQuery(value);
          } else {
            const newSelectedOption = this.dropdownOptions.find((item) => item[this.optionKey] === this.value);

            this.updateSelectedOption(newSelectedOption);
          }
        }
      }
    },
    dropdownOptions: {
      deep: true,
      immediate: true,
      handler() {
        if (this.inputValue && this.selectedOptionValue !== this.inputValue && this.dropdownOptions.length) {
          this.updateSelectedOption(this.dropdownOptions.find((item) => item[this.optionKey] === this.inputValue));
        }
      },
    },
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
    updateSelectedOption(option) {
      this.selectedOption = option;
      this.$emit('update:valueOption', option);
    },
    changeSelected(option) {
      this.remoteOptions = [];

      if (!option) {
        this.inputValue = undefined;

        this.updateSelectedOption(undefined);
        this.$emit('input', undefined);
        this.$emit('change', undefined);
        return;
      }

      this.query = '';
      this.inputValue = option[this.optionKey];

      this.updateSelectedOption(option);
      this.$emit('input', option[this.optionKey]);
      this.$emit('change', option);
    },
    resetInputValue() {
      this.query = '';

      this.changeSelected(undefined);

      this.remoteOptions = [];
    },
    async handleQuery(value) {
      if (!value) {
        this.remoteOptions = [];
        this.remoteLoading = false;
        return;
      }

      try {
        this.remoteOptions = await this.remoteMethod(value);
      } catch (err) {
        // do nothing
      }

      this.remoteLoading = false;
    },
    debouncedHandleQuery: debounce(function query() {
      this.handleQuery(this.query);
    }, 400),
    onInputKeyup(event) {
      if (this.filterable || this.remote) {
        if (this.inputValue) {
          this.resetInputValue();
          if (event.key.length === 1) {
            this.query = event.key;
          }
        } else {
          this.query = event.target.value;
        }

        if (this.remote && typeof this.remoteMethod === 'function') {
          this.remoteLoading = true;
          this.debouncedHandleQuery();
        }
      }
    },
    showDropdown() {
      if (!this.disabled && !this.readOnly && !this.isVisible) {
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
      if (this.isVisible) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },
    handleSelected(option) {
      this.changeSelected(option);
      this.hideDropdown();
    },
    handleClickOutside(event) {
      const isClickInside = event.composedPath().includes(this.$refs.selectRef);

      if (!isClickInside) {
        this.hideDropdown();
      }
    },
    onClear() {
      this.resetInputValue();
      this.hideDropdown();
      this.$emit('clear');
    },
  },
};
</script>

<style>
.i-select {
  &.inside {
    position: relative;

    .i-select-container {
      position: relative;
    }
  }

  .i-select-slot-selected {
    height: 68px;
    padding-right: 16px;
    padding-left: 16px;
    border: 1px solid var(--gray-400);
    border-radius: 10px;

    &.sm {
      height: 60px;
    }

    &.dark {
      color: var(--white);
      background-color: var(--gray-900);
      border-color: var(--white);
    }

    &.borderless {
      border: none;
    }
  }

  .i-select-arrow-container {
    padding: 4px;
    cursor: pointer;
  }

  .i-input-error {
    padding-top: 8px;
    font-size: var(--size-xs);
    line-height: var(--size-sm);
    color: var(--red-400);
  }
}
</style>
