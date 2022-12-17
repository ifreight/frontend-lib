<template>
  <div
    class="i-pagination"
    :class="wrapperClass"
  >
    <div
      v-if="showDataCount"
      class="i-pagination-data-count"
    >
      {{ paginationDataCount }} of {{ total }}
    </div>

    <div class="i-pagination-container">
      <template v-if="showNavigation">
        <button
          class="angle angles-left"
          :class="{ disabled: disableLeftAngle }"
          :disabled="disableLeftAngle"
          @click="clickLeftAngles"
        >
          <ic-angles-left />
        </button>
        <button
          class="angle angle-left"
          :class="{ disabled: disableLeftAngle }"
          :disabled="disableLeftAngle"
          @click="clickLeftAngle"
        >
          <ic-angle-left />
        </button>
      </template>
      <div
        class="number"
        :class="[
          numberClass,
          {
            active: activePage === 1,
          },
        ]"
        @click="changePage(1)"
      >
        1
      </div>
      <div
        v-if="isShowFirstInterval"
        class="interval"
      >
        ...
      </div>
      <div
        v-for="page in middlePage"
        :key="page"
        class="number"
        :class="[
          numberClass,
          {
            active: activePage === page,
          },
        ]"
        @click="changePage(page)"
      >
        {{ page }}
      </div>
      <div
        v-if="!isHideLastInterval"
        class="interval"
      >
        ...
      </div>
      <div
        v-if="lastPage"
        class="number"
        :class="[
          numberClass,
          {
            active: activePage === lastPage,
          },
        ]"
        @click="changePage(lastPage)"
      >
        {{ lastPage }}
      </div>
      <template v-if="showNavigation">
        <button
          class="angle angle-right"
          :class="{ disabled: disableRightAngle }"
          :disabled="disableRightAngle"
          @click="clickRightAngle"
        >
          <ic-angle-right />
        </button>
        <button
          class="angle angles-right"
          :class="{ disabled: disableRightAngle }"
          :disabled="disableRightAngle"
          @click="clickRightAngles"
        >
          <ic-angles-right />
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import IcAngleLeft from '@/icons/ic-angle-left.vue';
import IcAngleRight from '@/icons/ic-angle-right.vue';
import IcAnglesLeft from '@/icons/ic-angles-left.vue';
import IcAnglesRight from '@/icons/ic-angles-right.vue';

export default {
  name: 'IPagination',
  components: {
    IcAngleLeft,
    IcAngleRight,
    IcAnglesLeft,
    IcAnglesRight,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    wrapperClass: {
      type: String,
      default: '',
    },
    numberClass: {
      type: String,
      default: '',
    },
    showNavigation: {
      type: Boolean,
      default: true,
    },
    showDataCount: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activePage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    lastPage() {
      return this.totalPages > 1 ? this.totalPages : null;
    },
    upperLimit() {
      return Math.floor(this.pagerCount / 2);
    },
    isShowFirstInterval() {
      if (this.totalPages <= this.pagerCount) {
        return false;
      }
      return this.activePage - (this.pagerCount - this.upperLimit) >= 1;
    },
    isHideLastInterval() {
      if (this.totalPages <= this.pagerCount) {
        return true;
      }
      return this.activePage + this.upperLimit >= this.totalPages;
    },
    startLoopNumber() {
      let start = 2; // dynamic variable
      const middleNumber = this.pagerCount - start; // the number of pages that appear in the middle section
      if (this.totalPages > middleNumber && this.totalPages > this.pagerCount) {
        if (this.isShowFirstInterval) {
          start = this.activePage - (this.upperLimit - 1);
        }
        if (this.isHideLastInterval) {
          start = this.activePage - (middleNumber - (this.totalPages - this.activePage));
        }
      }
      return start;
    },
    limitLoop() {
      return this.pagerCount > this.totalPages ? this.totalPages - 2 : this.pagerCount - 2;
    },
    middlePage() {
      const midPage = [];
      const startPage = this.startLoopNumber;
      for (let i = 0; i < this.limitLoop; i += 1) {
        midPage.push(startPage + i);
      }
      return midPage;
    },
    disableLeftAngle() {
      return this.activePage === 1;
    },
    disableRightAngle() {
      if (!this.lastPage) {
        return true;
      }
      return this.activePage === this.lastPage;
    },
    paginationDataCount() {
      const startDataCount = (this.activePage - 1) * this.pageSize + 1;

      let endDataCount = 0;
      if (this.activePage >= this.lastPage) {
        endDataCount = this.total;
      } else {
        endDataCount = this.activePage * this.pageSize;
      }

      return `${startDataCount}-${endDataCount}`;
    },
  },
  watch: {
    activePage: {
      handler(val) {
        this.$emit('update:currentPage', val);
      },
    },
    currentPage: {
      immediate: true,
      handler(val) {
        if (this.activePage !== val) {
          this.activePage = val;
        }
      },
    },
  },
  methods: {
    changePage(val) {
      this.activePage = val;
      this.$emit('currentChange', val);
    },
    clickLeftAngle() {
      this.changePage(this.activePage - 1);
    },
    clickLeftAngles() {
      let resolvedPage;
      if (this.activePage - 10 < 1) {
        resolvedPage = 1;
      } else {
        resolvedPage = this.activePage - 10;
      }

      this.changePage(resolvedPage);
    },
    clickRightAngle() {
      this.changePage(this.activePage + 1);
    },
    clickRightAngles() {
      let resolvedPage;
      if (this.activePage + 10 > this.totalPages) {
        resolvedPage = this.totalPages;
      } else {
        resolvedPage = this.activePage + 10;
      }

      this.changePage(resolvedPage);
    },
  },
};
</script>

<style>
.i-pagination {
  display: flex;
  justify-content: space-between;

  .i-pagination-data-count {
    @apply text-sm text-gray-400 flex items-center;
  }

  .i-pagination-container {
    display: flex;

    .number,
    .interval {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gray-400);
    }

    .interval {
      display: inline-block;
      margin: 0 12px;
    }

    .angle {
      color: var(--yellow-700);
      cursor: pointer;
      background: none;

      &.angle-left {
        margin-right: 7px;
      }

      &.angle-right {
        margin-left: 7px;
      }

      &.angles-left {
        margin-right: 20px;
      }

      &.angles-right {
        margin-left: 20px;
      }

      &.disabled {
        color: var(--gray-400);
        cursor: default;
      }
    }

    .number {
      min-width: 19px;
      margin: 0 12px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;

      &.active {
        margin-bottom: -1px;
        color: var(--yellow-700);
        cursor: default;
        border-bottom: 1px solid var(--yellow-700);
      }
    }
  }
}
</style>
