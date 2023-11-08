<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'IAccordion',
  provide() {
    const provideData = {};

    // used to create reactive provide
    Object.defineProperty(provideData, 'activeName', {
      enumerable: true,
      get: () => this.activeName,
    });

    return {
      itemList: this.itemList,
      handleClickEvent: this.handleClickEvent,
      provideData,
    };
  },
  props: {
    value: {
      type: [Array, String, Number],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'change'],
  data() {
    return {
      itemList: [],
      activeName: [],
    };
  },
  computed: {
    valueArr() {
      return this.castArr(this.value);
    },
  },
  watch: {
    valueArr: {
      handler(val) {
        const difference = val
          .filter((v) => !this.activeName.includes(v))
          .concat(this.activeName.filter((v) => !val.includes(v)));

        if (difference.length) {
          this.activeName = val;
        }
      },
    },
  },
  created() {
    this.activeName = this.castArr(this.value);
  },
  methods: {
    castArr(arr) {
      if (!arr && arr !== 0) return [];
      return Array.isArray(arr) ? arr : [arr];
    },
    setActiveNames(_activeNames) {
      this.activeName = _activeNames;
      const value = !this.multiple ? this.activeName[0] : this.activeName;
      this.$emit('input', value);
      this.$emit('change', value);
    },
    handleClickEvent(name) {
      if (!this.multiple) {
        if ((this.activeName[0] || this.activeName[0] === 0) && this.activeName[0] === name) {
          this.setActiveNames([]);
        } else {
          this.setActiveNames([name]);
        }
      } else {
        const activeNames = [...this.activeName.value];
        const activeNamesIndex = activeNames.indexOf(name);

        if (activeNamesIndex > -1) {
          activeNames.splice(activeNamesIndex, 1);
        } else {
          activeNames.push(name);
        }
        this.setActiveNames(activeNames);
      }
    },
  },
};
</script>
