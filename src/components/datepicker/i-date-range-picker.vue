<template>
  <div class="i-date-range-picker">
    <div>
      <date-picker-header
        :active-date="activeDate"
        :check-date-disabled="checkDateDisabled"
        :hide-right-arrow="true"
        @changeSingleMonth="changeMonthLeftHandler"
        @changeMonthYear="changeMonthLeftHandler"
      />
      <date-picker-body
        :active-date="activeDate"
        :selected-date="selectedDate"
        :check-date-disabled="checkDateDisabled"
        :is-date-range="true"
        :hover-temporary-date.sync="hoverTemporaryDate"
        @clickDate="clickDate"
      />
    </div>
    <div class="border-r border-gray-100 border-solid mx-2"></div>
    <div>
      <date-picker-header
        :active-date="activeDateNext"
        :check-date-disabled="checkDateDisabled"
        :hide-left-arrow="true"
        @changeSingleMonth="changeMonthRightHandler"
        @changeMonthYear="changeMonthRightHandler"
      />
      <date-picker-body
        :active-date="activeDateNext"
        :selected-date="selectedDate"
        :check-date-disabled="checkDateDisabled"
        :is-date-range="true"
        :hover-temporary-date.sync="hoverTemporaryDate"
        @clickDate="clickDate"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import DatePickerHeader from '@/components/datepicker/date-picker-header.vue';
import DatePickerBody from '@/components/datepicker/date-picker-body.vue';

export default {
  name: 'IDateRangePicker',
  components: {
    DatePickerHeader,
    DatePickerBody,
  },
  props: {
    value: {
      type: Array,
      default: () => undefined,
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
      activeDateNext: undefined,
      hoverTemporaryDate: undefined,
      selectedDate: [],
      isLoaded: false,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (this.isLoaded) {
          const valueArray = Array.isArray(val) ? val : [val];

          const isValueSame = this.checkSame(valueArray, this.selectedDate);
          if (!isValueSame) {
            this.selectedDate = valueArray.filter((date) => !!date).map((date) => dayjs(date.toString()).toDate());
          }
        }
      },
    },
    selectedDate: {
      handler(val) {
        if (this.isLoaded) {
          if (val.length === 0) {
            this.$emit('input', []);
          } else if (val.length === 2) {
            const extractedDate = val.map((d) => dayjs(d).toDate());
            this.$emit('input', extractedDate);
          }
        }
      },
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.activeDate = dayjs(this.initialDate).toDate();
      this.activeDateNext = dayjs(this.initialDate).add(1, 'month').toDate();

      if (this.value && this.value.length > 0) {
        const [first] = this.value;
        this.activeDate = dayjs(first ? first.toString() : undefined).toDate();
        this.activeDateNext = dayjs(this.activeDate).add(1, 'month').toDate();
        this.selectedDate = this.value.map((date) => (date ? dayjs(date.toString()).toDate() : undefined));
      }

      // have to set this.isLoaded to true with extra nexttick to make the watcher work as expected
      await this.$nextTick();
      this.isLoaded = true;
    });
  },
  methods: {
    checkDateDisabled(date) {
      if (this.disabledDate) {
        return this.disabledDate(date);
      }
      return false;
    },
    changeMonthLeftHandler(date) {
      this.activeDate = date;
      this.activeDateNext = dayjs(date.toString()).add(1, 'month').toDate();
    },
    changeMonthRightHandler(date) {
      this.activeDateNext = date;
      this.activeDate = dayjs(date.toString()).subtract(1, 'month').toDate();
    },
    clickDate(date) {
      if (this.selectedDate.length === 2) {
        this.selectedDate = [];
        this.selectedDate.push(dayjs(date).second(0).toDate());
      } else {
        if (dayjs(date).isBefore(this.selectedDate[0], 'day')) {
          this.selectedDate.unshift(dayjs(date).second(0).toDate());
        } else {
          this.selectedDate.push(dayjs(date).second(0).toDate());
        }

        this.$emit('selectDate', date.toDate());
      }
    },
    checkSame(array1, array2) {
      const isSame =
        array1.length === array2.length &&
        array1.every((element, index) => dayjs(element).isSame(array2[index], 'day'));
      return isSame;
    },
  },
};
</script>

<style>
.i-date-range-picker {
  padding: 4px;
  @apply flex;

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
    width: 100%;
    height: 32px;

    &.current {
      color: var(--gray-900);
    }

    &:not(.disabled) {
      &.next-date,
      &.previous-date {
        font-weight: 500;
        color: var(--gray-400);
      }
    }

    &.selected:not(.next-date, .previous-date) {
      font-weight: 600;
      background-color: var(--yellow-300);
      border-radius: 4px;

      &.is-less {
        border-radius: 4px 0 0 4px;
      }

      &.is-more {
        border-radius: 0 4px 4px 0;
      }
    }

    &.hovered:not(.disabled) {
      font-weight: 600;
      background-color: var(--indigo-100);
      border-radius: 0;
    }

    &.is-between {
      background-color: var(--yellow-100);
    }

    &.disabled {
      color: var(--gray-400);
      cursor: not-allowed;
      opacity: 0.75;
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
