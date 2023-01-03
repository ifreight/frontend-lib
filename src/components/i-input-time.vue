<template>
  <div
    ref="inputTime"
    class="i-input-time"
    :class="classes"
    @click="() => onFocus()"
  >
    <div class="input-icon">
      <ic-clock />
    </div>
    <i-input-label
      :label="label"
      :input-id="inputId"
      :dark="dark"
      :force-active="isLabelActive"
      :disabled="readOnly || disabled"
      :invalid="invalid"
      class="input-time-label"
    >
      <div class="input-container">
        <div v-show="isLabelActive">
          <input
            ref="inputHour"
            v-model="hour"
            type="text"
            :maxlength="2"
            :readonly="readOnly"
            :disabled="disabled"
            tabindex="1"
            @keydown="filterKeyNumber"
            @click.stop="() => onFocus('hour')"
            @blur="onBlur"
          />
          <span class="time-separator">:</span>
          <input
            ref="inputMinute"
            v-model="minute"
            type="text"
            :maxlength="2"
            :readonly="readOnly"
            :disabled="disabled"
            tabindex="2"
            @keydown="filterKeyNumber"
            @click.stop="() => onFocus('minute')"
            @blur="onBlur"
          />
        </div>
      </div>
    </i-input-label>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import IcClock from '@/icons/ic-clock.vue';

import IInputLabel from './i-input-label.vue';

export default {
  name: 'IInputTime',
  components: {
    IcClock,
    IInputLabel,
  },
  props: {
    value: {
      type: Date,
      default: undefined,
    },
    minDate: {
      type: Date,
      default: null,
    },
    maxDate: {
      type: Date,
      default: null,
    },
    minTime: {
      type: String,
      default: '',
    },
    maxTime: {
      type: String,
      default: '',
    },
    label: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: Boolean,
    invalid: Boolean,
    dark: Boolean,
    borderless: Boolean,
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
  },
  emits: ['input', 'blur', 'focus'],
  data() {
    return {
      hour: '',
      minute: '',
      isFocused: false,
    };
  },
  computed: {
    classes() {
      return {
        dark: this.dark,
        disabled: this.disabled,
        invalid: this.invalid,
        filled: !!this.value,
        borderless: this.borderless,
        sm: this.size === 'sm',
      };
    },
    isLabelActive() {
      return !!this.value || this.isFocused;
    },
    minMaxProps() {
      let minDate;
      let maxDate;
      if (this.minDate) {
        minDate = this.minDate.getTime();
      }
      if (this.maxDate) {
        maxDate = this.maxDate.getTime();
      }

      return `${minDate}|${maxDate}|${this.minTime}|${this.maxTime}`;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.hour = '00';
          this.minute = '00';
        } else {
          const numberHour = this.value.getHours();
          if (numberHour < 10) {
            this.hour = `0${numberHour}`;
          } else {
            this.hour = numberHour.toString();
          }

          const numberMinute = this.value.getMinutes();
          if (numberMinute < 10) {
            this.minute = `0${numberMinute}`;
          } else {
            this.minute = numberMinute.toString();
          }
        }
      },
    },
    minMaxProps() {
      if (this.value) {
        this.$emit('input', this.getValidValue(dayjs(this.value)));
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    getValidValue(value) {
      let validValue = value;

      if (this.minDate && validValue.isBefore(this.minDate)) {
        validValue = dayjs(this.minDate);
      } else if (this.maxDate && validValue.isAfter(this.maxDate)) {
        validValue = dayjs(this.maxDate);
      }

      if (this.minTime) {
        const [minHour, minMinute] = this.minTime.split(':');
        const minDateTime = dayjs(
          new Date(validValue.year(), validValue.month(), validValue.date(), Number(minHour), Number(minMinute)),
        );

        if (validValue.isBefore(minDateTime)) {
          validValue = minDateTime;
        }
      }
      if (this.maxTime) {
        const [maxHour, maxMinute] = this.maxTime.split(':');
        const maxDateTime = dayjs(
          new Date(value.year(), value.month(), value.date(), Number(maxHour), Number(maxMinute)),
        );

        if (validValue.isAfter(maxDateTime)) {
          validValue = maxDateTime;
        }
      }

      return validValue.toDate();
    },
    async onFocus(field) {
      if (this.disabled || this.readOnly) {
        return;
      }

      this.isFocused = true;

      let focusedField = field;
      if (!focusedField) {
        focusedField = 'hour';
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
      }

      switch (focusedField) {
        case 'hour':
          if (this.$refs.inputHour) {
            this.$refs.inputHour.focus();
            this.$refs.inputHour.setSelectionRange(0, 2);
          }
          break;
        case 'minute':
          if (this.$refs.inputMinute) {
            this.$refs.inputMinute.focus();
            this.$refs.inputMinute.setSelectionRange(0, 2);
          }
          break;
        default:
          break;
      }

      this.$emit('focus');
    },
    onBlur() {
      let value = dayjs(this.value);

      let numberHour = Number(this.hour);
      if (numberHour > 23) {
        numberHour = 0;
      }

      let numberMinute = Number(this.minute);
      if (numberMinute > 59) {
        numberMinute = 0;
      }

      value = value.hour(numberHour).minute(numberMinute);

      this.$emit('input', this.getValidValue(value));
    },
    filterKeyNumber(event) {
      const valid = ['Backspace', 'Tab'].includes(event.key) || !Number.isNaN(Number(event.key));
      if (!valid) {
        event.preventDefault();
      }
    },
    onClickOutside(event) {
      const isClickInside = event.composedPath().includes(this.$refs.inputTime);
      if (!isClickInside) {
        this.isFocused = false;
      }
    },
  },
};
</script>

<style>
.i-input-time {
  display: flex;
  height: 68px;
  padding-right: 16px;
  padding-left: 16px;
  color: var(--gray-900);
  background-color: var(--white);
  border: 1px solid var(--gray-400);
  border-radius: 10px;

  &:focus-within {
    border-color: var(--gray-900);
  }

  &.sm {
    height: 60px;
  }

  &.disabled {
    background-color: var(--gray-50);

    input {
      background-color: var(--gray-50);
    }
  }

  &.invalid,
  &.invalid.filled,
  &.invalid.dark {
    border-color: var(--red-400);
  }

  &.filled {
    border-color: var(--gray-900);
  }

  &.dark {
    color: var(--white);
    background-color: var(--gray-900);

    input {
      color: var(--white);
      background-color: var(--gray-900);
    }
  }

  &.borderless {
    border: none;
  }

  .input-icon {
    @apply self-center text-gray-400 mr-2;
  }

  .input-container {
    padding-top: 16px;
    font-size: 16px;
    line-height: 16px;

    @apply border-none text-gray-900 w-full;

    input {
      width: 20px;
      border: none;

      @apply text-base p-0;

      &:focus-visible,
      &:focus {
        outline: none;
      }
    }

    .time-separator {
      padding: 0 4px;
    }
  }

  .input-time-label {
    @apply cursor-text;
  }
}
</style>
