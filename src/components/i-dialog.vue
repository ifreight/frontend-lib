<template>
  <transition
    name="i-dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="show"
      class="i-dialog-wrapper"
      @click.self="handleClose"
    >
      <div
        :key="key"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog"
        :class="['i-dialog', { 'show-header': showHeader }]"
        :style="style"
      >
        <div
          v-if="showHeader"
          class="i-dialog-header"
        >
          <ic-logo
            class="i-dialog-header-logo"
            width="104"
            height="28"
          />
          <slot name="header" />
        </div>

        <button
          v-if="showClose"
          class="i-dialog-close"
          @click="handleClose"
        >
          <ic-times />
        </button>

        <div
          class="i-dialog-body"
          :class="bodyClasses"
        >
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import IcLogo from '@/icons/ic-logo.vue';
import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'IDialog',
  components: {
    IcLogo,
    IcTimes,
  },
  props: {
    show: Boolean,
    showClose: Boolean,
    showHeader: Boolean,
    bodyClasses: {
      type: String,
      default: '',
    },
    top: {
      type: String,
      default: '15vh',
    },
    width: {
      type: String,
      default: '50%',
    },
    destroyOnClose: Boolean,
  },
  data() {
    return {
      key: 0,
    };
  },
  computed: {
    style() {
      const style = {};
      if (this.width) {
        style.width = this.width;
      }
      if (this.top) {
        style.marginTop = this.top;
      }

      return style;
    },
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.open();
        } else {
          this.close();
        }
      },
    },
  },
  mounted() {
    if (this.show) {
      this.open();
    }
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      document.body.style.overflow = 'auto';
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  methods: {
    open() {
      this.$emit('open');
      document.body.style.overflow = 'hidden';
      document.body.appendChild(this.$el);
    },
    close() {
      this.$emit('close');
      document.body.style.overflow = 'auto';
      if (this.destroyOnClose) {
        this.$nextTick(() => {
          this.key += 1;
        });
      }
    },
    handleClose() {
      this.$emit('update:show', false);
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
  },
};
</script>

<style>
@keyframes i-dialog-fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes i-dialog-fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.i-dialog-fade-enter-active {
  animation: i-dialog-fade-in 0.3s;
}

.i-dialog-fade-leave-active {
  animation: i-dialog-fade-out 0.3s;
}

.i-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  margin: 0;
  overflow: auto;
  background-color: rgb(0 0 0 / 50%);

  .i-dialog {
    position: relative;
    margin: 0 auto 50px;
    background-color: var(--white);
    border-radius: 20px;
    box-shadow: 0 0 20px rgb(0 0 0 / 25%);

    &-header {
      @apply px-8 py-5 w-full bg-gray-900 rounded-t-[20px];

      &-logo {
        @apply text-white;
      }
    }

    &-body {
      @apply p-8 w-full rounded-b-[20px];
    }

    &-close {
      @apply absolute top-7 right-7 bg-transparent;
    }

    &.show-header .i-dialog-close {
      @apply text-white;
    }
  }
}
</style>
