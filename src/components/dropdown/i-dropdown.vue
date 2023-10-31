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
      v-show="visible"
      class="i-dropdown-arrow"
    >
      <span :style="arrowStyles" />
    </div>

    <div
      v-show="visible"
      class="i-dropdown-box"
      :style="{ width }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IDropdown',
  props: {
    visible: Boolean,
    width: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
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
        top: '-9px',
      };
    },
  },
  watch: {
    visible(value) {
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
};
</script>

<style>
.i-dropdown {
  .i-dropdown-reference {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .i-dropdown-arrow {
    position: absolute;
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
    left: 0;
    z-index: 2;
    padding: 20px;
    overflow: hidden;
    background-color: var(--white);
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(0 0 0 / 25%);
  }

  &.below {
    .i-dropdown-arrow {
      top: 100%;

      span {
        border-bottom-color: var(--white);
      }
    }

    .i-dropdown-box {
      top: calc(100% + 9px);
    }
  }

  &.above {
    .i-dropdown-arrow {
      bottom: 100%;

      span {
        border-top-color: var(--white);
      }
    }

    .i-dropdown-box {
      bottom: calc(100% + 9px);
    }
  }
}
</style>
