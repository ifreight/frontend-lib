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
    <div class="py-5">
      <h2 class="text-xl bg-gray-50 text-center">Input Tag</h2>
      <i-input-tag
        v-model="inputTag"
        label="(Optional) Send to following emails:"
        button-text="+ Email"
        name="inputTag"
        input-type="email"
        class="border-gray-400"
      />
    </div>
    <div class="py-5">
      <h2 class="text-xl bg-gray-50 text-center">Text Area</h2>
      <i-text-area
        v-model="textArea"
        input-id="textarea"
        name="message"
        placeholder="Type Message Here.."
        class="chat-textarea"
      />

      <h2 class="text-xl bg-gray-50 text-center">Text Area Prevent enter</h2>
      <i-text-area
        v-model="textArea"
        :prevent-enter-key="true"
        input-id="textarea"
        name="message"
        placeholder="Type Message Here.."
        class="chat-textarea"
        @pressEnter="submitChat"
        @pressEnterShift="enterShiftHandler"
      />
    </div>
    <div class="py-5">
      <h2 class="text-xl bg-gray-50 text-center">Upload</h2>
      <div class="flex gap-5">
        <div class="flex-1">
          <i-upload
            v-model="files"
            :accept="acceptableFiles"
            required
            name="upload"
            @invalidSize="invalidSizeHandler"
          />
        </div>
        <i-file-list :files.sync="files" />
        <div class="flex-1">
          <i-upload
            v-slot="{ onClick }"
            v-model="files2"
            :accept="acceptableFiles"
            required
            name="upload2"
            @invalidSize="invalidSizeHandler"
          >
            <i-button
              text
              class="text-gray-900"
              @click="onClick"
            >
              <ic-paper-clip />
            </i-button>
          </i-upload>
          <i-file-list :files.sync="files2" />
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="font-bold text-center mb-2">Calendar without disable date</div>
      <div>
        <strong class="text-red-400">with calendarContent props and (default) limitDisplay props 3</strong>
      </div>
      <i-calendar
        v-model="calendarDate"
        :calendar-content="shipData"
        :month-indicator-list="[true, false, true, false, true, false, true, false, true, false, true, false]"
        @onChangeCalendar="changeCalendarHandler"
        @onChangeYear="changeYearHandler"
        @onSelectDate="selectDate"
      >
        <template #indicator>
          <div class="flex items-center">Slot Header</div>
        </template>

        <template #content="{ isSelected, content }">
          <div class="new-update-indicator" />
          <div
            v-if="content"
            class="list-ports-wrapper"
          >
            <div
              v-for="(port, key) in content.displayContent"
              :key="key"
              class="list-ports"
              :class="port.isRatesAvailable ? 'bg-green-400' : 'bg-red-400'"
            >
              {{ port.shippingRoute }}
            </div>
            <div
              v-if="content.allContent.length - content.displayContent.length > 0"
              class="more-list-ports"
            >
              +{{ content.allContent.length - content.displayContent.length }}
            </div>
          </div>
          <i-button
            v-if="isSelected"
            text
            size="xs"
            class="btn-plan"
          >
            <template #prepend>
              <ic-plus-circle class="icon-plus-circle" />
            </template>
            Plan
          </i-button>
        </template>
      </i-calendar>
    </div>
    <div class="py-5">
      <div class="font-bold text-center mb-2">Calendar with disable date</div>
      <i-calendar
        v-model="calendarDate"
        :disabled-date="disabledDateCalendar"
        @onChangeCalendar="changeCalendarHandler"
      >
        <template #indicator>
          <div class="flex items-center">Slot Header</div>
        </template>

        <template #content="{ isSelected, date }">
          <div class="new-update-indicator" />
          <div
            v-if="listDateData(date)"
            class="list-ports-wrapper"
          >
            <div
              v-for="(port, key) in listDateData(date).detail"
              :key="key"
              class="list-ports"
              :class="port.isRatesAvailable ? 'bg-green-400' : 'bg-red-400'"
            >
              {{ port.origin }}-{{ port.destination }}
            </div>
            <div class="more-list-ports">+2</div>
          </div>
          <i-button
            v-if="isSelected"
            text
            size="xs"
            class="btn-plan"
          >
            <template #prepend>
              <ic-plus-circle class="icon-plus-circle" />
            </template>
            Plan
          </i-button>
        </template>
      </i-calendar>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import IBox from './components/i-box.vue';
