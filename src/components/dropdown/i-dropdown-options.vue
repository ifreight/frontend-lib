<template>
  <i-dropdown
    :visible="visible"
    :width="width"
    class="i-dropdown-options"
  >
    <div
      v-if="$slots.header"
      class="i-dropdown-options-header"
    >
      <slot name="header" />
    </div>

    <ul
      v-if="filteredOptions.length > 0"
      class="i-dropdown-options-body"
    >
      <li
        v-for="(option, idx) in filteredOptions"
        :key="`option-${idx}`"
        :class="currentValue === option[optionKey] && 'selected'"
        @click="$emit('selectedValue', option)"
      >
        <slot
          name="optionsPrepend"
          :option="option"
        />
        <slot
          name="options"
          :option="option"
        >
          <span v-if="currentValue === option[optionKey]">
            {{ option[optionValue] }}
          </span>
          <span
            v-else
            v-html="makeBold(option[optionValue])"
          />
        </slot>
      </li>
    </ul>
    <div
      v-else
      class="i-dropdown-options-placeholder"
    >
      <template v-if="loading"> Loading </template>
      <template v-else-if="remote">
        {{ query ? noDataText : remoteText }}
      </template>
      <template v-else>
        {{ noDataText }}
      </template>
    </div>
  </i-dropdown>
</template>

<script>
import IDropdown from './i-dropdown.vue';

export default {
  name: 'IDropdownOptions',
  components: {
    IDropdown,
  },
  props: {
    visible: Boolean,
    width: {
      type: String,
      default: '100%',
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionKey: {
      type: String,
      default: 'id',
    },
    optionValue: {
      type: String,
      default: 'name',
    },
    currentValue: {
      type: [String, Number],
      default: '',
    },
    query: {
      type: String,
      default: '',
    },
    filterable: Boolean,
    remote: Boolean,
    remoteText: {
      type: String,
      default: 'Type to search.',
    },
    noDataText: {
      type: String,
      default: 'No results found.',
    },
    loading: Boolean,
  },
  computed: {
    filteredOptions() {
      const dropdownOptions = this.options.map((option) => {
        if (typeof option !== 'object') {
          return {
            id: option,
            name: option,
          };
        }
        return option;
      });
      if (!this.filterable || !this.query) {
        return dropdownOptions;
      }
      const filtered = dropdownOptions.filter((option) => {
        const query = this.query.toLowerCase();
        const label = option[this.optionValue].toLowerCase();
        return label.includes(query);
      });
      return filtered;
    },
  },
  methods: {
    makeBold(str, q) {
      if (!str) {
        return str;
      }
      let query = q;
      if (query == null) {
        ({ query } = this);
      }

      // mask all word characters in city name
      const cityMask = str.replace(/\w/g, '#');
      // string city and query string from any non-word character
      const queryStripped = query.toLowerCase().replace(/\W/g, '');
      const stringStripped = str.replace(/\W/g, '');
      // find the index of query string in city name
      const index = stringStripped.toLowerCase().indexOf(queryStripped);
      if (index > -1 && queryStripped.length) {
        // find the end position of substring in stripped city name
        const endIndex = index + queryStripped.length - 1;
        // replacer function for each masked character.
        // it will add to the start and end character of substring the corresponding tags,
        // replacing all masked characters with the original one.
        const replacer = (i) => {
          let repl = stringStripped[i];
          if (i === index) {
            repl = `<b>${repl}`;
          }
          if (i === endIndex) {
            repl += '</b>';
          }
          return repl;
        };
        let i = -1;
        // restore masked string
        return cityMask.replace(/#/g, () => {
          i += 1;
          return replacer(i);
        });
      }
      return str;
    },
  },
};
</script>

<style>
.i-dropdown-options {
  .i-dropdown-options-header {
    padding: 4px 0 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--gray-200);
  }

  .i-dropdown-options-body {
    max-height: 264px;
    padding: 20px;
    margin: 0;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: overlay;
    list-style: none;
    scrollbar-width: thin;
    scrollbar-color: var(--gray-120) transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--gray-120);
      border: none;
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 16px 32px;
      font-size: 14px;
      line-height: 16px;
      color: var(--gray-900);
      cursor: pointer;
      border-radius: 10px;

      &.selected {
        font-weight: 600;
        background-color: var(--gray-70);
      }

      &:hover {
        background-color: var(--gray-70);
      }
    }
  }

  .i-dropdown-options-placeholder {
    padding: 20px;
    font-size: 16px;
    line-height: 16px;
    color: var(--gray-400);
  }
}
</style>
