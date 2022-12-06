<template>
  <popper
    ref="popper"
    :trigger="popperTrigger"
    :options="popperOptions"
    append-to-body
    root-class="i-popover"
    @show="onShow"
    @hide="onHide"
  >
    <template slot="reference">
      <span
        ref="popperReference"
        class="i-popover-reference"
      >
        <slot name="reference" />
      </span>
    </template>

    <div
      class="i-popover-content"
      :class="contentClass"
    >
      <slot />
      <div
        v-if="showClose"
        class="i-popover-close"
        @click="closePopover"
      >
        <ic-times />
      </div>
    </div>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs';

import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'IPopover',
  components: {
    IcTimes,
    Popper,
  },
  props: {
    dark: Boolean,
    tooltip: Boolean,
    placement: {
      type: String,
      default: 'bottom',
    },
    trigger: {
      type: String,
      default: 'hover',
      validator(value) {
        return ['hover', 'click'].includes(value);
      },
    },
    showClose: Boolean,
  },
  computed: {
    popperTrigger() {
      let trigger;
      switch (this.trigger) {
        case 'click':
          trigger = 'clickToToggle';
          break;
        default:
          ({ trigger } = this);
          break;
      }

      if (this.tooltip) {
        trigger = 'clickToOpen';
      }

      return trigger;
    },
    popperOptions() {
      return {
        placement: this.placement,
      };
    },
    contentClass() {
      return {
        dark: this.dark,
        'i-popover-tooltip': this.tooltip,
      };
    },
  },
  mounted() {
    if (this.tooltip) {
      this.$refs.popperReference.addEventListener('mouseenter', this.showPopover);
    }
  },
  methods: {
    showPopover() {
      this.$refs.popper.doShow();
    },
    closePopover() {
      this.$refs.popper.doClose();
    },
    onShow() {
      this.$emit('show');
    },
    onHide() {
      this.$emit('hide');
    },
  },
};
</script>

<style>
.i-popover {
  .i-popover-content {
    position: absolute;
    z-index: 10;
    display: flex;
    width: auto;
    color: var(--gray-900);
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0 0 20px rgb(0 0 0 / 25%);

    &.dark {
      color: var(--white);
      background-color: var(--gray-900);
    }

    &.i-popover-tooltip {
      padding: 16px;
      font-size: var(--size-xs);
      line-height: 14px;
      text-align: left;
      word-break: break-word;
    }

    .popper__arrow {
      position: absolute;
      width: 0;
      height: 0;
      margin: 5px;
      border-style: solid;
    }

    &[x-placement^='top'] {
      margin-bottom: 5px;

      .popper__arrow {
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
        border-color: var(--white) transparent transparent transparent;
        border-width: 5px 5px 0;
      }

      &.dark .popper__arrow {
        border-top-color: var(--gray-900);
      }
    }

    &[x-placement^='bottom'] {
      margin-top: 5px;

      .popper__arrow {
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
        border-color: transparent transparent var(--white) transparent;
        border-width: 0 5px 5px;
      }

      &.dark .popper__arrow {
        border-bottom-color: var(--gray-900);
      }
    }

    &[x-placement^='right'] {
      margin-left: 5px;

      .popper__arrow {
        top: calc(50% - 5px);
        left: -5px;
        margin-right: 0;
        margin-left: 0;
        border-color: transparent var(--white) transparent transparent;
        border-width: 5px 5px 5px 0;
      }

      &.dark .popper__arrow {
        border-right-color: var(--gray-900);
      }
    }

    &[x-placement^='left'] {
      margin-right: 5px;

      .popper__arrow {
        top: calc(50% - 5px);
        right: -5px;
        margin-right: 0;
        margin-left: 0;
        border-color: transparent transparent transparent var(--white);
        border-width: 5px 0 5px 5px;
      }

      &.dark .popper__arrow {
        border-left-color: var(--gray-900);
      }
    }

    .i-popover-close {
      margin-left: 16px;
      cursor: pointer;
    }
  }
}

.i-popover-reference {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
