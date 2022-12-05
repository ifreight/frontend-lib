<template>
  <div
    class="i-pagination"
    :class="wrapperClass"
  >
    <template v-if="showAngle">
      <button
        class="mr-[20px] angle"
        :class="{ 'disabled': disableLeftAngle }"
        :disabled="disableLeftAngle"
        @click="clickLeftAngles"
      >
        <ic-angles-left />
      </button>
      <button
        class="mr-[7px] angle"
        :class="{ 'disabled': disableLeftAngle }"
        :disabled="disableLeftAngle"
        @click="clickLeftAngle"
      >
        <ic-angle-left />
      </button>
    </template>
    <div
      class="number"
      :class="[ numberClass ,
        {
          'active': activePage === 1,
        }
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
      :class="[ numberClass ,
        {
          'active': activePage === page,
        }
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
      :class="[ numberClass ,
        {
           'active': activePage === lastPage,
        }
      ]"
      @click="changePage(lastPage)"
    >
      {{ lastPage }}
    </div>
    <template v-if="showAngle">
      <button
        class="ml-[7px] angle"
        :class="{ 'disabled': disableRightAngle }"
        :disabled="disableRightAngle"
        @click="clickRightAngle"
      >
        <ic-angle-right />
      </button>
      <button
        class="ml-[20px] angle"
        :class="{ 'disabled': disableRightAngle }"
        :disabled="disableRightAngle"
        @click="clickRightAngles"
      >
        <ic-angles-right />
      </button>
    </template>
  </div>
</template>

<script>
import IcAngleLeft from '@/icons/ic-angle-left.vue';
import IcAngleRight from '@/icons/ic-angle-right.vue';
import IcAnglesLeft from '@/icons/ic-angles-left.vue';
import IcAnglesRight from '@/icons/ic-angles-right.vue';

export default {
  name: 'IPagination',
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
    limitVisiblePage: {
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
    showAngle: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    IcAngleLeft,
    IcAngleRight,
    IcAnglesLeft,
    IcAnglesRight,
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
      return Math.floor(this.limitVisiblePage / 2);
    },
    isShowFirstInterval() {
      if (this.totalPages <= this.limitVisiblePage) {
        return false;
      }
      return this.activePage - (this.limitVisiblePage - this.upperLimit) >= 1;
    },
    isHideLastInterval() {
      if (this.totalPages <= this.limitVisiblePage) {
        return true;
      }
      return this.activePage + this.upperLimit >= this.totalPages;
    },
    startLoopNumber() {
      let start = 2; // dynamic variable
      const middleNumber = this.limitVisiblePage - start; // the number of pages that appear in the middle section
      if (this.totalPages > middleNumber && this.totalPages > this.limitVisiblePage) {
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
      return this.limitVisiblePage > this.totalPages ? this.totalPages - 2 : this.limitVisiblePage - 2;
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
  },
  created() {
    this.activePage = this.currentPage;
  },
  watch: {
    activePage: {
      handler(val) {
        this.$emit('update:currentPage', val);
        this.$emit('currentChange', val);
      },
    },
  },
  methods: {
    changePage(val) {
      this.activePage = val;
    },
    clickLeftAngle() {
      this.activePage -= 1;
    },
    clickLeftAngles() {
      if (this.activePage - 10 < 1) {
        this.activePage = 1;
      } else {
        this.activePage -= 10;
      }
    },
    clickRightAngle() {
      this.activePage += 1;
    },
    clickRightAngles() {
      if (this.activePage + 10 > this.totalPages) {
        this.activePage = this.totalPages;
      } else {
        this.activePage += 10;
      }
    },
  },
};
</script>

<style>
.i-pagination {
  display: flex;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-400);
  }

  .interval {
    margin: 0px 12px;
  }

  .angle {
    cursor: pointer;
    color: var(--yellow-700);

    &.disabled {
      cursor: default;
      color: var(--gray-400);
    }
  }

  .number {
    cursor: pointer;
    min-width: 19px;
    text-align: center;
    margin: 0px 12px;
    font-size: 16px;
    font-weight: 500;

    &.active {
      color: var(--yellow-700);
      cursor: default;
      border-bottom: 1px solid var(--yellow-700);
      margin-bottom: -1px;
    }
  }
  .interval {
    display: inline-block;
  }
}
</style>
