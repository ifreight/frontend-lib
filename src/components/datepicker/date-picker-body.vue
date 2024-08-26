<template>
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
        :key="`${date.date.date()}${date.date.month()}${date.date.year()}-previous`"
        class="each-date previous-date"
        :class="{
          disabled: isDateRange,
        }"
      >
        <button
          v-if="!isDateRange"
          class="i-datepicker-pick"
          :class="{
            selected: isSelectedDate(date.date),
            multiple: pickLimit > 1 || pickLimit === 'any',
            disabled: date.isDisabled,
          }"
          :disabled="date.isDisabled"
          @click="clickDate(date.date, 'prev')"
        >
          <span>{{ date.date.date() }}</span>
          <div
            v-if="isSelectedDate(date.date) && (pickLimit > 1 || pickLimit === 'any')"
            class="multiple-check-pick-marker"
          >
            <ic-check-circle />
          </div>
        </button>
        <span v-else>{{ date.date.date() }}</span>
      </div>
      <div
        v-for="date in currentPicker"
        :key="`${date.date.date()}${date.date.month()}${date.date.year()}-current`"
        class="each-date"
      >
        <button
          class="i-datepicker-pick current"
          :class="[
            dateRangeSelectedMarker(date.date),
            {
              selected: isSelectedDate(date.date),
              hovered: isHovered(date.date),
              'is-between': isBetweenDateRange(date.date),
              multiple: pickLimit > 1 || pickLimit === 'any',
              disabled: date.isDisabled,
            },
          ]"
          :disabled="date.isDisabled"
          @click="clickDate(date.date)"
          @mouseover="hoverDate(date.date)"
          @mouseleave="leaveDate"
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
        :key="`${date.date.date()}${date.date.month()}${date.date.year()}-next`"
        class="each-date next-date"
        :class="{
          disabled: isDateRange,
        }"
      >
        <button
          v-if="!isDateRange"
          class="i-datepicker-pick"
          :class="{
            selected: isSelectedDate(date.date),
            multiple: pickLimit > 1 || pickLimit === 'any',
            disabled: date.isDisabled,
          }"
          :disabled="date.isDisabled"
          @click="clickDate(date.date, 'next')"
        >
          <span>{{ date.date.date() }}</span>
          <div
            v-if="isSelectedDate(date.date) && (pickLimit > 1 || pickLimit === 'any')"
            class="multiple-check-pick-marker"
          >
            <ic-check-circle />
          </div>
        </button>
        <span v-else>{{ date.date.date() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import IcCheckCircle from '@/icons/ic-check-circle.vue';

dayjs.extend(isBetween);

export default {
  components: {
    IcCheckCircle,
  },
  props: {
    activeDate: {
      type: Date,
      default: undefined,
    },
    hoverTemporaryDate: {
      type: [Date, Object],
      default: undefined,
    },
    selectedDate: {
      type: Array,
      default: () => [],
    },
    pickLimit: {
      type: [Number, String],
      default: 1,
    },
    checkDateDisabled: {
      type: Function,
      required: true,
    },
    isDateRange: {
      type: Boolean,
      default: false,
    },
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
        display.push({
          date: previous.subtract(i, 'day'),
          isDisabled: this.checkDateDisabled(dayjs(previous.subtract(i, 'day')).toDate()),
        });
      }
      return display.sort((a, b) => a.date.day() - b.date.day());
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
        display.push({
          date: dayjs(this.activeDateString).date(i).add(1, 'month'),
          isDisabled: this.checkDateDisabled(dayjs(this.activeDateString).date(i).add(1, 'month')),
        });
      }
      return display;
    },
  },
  methods: {
    clickDate(date, param) {
      this.$emit('clickDate', date, param);
      this.$emit('update:hoverTemporaryDate', undefined);
    },
    isSelectedDate(date) {
      return this.selectedDate.find((d) => dayjs(date).isSame(dayjs(d), 'day'));
    },
    isHovered(date) {
      if (this.hoverTemporaryDate) {
        return dayjs(date).isSame(dayjs(this.hoverTemporaryDate), 'day');
      }
    },
    hoverDate(date) {
      if (this.isDateRange && this.selectedDate.length === 1) {
        this.$emit('update:hoverTemporaryDate', date);
      }
    },
    isBetweenDateRange(date) {
      if (this.isDateRange) {
        if (this.selectedDate.length === 2) {
          const [first, second] = this.selectedDate;
          return dayjs(date).isBetween(dayjs(first), dayjs(second), 'day');
        }
        if (this.selectedDate.length === 1 && this.hoverTemporaryDate) {
          const [first] = this.selectedDate;
          return dayjs(date).isBetween(dayjs(first), dayjs(this.hoverTemporaryDate), 'day');
        }
      }
    },
    leaveDate() {
      this.$emit('update:hoverTemporaryDate', undefined);
    },
    dateRangeSelectedMarker(date) {
      if (this.isDateRange && this.selectedDate.length > 0) {
        const [first, second] = this.selectedDate;
        if (dayjs(first).isSame(second, 'day')) {
          return;
        }
        if (dayjs(first).isSame(date, 'day')) {
          if (this.hoverTemporaryDate || !!second) {
            return dayjs(date).isBefore(this.hoverTemporaryDate || second, 'day') ? 'is-less' : 'is-more';
          }
        }
        if (second) {
          if (dayjs(second).isSame(date, 'day')) {
            return dayjs(date).isBefore(first, 'day') ? 'is-less' : 'is-more';
          }
        }
      }
    },
  },
};
</script>
