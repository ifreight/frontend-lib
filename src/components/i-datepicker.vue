<template>
  <div class="i-datepicker">
    <div class="i-datepicker--header">
      <button
        class="i-datepicker--btn-chevron mr-3"
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
        class="i-datepicker--btn-chevron ml-3"
        :class="{ disabled: disabledNextMonth }"
        :disabled="disabledNextMonth"
        @click="clickNextMonth"
      >
        <ic-angle-circle />
      </button>
    </div>
    <div class="i-datepicker--body">
      <div class="relative">
        <div class="flex flex-nowrap py-2">
          <div
            v-for="day in listDays"
            :key="day"
            class="each-date flex justify-center"
          >
            <div class="leading-relaxed uppercase text-gray-400 text-[10px]">
              {{ day }}
            </div>
          </div>
        </div>
        <div
          ref="refCurrentPick"
          class="flex flex-wrap relative"
        >
          <div
            v-for="date in previousPicker"
            :key="`${date.date()}${date.month()}${date.year()}-previous`"
            class="each-date flex justify-center my-1 cursor-not-allowed"
          >
            <div
              class="h-8 w-8 flex justify-center items-center"
              :data-tailwind-datepicker="date.date()"
            >
              <div class="text-xs opacity-75 text-gray-400 font-medium">
                {{ date.date() }}
              </div>
            </div>
          </div>
          <div
            v-for="date in currentPicker"
            :key="`${date.date.date()}${date.date.month()}${date.date.year()}-current`"
            class="each-date relative group flex justify-center items-center my-1 cursor-pointer"
          >
            <div class="relative">
              <button
                class="i-datepicker-pick h-8 w-8 flex justify-center items-center"
                :class="{
                  selected: isSelectedDate(date.date),
                  multiple: pickLimit > 1 || pickLimit === 'any',
                  disabled: date.isDisabled,
                }"
                :disabled="date.isDisabled"
                @click="clickDate(date.date)"
              >
                <div class="flex justify-center items-center">
                  <span>{{ date.date.date() }}</span>
                </div>
                <div
                  v-if="isSelectedDate(date.date) && (pickLimit > 1 || pickLimit === 'any')"
                  class="multiple-check-pick-marker"
                >
                  <ic-check />
                </div>
              </button>
            </div>
          </div>
          <div
            v-for="date in nextPicker"
            :key="`${date.date()}${date.month()}${date.year()}-next`"
            class="each-date flex justify-center my-1 cursor-not-allowed"
          >
            <div class="h-8 w-8 flex justify-center items-center">
              <div class="text-xs opacity-75 text-gray-400 font-medium">
                {{ date.date() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import IcCheck from '@/icons/ic-check.vue';
import IcAngleCircle from '@/icons/ic-angle-circle.vue';

export default {
  name: 'IDatepicker',
  components: {
    IcCheck,
    IcAngleCircle,
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
        return !this.disabledDate(date);
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
        this.$emit('selectDate');
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
  },
};
</script>

<style>
.i-datepicker {
  padding: 4px;

  .each-date {
    width: 14.2857%;
  }

  &--header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }

  &--btn-chevron {
    @apply text-gray-400 cursor-pointer;

    &.disabled {
      @apply text-gray-200 cursor-not-allowed;
    }
  }

  .i-datepicker-pick {
    @apply text-gray-900 text-xs font-medium;

    &.selected {
      @apply bg-yellow-300 rounded font-semibold;
    }

    &.disabled {
      @apply text-gray-400 cursor-not-allowed;
    }
  }

  .multiple-check-pick-marker {
    @apply absolute -right-1 -bottom-1;
  }
}
</style>
