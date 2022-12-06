<template>
  <input
    v-model="phone"
    class="input-tel"
    type="tel"
    maxlength="20"
    :name="name"
    :disabled="disabled"
    :readonly="readOnly"
    :placeholder="placeholder"
    :autocomplete="autoComplete"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script>
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import store from './store';

export default {
  name: 'InputTel',
  props: {
    value: {
      type: String,
      default: '',
    },
    country: {
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
    disabled: Boolean,
    readOnly: Boolean,
  },
  data() {
    return {
      phone: '',
      phoneObject: {},
      activeCountry: null,
      activeCountryCode: '',
    };
  },
  watch: {
    country(value) {
      if (value) {
        this.activeCountryCode = value;
      }
    },
    activeCountryCode(value) {
      if (value !== this.country) {
        this.$emit('update:country', value);
      }
      if (!this.activeCountry || this.activeCountry.countryCode !== value) {
        this.setActiveCountry();
        this.setPhoneObject();
      }
    },
    activeCountry(value, oldValue) {
      if (!value && oldValue && oldValue.countryCode) {
        this.activeCountryCode = oldValue.countryCode;
      }
    },
    'phoneObject.countryCode': {
      handler(value) {
        this.activeCountryCode = value || '';
      },
    },
    'phoneObject.valid': {
      handler() {
        this.$emit('validate', this.phoneObject.valid);
      },
    },
    'phoneObject.formatted': {
      handler(value) {
        this.$nextTick(() => {
          this.phone = this.parseInputValue(value);
        });
      },
    },
    'phoneObject.number': {
      handler(value) {
        this.$emit('input', value || '');
      },
    },
    phone(value, oldValue) {
      if (!this.testCharacters(value)) {
        this.$nextTick(() => {
          this.phone = oldValue;
        });
      } else {
        this.setPhoneObject();
      }
    },
    value(val) {
      if (val !== this.phoneObject.number) {
        this.phone = val;
      }
    },
  },
  async mounted() {
    if (this.value) {
      this.phone = this.value;
    }
    if (this.country) {
      this.activeCountryCode = this.country;
    }
  },
  methods: {
    onFocus() {
      this.$emit('focus');
    },
    onBlur() {
      this.$emit('blur');
    },
    async findCountry(countryCode) {
      if (!countryCode) {
        return undefined;
      }

      const countryList = await store.getCountryList();
      return countryList.find((country) => country.countryCode === countryCode);
    },
    async setActiveCountry() {
      this.activeCountry = await this.findCountry(this.activeCountryCode);
    },
    async setPhoneObject() {
      let result;
      if (this.phone && this.phone[0] === '+') {
        result = parsePhoneNumberFromString(this.phone);
      } else {
        result = parsePhoneNumberFromString(this.phone, this.activeCountryCode);
      }

      let internationalNumber = '';
      if (this.testCharacters(this.phone)) {
        internationalNumber = this.parseModelValue(this.phone);
      }

      const phoneObject = {
        valid: false,
        countryCode: this.activeCountryCode,
        number: internationalNumber,
        nationalNumber: null,
        formatted: internationalNumber,
      };

      if (!result) {
        this.phoneObject = phoneObject;
        return;
      }

      const country = await this.findCountry(result.country);

      if (result && country) {
        this.activeCountry = country;
        Object.assign(phoneObject, {
          valid: result.isValid(),
          countryCode: result.country,
          number: result.number,
          nationalNumber: result.nationalNumber,
          formatted: result.formatInternational(),
        });
      }

      this.phoneObject = phoneObject;
    },
    testCharacters(value) {
      return /^[()\-+0-9\s]*$/.test(value);
    },
    parseInputValue(value) {
      let inputValue = value;
      if (inputValue && this.activeCountry) {
        const cleanValue = value.replace(/\s+/g, '');
        if (cleanValue.startsWith(this.activeCountry.phoneCode)) {
          let dialCodeEndIndex = 0;
          let dialCodeCheckIndex = 0;
          for (dialCodeEndIndex; dialCodeEndIndex < value.length; dialCodeEndIndex += 1) {
            if (dialCodeCheckIndex === this.activeCountry.phoneCode.length) {
              break;
            }

            if (value.charAt(dialCodeEndIndex) === this.activeCountry.phoneCode.charAt(dialCodeCheckIndex)) {
              dialCodeCheckIndex += 1;
            }
          }

          inputValue = inputValue.slice(dialCodeEndIndex).trim();
        }
      }

      return inputValue;
    },
    parseModelValue(value) {
      let parsedValue = value;

      if (parsedValue && parsedValue[0] !== '+' && this.activeCountry) {
        parsedValue = `${this.activeCountry.phoneCode}${value}`;
      }
      return parsedValue;
    },
  },
};
</script>

<style>
.input-tel {
  outline: none;

  @apply w-full bg-transparent;

  &:focus-visible {
    outline: none;
  }
}
</style>
