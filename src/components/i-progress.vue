<template>
  <div
    class="i-progress"
    :class="border && 'i-progress--border'"
    :style="{ height }"
  >
    <span
      class="i-progress--bar"
      :style="{
        width: barWidth,
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'IProgress',
  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
    maxStep: {
      type: Number,
      default: 0,
    },
    height: {
      type: String,
      default: '12px',
    },
    border: Boolean,
    auto: Boolean,
  },
  data() {
    return {
      percentage: 0,
      autoInterval: null,
    };
  },
  computed: {
    barWidth() {
      if (this.auto) {
        return `${this.percentage}%`;
      }

      return `${(this.currentStep / this.maxStep) * 100}%`;
    },
  },
  mounted() {
    if (this.auto) {
      this.startAutoProgress();
    }
  },
  methods: {
    startAutoProgress() {
      let step = 0.5;
      let currentProgress = 0;

      this.autoInterval = setInterval(() => {
        currentProgress += step;
        this.percentage = Math.round((Math.atan(currentProgress) / (Math.PI / 2)) * 100 * 1000) / 1000;

        if (this.percentage >= 100) {
          this.clearAutoInterval();
        } else if (this.percentage >= 70) {
          step = 0.1;
        }
      }, 100);
    },
    finishAutoProgress() {
      this.percentage = 100;
      this.clearAutoInterval();
    },
    resetAutoProgress() {
      this.percentage = 0;
      this.clearAutoInterval();
    },
    clearAutoInterval() {
      if (this.autoInterval) {
        clearInterval(this.autoInterval);
        this.autoInterval = null;
      }
    },
  },
};
</script>

<style>
.i-progress {
  width: 100%;
  background-color: var(--yellow-70);
  border-radius: 9999px;

  &--bar {
    display: block;
    height: 100%;
    background-color: var(--yellow-300);
    border-radius: 9999px;
    transition: width 0.5s ease-in-out;
  }

  &--border {
    background-color: var(--white);
    box-shadow: inset 0 0 0 1px var(--gray-200);
  }
}
</style>
