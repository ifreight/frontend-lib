<template>
  <div class="i-upload">
    <input
      ref="input"
      type="file"
      :accept="accept"
      :multiple="isMultiple"
      :name="name"
      @change="inputFile"
    />
    <slot :on-click="clickButton">
      <i-button
        class="i-upload-button"
        :class="{ invalid: invalid }"
        :disabled="isDisabled"
        :plain="isPlain"
        @click="clickButton"
      >
        <template #prepend>
          <ic-plus-circle
            v-if="isDisabled"
            class="i-upload-button-icon disabled"
          />
          <ic-plus-circle
            v-else
            class="i-upload-button-icon"
          />
        </template>

        <slot name="button"> Upload </slot>
      </i-button>
    </slot>
  </div>
</template>

<script>
import IButton from '@/components/i-button.vue';
import IcPlusCircle from '@/icons/ic-plus-circle.vue';

export default {
  name: 'IUpload',
  components: {
    IButton,
    IcPlusCircle,
  },
  props: {
    accept: {
      type: String,
      default: null,
    },
    value: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: null,
    },
    maxSize: {
      type: Number,
      default: 5120,
    },
    name: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDisabled: false,
      selectedFile: [],
    };
  },
  computed: {
    isPlain() {
      return !(this.$attrs.required === true || this.$attrs.required === '');
    },
    isMultiple() {
      if (!this.limit) {
        return true;
      }
      return this.limit && this.limit > 1;
    },
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.isDisabled = this.limit ? val.length >= this.limit : false;
        this.selectedFile = val;
      },
    },
  },
  methods: {
    clickButton() {
      this.$refs.input.click();
    },
    processingFile(file) {
      return new Promise((resolve, reject) => {
        const fileName = file.name.split('.');
        const ext = fileName[fileName.length - 1];
        const fr = new FileReader();
        fr.onload = (e) => {
          const dataURL = /,(.+)/.exec(e.target.result)[1];
          resolve({
            data: dataURL,
            name: file.name,
            fileExt: ext,
            url: `data:${file.type};base64,${dataURL}`,
          });
        };
        fr.onerror = reject;
        fr.readAsDataURL(file);
      });
    },

    async inputFile(data) {
      const invalidFileSize = [];
      Array.from(data.target.files).forEach(async (file, index) => {
        if (this.limit) {
          if (index + this.selectedFile.length <= this.limit - 1) {
            const isValidSize = file.size <= this.maxSize * 1024;
            if (isValidSize) {
              const result = await this.processingFile(file);
              this.$emit('input', this.value.concat(result));
            } else {
              invalidFileSize.push(file);
            }
          } else {
            this.$emit('invalidLimit', file);
          }
        } else {
          const isValidSize = file.size <= this.maxSize * 1024;
          if (isValidSize) {
            const result = await this.processingFile(file);
            this.$emit('input', this.value.concat(result));
          } else {
            invalidFileSize.push(file);
          }
        }
      });
      if (invalidFileSize.length > 0) {
        this.$emit('invalidSize', invalidFileSize);
      }

      this.$refs.input.value = null;
    },
  },
};
</script>

<style>
.i-upload {
  input[type='file'] {
    display: none;
  }

  .i-upload-button {
    height: 53px;
    padding: 0 21px;

    &.invalid {
      border: 2px solid var(--red-400);
      border-radius: 6px;
    }

    .i-upload-button-icon {
      margin-right: 8px;

      &.disabled {
        color: var(--gray-400);
      }
    }
  }
}
</style>
