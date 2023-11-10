<template>
  <div
    class="accordion-item-container"
    :class="{
      active: isActive,
      before: beforeActiveItem,
      after: afterActiveItem,
    }"
  >
    <div
      class="accordion-item-header"
      @click.stop="handleClick"
    >
      <slot name="header" />
      <div class="header-icon">
        <ic-angle
          class="icon"
          :class="isActive ? '-rotate-90' : 'rotate-90'"
        />
      </div>
    </div>
    <transition name="slide">
      <div
        v-if="isActive"
        class="accordion-item-content"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import IcAngle from '@/icons/ic-angle.vue';

export default {
  name: 'IAccordionItem',
  components: {
    IcAngle,
  },
  inject: ['provideData', 'handleClickEvent'],
  props: {
    name: {
      type: [String, Number],
      default: () => Math.floor(Math.random() * 10000),
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ['click'],
  computed: {
    isActive() {
      return this.provideData.activeName.includes(this.name);
    },
    currentActiveIndex() {
      const activeIndex = [];
      this.provideData.activeName.forEach((item) => {
        const i = this.provideData.itemList.indexOf(item);
        activeIndex.push(i);
      });
      return activeIndex;
    },
    beforeActiveItem() {
      return this.currentActiveIndex.includes(this.itemIndex + 1);
    },
    afterActiveItem() {
      return this.currentActiveIndex.includes(this.itemIndex - 1);
    },
    itemIndex() {
      return Number(this.provideData.itemList.indexOf(this.name));
    },
  },
  beforeUnmount() {
    this.provideData.itemList.splice(this.itemIndex, 1);
  },
  mounted() {
    this.$nextTick(() => {
      if (this.itemIndex === -1 && this.provideData.itemList !== undefined) {
        this.$set(this.provideData.itemList, this.index, this.name);
      }
    });
  },
  methods: {
    handleClick() {
      this.$emit('click', this.name);
      this.handleClickEvent(this.name);
    },
  },
};
</script>

<style>
.accordion-item-container {
  border: 1px solid;
  border-color: var(--gray-200) var(--gray-400);

  .accordion-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    cursor: pointer;

    .header-icon {
      width: 32px;
      height: 32px;
      text-align: center;
      border-radius: 50%;

      .icon {
        height: 100%;
        margin: 0 auto;
      }
    }
  }

  .accordion-item-content {
    padding: 20px;
    border-top: 1px solid var(--gray-200);
  }

  &:hover {
    .accordion-item-header {
      box-shadow: 0 4px 4px rgb(45 45 45 / 10%);
    }

    .header-icon {
      background-color: var(--gray-200);
    }
  }

  &.active {
    margin-top: 8px;
    margin-bottom: 8px;
    border: 1px solid var(--gray-400);
    border-radius: 8px;

    .accordion-item-header {
      border: none;
    }
  }

  &.before {
    border-bottom-color: var(--gray-400);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &.after {
    border-top-color: var(--gray-400);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:first-child {
    border-top-color: var(--gray-400);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-color: var(--gray-400);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
</style>
