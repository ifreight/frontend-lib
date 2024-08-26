<template>
  <div class="i-datepicker--header">
    <template v-if="!hideLeftArrow">
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
    </template>
    <div>
      {{ activeMonthYear }}
    </div>
    <template v-if="!hideRightArrow">
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
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import IcAngleCircle from '@/icons/ic-angle-circle.vue';
import IcAnglesCircle from '@/icons/ic-angles-circle.vue';

export default {
  components: {
    IcAngleCircle,
    IcAnglesCircle,
  },
  props: {
    activeDate: {
      type: Date,
      default: undefined,
    },
    checkDateDisabled: {
      type: Function,
      required: true,
    },
    hideLeftArrow: Boolean,
    hideRightArrow: Boolean,
  },
  computed: {
    activeDateString() {
      return this.activeDate ? this.activeDate.toString() : undefined;
    },
    activeMonthYear() {
      if (this.activeDate) {
        return dayjs(this.activeDate.toString()).format('MMMM YYYY');
      }
      return null;
    },
    currentPicker() {
      return Array.from(Array(dayjs(this.activeDateString).daysInMonth()), (v, i) => {
        const date = dayjs(this.activeDateString).date(++i);
        const isDisabled = this.checkDateDisabled(dayjs(date).toDate());
        return { date, isDisabled };
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
  methods: {
    clickPreviousMonth() {
      this.$emit('changeSingleMonth', dayjs(this.activeDate.toString()).subtract(1, 'month').toDate());
    },
    clickNextMonth() {
      this.$emit('changeSingleMonth', dayjs(this.activeDate.toString()).add(1, 'month').toDate());
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
      this.$emit('changeMonthYear', dayjs(this.activeDate.toString()).subtract(maxMove, 'month').toDate());
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
      this.$emit('changeMonthYear', dayjs(this.activeDate.toString()).add(maxMove, 'month').toDate());
    },
  },
};
</script>