import IButton from './components/i-button.vue';
import ICalendar from './components/i-calendar.vue';
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
import ITextArea from './components/i-text-area.vue';
import IFileList from './components/i-file-list.vue';
import IUpload from './components/i-upload.vue';
import IRadio from './components/i-radio.vue';
import IInputTag from './components/i-input-tag.vue';

import IcArrowCircle from './icons/ic-arrow-circle.vue';
import IcFilter from './icons/ic-filter.vue';
import IcInfoCircle from './icons/ic-info-circle.vue';
import IcLocation from './icons/ic-location.vue';
import IcMagnifyingGlass from './icons/ic-magnifying-glass.vue';
import IcPaperClip from './icons/ic-paper-clip.vue';
import IcPlusCircle from './icons/ic-plus-circle.vue';

export default {
  name: 'App',
  components: {
    IcArrowCircle,
    IcFilter,
    IcInfoCircle,
    IcLocation,
    IcMagnifyingGlass,
    IcPaperClip,
    IcPlusCircle,
    IBox,
    IButton,
    ICalendar,
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
    ITextArea,
    IFileList,
    IUpload,
    IRadio,
    IInputTag,
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
      inputTag: ['john@mailinator.com'],
      textArea: '',
      files: [],
      files2: [],
      calendarDate: null,
      shipmentPlanData: [
        {
          shipmentDate: '2023-08-03T17:00:00Z',
          index: 4,
          detail: [
            {
              id: 1,
              origin: 'IDTPP',
              destination: 'SGSIN',
              isRatesAvailable: true,
            },
            {
              id: 2,
              origin: 'IDTPP',
              destination: 'KRPUS',
              isRatesAvailable: false,
            },
            {
              id: 3,
              origin: 'IDTPP',
              destination: 'KRPUS',
              isRatesAvailable: false,
            },
          ],
        },
        {
          shipmentDate: '2023-08-10T17:00:00Z',
          index: 5,
          detail: [
            {
              id: 1,
              origin: 'IDTPP',
              destination: 'SGSIN',
              isRatesAvailable: true,
            },
            {
              id: 2,
              origin: 'IDTPP',
              destination: 'KRPUS',
              isRatesAvailable: false,
            },
          ],
        },
        {
          shipmentDate: '2023-08-22T17:00:00Z',
          index: 20,
          detail: [
            {
              id: 1,
              origin: 'IDTPP',
              destination: 'SGSIN',
              isRatesAvailable: true,
            },
            {
              id: 2,
              origin: 'IDTPP',
              destination: 'KRPUS',
              isRatesAvailable: false,
            },
            {
              id: 3,
              origin: 'IDTPP',
              destination: 'KRPUS',
              isRatesAvailable: false,
            },
          ],
        },
      ],
      shipData: [],
    };
  },
  computed: {
    acceptableFiles() {
      return '.jpg,.jpeg,.png,.csv,.doc,.docx,.odt,.pdf,.rtf,.txt,.wpd,.wpf,.xls,.xlsx,.ppt,.pptx,.zip,.rar';
    },
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
    this.shipData = [
      {
        shipmentPlanId: 2,
        stuffingDateTime: '2023-08-10T13:14:40.58Z',
        shippingRoute: 'IDTPP-SGSIN',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 2,
        stuffingDateTime: '2023-08-30T13:15:00.959Z',
        shippingRoute: 'IDTPP-SGSIN',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 10,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: false,
        haveNotification: false,
      },
      {
        shipmentPlanId: 11,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 12,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 13,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 14,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 15,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 18,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 19,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 20,
        stuffingDateTime: '2023-08-11T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 20,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 21,
        stuffingDateTime: '2023-08-11T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 21,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 22,
        stuffingDateTime: '2023-08-11T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 22,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 23,
        stuffingDateTime: '2023-08-11T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: false,
        haveNotification: false,
      },
      {
        shipmentPlanId: 23,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: false,
        haveNotification: false,
      },
      {
        shipmentPlanId: 24,
        stuffingDateTime: '2023-08-11T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 24,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 25,
        stuffingDateTime: '2023-08-11T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 25,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 26,
        stuffingDateTime: '2023-08-21T07:07:00Z',
        shippingRoute: 'IDTPP-MYKBC',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 27,
        stuffingDateTime: '2023-08-12T07:07:00Z',
        shippingRoute: 'IDTPP-CNXGA',
        havePricing: false,
        haveNotification: false,
      },
      {
        shipmentPlanId: 28,
        stuffingDateTime: '2023-08-20T08:17:00Z',
        shippingRoute: 'IDTPP-HKHKG',
        havePricing: false,
        haveNotification: false,
      },
      {
        shipmentPlanId: 29,
        stuffingDateTime: '2023-08-11T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 29,
        stuffingDateTime: '2023-08-12T07:38:00Z',
        shippingRoute: 'IDTPP-JPAXT',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 33,
        stuffingDateTime: '2023-08-20T08:17:00Z',
        shippingRoute: 'IDTPP-CNXGA',
        havePricing: false,
        haveNotification: false,
      },
      {
        shipmentPlanId: 34,
        stuffingDateTime: '2023-08-20T08:17:00Z',
        shippingRoute: 'IDTPP-CNXGA',
        havePricing: false,
        haveNotification: false,
      },
      {
        shipmentPlanId: 35,
        stuffingDateTime: '2023-08-25T18:21:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 36,
        stuffingDateTime: '2023-08-25T18:21:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 37,
        stuffingDateTime: '2023-08-30T18:22:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 38,
        stuffingDateTime: '2023-08-24T18:26:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 39,
        stuffingDateTime: '2023-08-24T18:28:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 39,
        stuffingDateTime: '2023-08-25T18:28:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 40,
        stuffingDateTime: '2023-08-24T18:28:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 40,
        stuffingDateTime: '2023-08-25T18:28:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 41,
        stuffingDateTime: '2023-08-24T18:28:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
      {
        shipmentPlanId: 41,
        stuffingDateTime: '2023-08-25T18:28:00Z',
        shippingRoute: 'IDTPP-THSIR',
        havePricing: true,
        haveNotification: false,
      },
    ];
    this.shipData = this.shipData.map((dat) => {
      return {
        ...dat,
        date: dat.stuffingDateTime,
      };
    });
  },
  methods: {
    listDateData(date) {
      const find = this.shipmentPlanData.find((x) => dayjs(x.shipmentDate).isSame(dayjs(date), 'day'));
      return find;
    },
    invalidSizeHandler() {
      window.alert('Each maximum file size should not exceed 5 MB.');
    },
    disabledDate(date) {
      return new Date() < date;
    },
    disabledDateNext(date) {
      return new Date() > date;
    },
    disabledDateCalendar(date) {
      return new Date() >= date;
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
    submitChat() {
      console.log('submit chat');
    },
    enterShiftHandler() {
      this.textArea = this.textArea ? (this.textArea += '\n') : '\n';
    },
    changeCalendarHandler(date) {
      window.alert(`calendar display changed to ${date}`);
    },
    changeYearHandler(date) {
      window.alert(`change to ${date}`);
    },
    selectDate(date) {
      console.log('select date', date);
    },
  },
};
</script>

<style>
.new-update-indicator {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 6px;
  height: 6px;
  background: #ffd100;
  border-radius: 100%;
}

.list-ports-wrapper {
  position: absolute;
  top: 10px;
  left: 24px;

  .list-ports {
    width: 77px;
    height: 14px;
    margin-bottom: 2px;
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
    border-radius: 8px;

    &.bg-green-400 {
      background: #1fc700;
    }

    &.bg-red-4ec {
      background: #ec7173;
    }
  }

  .more-list-ports {
    font-size: 10px;
    font-weight: 500;
    text-align: start;
  }
}

.btn-plan {
  position: absolute;
  right: 3px;
  bottom: 3px;

  .icon-plus-circle {
    width: 11px;
    height: 11px;
    margin-right: 6px;
  }
}
</style>
