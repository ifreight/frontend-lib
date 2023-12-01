<template>
  <transition name="i-dialog-fade">
    <div
      v-show="show"
      class="i-dialog-wrapper"
      @click.self="handleClickSelf"
    >
      <transition
        name="i-dialog-slide"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <div
          v-show="show"
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
      </transition>
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
    appendToBody: Boolean,
    destroyOnClose: Boolean,
    stayOnClickOutside: {
      type: Boolean,
      default: false,
    },
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
    document.body.style.overflow = 'auto';
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  methods: {
    open() {
      this.$emit('open');
      document.body.style.overflow = 'hidden';
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    },
    close() {
      if (this.destroyOnClose) {
        this.$nextTick(() => {
          this.key += 1;
        });
      }
    },
    handleClose() {
      this.$emit('close');
      this.$emit('update:show', false);
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      document.body.style.overflow = 'auto';
      if (this.destroyOnClose) {
        this.$nextTick(() => {
          this.key += 1;
        });
      }
      this.$emit('closed');
    },
    handleClickSelf() {
      if (!this.stayOnClickOutside) {
        this.handleClose();
      }
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
  animation: i-dialog-fade-in 0.1s;
}

.i-dialog-fade-leave-active {
  animation: i-dialog-fade-out 0.1s;
}

@keyframes i-dialog-slide-in {
  0% {
    transform: translateY(-2.5rem);
  }

  100% {
    transform: translateY(0);
  }
}
@keyframes i-dialog-slide-out {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-2.5rem);
  }
}

.i-dialog-slide-enter-active {
  animation: i-dialog-slide-in 0.2s;
}

.i-dialog-slide-leave-active {
  animation: i-dialog-slide-out 0.2s;
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
    margin: 0 auto 20px;
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
      @apply absolute top-7 right-7 bg-transparent cursor-pointer;
    }

    &.show-header .i-dialog-close {
      @apply text-white;
    }
  }
}
</style>
