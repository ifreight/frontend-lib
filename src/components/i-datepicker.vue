<template>
  <div class="i-datepicker">
    <div class="i-datepicker--header">
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledPreviousMonth }"
        :disabled="disabledPreviousMonth"
        @click="clickPreviousMultipleMonth"
      >
        <ic-angles-circle direction="left" />
      </button>
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledPreviousMonth }"
        :disabled="disabledPreviousMonth"
        @click="clickPreviousMonth"
      >
        <ic-angle-circle direction="left" />
      </button>
      <div>
        {{ activeMonthYear }}
      </div>
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledNextMonth }"
        :disabled="disabledNextMonth"
        @click="clickNextMonth"
      >
        <ic-angle-circle />
      </button>
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledNextMonth }"
        :disabled="disabledNextMonth"
        @click="clickNextMultipleMonth"
      >
        <ic-angles-circle />
      </button>
    </div>
    <div class="i-datepicker--body">
      <div class="i-datepicker--list-day-wrapper">
        <div
          v-for="day in listDays"
          :key="day"
          class="list-day"
        >
          {{ day }}
        </div>
      </div>
      <div
        ref="refCurrentPick"
        class="i-datepicker--date-list"
      >
        <div
          v-for="date in previousPicker"
          :key="`${date.date()}${date.month()}${date.year()}-previous`"
          class="each-date previous-date disabled"
          :data-tailwind-datepicker="date.date()"
        >
          {{ date.date() }}
        </div>
        <div
          v-for="date in currentPicker"
          :key="`${date.date.date()}${date.date.month()}${date.date.year()}-current`"
          class="each-date"
        >
          <button
            class="i-datepicker-pick"
            :class="{
              selected: isSelectedDate(date.date),
              multiple: pickLimit > 1 || pickLimit === 'any',
              disabled: date.isDisabled,
            }"
            :disabled="date.isDisabled"
            @click="clickDate(date.date)"
          >
            <span>{{ date.date.date() }}</span>
            <div
              v-if="isSelectedDate(date.date) && (pickLimit > 1 || pickLimit === 'any')"
              class="multiple-check-pick-marker"
            >
              <ic-check-circle />
            </div>
          </button>
        </div>
        <div
          v-for="date in nextPicker"
          :key="`${date.date()}${date.month()}${date.year()}-next`"
          class="each-date next-date disabled"
        >
          {{ date.date() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import IcCheckCircle from '@/icons/ic-check-circle.vue';
import IcAngleCircle from '@/icons/ic-angle-circle.vue';
import IcAnglesCircle from '@/icons/ic-angles-circle.vue';

export default {
  name: 'IDatepicker',
  components: {
    IcCheckCircle,
    IcAngleCircle,
    IcAnglesCircle,
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
      type: Date,
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
      activeMonthYear: null,
      selectedDate: [],
    };
  },
  computed: {
    listDays() {
      return Array.from(Array(7), (v, i) =>
        dayjs()
          .day(i + 0)
          .format('ddd'),
      );
    },
    activeDateString() {
      return this.activeDate ? this.activeDate.toString() : undefined;
    },
    previousPicker() {
      const display = [];

      const previous = dayjs(this.activeDateString).date(0);
      const current = dayjs(this.activeDateString).date(0);
      for (let i = 0; i <= current.day(); i += 1) {
        display.push(previous.subtract(i, 'day'));
      }
      return display.sort((a, b) => a.day() - b.day());
    },
    currentPicker() {
      return Array.from(Array(dayjs(this.activeDateString).daysInMonth()), (v, i) => {
        const date = dayjs(this.activeDateString).date(++i);
        const isDisabled = this.checkDateDisabled(dayjs(date).toDate());
        return { date, isDisabled };
      });
    },
    nextPicker() {
      const display = [];
      const previous = this.previousPicker.length;
      const current = dayjs(this.activeDateString).daysInMonth();
      for (let i = 1; i <= 42 - (previous + current); i += 1) {
        display.push(dayjs(this.activeDateString).date(i).add(1, 'month'));
      }
      return display;
    },
    disabledPreviousMonth() {
      const [firstDayCurrent] = this.currentPicker;

      const firstDaySubOne = dayjs(firstDayCurrent.date).subtract(1, 'day');
      return this.checkDateDisabled(new Date(firstDaySubOne.format()));
    },
    disabledNextMonth() {
      const lastDayCurrent = this.currentPicker.slice(-1).pop();
      const lastDayDate = lastDayCurrent ? lastDayCurrent.date : undefined;

      const lastDayAddOne = dayjs(lastDayDate).add(1, 'day');
      return this.checkDateDisabled(new Date(lastDayAddOne.format()));
    },
  },
  watch: {
    activeDate: {
      immediate: true,
      handler(val) {
        if (val) {
          this.activeMonthYear = dayjs(val.toString()).format('MMMM YYYY');
        }
      },
    },
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
  created() {
    this.activeDate = this.initialDate;
  },
  mounted() {
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
    clickDate(date) {
      const findMatchIndex = this.selectedDate.findIndex((d) => dayjs(date).isSame(dayjs(d), 'day'));
      if (findMatchIndex === -1) {
        if (this.pickLimit === 'any' || this.selectedDate.length < this.pickLimit) {
          this.selectedDate.push(dayjs(date).second(0).toDate());
        } else {
          this.selectedDate.shift();
          this.selectedDate.push(dayjs(date).second(0).toDate());
        }
        this.$emit('selectDate', date);
      } else {
        this.selectedDate.splice(findMatchIndex, 1);
      }
    },
    isSelectedDate(date) {
      return this.selectedDate.find((d) => dayjs(date).isSame(dayjs(d), 'day'));
    },
    clickPreviousMonth() {
      this.activeDate = dayjs(this.activeDate.toString()).subtract(1, 'month').toDate();
    },
    clickNextMonth() {
      this.activeDate = dayjs(this.activeDate.toString()).add(1, 'month').toDate();
    },
    checkPrevMonth(i) {
      const latestDateOfMonth = dayjs(this.activeDate.toString()).subtract(i, 'month').endOf('month').toDate();
      return this.checkDateDisabled(latestDateOfMonth);
    },
    checkNextMonth(i) {
      const firstDateOfMonth = dayjs(this.activeDate.toString()).add(i, 'month').startOf('month').toDate();
      return this.checkDateDisabled(firstDateOfMonth);
    },
    async clickPreviousMultipleMonth() {
      let maxMove = 12;
      for (maxMove; maxMove > 0; maxMove -= 1) {
        // eslint-disable-next-line no-await-in-loop
        const res = await this.checkPrevMonth(maxMove);
        if (!res) {
          break;
        }
      }
      this.activeDate = dayjs(this.activeDate.toString()).subtract(maxMove, 'month').toDate();
    },
    async clickNextMultipleMonth() {
      let maxMove = 12;
      for (maxMove; maxMove > 0; maxMove -= 1) {
        // eslint-disable-next-line no-await-in-loop
        const res = await this.checkNextMonth(maxMove);
        if (!res) {
          break;
        }
      }
      this.activeDate = dayjs(this.activeDate.toString()).add(maxMove, 'month').toDate();
    },
  },
};
</script>

<style>
.i-datepicker {
  padding: 4px;

  button {
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
    color: var(--gray-900);

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
