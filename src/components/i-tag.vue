<template>
  <div class="i-tag">
    <span class="i-tag-content">
      <slot />
    </span>

    <span
      v-if="closable"
      class="i-tag-close-icon"
      @click.stop="onClose"
    >
      <ic-times
        width="12"
        height="12"
      />
    </span>
  </div>
</template>

<script>
import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'ITag',
  components: {
    IcTimes,
  },
  props: {
    closable: Boolean,
  },
  emits: ['close'],
  methods: {
    onClose(event) {
      this.$emit('close', event);
    },
  },
};
</script>

<style>
.i-tag {
  padding: 8px 12px;
  border: 1px solid var(--gray-200);
  border-radius: 100px;

  @apply flex items-center bg-gray-120;

  .i-tag-content {
    @apply text-sm;
  }

  .i-tag-close-icon {
    @apply ml-3 cursor-pointer;
  }
}
</style>
