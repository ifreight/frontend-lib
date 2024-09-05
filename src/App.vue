<template>
  <div
    id="app"
    class="p-5"
  >
    <span>Frontend Lib</span>
    <div>
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
      <h1>INPUT TEL</h1>
      <div class="w-[300px]">
        <i-input-tel v-model="phone" />
      </div>

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

        <i-button
          plain
          class="w-[200px]"
          @click="showDialogNoOut = true"
        >
          Open Dialog no outside handler
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

        <i-dialog
          :show.sync="showDialogNoOut"
          show-close
          show-header
          append-to-body
          destroy-on-close
          :ignore-click-outside="true"
        >
          can't close when click outside
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
      <div class="flex flex-wrap">
        <div class="py-5 flex w-[315px]">
          <i-datepicker
            v-model="date"
            @input="inputDateHandler"
          />
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
        <div class="py-5 w-[315px]">
          <div>
            using initial date:
            <input
              v-model="initialDate1"
              type="date"
              class="border border-solid border-gray-400"
              @change="showDatepicker1 = false"
            />
            <div class="flex">
              <i-radio
                v-model="showDatepicker1"
                name="triggerDate"
                :label="true"
                :disabled="!initialDate1"
              >
                <span class="ml-[8.5px] capitalize"> show </span>
              </i-radio>
              <i-radio
                v-model="showDatepicker1"
                name="triggerDate"
                :label="false"
                :disabled="!initialDate1"
              >
                <span class="ml-[8.5px] capitalize"> hide </span>
              </i-radio>
            </div>
          </div>
          <div class="flex">
            <i-datepicker
              v-if="showDatepicker1 && initialDate1"
              v-model="date2"
              :initial-date="initialDate1"
            />
          </div>
        </div>
      </div>
      <div>
        <div>date range</div>
        <div class="flex flex-wrap">
          <div class="py-5 w-[500px]">
            <div class="text-xs flex">
              1: {{ dateRange }}
              <i-button
                v-if="dateRange && dateRange.length > 0"
                text
                @click="dateRange = null"
              >
                clear
              </i-button>
            </div>
            <div class="flex">
              <i-date-range-picker v-model="dateRange" />
            </div>
          </div>
          <div class="py-5 w-[500px]">
            <div class="text-xs flex">
              2: {{ dateRange2 }}
              <i-button
                v-if="dateRange2 && dateRange2.length > 0"
                text
                @click="dateRange2 = null"
              >
                clear
              </i-button>
            </div>
            <div class="flex">
              <i-date-range-picker
                v-model="dateRange2"
                @input="inputDateRange2Handler"
              />
            </div>
          </div>
          <div class="py-5 w-[500px]">
            <div class="text-xs">[disabled]: {{ dateRange3 }}</div>
            <span class="text-2xs text-red-400">can only disable for one condition</span>
            <div class="flex">
              <i-date-range-picker
                v-model="dateRange3"
                :disabled-date="disabledDateRange"
              />
            </div>
          </div>
          <div class="py-5 w-[500px]">
            <div class="text-xs">[initialDate]: {{ dateRange4Initial }}</div>
            <span class="text-2xs text-red-400">if v-model isn't empty initialDate won't work</span>
            <div class="flex">
              <i-date-range-picker
                v-model="dateRange4"
                :initial-date="dateRange4Initial"
              />
            </div>
          </div>
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
            <div>replace able true limit 2</div>
            <small class="text-red-400">replace able can't run without limit</small>
            <i-upload
              v-model="files"
              :accept="acceptableFiles"
              required
              name="upload"
              :limit="2"
              :is-replaceable="true"
              @invalidSize="invalidSizeHandler"
              @inputFiles="changeFileHandler"
            />
            <i-file-list :files.sync="files" />
          </div>
          <div class="flex-1">
            <div>replace able true limit 1</div>
            <i-upload
              v-slot="{ onClick }"
              v-model="files2"
              :accept="acceptableFiles"
              :limit="1"
              :is-replaceable="true"
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
          <div class="flex-1">
            <div>replace able false limit 1</div>
            <i-upload
              v-model="files3"
              :accept="acceptableFiles"
              required
              name="upload"
              :limit="1"
              @invalidSize="invalidSizeHandler"
              @inputFiles="changeFileHandler"
            />
            <i-file-list :files.sync="files3" />
          </div>
          <div class="flex-1">
            <div>replace able false no limit</div>
            <i-upload
              v-model="files4"
              :accept="acceptableFiles"
              required
              name="upload"
              @invalidSize="invalidSizeHandler"
              @inputFiles="changeFileHandler"
            />
            <i-file-list :files.sync="files4" />
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
    <div
      class="sync-component"
      style="padding-bottom: 50px"
    >
      <div>
        <h4>dual input example</h4>
        <i-dual-input
          :filled="isDangerousGoods"
          :disabled="!isDangerousGoods"
          :invalid="false"
          first-input-width="fit-content"
          first-input-class="dual-first-class"
          second-input-width="100%"
          second-input-class="dual-second-class"
        >
          <template #first-input>
            <i-checkbox
              v-model="isDangerousGoods"
              input-checkbox-classes="mr-0"
            />
          </template>
          <template #second-input>
            <i-select
              v-model="imoClass"
              name="imoClass"
              label="Dangerous Goods"
              placeholder="Select IMO Number"
              :disabled="!isDangerousGoods"
              :options="imoClassList"
              :value-option.sync="selectedImoClass"
              borderless
              input-id="ImoClass"
            >
              <template #prepend>
                <ic-info-circle
                  class="-ml-4"
                  :class="isDangerousGoods ? 'text-gray-900' : 'text-gray-400'"
                />
              </template>
            </i-select>
          </template>
        </i-dual-input>
      </div>
      <div style="margin-top: 20px">
        <h4>pill example</h4>
        <i-pill
          v-model="activePill"
          :menu="[
            {
              key: 'ftl',
              label: 'Trucking (FTL)',
              primary: true,
            },
            {
              key: 'fcl',
              label: 'FCL',
              primary: true,
            },
          ]"
        />
      </div>
      <div style="margin-top: 20px">
        <h4>multi input</h4>
        <i-multi-input
          :invalid="false"
          :filled="true"
          style="width: fit-content"
        >
          <i-input
            v-model="height"
            input-id="heightCm"
            name="heightCm"
            label="Height"
            borderless
            mask="decimal"
            :invalid="false"
          />
          <i-input
            v-model="width"
            input-id="widthCm"
            name="widthCm"
            label="Width"
            borderless
            mask="decimal"
            :invalid="false"
          />
          <i-input
            v-model="length"
            input-id="lengthCm"
            name="lengthCm"
            label="Length"
            borderless
            mask="decimal"
            :invalid="false"
          />
        </i-multi-input>
      </div>
      <div style="margin-top: 20px">
        <h4>input suggestion</h4>
        <i-input-suggestion
          v-model="suggestion"
          name="packageType"
          label="Package Type"
          placeholder="Box, Drum, etc"
          size="sm"
          :options="packageTypeList"
          :invalid="false"
          input-id="Suggestion"
          class="package-input-suggestion"
          dropdown-max-height="290px"
        >
          <template #dropdownHeader>
            <div class="text-xs text-gray-400 text-right">common used</div>
          </template>
        </i-input-suggestion>
      </div>
      <div style="margin-top: 20px">
        <h4>select country port</h4>
        <i-select-country-port
          v-model="countryPort"
          label="Country Port Example"
          placeholder="Type "
          remote-text="Input port name or country to search."
          name="countryPort"
          :invalid="false"
          :remote-method="remoteCountryPort"
          :value-option.sync="selectedCountryPort"
          input-id="SelectCountryPort"
        >
          <template #prepend>
            <ic-location />
          </template>
        </i-select-country-port>

        <h4 class="mt-5">using dual input (borderless)</h4>
        <i-dual-input>
          <template #first-input>
            <i-select-country-port
              v-model="countryPort1"
              label="Country Port Example"
              placeholder="Type "
              remote-text="Input port name or country to search."
              name="countryPort"
              :invalid="false"
              :remote-method="remoteCountryPort"
              :value-option.sync="selectedCountryPort1"
              input-id="SelectCountryPort1"
              borderless
            >
              <template #prepend>
                <ic-location />
              </template>
            </i-select-country-port>
          </template>
          <template #icon>
            <ic-arrow-circle />
          </template>
          <template #second-input>
            <i-select-country-port
              v-model="countryPort2"
              label="Country Port Example"
              placeholder="Type "
              remote-text="Input port name or country to search."
              name="countryPort"
              :invalid="false"
              :remote-method="remoteCountryPort"
              :value-option.sync="selectedCountryPort2"
              input-id="SelectCountryPort2"
              borderless
            >
              <template #prepend>
                <ic-location />
              </template>
            </i-select-country-port>
          </template>
        </i-dual-input>
      </div>
      <div style="margin-top: 40px">
        <h4>Input Number</h4>
        <i-input-number
          v-model="inputNumber"
          :min="0"
        />
      </div>
      <div style="margin-top: 40px">
        <h4>Top Drawer (i-drawer)</h4>
        <div class="flex">
          drawer position:
          <i-radio
            v-model="drawerMode"
            label="absolute"
            value="absolute"
            name="drawer"
          >
            absolute
          </i-radio>
          <i-radio
            v-model="drawerMode"
            label="fixed"
            value="fixed"
            name="drawer"
          >
            fixed
          </i-radio>
        </div>
        <i-button @click="drawer = true"> Toogle Drawer </i-button>
        <i-drawer
          v-model="drawer"
          :min="0"
          :position="drawerMode"
        >
          Hello Drawer
        </i-drawer>
      </div>
      <div style="margin-top: 40px">
        <h4>Top Drawer (i-drawer)</h4>
        <div>
          <i-accordion>
            <i-accordion-item
              v-for="(vendor, key) in listVendor"
              :key="key"
              :index="key"
              :name="vendor.vendorCompany.id"
            >
              <template #header>
                {{ vendor.vendorCompany.name }}
              </template>
              <div class="flex">
                <div class="py-2 px-3 mr-5 bg-gray-120 rounded-[10px] min-w-[164px] self-start">
                  <p class="font-semibold text-sm">Rates Detail</p>
                </div>
                detail
              </div>
            </i-accordion-item>
          </i-accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import IBox from './components/i-box.vue';
