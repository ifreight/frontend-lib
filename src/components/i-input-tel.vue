<template>
  <i-dual-input
    class="i-input-tel"
    :invalid="invalid"
    :filled="!!value"
    :disabled="disabled"
    :dark="dark"
    hide-divider
    :first-input-width="optionWidth"
  >
    <template #first-input>
      <div
        ref="selectCountry"
        class="i-input-tel-country"
        tabindex="0"
        @blur="closeCountryDropdown"
      >
        <div
          class="i-input-tel-country-select"
          :class="countryDropdownOpen && 'open'"
          @click="toggleCountryDropdown"
        >
          <div class="i-input-tel-country-flag">
            <span :class="activeCountryFlagClass" />
          </div>
          <div>
            <ic-angle :direction="countryDropdownOpen ? 'up' : 'down'" />
          </div>

          <div class="i-input-tel-country-code">
            {{ activeCountry && activeCountry.phoneCode }}
          </div>
        </div>

        <i-dropdown-options
          :visible="countryDropdownOpen"
          :options="countryList"
          option-key="countryCode"
          option-value="name"
          :current-value="activeCountry && activeCountry.countryCode"
          @selectedValue="onSelectCountry"
        />
      </div>
    </template>
    <template #second-input>
      <input-tel
        v-model="phone"
        :country.sync="countryCode"
        :name="name"
        :placeholder="placeholder"
        :auto-complete="autoComplete"
        :disabled="disabled"
        :read-only="readOnly"
        @validate="onValidate"
      />
    </template>
  </i-dual-input>
</template>

<script>
import IcAngle from '@/icons/ic-angle.vue';

import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IDualInput from './i-dual-input.vue';

import InputTel from './input-tel';

export default {
  name: 'IInputTel',
  components: {
    IcAngle,
    InputTel: InputTel.component,
    IDualInput,
    IDropdownOptions,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    defaultCountryCode: {
      type: String,
      default: 'ID',
    },
    valid: Boolean,
    invalid: Boolean,
    disabled: Boolean,
    readOnly: Boolean,
    dark: Boolean,
    borderless: Boolean,
    optionWidth: {
      type: String,
      default: '115px',
    },
  },
  emits: ['input', 'update:valid'],
  data() {
    return {
      phone: '',
      countryCode: '',
      countryDropdownOpen: false,
      countryList: [],
    };
  },
  computed: {
    activeCountry() {
      return this.countryList.find((country) => country.countryCode === this.countryCode);
    },
    activeCountryFlagClass() {
      if (!this.activeCountry) {
        return '';
      }
      return `fi fi-${this.activeCountry.countryCode.toLowerCase()}`;
    },
  },
  watch: {
    phone: {
      handler(value) {
        if (value !== this.value) {
          this.$emit('input', value);
        }
      },
    },
  },
  created() {
    this.countryCode = this.defaultCountryCode;

    this.getCountryList();

    if (this.value) {
      this.phone = this.value;
    }
  },
  methods: {
    async getCountryList() {
      this.countryList = await InputTel.store.getCountryList();
    },
    onValidate(value) {
      this.$emit('update:valid', value);
    },
    onSelectCountry(country) {
      this.countryCode = country.countryCode;
      this.$refs.selectCountry.blur();
    },
    toggleCountryDropdown() {
      if (this.disabled || this.readOnly) {
        return;
      }
      this.countryDropdownOpen = !this.countryDropdownOpen;
    },
    closeCountryDropdown() {
      if (!this.countryDropdownOpen) {
        return;
      }
      this.$nextTick(() => {
        this.countryDropdownOpen = false;
      });
    },
  },
};
</script>

<style>
.i-input-tel {
  .i-input-tel-country {
    @apply flex items-center h-full text-gray-400;

    .i-input-tel-country-select {
      @apply flex items-center h-full pl-4 pr-3 cursor-pointer;

      .i-input-tel-country-flag {
        border: 1px solid var(--gray-400);

        @apply flex items-center rounded-sm overflow-hidden mr-3;
      }
    }
  }

  .i-input-tel-country-code {
    @apply text-gray-400 pl-1 pr-2;
  }
}
</style>
