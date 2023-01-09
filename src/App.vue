<template>
  <div
    id="app"
    class="p-5"
  >
    <span>Frontend Lib</span>
    <div class="my-5">
      <div class="mb-3">Pagination</div>
      <div class="flex gap-3 mb-5">
        <div>
          <i-pagination
            :current-page="pagination.currentPage"
            :total="pagination.total"
            :page-size="10"
            :pager-count="pagination.limit"
          />
        </div>
        <div>
          <i-pagination
            :current-page="1"
            :total="30"
            :page-size="10"
          />
        </div>
        <div>
          <i-pagination
            :current-page="1"
            :total="5"
            :page-size="10"
          />
        </div>
        <div>
          <i-pagination
            :current-page="1"
            :total="80"
            :page-size="10"
          />
        </div>
      </div>
      <div class="pb-5">
        <div>show-data-count</div>
        <i-pagination
          :current-page="1"
          :total="95"
          :page-size="10"
          show-data-count
        />
      </div>
    </div>

    <div class="py-5 flex gap-2">
      <i-progress
        :current-step="1"
        :max-step="4"
      />
      <i-progress
        ref="autoProgress"
        height="10px"
        border
        auto
      />
    </div>

    <i-box
      label="Test Box"
      class="p-5"
    >
      Test
    </i-box>

    <div class="p-5">
      <i-checkbox label="toggle" />
    </div>

    <i-sort-caret v-model="sortCaretValue" />

    <i-input-tel v-model="phone" />

    <div class="w-[200px] py-5 flex justify-around">
      <i-popover
        dark
        tooltip
        show-close
        placement="right"
      >
        <template #reference>
          <ic-info-circle class="inline text-gray-400" />
        </template>
        <span>
          Country ID is a number used to list down<br />
          registered countries all over iFreight's database.
        </span>
      </i-popover>

      <i-popover trigger="click">
        <template #reference>
          <ic-filter class="inline" />
        </template>

        <div class="w-[205px] px-5 py-6">Test</div>
      </i-popover>
    </div>

    <div class="py-5 flex gap-2">
      <i-select
        v-model="select"
        input-id="select"
        name="select"
        label="Select"
        class="flex-1"
        :options="selectStaticOptions"
        clearable
        error-message="Field required"
      />

      <i-select
        v-model="selectFilterable"
        input-id="selectFilterable"
        name="selectFilterable"
        label="Select Filterable"
        placeholder="filterable"
        filterable
        class="flex-1"
        :options="selectObjectOptions"
        option-key="key"
        option-value="label"
        dropdown-width="600px"
        clearable
      >
        <template #dropdownOptionsPrepend="{ option }">
          <div class="flex items-center h-10 w-10 mr-3 -my-1">
            <img
              :src="option.logo"
              alt="logo"
            />
          </div>
        </template>
      </i-select>

      <i-select
        v-model="selectRemoteId"
        :value-option.sync="selectRemote"
        input-id="selectRemote"
        name="selectRemote"
        label="Select Remote"
        placeholder="remote"
        class="flex-1"
        remote
        :remote-method="selectRemoteMethod"
        clearable
      />
    </div>

    <div class="py-5 flex gap-2">
      <i-input
        v-model="text"
        input-id="text"
        name="text"
        label="Input Text"
        class="flex-1"
        clearable
        :maxlength="3"
      />

      <i-input
        v-model="textPlaceholder"
        input-id="textPlaceholder"
        name="textPlaceholder"
        label="Input Text Placeholder"
        placeholder-value="e.g. text placeholder"
        class="flex-1"
        error-message="Field required"
      >
        <template #prepend>
          <IcFilter />
        </template>
        <template #append>
          <IcFilter />
        </template>
      </i-input>

      <i-input
        v-model="textFilled"
        input-id="textFilled"
        name="textFilled"
        label="Input Text Filled"
        mask="number"
        :mask-options="{
          min: -100,
          max: 100,
        }"
        class="flex-1"
      >
        <template #prepend>
          <IcFilter />
        </template>
      </i-input>

      <i-input
        v-model="textNpwp"
        input-id="textNpwp"
        name="textNpwp"
        label="Input Text NPWP"
        placeholder="62.252.125-2.221"
        mask="npwp"
        class="flex-1"
      >
        <template #append>
          <IcFilter />
        </template>
      </i-input>

      <i-input
        v-model="textNumber"
        input-id="textNumber"
        name="textNumber"
        label="Input Number"
        mask="number"
        class="flex-1"
        :maxlength="3"
      >
        <template #label>
          <span class="mr-1">Input Text</span>
          <i-popover
            dark
            tooltip
            show-close
            placement="top"
            class="inline-block"
          >
            <template #reference>
              <ic-info-circle class="inline" />
            </template>
            <span>
              Country ID is a number used to list down<br />
              registered countries all over iFreight's database.
            </span>
          </i-popover>
        </template>
      </i-input>

      <i-input
        v-model="textDecimal"
        input-id="textDecimal"
        name="textDecimal"
        label="Input Decimal"
        placeholder="123.45"
        mask="decimal"
        class="flex-1"
      />
    </div>

    <div class="py-5 flex gap-2">
      <i-input-time
        v-model="timeInput1"
        input-id="timeInput1"
        name="timeInput1"
        label="Pilih waktu"
        class="w-[190px]"
        invalid
      />
      <i-input-time
        v-model="timeInput2"
        input-id="timeInput2"
        name="timeInput2"
        label="Pilih waktu"
        class="w-[190px]"
        size="sm"
      />
    </div>

    <div class="py-5 flex gap-2">
      <i-dual-input :filled="!!searchString">
        <template #first-input>
          <i-select
            v-model="searchType"
            input-id="searchType"
            name="searchType"
            label="Search by"
            class="w-[190px] relative"
            :options="searchTypeOptions"
            option-value="label"
            borderless
          />
        </template>
        <template #second-input>
          <i-input
            v-model="searchString"
            input-id="searchString"
            name="searchString"
            :label="searchTypeOptions.find((v) => v.id === searchType).label"
            placeholder="Input Country"
            class="flex-1"
            borderless
          >
            <template #prepend>
              <IcMagnifyingGlass class="text-gray-400" />
            </template>
          </i-input>
        </template>
      </i-dual-input>

      <i-dual-input
        :filled="!!origin || !!destination"
        class="w-[539px]"
      >
        <template #first-input>
          <i-select
            v-model="origin"
            input-id="origin"
            name="origin"
            label="Origin"
            placeholder-value="All origin ports"
            :options="searchTypeOptions"
            option-value="label"
            borderless
            clearable
            class="flex-1"
          >
            <template #prepend>
              <ic-location />
            </template>
          </i-select>
        </template>
        <template #icon>
          <ic-arrow-circle />
        </template>
        <template #second-input>
          <i-select
            v-model="destination"
            input-id="destination"
            name="destination"
            label="Destination"
            placeholder-value="All destination ports"
            :options="searchTypeOptions"
            option-value="label"
            borderless
            clearable
            class="flex-1"
          >
            <template #prepend>
              <ic-location />
            </template>
          </i-select>
        </template>
      </i-dual-input>
    </div>

    <div class="py-5 flex gap-2">
      <i-button
        class="w-[200px]"
        @click="showDialog = true"
      >
        Open Dialog
      </i-button>
      <i-button
        plain
        class="w-[200px]"
        @click="showDialogHeader = true"
      >
        Open Dialog Header
      </i-button>

      <i-dialog
        :show.sync="showDialog"
        show-close
      >
        Test
      </i-dialog>
      <i-dialog
        :show.sync="showDialogHeader"
        show-close
        show-header
        append-to-body
        destroy-on-close
      >
        Test Header
      </i-dialog>
    </div>
    <div class="py-5 w-[400px]">
      <i-button
        size="sm"
        class="w-[200px] mb-5"
        @click="changeTab"
      >
        Change Tab
      </i-button>
      <i-tabs
        v-model="activeTab"
        header-align="left"
      >
        <i-tab-pane
          v-for="tab in tabs"
          :key="`tab-${tab.name}`"
          :label="tab.label"
          :name="tab.name"
        >
          {{ tab.label }}
        </i-tab-pane>
      </i-tabs>
    </div>
    <div class="flex">
      <div class="py-5 flex w-[315px]">
        <i-datepicker v-model="date" />
      </div>
      <div class="py-5 flex w-[315px]">
        <i-datepicker
          v-model="dateMultiple"
          :disabled-date="disabledDate"
          :pick-limit="3"
        />
      </div>
      <div class="py-5 flex w-[315px]">
        <i-datepicker
          v-model="dateMultiple"
          :disabled-date="disabledDateNext"
          :pick-limit="3"
        />
      </div>
      <div>
        <h2 class="text-xl bg-gray-50 text-center">radio</h2>
        <div class="flex gap-5">
          <i-radio
            v-for="(type, index) in bookingTypeList"
            :key="`booking-type-${index}`"
            v-model="bookingType"
            name="bookingType"
            :label="type.id"
          >
            <span class="ml-[8.5px] capitalize">
              {{ type.name }}
            </span>
          </i-radio>
        </div>
        <h2 class="text-xl bg-gray-50 text-center mt-3">disabled radio</h2>
        <div class="flex gap-5">
          <i-radio
            v-for="(type, index) in bookingTypeList"
            :key="`booking-type-dis-${index}`"
            :value="1"
            name="bookingType"
            :label="type.id"
            disabled
          >
            <span class="ml-[8.5px] capitalize">
              {{ type.name }}
            </span>
          </i-radio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IBox from './components/i-box.vue';
