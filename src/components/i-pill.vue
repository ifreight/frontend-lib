<template>
  <div class="i-pill-container">
    <div
      v-for="menuItem in menuList"
      :key="`pill-${menuItem.key}`"
      class="i-pill"
      :class="{
        active: menuItem.isActive,
        primary: menuItem.primary,
      }"
      @click.stop="selectMenu(menuItem.key)"
    >
      {{ menuItem.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'IPill',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    menu: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['input', 'click'],
  data() {
    return {
      activeMenu: '',
    };
  },
  computed: {
    menuList() {
      return this.menu.map((menu) => ({
        ...menu,
        isActive: menu.key === this.activeMenu,
      }));
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.activeMenu) {
          this.activeMenu = val;
        }
      },
    },
  },
  mounted() {
    if (this.value != null) {
      this.activeMenu = this.value;
    }
  },
  methods: {
    selectMenu(key) {
      this.$emit('input', key);
      this.$emit('click', key);

      if (this.value == null) {
        this.activeMenu = this.value;
      }
    },
  },
};
</script>

<style>
.i-pill-container {
  display: flex;

  .i-pill {
    padding: 10px 16px;
    font-size: 14px;
    color: var(--gray-50);
    cursor: pointer;
    border: 1px solid var(--gray-50);
    border-radius: 100px;

    &:not(:first-child) {
      margin-left: 12px;
    }

    &:not(.primary).active {
      @apply bg-gray-50 text-gray-900 font-semibold;
    }

    &.primary {
      @apply text-yellow-300 border-yellow-300;

      &.active {
        @apply bg-yellow-300 text-gray-900 font-bold;
      }
    }
  }
}
</style>
