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
          ref="yearButton"
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
        ref="monthYearTable"
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
              :class="{
                selected: isSelectedMonth(month.monthValue),
                disabled: month.idDisabled,
              }"
              :disabled="month.idDisabled"
              @click="clickMonth(month)"
            >
              <div class="btn-month--label">
                {{ month.monthDisplay }}
              </div>
              <div
                v-if="month.isHaveNotification"
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
              disabled: date.isDisabled,
            }"
            :disabled="date.isDisabled"
            @click="clickDate(date.date)"
          >
            <div
              class="date-number"
              :class="{
                red: date.date.day() === 0,
                active: isToday(date.date),
              }"
            >
              <span>{{ date.date.date() }}</span>
            </div>
            <div class="content-container">
              <slot
                name="content"
                :is-selected="isSelectedDate(date.date)"
                :date="date.date.toDate()"
                :content="date.dateContent"
                :index="index"
              />
            </div>
          </button>
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
      type: Date,
      default: undefined,
    },
    initialDate: {
      type: Date,
      default: undefined,
    },
    disabledDate: {
      type: Function,
      default: null,
    },
    calendarContent: {
      type: Array,
      default: () => [],
      validator(value) {
        if (value.length === 0) {
          return true;
        }
        return value.every((d) => !!d.date);
      },
    },
    limitDisplayContent: {
      type: Number,
      default: 3,
    },
    monthIndicatorList: {
      type: Array,
      default: () => [],
      validator(value) {
        if (value.length === 0) {
          return true;
        }
        return value.length === 12 && value.every((d) => typeof d === 'boolean');
      },
    },
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
      const months = Array.from(Array(12), (v, i) => ({
        monthDisplay: dayjs(this.activeYearPicker).month(i).format('MMM'),
        monthValue: dayjs(this.activeYearPicker).month(i).startOf('month'),
        idDisabled: this.checkDateDisabled(dayjs(this.activeYearPicker).month(i).endOf('month')),
        isHaveNotification: this.monthIndicatorList.length > 0 ? this.monthIndicatorList[i] : false,
      }));

      return months;
    },
    activeDateString() {
      return this.activeDate ? this.activeDate.toString() : undefined;
    },
    activeYearPickerString() {
      return this.activeYearPicker ? dayjs(this.activeYearPicker.toString()).format('YYYY') : null;
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
        let dateContent = null;
        if (this.calendarContent.length > 0) {
          const filteredContent = this.calendarContent.filter((val) => {
            return dayjs(val.date).isSame(date, 'day');
          });
          const displayContent = filteredContent.slice(0, this.limitDisplayContent);
          dateContent = {
            allContent: filteredContent,
            displayContent,
          };
        }
        return { date, isDisabled, dateContent };
      });
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
          this.activeMonth = dayjs(val.toString()).format('MMM');
          this.activeYear = dayjs(val.toString()).format('YYYY');
        }
      },
    },
    selectedDate: {
      deep: true,
      handler(val) {
        if (val.length === 0) {
          this.$emit('onSelectDate', undefined);
          this.$emit('input', undefined);
        } else {
          const [first] = val;
          this.$emit('onSelectDate', dayjs(first.toString()).toDate());
          this.$emit('input', dayjs(first.toString()).toDate());
        }
      },
    },
  },
  created() {
    this.activeDate = this.initialDate;
  },
  mounted() {
    if (this.value) {
      this.activeDate = dayjs(this.value ? this.value.toString() : null).toDate();
      this.selectedDate.push(this.activeDate);
    } else if (!this.activeDate) {
      this.activeDate = this.initialDate ? dayjs(this.initialDate.toString()) : dayjs().toDate();
    }
    document.addEventListener('click', this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    checkDateDisabled(date) {
      if (this.disabledDate) {
        return this.disabledDate(date);
      }
      return false;
    },
    clickDate(date) {
      const findMatchIndex = this.selectedDate.findIndex((d) => dayjs(date).isSame(dayjs(d), 'day'));
      if (findMatchIndex === -1) {
        this.selectedDate.shift();
        this.selectedDate.push(dayjs(date).second(0).toDate());
      } else {
        this.selectedDate.splice(findMatchIndex, 1);
      }
    },
    clickMonth(month) {
      this.activeDate = dayjs(month.monthValue.toString()).toDate();
      this.showMonthYearTable = false;
      this.$emit('onChangeCalendar', this.activeDate);
    },
    isSelectedDate(date) {
      return this.selectedDate.find((d) => dayjs(date).isSame(dayjs(d), 'day'));
    },
    isSelectedMonth(date) {
      return dayjs(date).isSame(dayjs(this.activeMonthPicker), 'month');
    },
    clickPreviousMonth() {
      this.activeDate = dayjs(this.activeDate.toString()).subtract(1, 'month').toDate();
      this.$emit('onChangeCalendar', this.activeDate);
    },
    clickNextMonth() {
      this.activeDate = dayjs(this.activeDate.toString()).add(1, 'month').toDate();
      this.$emit('onChangeCalendar', this.activeDate);
    },
    clickPreviousYear() {
      this.activeYearPicker = dayjs(this.activeYearPicker.toString()).subtract(1, 'year').toDate();
      this.$emit('onChangeYear', this.activeYearPicker);
    },
    clickNextYear() {
      this.activeYearPicker = dayjs(this.activeYearPicker.toString()).add(1, 'year').toDate();
      this.$emit('onChangeYear', this.activeYearPicker);
    },
    clickMonthPicker() {
      this.activeMonthPicker = this.activeDate;
      this.activeYearPicker = dayjs(this.activeDate.toString()).format('YYYY');
      this.showMonthYearTable = !this.showMonthYearTable;
      this.$emit('onChangeYear', this.activeYearPicker);
    },
    isToday(date) {
      return dayjs(date).isSame(dayjs(), 'day');
    },
    onClickOutside(event) {
      const isInsideMonth = event.composedPath().includes(this.$refs.monthYearTable);
      const isInsideYearButton = event.composedPath().includes(this.$refs.yearButton);
      if (!isInsideMonth && !isInsideYearButton) {
        this.showMonthYearTable = false;
      }
    },
  },
};
</script>

<style>
.i-calendar {
  width: 100%;

  .each-date {
    width: 14.2857%;
    height: 90px;
    border: 0.8px solid #e6e6e6;

    &.current-date {
      position: relative;
    }

    &.previous-date {
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
      width: 14.2857%;
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

      &.active {
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

      &.disabled {
        cursor: not-allowed;
        background: var(--gray-100);
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
      cursor: not-allowed;
      background: var(--gray-100);
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

        &.disabled {
          color: var(--gray-500);
          cursor: not-allowed;
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
