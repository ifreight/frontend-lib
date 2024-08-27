<template>
  <div class="i-datepicker">
    <date-picker-header
      :active-date="activeDate"
      :check-date-disabled="checkDateDisabled"
      @changeSingleMonth="changeMonthHandler"
      @changeMonthYear="changeMonthHandler"
    />
    <date-picker-body
      :active-date="activeDate"
      :selected-date="selectedDate"
      :pick-limit="pickLimit"
      :check-date-disabled="checkDateDisabled"
      @clickDate="clickDate"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';

import DatePickerHeader from '@/components/datepicker/date-picker-header.vue';
import DatePickerBody from '@/components/datepicker/date-picker-body.vue';

export default {
  name: 'IDatepicker',
  components: {
    DatePickerHeader,
    DatePickerBody,
  },
  props: {
    value: {
      type: [Date, Array],
      default: () => null,
    },
    pickLimit: {
      type: [Number, String],
      default: 1,
    },
    initialDate: {
      type: [Date, String],
      default: undefined,
    },
    disabledDate: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      activeDate: undefined,
      selectedDate: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        const valueArray = Array.isArray(val) ? val : [val];

        const isValueSame = this.checkSame(valueArray, this.selectedDate);
        if (!isValueSame) {
          this.selectedDate = valueArray.filter((date) => !!date).map((date) => dayjs(date.toString()).toDate());
        }
      },
    },
    selectedDate: {
      deep: true,
      handler(val) {
        if (val.length === 0) {
          this.$emit('input', this.pickLimit > 1 ? [] : undefined);
          return;
        }

        if (this.pickLimit <= 1) {
          const [first] = val;
          this.$emit('input', dayjs(first.toString()).toDate());
        } else {
          const extractedDate = val.map((d) => dayjs(d).toDate());
          this.$emit('input', extractedDate);
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.initialDate) {
        this.activeDate = dayjs(this.initialDate).toDate();
      }
      if (this.value) {
        if (Array.isArray(this.value)) {
          if (this.value.length > 0) {
            const [first] = this.value;
            this.activeDate = dayjs(first.toString()).toDate();
            const results = this.value.map((date) => dayjs(date.toString()).toDate());
            this.selectedDate = results;
          } else {
            this.activeDate = dayjs().toDate();
          }
        } else {
          this.activeDate = dayjs(this.value ? this.value.toString() : null).toDate();
          this.selectedDate.push(this.activeDate);
        }
      } else if (!this.activeDate) {
        this.activeDate = dayjs().toDate();
      }
    });
  },
  methods: {
    checkSame(array1, array2) {
      const isSame =
        array1.length === array2.length &&
        array1.every((element, index) => dayjs(element).isSame(array2[index], 'day'));
      return isSame;
    },
    checkDateDisabled(date) {
      if (this.disabledDate) {
        return this.disabledDate(date);
      }
      return false;
    },
    clickDate(date, param) {
      const findMatchIndex = this.selectedDate.findIndex((d) => dayjs(date).isSame(dayjs(d), 'day'));
      if (findMatchIndex === -1) {
        if (this.pickLimit === 'any' || this.selectedDate.length < this.pickLimit) {
          this.selectedDate.push(dayjs(date).second(0).toDate());
        } else {
          this.selectedDate.shift();
          this.selectedDate.push(dayjs(date).second(0).toDate());
        }
        this.$emit('selectDate', date.toDate());
      } else {
        this.selectedDate.splice(findMatchIndex, 1);
      }

      if (param === 'prev') {
        this.activeDate = dayjs(this.activeDate.toString()).subtract(1, 'month').toDate();
      } else if (param === 'next') {
        this.activeDate = dayjs(this.activeDate.toString()).add(1, 'month').toDate();
      }
    },
    changeMonthHandler(date) {
      this.activeDate = date;
    },
  },
};
</script>

<style>
.i-datepicker {
  padding: 4px;

  button {
    cursor: pointer;
    background: none;
  }

  .each-date {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14.2857%;
    height: 32px;
    margin: 4px 0;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
    }

    &.next-date,
    &.previous-date {
      font-weight: 500;
      color: var(--gray-400);
      opacity: 0.75;
    }
  }

  &--header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;

    > * {
      margin: 0 6px;
    }

    &--nav-btn {
      color: var(--gray-400);
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.disabled {
        color: var(--gray-200);
        cursor: not-allowed;
      }
    }
  }

  &--body {
    position: relative;
  }

  &--list-day-wrapper {
    display: flex;
    flex-wrap: nowrap !important;
    padding: 8px 0;

    .list-day {
      display: flex;
      justify-content: center;
      width: 14.2857%;
      margin: 4px 0;
      font-size: 10px;
      line-height: 1.625;
      color: var(--gray-400);
      text-transform: uppercase !important;
    }
  }

  &--date-list {
    position: relative;
    display: flex;
    flex-wrap: wrap !important;
  }

  .i-datepicker-pick {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;

    &.current {
      color: var(--gray-900);
    }

    &.selected {
      font-weight: 600;
      background-color: var(--yellow-300);
      border-radius: 4px;
    }

    &.disabled {
      color: var(--gray-400);
      cursor: not-allowed;
    }
  }

  .multiple-check-pick-marker {
    position: absolute;
    right: -4px;
    bottom: -4px;
    color: var(--gray-900);
  }
}
</style>
