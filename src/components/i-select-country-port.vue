<template>
  <div
    ref="selectRef"
    class="i-select-country-port"
    :class="!borderless && !wide ? 'relative' : ''"
  >
    <div
      tabindex="0"
      class="i-select-country-port-container"
      :class="isVisible ? 'visible' : ''"
      @click="showDropdown"
    >
      <i-input
        ref="inputRef"
        class="i-select-country-port-input"
        :value="inputTextValue"
        type="text"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :read-only="readOnly"
        :invalid="invalid"
        :dark-mode="darkMode"
        :borderless="borderless"
        :size="size"
        :input-id="inputId"
        :name="name"
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
      option-key="code"
      :current-value="inputValue"
      :query="query"
      remote
      :remote-text="remoteText"
      :no-data-text="noDataText"
      :loading="isLoading"
      @selectedValue="handleSelected"
    >
      <template #header>
        <slot name="dropdownHeader" />
      </template>

      <template #options="{ option, makeBold }">
        <div class="i-select-country-port-options">
          <template v-if="option.portId">
            <ic-ship class="icon-ship" />
            <span
              v-if="inputValue === option.code"
              class="align-middle"
            >
              {{ `${option.portName}, ${option.countryName}` }}
            </span>
            <span
              v-else
              class="align-middle"
              v-html="makeBold(`${option.portName}, ${option.countryName}`)"
            />
          </template>
          <template v-else>
            <span
              :class="`fi fi-${option.countryCode.toLowerCase()}`"
              class="mr-2"
            />
            <span v-if="inputValue === option.code">
              {{ option.countryName }}
            </span>
            <span
              v-else
              v-html="makeBold(option.countryName)"
            />
          </template>
          <div class="badge-code">
            {{ option.code }}
          </div>
        </div>
      </template>
    </i-dropdown-options>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

import IcShip from '@/icons/ic-ship.vue';

import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInput from './i-input.vue';

export default {
  components: {
    IcShip,
    IDropdownOptions,
    IInput,
  },
  props: {
    value: {
      type: String,
      default: undefined,
    },
    valueOption: {
      type: Object,
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
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
    dropdownMaxHeight: {
      type: String,
      default: '264px',
    },
    inputId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
      isLoading: false,
      query: '',
      inputValue: undefined,
      selectedOption: undefined,
      portList: [],
    };
  },
  computed: {
    dropdownOptions() {
      const options = [];
      const countryIndexMap = new Map();

      let sourceList = this.portList;
      if (!sourceList.length && this.selectedOption) {
        sourceList = [this.selectedOption];
      }

      sourceList.forEach((item) => {
        let countryIndex = countryIndexMap.get(item.countryId);
        if (countryIndex == null) {
          countryIndex = options.length;
          countryIndexMap.set(item.countryId, countryIndex);
          options.push({
            code: item.countryCode,
            countryId: item.countryId,
            countryCode: item.countryCode,
            countryName: item.countryName,
            ports: [],
          });
        }

        if (item.portId) {
          options[countryIndex].ports.push({
            code: `${item.countryCode}${item.portCode}`,
            portId: item.portId,
            portCode: item.portCode,
            portName: item.portName,
            portLocation: item.portLocation,
            countryId: item.countryId,
            countryCode: item.countryCode,
            countryName: item.countryName,
          });
        }
      });

      return options.reduce((result, option) => {
        const { ports, ...country } = option;
        result.push(country);
        ports.forEach((port) => result.push(port));
        return result;
      }, []);
    },
    inputTextValue() {
      if (!this.inputValue) {
        return this.query;
      }

      if (this.selectedOption) {
        if (this.selectedOption.portId) {
          return this.selectedOption.portLocation;
        }
        return `${this.selectedOption.countryName} (${this.selectedOption.countryCode})`;
      }
      return this.query;
    },
  },
  watch: {
    value: {
      handler(value) {
        if (value !== this.inputValue) {
          this.onExternalValueChange(value);
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
  created() {
    this.inputValue = this.value;
    this.selectedOption = this.valueOption;
    if (this.inputValue) {
      this.onExternalValueChange(this.inputValue);
    }
  },
  methods: {
    changeSelected(option) {
      if (!option) {
        this.inputValue = undefined;
        this.selectedOption = undefined;

        this.$emit('input', undefined);
        this.$emit('change', undefined);
        this.$emit('update:valueOption', undefined);
        return;
      }

      this.inputValue = option.code;
      this.selectedOption = option;
      this.query = '';
      this.portList = [];

      this.$emit('input', option.code);
      this.$emit('change', option);
      this.$emit('update:valueOption', option);
    },
    async handleQuery(val) {
      if (!val) {
        this.portList = [];
        this.isLoading = false;
        return;
      }

      try {
        this.portList = await this.remoteMethod(val);
      } catch (err) {
        // do nothing
      }

      this.isLoading = false;
    },
    async onExternalValueChange(value) {
      let newSelectedOption;

      if (value) {
        if (this.dropdownOptions.length) {
          newSelectedOption = this.dropdownOptions.find((item) => item.code === value);
        } else {
          await this.handleQuery(value);

          newSelectedOption = this.dropdownOptions.find((item) => item.code === value);
        }
      }

      this.changeSelected(newSelectedOption);
    },
    resetInputValue() {
      this.query = '';

      this.changeSelected(undefined);

      this.portList = [];
    },
    debouncedRemote: debounce(function query() {
      this.handleQuery(this.query);
    }, 400),
    onInputKeyup(event) {
      if (this.inputValue) {
        this.resetInputValue();
        if (event.key.length === 1) {
          this.query = event.key;
        }
      } else {
        this.query = event.target.value;
      }

      if (this.query) {
        this.isLoading = true;
        this.debouncedRemote();
      } else {
        this.handleQuery(this.query);
      }
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
        this.query = '';
        this.isVisible = false;
        this.$emit('blur');
        if (this.$refs.inputRef) {
          this.$refs.inputRef.$el.querySelector('input').blur();
        }
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
  },
};
</script>

<style>
.i-select-country-port {
  &.inside {
    position: relative;

    .i-select-country-port-container {
      position: relative;
    }
  }

  .i-select-country-port-container,
  .i-select-country-port-input {
    cursor: pointer;
  }

  .i-select-country-port-options {
    width: 100%;
  }

  .icon-ship {
    @apply inline-block align-middle mr-2 ml-7;

    ::v-deep svg {
      width: 18px;
    }
  }

  .badge-code {
    width: 71px;
    height: 24px;

    @apply float-right rounded-sm font-bold text-xs text-gray-400 text-center py-1 bg-gray-200;
  }
}
</style>