import IButton from './components/i-button.vue';
import ICalendar from './components/i-calendar.vue';
import ICheckbox from './components/i-checkbox.vue';
import IDatepicker from './components/datepicker/i-datepicker.vue';
import IDateRangePicker from './components/datepicker/i-date-range-picker.vue';
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
import IPill from './components/i-pill.vue';
import IMultiInput from './components/i-multi-input.vue';
import IInputSuggestion from './components/i-input-suggestion.vue';
import ISelectCountryPort from './components/i-select-country-port.vue';
import IInputNumber from './components/i-input-number.vue';
import IDrawer from './components/i-drawer.vue';
import IAccordion from './components/accordion/i-accordion.vue';
import IAccordionItem from './components/accordion/i-accordion-item.vue';

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
    IDateRangePicker,
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
    IPill,
    IMultiInput,
    IInputSuggestion,
    ISelectCountryPort,
    IInputNumber,
    IDrawer,
    IAccordion,
    IAccordionItem,
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
      showDialogNoOut: false,
      date: [],
      date2: undefined,
      dateMultiple: [],
      dateRange: undefined,
      dateRange2: [],
      dateRange3: [],
      dateRange4: undefined,
      dateRange4Initial: undefined,
      showDatepicker1: false,
      initialDate1: undefined,
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
      files3: [],
      files4: [],
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
      imoClass: null,
      isDangerousGoods: false,
      selectedImoClass: undefined,
      activePill: 'ftl',
      height: null,
      width: null,
      length: null,
      suggestion: null,
      countryPort: null,
      selectedCountryPort: null,
      countryPort1: null,
      selectedCountryPort1: null,
      countryPort2: null,
      selectedCountryPort2: null,
      inputNumber: 0,
      drawer: false,
      drawerMode: 'fixed',
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
    imoClassList() {
      return [
        {
          id: 1,
          description: 'Explosives',
          name: 'IMO Class 1',
        },
        {
          id: 2,
          description: 'Gases:Compressed, Liquefied, ord Dissolved under Pressure',
          name: 'IMO Class 2',
        },
        {
          id: 3,
          description: 'Flammable Liquids',
          name: 'IMO Class 3',
        },
        {
          id: 4,
          description: 'Flammable Solids or Substances',
          name: 'IMO Class 4',
        },
        {
          id: 5,
          description: 'Oxidizing Substances and Organic Peroxides',
          name: 'IMO Class 5',
        },
        {
          id: 6,
          description: 'Toxic and Infectious Substances',
          name: 'IMO Class 6',
        },
        {
          id: 7,
          description: 'Radioactive Substances',
          name: 'IMO Class 7',
        },
        {
          id: 8,
          description: 'Corrosives Substances',
          name: 'IMO Class 8',
        },
        {
          id: 9,
          description: 'Miscellaneous Dangerous Substances and Articles',
          name: 'IMO Class 9',
        },
      ];
    },
    packageTypeList() {
      return ['Box(es)', 'Pallet(s)', 'Drum(s)', 'Crate(s)', 'Carton(s)', 'Case(s)'];
    },
    listVendor() {
      return [
        {
          vendorCompany: {
            id: 107,
            name: 'B thoven Cr.',
            displayName: 'PT Bethoven NEWEST',
            logoPath:
              'https://ifreight-upload.s3.ap-southeast-1.amazonaws.com/images/jpg/2021/8/23/c4715850-4e36-4ca3-8571-fa1eb6e306fb.jpg',
          },
          pricings: [
            {
              fclPricingId: 456,
              validFrom: '2025-12-31T17:00:00Z',
              validTo: '2026-12-02T17:00:00Z',
              grandTotal: {
                currency: 'IDR',
                value: '1291727.3',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '73',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '150000',
                },
              },
            },
          ],
        },
        {
          vendorCompany: {
            id: 86,
            name: 'Pom Vendor Land EDI EMKL',
            displayName: 'PVL-EDI-EMKL Display',
            logoPath:
              'https://ifreight-upload.s3.ap-southeast-1.amazonaws.com/images/png/2020/6/3/d0790acc-f4bd-4831-9178-19a509dcce7c.png',
          },
          pricings: [
            {
              fclPricingId: 535,
              validFrom: '2022-12-23T17:00:00Z',
              validTo: '2023-12-30T16:59:59.999Z',
              grandTotal: {
                currency: 'IDR',
                value: '1716000',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '130.5',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '150000',
                },
              },
            },
          ],
        },
        {
          vendorCompany: {
            id: 92,
            name: 'FCL and Land 01',
            displayName: null,
            logoPath:
              'https://ifreight-upload.s3.ap-southeast-1.amazonaws.com/images/png/2021/1/25/20f44a24-3cf4-47b8-910c-cc27f2da00a4.png',
          },
          pricings: [
            {
              fclPricingId: 631,
              validFrom: '2023-08-07T17:00:00Z',
              validTo: '2024-08-10T16:59:59.999Z',
              grandTotal: {
                currency: 'IDR',
                value: '2140000',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '121',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '325000',
                },
              },
            },
          ],
        },
        {
          vendorCompany: {
            id: 1,
            name: 'QUANTERM',
            displayName: 'Quanterm',
            logoPath:
              'https://ifreight-upload.s3.ap-southeast-1.amazonaws.com/images/png/2020/2/3/4ee60f08-76d5-4f0a-a9f8-ea1d0a07a0af.png',
          },
          pricings: [
            {
              fclPricingId: 628,
              validFrom: '2023-08-07T17:00:00Z',
              validTo: '2024-08-03T16:59:59.999Z',
              grandTotal: {
                currency: 'IDR',
                value: '2261413.5',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '135',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '150000',
                },
              },
            },
          ],
        },
        {
          vendorCompany: {
            id: 70,
            name: 'vendor ngetest doang',
            displayName: 'VND Display',
            logoPath:
              'https://ifreight-upload.s3.ap-southeast-1.amazonaws.com/images/png/2020/2/12/66314eba-3c14-42a4-b4fc-bb3050bf5b0f.png',
          },
          pricings: [
            {
              fclPricingId: 580,
              validFrom: '2023-03-08T17:00:00Z',
              validTo: '2024-03-31T16:59:59.999Z',
              grandTotal: {
                currency: 'IDR',
                value: '2646015',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '150',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '300000',
                },
              },
            },
          ],
        },
        {
          vendorCompany: {
            id: 2,
            name: 'MENTARI',
            displayName: 'Mentari Display',
            logoPath:
              'https://ifreight-upload.s3.ap-southeast-1.amazonaws.com/images/png/2020/2/3/4ee60f08-76d5-4f0a-a9f8-ea1d0a07a0af.png',
          },
          pricings: [
            {
              fclPricingId: 458,
              validFrom: '2026-03-19T17:00:00Z',
              validTo: '2026-03-30T17:00:00Z',
              grandTotal: {
                currency: 'IDR',
                value: '5010000',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '460',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '410000',
                },
              },
            },
            {
              fclPricingId: 648,
              validFrom: '2027-07-31T17:00:00Z',
              validTo: '2027-08-31T16:59:59.999Z',
              grandTotal: {
                currency: 'IDR',
                value: '1510000',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '110',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '410000',
                },
              },
            },
          ],
        },
        {
          vendorCompany: {
            id: 68,
            name: 'Bro Inc.',
            displayName: null,
            logoPath:
              'https://ifreight-upload.s3.ap-southeast-1.amazonaws.com/images/jpg/2020/2/7/84c8e732-c088-453b-a846-6c8ff625fb04.jpg',
          },
          pricings: [
            {
              fclPricingId: 630,
              validFrom: '2023-08-07T17:00:00Z',
              validTo: '2024-08-01T16:59:59.999Z',
              grandTotal: {
                currency: 'IDR',
                value: '73267467.5',
              },
              grandTotalPerCurrency: {
                grandTotalUSD: {
                  currency: 'USD',
                  value: '4675',
                },
                grandTotalIDR: {
                  currency: 'IDR',
                  value: '150000',
                },
              },
            },
          ],
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
    this.addData();
  },
  methods: {
    addData() {
      this.date = ['2023-01-03'];
      this.dateRange2 = ['2023-01-02', '2023-02-03'];
      this.dateRange4Initial = '2021-03-12';
    },
    inputDateHandler() {
      console.log('terjadi input di date');
    },
    inputDateRange2Handler() {
      console.log('terjadi input di date range');
    },
    listDateData(date) {
      const find = this.shipmentPlanData.find((x) => dayjs(x.shipmentDate).isSame(dayjs(date), 'day'));
      return find;
    },
    invalidSizeHandler() {
      window.alert('Each maximum file size should not exceed 5 MB.');
    },
    changeFileHandler(file) {
      console.log(file, 'file');
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
    disabledDateRange(date) {
      return dayjs().add(1, 'month') <= date;
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
    remoteCountryPort() {
      return [
        {
          portId: 27,
          portCode: 'JUR',
          portName: 'Jurong/Singapore',
          portAddress: null,
          portLocation: 'Jurong/Singapore, Singapore (SGJUR)',
          countryId: 7,
          countryCode: 'SG',
          countryName: 'Singapore',
        },
        {
          portId: 24,
          portCode: 'KEP',
          portName: 'Keppel Wharves',
          portAddress: null,
          portLocation: 'Keppel Wharves, Singapore (SGKEP)',
          countryId: 7,
          countryCode: 'SG',
          countryName: 'Singapore',
        },
        {
          portId: 25,
          portCode: 'PAP',
          portName: 'Pasir Panjang Wharves',
          portAddress: null,
          portLocation: 'Pasir Panjang Wharves, Singapore (SGPAP)',
          countryId: 7,
          countryCode: 'SG',
          countryName: 'Singapore',
        },
        {
          portId: 26,
          portCode: 'SEM',
          portName: 'Sembawang Port',
          portAddress: null,
          portLocation: 'Sembawang Port, Singapore (SGSEM)',
          countryId: 7,
          countryCode: 'SG',
          countryName: 'Singapore',
        },
        {
          portId: 28,
          portCode: 'SIN',
          portName: 'Singapore',
          portAddress: null,
          portLocation: 'Singapore, Singapore (SGSIN)',
          countryId: 7,
          countryCode: 'SG',
          countryName: 'Singapore',
        },
        {
          portId: 29,
          portCode: 'SCT',
          portName: 'Singapore Container Terminal',
          portAddress: null,
          portLocation: 'Singapore Container Terminal, Singapore (SGSCT)',
          countryId: 7,
          countryCode: 'SG',
          countryName: 'Singapore',
        },
        {
          portId: 23,
          portCode: 'TPG',
          portName: 'Tanjong Pagar',
          portAddress: null,
          portLocation: 'Tanjong Pagar, Singapore (SGTPG)',
          countryId: 7,
          countryCode: 'SG',
          countryName: 'Singapore',
        },
      ];
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

.dual-first-class {
  padding-left: 20px;
}
</style>
