<template>
  <div v-if="files.length > 0">
    <div
      v-for="(file, index) in files"
      :key="index"
      class="i-file-list-item"
      :class="readOnly && file.url ? 'clickable' : null"
      @click="viewFile(file)"
    >
      <slot
        :file="file"
        :index="index"
        :on-remove="remove"
      >
        <span class="file-name">
          {{ file.name }}
        </span>
        <button
          v-if="!readOnly"
          @click="remove(index)"
        >
          <ic-times />
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'IFileList',
  components: {
    IcTimes,
  },
  props: {
    files: {
      type: Array,
      default: () => [],
    },
    readOnly: Boolean,
  },
  emits: ['update:files', 'remove'],
  methods: {
    remove(index) {
      this.$emit('remove', this.files[index]);
      this.$emit('update:files', this.files.slice(0, index).concat(this.files.slice(index + 1)));
    },
    viewFile(file) {
      if (this.readOnly && file.url) {
        window.open(file.url, '_blank');
      }
    },
  },
};
</script>

<style>
.i-file-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding: 13px 16px;
  background-color: var(--gray-120);
  border: 1px solid var(--gray-200);
  border-radius: 10px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &.clickable {
    cursor: pointer;
  }

  .file-name {
    overflow: hidden;
    font-size: var(--size-sm);
    color: var(--gray-900);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
