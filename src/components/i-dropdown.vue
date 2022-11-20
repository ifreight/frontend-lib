<template>
  <div
    class="i-dropdown"
    :class="openDirection"
  >
    <div
      ref="reference"
      class="i-dropdown-reference"
    />

    <div
      v-show="isVisible"
      class="i-dropdown-arrow"
    >
      <span :style="arrowStyles" />
    </div>

    <div
      v-show="isVisible"
      class="i-dropdown-box"
    >
      <div
        v-if="$slots.header"
        class="i-dropdown-header"
      >
        <slot name="header" />
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IDropdown',
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      offsetHeight: 0,
      openDirection: 'below',
    };
  },
  computed: {
    arrowStyles() {
      if (this.openDirection === 'below') {
        return {
          top: '-7px',
        };
      }

      return {
        bottom: `${this.offsetHeight - 7}px`,
      };
    },
  },
  watch: {
    isVisible(value) {
      if (value && this.$refs.reference) {
        const spaceBelow = window.innerHeight - this.$refs.reference.getBoundingClientRect().bottom;
        if (spaceBelow > 250) {
          this.openDirection = 'below';
        } else {
          this.openDirection = 'above';
        }
      }
    },
  },
  mounted() {
    if (this.$refs.reference) {
      this.offsetHeight = this.$refs.reference.offsetHeight;
    }
  },
};
</script>

<style>
.i-dropdown {
  .i-dropdown-reference {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .i-dropdown-arrow {
    position: absolute;
    top: 100%;
    width: 100%;

    span {
      position: absolute;
      left: 15%;
      z-index: 3;
      border: solid 8px transparent;
    }
  }

  .i-dropdown-box {
    position: absolute;
    z-index: 2;
    left: 0;
    background-color: var(--white);
    width: 100%;
    padding: 20px;
    box-shadow: 0 0 20px rgb(0 0 0 / 25%);
    border-radius: 10px;
    overflow: hidden;

    .i-dropdown-header {
      padding: 4px 0 12px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--gray-200);
    }
  }

  &.below {
    .i-dropdown-arrow span {
      border-bottom-color: var(--white);
    }

    .i-dropdown-box {
      top: calc(100% + 9px);
    }
  }

  &.above {
    .i-dropdown-arrow span {
      border-top-color: var(--white);
    }

    .i-dropdown-box {
      bottom: calc(100% + 9px);
    }
  }
}
</style>
