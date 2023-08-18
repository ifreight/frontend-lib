<template>
  <div class="i-calendar">
    <div class="i-calendar--header">
      <div class="i-calendar--month-year">
        <button
          class="i-calendar--btn-chevron"
          :class="{ disabled: disabledPreviousMonth }"
          :disabled="disabledPreviousMonth"
          @click="clickPreviousMonth"
        >
          <ic-angle-circle
            direction="left"
            class="icon-angle-large"
          />
        </button>
        <button
          class="btn-active-month-year"
          @click="clickMonthPicker"
        >
          <span class="active-month">{{ activeMonth }}</span> <span>{{ activeYear }}</span>
        </button>
        <button
          class="i-calendar--btn-chevron"
          :class="{ disabled: disabledNextMonth }"
          :disabled="disabledNextMonth"
          @click="clickNextMonth"
        >
          <ic-angle-circle
            direction="right"
            class="icon-angle-large"
          />
        </button>
      </div>
      <div class="indicator-color">
        <slot name="indicator" />
      </div>
      <div
        v-if="showMonthYearTable"
        class="floating-month-year-pop-up"
      >
        <div class="year-wrapper">
          <button
            class="i-calendar--btn-chevron"
            :class="{ disabled: disabledPreviousMonth }"
            :disabled="disabledPreviousMonth"
            @click="clickPreviousYear"
          >
            <ic-angle-circle direction="left" />
          </button>
          <div class="active-year">
            <span>{{ activeYearPickerString }}</span>
          </div>
          <button
            class="i-calendar--btn-chevron"
            :class="{ disabled: disabledNextMonth }"
            :disabled="disabledNextMonth"
            @click="clickNextYear"
          >
            <ic-angle-circle direction="right" />
          </button>
        </div>
        <div class="month-wrapper">
          <div
            v-for="(month, key) in listMonth"
            :key="`month-${key}`"
            class="list-month"
          >
            <button
              class="btn-month"
              :class="{ selected: isSelectedMonth(month.monthValue) }"
              @click="clickMonth(month)"
            >
              <div class="btn-month--label">
                {{ month.monthDisplay }}
              </div>
              <div
                v-if="isThereNewUpdate"
                class="new-update-indicator"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="i-calendar--body">
      <div class="i-calendar--list-day-wrapper">
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
        class="i-calendar--date-list"
      >
        <template v-if="previousPicker.length < 7">
          <div
            v-for="date in previousPicker"
            :key="`${date.date()}${date.month()}${date.year()}-previous`"
            class="each-date previous-date"
            :data-tailwind-calendar="date.date()"
          >
            <div class="hidden-date">
              {{ date.date() }}
            </div>
          </div>
        </template>
        <div
          v-for="(date, index) in currentPicker"
          :key="`${date.date.date()}${date.date.month()}${date.date.year()}-current`"
          class="each-date current-date"
        >
          <button
            class="i-calendar-pick"
            :class="{
              selected: isSelectedDate(date.date),
            }"
            @click="clickDate(date.date)"
          >
            <div
              class="date-number"
              :class="{
                red: date.date.day() === 0,
                selected: isSelectedDate(date.date),
              }"
            >
              <span>{{ date.date.date() }}</span>
            </div>
            <div class="content-container">
              <slot
                name="content"
                :is-selected="isSelectedDate(date.date)"
                :date="date.date"
                :index="index"
              />
            </div>
          </button>
        </div>
        <div
          v-for="date in nextPicker"
          :key="`${date.date()}${date.month()}${date.year()}-next`"
          class="each-date next-date"
        >
          <div class="hidden-date">
            {{ date.date() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import IcAngleCircle from '@/icons/ic-angle-circle.vue';

export default {
  name: 'ICalendar',
  components: {
    IcAngleCircle,
  },
  props: {
    value: {
      type: [Date, Array],
      default: () => null,
    },
    initialDate: {
      type: Date,
      default: undefined,
    },
    disabledPreviousMonth: Boolean,
    disabledNextMonth: Boolean,
    isThereNewUpdate: Boolean,
  },
  data() {
    return {
      activeDate: undefined,
      activeMonth: null,
      activeYear: null,
      selectedDate: [],
      activeMonthPicker: undefined,
      activeYearPicker: undefined,
      showMonthYearTable: false,
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
    listMonth() {
      const x = Array.from(Array(12), (v, i) => ({
        monthDisplay: dayjs(this.activeYearPicker)
          .month(i + 0)
          .format('MMM'),
        monthValue: dayjs(this.activeYearPicker)
          .month(i + 0)
          .startOf('month'),
      }));

      return x;
    },
    activeDateString() {
      return this.activeDate ? this.activeDate.toString() : undefined;
    },
    activeYearPickerString() {
      return dayjs(this.activeYearPicker.toString()).format('YYYY');
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
        return { date };
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
  },
  watch: {
    activeDate: {
      immediate: true,
      handler(val) {
        if (val) {
          this.activeMonth = dayjs(val.toString()).format('MMM');
          this.activeYear = dayjs(val.toString()).format('YYYY');
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
      this.clickDate(this.activeDate);
    }
  },
  methods: {
    checkSame(array1, array2) {
      const isSame =
        array1.length === array2.length &&
        array1.every((element, index) => dayjs(element).isSame(array2[index], 'day'));
      return isSame;
    },
    clickDate(date) {
      const findMatchIndex = this.selectedDate.findIndex((d) => dayjs(date).isSame(dayjs(d), 'day'));
      if (findMatchIndex === -1) {
        this.selectedDate.shift();
        this.selectedDate.push(dayjs(date).second(0).toDate());
        this.$emit('onSelectDate');
      } else {
        this.selectedDate.splice(findMatchIndex, 1);
      }
    },
    clickMonth(month) {
      this.activeDate = dayjs(month.monthValue.toString()).toDate();
      this.showMonthYearTable = false;
    },
    isSelectedDate(date) {
      return this.selectedDate.find((d) => dayjs(date).isSame(dayjs(d), 'day'));
    },
    isSelectedMonth(date) {
      return dayjs(date).isSame(dayjs(this.activeMonthPicker), 'month');
    },
    clickPreviousMonth() {
      this.activeDate = dayjs(this.activeDate.toString()).subtract(1, 'month').toDate();
    },
    clickNextMonth() {
      this.activeDate = dayjs(this.activeDate.toString()).add(1, 'month').toDate();
    },
    clickPreviousYear() {
      this.activeYearPicker = dayjs(this.activeYearPicker.toString()).subtract(1, 'year').toDate();
    },
    clickNextYear() {
      this.activeYearPicker = dayjs(this.activeYearPicker.toString()).add(1, 'year').toDate();
    },
    clickMonthPicker() {
      this.activeMonthPicker = this.activeDate;
      this.activeYearPicker = dayjs(this.activeDate.toString()).format('YYYY');
      this.showMonthYearTable = !this.showMonthYearTable;
    },
  },
};
</script>

<style>
.i-calendar {
  width: 735px;

  .each-date {
    width: 105px;
    height: 90px;
    border: 0.8px solid #e6e6e6;

    &.current-date {
      position: relative;
    }

    &.previous-date,
    &.next-date {
      cursor: default;
      border: none !important;
    }

    .hidden-date {
      display: none;
    }
  }

  &--header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;

    .indicator-color {
      position: absolute;
      right: 24px;
    }
  }

  &--body {
    position: relative;
  }

  &--list-day-wrapper {
    display: flex;
    flex-wrap: nowrap;
    padding: 4px 0;
    line-height: normal;
    border-bottom: 1px solid var(--black);

    .list-day {
      display: flex;
      justify-content: center;
      width: 105px;
    }
  }

  &--date-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }

  &--month-year {
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-active-month-year {
      margin: 0 20px;
      font-size: 20px;
      font-weight: bold;

      .active-month {
        color: var(--yellow-700);
      }
    }
  }

  &--btn-chevron {
    color: var(--gray-400);
    cursor: pointer;

    &.disabled {
      color: var(--gray-200);
      cursor: not-allowed;
    }

    .icon-angle-large {
      width: 32px;
      height: 32px;
    }
  }

  .i-calendar-pick {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 500;
    color: var(--gray-900);

    .date-number {
      position: absolute;
      top: 10px;
      left: 2px;
      line-height: normal;

      &.red {
        color: var(--red-400);
      }

      &.selected {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        color: var(--white) !important;
        background: rgb(182 132 0 / 70%);
        border: 1px solid var(--yellow-700);
        border-radius: 50%;
      }
    }

    .content-container {
      line-height: normal;
    }

    &.selected {
      font-weight: 500;
      background: var(--yellow-100);
    }

    &.disabled {
      color: var(--gray-400);
      cursor: not-allowed;
    }
  }

  .floating-month-year-pop-up {
    position: absolute;
    top: 35px;
    z-index: 1;
    width: 326px;
    height: 271px;
    padding: 16px 28px;
    background: #f5f5f5;

    .year-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 214px;
      margin: auto;
      margin-bottom: 32px !important;

      .active-year {
        font-size: 14px;
        font-weight: 600;
      }
    }

    .month-wrapper {
      display: flex;
      flex-wrap: wrap;

      .list-month {
        position: relative;
        display: flex;
        justify-content: center;
        width: 90px;
        margin-bottom: 24px;
      }

      .btn-month {
        position: relative;
        width: 50px;
        border-radius: 4px;

        &--label {
          font-weight: 500;
        }

        &.selected {
          color: var(--white) !important;
          background: rgb(45 45 45 / 50%);
        }

        &:hover:not(.selected) {
          background: var(--gray-200);
        }
      }

      .new-update-indicator {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 6px;
        height: 6px;
        background: #ffd100;
        border-radius: 100px;
      }
    }
  }
}
</style>
