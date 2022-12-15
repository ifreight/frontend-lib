<template>
  <div class="i-tabs">
    <div
      ref="tabHeader"
      class="i-tabs-header"
    >
      <div
        ref="tabHeaderWrapper"
        class="i-tabs-header-wrapper"
        :class="[headerPositionClass, headerClass]"
      >
        <div
          v-for="(pane, key) in panes"
          ref="tabHeaderItems"
          :key="`i-tab-${key}`"
          class="i-tabs-header-item"
          :class="[
            {
              active: pane.name === value,
            },
            headerListClass,
          ]"
          @click.stop="changeActiveTab(pane.name)"
        >
          {{ pane.label }}
        </div>
      </div>
      <div
        v-if="isNavLeftVisible"
        class="i-tabs-header-nav-left"
        @click="clickLeft"
      >
        <ic-angle-circle direction="left" />
      </div>
      <div
        v-if="isNavRightVisible"
        class="i-tabs-header-nav-right"
        @click="clickRight"
      >
        <ic-angle-circle />
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import IcAngleCircle from '@/icons/ic-angle-circle.vue';

export default {
  name: 'ITabs',
  components: {
    IcAngleCircle,
  },
  provide() {
    return {
      rootTabs: this,
    };
  },
  props: {
    value: {
      type: String,
      default: undefined,
    },
    headerClass: {
      type: String,
      default: '',
    },
    headerAlign: {
      type: String,
      default: 'center',
    },
    headerListClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeTab: this.value,
      panes: [],
      scrollHorizontalPosition: 0,
      scrollMaxHorizontal: 0,
    };
  },
  computed: {
    headerPositionClass() {
      switch (this.headerAlign) {
        case 'right':
          return 'text-right';
        case 'center':
          return 'text-center';
        default:
          return 'text-left';
      }
    },
    isNavRightVisible() {
      return this.scrollHorizontalPosition < this.scrollMaxHorizontal;
    },
    isNavLeftVisible() {
      return this.scrollHorizontalPosition > 0;
    },
  },
  watch: {
    tabHeaderItemsLength: {
      immediate: true,
      handler(val) {
        const tabHeaderWrapperRef = this.$refs.tabHeaderWrapper;
        if (val > 0) {
          const scrollWidth = tabHeaderWrapperRef ? tabHeaderWrapperRef.scrollWidth : 0;
          const clientWidth = tabHeaderWrapperRef ? tabHeaderWrapperRef.clientWidth : 0;
          this.scrollMaxHorizontal = scrollWidth - clientWidth;
        }
      },
    },
    value(val) {
      if (val !== this.activeTab) {
        this.$emit('change', val);
        this.activeTab = val;
      }
    },
  },
  created() {
    this.$on('tab-pane-update', this.loadPaneInstances.bind(null, true));
  },
  mounted() {
    this.loadPaneInstances();

    const tabHeaderWrapperRef = this.$refs.tabHeaderWrapper;
    if (tabHeaderWrapperRef) {
      this.scrollHorizontalPosition = tabHeaderWrapperRef.scrollLeft;
      tabHeaderWrapperRef.addEventListener('scroll', this.scrollHandler);
    }
  },
  updated() {
    this.loadPaneInstances();
  },
  methods: {
    loadPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(
          (vnode) => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ITabPane',
        );

        const panes = paneSlots.map(({ componentInstance }) => componentInstance);
        const panesChanged = !(
          panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index])
        );
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }

      const tabHeaderWrapperRef = this.$refs.tabHeaderWrapper;
      const scrollWidth = tabHeaderWrapperRef ? tabHeaderWrapperRef.scrollWidth : 0;
      const clientWidth = tabHeaderWrapperRef ? tabHeaderWrapperRef.clientWidth : 0;
      this.scrollMaxHorizontal = scrollWidth - clientWidth;
    },
    scrollHandler(e) {
      this.scrollHorizontalPosition = e.target.scrollLeft;
    },
    clickRight() {
      this.$refs.tabHeaderWrapper.scrollLeft += 75;
    },
    clickLeft() {
      this.$refs.tabHeaderWrapper.scrollLeft -= 75;
    },
    changeActiveTab(name) {
      this.$emit('input', name);

      if (this.value == null) {
        this.$emit('change', name);
        this.activeTab = name;
      }
    },
  },
};
</script>

<style>
.i-tabs {
  .i-tabs-header {
    position: relative;

    .i-tabs-header-wrapper {
      -ms-overflow-style: none;
      scrollbar-width: none;

      @apply block items-center border-b-[0.8px] border-gray-400 whitespace-nowrap overflow-x-scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .i-tabs-header-item {
        @apply w-fit text-xs mx-4 inline-block text-center cursor-pointer pb-2.5 border-b-2 border-b-transparent;

        &.active {
          @apply border-b-gray-900 font-bold;
        }

        &:first-child {
          @apply ml-0;
        }

        &:last-child {
          @apply mr-0;
        }
      }
    }

    .i-tabs-header-nav-right {
      @apply cursor-pointer flex justify-end items-center absolute -right-[1px] top-[8px] w-6 h-4 text-right;

      background: linear-gradient(270deg, #f9f9f9 40%, rgb(255 255 255 / 0%) 150%);
    }

    .i-tabs-header-nav-left {
      @apply cursor-pointer flex justify-start items-center absolute -left-[1px] top-[8px] w-6 h-4 text-left;

      background: linear-gradient(90deg, #f9f9f9 40%, rgb(255 255 255 / 0%) 150%);
    }
  }
}
</style>