import IButton from './components/i-button.vue';
import ICheckbox from './components/i-checkbox.vue';
import IDatepicker from './components/i-datepicker.vue';
import IDialog from './components/i-dialog.vue';
import IDualInput from './components/i-dual-input.vue';
import ISortCaret from './components/i-sort-caret.vue';
import IInputTel from './components/i-input-tel.vue';
import IInput from './components/i-input.vue';
import IInputTime from './components/i-input-time.vue';
import IPopover from './components/i-popover.vue';
import ISelect from './components/i-select.vue';
import IPagination from './components/i-pagination.vue';
import IProgress from './components/i-progress.vue';
import ITabs from './components/tab/i-tabs.vue';
import ITabPane from './components/tab/i-tab-pane.vue';
import IRadio from './components/i-radio.vue';

import IcArrowCircle from './icons/ic-arrow-circle.vue';
import IcFilter from './icons/ic-filter.vue';
import IcInfoCircle from './icons/ic-info-circle.vue';
import IcLocation from './icons/ic-location.vue';
import IcMagnifyingGlass from './icons/ic-magnifying-glass.vue';

export default {
  name: 'App',
  components: {
    IcArrowCircle,
    IcFilter,
    IcInfoCircle,
    IcLocation,
    IcMagnifyingGlass,
    IBox,
    IButton,
    ICheckbox,
    IDatepicker,
    IDialog,
    IDualInput,
    ISortCaret,
    IInputTel,
    IInput,
    IInputTime,
    IPopover,
    ISelect,
    IPagination,
    IProgress,
    ITabs,
    ITabPane,
    IRadio,
  },
  data() {
    return {
      sortCaretValue: null,
      phone: '+6281234567890',
      text: '',
      textPlaceholder: '',
      textFilled: 50,
      textNpwp: '',
      textNumber: null,
      textDecimal: null,
      select: null,
      selectFilterable: null,
      selectStaticOptions: ['Asia', 'America', 'Europe', 'Others'],
      selectObjectOptions: [
        {
          key: 1,
          label: 'Option 1',
          logo: 'https://picsum.photos/200',
        },
        {
          key: 2,
          label: 'Option 2',
          logo: 'https://picsum.photos/150',
        },
        {
          key: 3,
          label: 'Option 3',
          logo: 'https://picsum.photos/100',
        },
      ],
      selectRemoteId: null,
      selectRemote: null,
      searchType: 1,
      searchTypeOptions: [
        {
          id: 1,
          label: 'Country Name',
        },
        {
          id: 2,
          label: 'Country Code',
        },
      ],
      searchString: null,
      origin: null,
      destination: null,
      showDialog: false,
      showDialogHeader: false,
      date: undefined,
      dateMultiple: [],
      currentPage: 1,
      pagination: {
        limit: 7,
        currentPage: 1,
        total: 1000,
      },
      activeTab: 'tab1',
      tabs: [
        {
          label: 'Tab 1',
          name: 'tab1',
        },
        {
          label: 'Tab 2',
          name: 'tab2',
        },
      ],
      bookingType: '',
      timeInput1: undefined,
      timeInput2: new Date(),
    };
  },
  computed: {
    bookingTypeList() {
      return [
        {
          id: 1,
          name: 'export',
        },
        {
          id: 2,
          name: 'import',
        },
      ];
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.autoProgress.finishAutoProgress();
    }, 1000);
  },
  methods: {
    disabledDate(date) {
      return new Date() < date;
    },
    disabledDateNext(date) {
      return new Date() > date;
    },
    selectRemoteMethod() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: 'Asia',
            },
            {
              id: 2,
              name: 'America',
            },
            {
              id: 3,
              name: 'Europe',
            },
            {
              id: 4,
              name: 'Others',
            },
          ]);
        }, 1000);
      });
    },
    changeTab() {
      this.tabs = [
        {
          label: 'The Quick Brown Fox',
          name: 'tabA',
        },
        {
          label: 'Jumps Over the Lazy Dog',
          name: 'tabB',
        },
        {
          label: 'And Die Alone Miserably',
          name: 'tabC',
        },
      ];
      this.activeTab = this.tabs[0].name;
    },
  },
};
</script>

<style></style>
