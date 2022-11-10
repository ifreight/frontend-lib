<template>
  <div
    class="i-sort-caret"
    @click="toggleSort"
  >
    <div
      class="caret up"
      :class="sortValue === 'asc' && 'active'"
    />
    <div
      class="caret down"
      :class="sortValue === 'desc' && 'active'"
    />
  </div>
</template>

<script>
export default {
  name: 'ISortCaret',
  props: {
    value: {
      type: String,
      default: null,
      validator(value) {
        return value == null || ['asc', 'desc'].includes(value);
      },
    },
  },
  data() {
    return {
      sortValue: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== this.sortValue) {
          this.sortValue = val;
        }
      },
    },
  },
  methods: {
    toggleSort() {
      let updatedValue = null;
      switch (this.sortValue) {
        case null:
          updatedValue = 'asc';
          break;
        case 'asc':
          updatedValue = 'desc';
          break;
        case 'desc':
        default:
          updatedValue = null;
          break;
      }

      this.sortValue = updatedValue;
      this.$emit('input', updatedValue);
    },
  },
};
</script>

<style>
.i-sort-caret {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  width: 16px;
  height: 16px;
  padding: 2px 0;

  &:hover {
    background-color: var(--gray-200);
  }

  .caret {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    &.up {
      border-bottom: 5px solid var(--gray-400);
    }
    &.down {
      margin-top: 2px;
      border-top: 5px solid var(--gray-400);
    }

    &.active {
      border-top-color: var(--gray-900);
      border-bottom-color: var(--gray-900);
    }
  }
}
</style>
