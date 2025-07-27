<template>
  <label :class="{ file: $attrs.type === 'file' }" class="block mb-4 relative">
    <div v-if="label" class="mb-1 text-sm">{{ label }}</div>
    <div class="input-container">
      <div
        v-if="$slots.prepend"
        class="absolute top-1/2 left-3 translate-y-[-50%]"
      >
        <slot name="prepend"></slot>
      </div>
      <input
        ref="input"
        v-model="inputValue"
        v-maska:[maskaOptions]
        :class="[
          'pl-4 py-3 rounded-lg placeholder-neutral-600 placeholder-opacity-50 outline-none block w-full bg-gray-100 leading-6 border border-transparent h-14',
          { 'border-status-red outline-0': invalid },
          { 'bg-gray-100 text-neutral-500 opacity-100': disabled },
          { 'pr-5': !isPassword && !clipboard },
          { 'pr-[74px]': isPassword && clipboard },
          { 'pr-8': symbol },
          { 'input-inner-label': innerLabel },
          {
            'pr-[42px]':
              (isPassword && !clipboard) || (!isPassword && clipboard),
          },
          { 'pl-9': $slots.prepend },
        ]"
        :disabled="disabled"
        :type="inputType"
        v-bind="$attrs"
      />
      <span
        v-if="innerLabel"
        :class="['placeholder', { '!text-neutral-500': disabled }]"
      >
        {{ innerLabel }}
      </span>
    </div>
    <span
      v-if="$attrs.type === 'file'"
      :class="[
        'file-custom bg-white-100 cursor-pointer border border-neutral-100 min-h-[3.6rem] truncate',
        { 'border border-status-red outline-0': invalid },
        { 'bg-gray-100 cursor-not-allowed': disabled },
      ]"
    >
      <template v-if="$attrs.type === 'file' && selectedFile.name">
        {{ selectedFile.name }}
      </template>
      <template v-else>
        {{ inputValue ? inputValue : $attrs.placeholder }}
      </template>
    </span>
    <img
      v-if="search"
      :class="[
        'absolute right-4 top-[3.2rem] pointer-events-none',
        { 'top-[1.2rem]': !label },
      ]"
      src="@/assets/images/svg/search.svg"
    />
    <CopyIcon
      v-if="clipboard && isSupported"
      :class="[
        'absolute right-4 top-12 cursor-pointer',
        { 'right-12': visible },
        { 'top-[1.1rem]': !label },
      ]"
      @click="copy(inputValue)"
    />
    <span
      v-if="symbol"
      :class="[
        'absolute right-4 top-12 pointer-events-none font-medium',
        { 'top-[1.1rem]': !label },
        { 'right-12': visible },
        { 'top-[1.1rem]': !label },
      ]"
      v-html="symbol"
    />
    <span
      v-if="copied && clipboard && isSupported"
      :class="['absolute right-1 top-0', { '-top-7 right-1': !label }]"
      >{{ $t("common.copied") }}</span
    >
    <div v-if="errorMessage" class="pt-2 text-xs text-status-red">
      {{ errorMessage }}
    </div>
    <div v-if="hint" class="pt-2 text-xs text-gray-soft">
      {{ hint }}
    </div>
  </label>
</template>

<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
import { vMaska } from "maska";
import {
  computed,
  ComputedRef,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  Ref,
  ref,
  useAttrs,
  watch,
} from "vue";

import CopyIcon from "@/components/icons/Copy.vue";

const input = ref();
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  search: {
    type: Boolean,
    default: false,
  },
  symbol: {
    type: String,
    default: "",
  },
  clipboard: {
    type: Boolean,
    default: false,
  },
  innerLabel: {
    type: String,
    default: "",
  },
  isPassword: {
    type: Boolean,
    default: false,
  },
  maskaOptions: {
    type: Object || null,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "file"]);
const attrs = useAttrs();

const inputValue: Ref<string | number> = ref(props.modelValue);
const visibility = ref(props.visible);

const { copy, copied, isSupported } = useClipboard();

const inputType: ComputedRef<string> = computed(() => {
  if (attrs.type === "password" || props.isPassword || props.visible) {
    return visibility.value
      ? attrs.type !== "password"
        ? (attrs.type as string)
        : "text"
      : "password";
  }
  return attrs.type as string;
});

watch(inputValue, (value) => emit("update:modelValue", value));
watch(
  () => props.modelValue,
  (value) => {
    if (attrs.type !== "file") {
      inputValue.value = value;
    }
  }
);

function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const selectedFile = reactive({
  name: "",
  base64: "",
});

async function fileEventListener() {
  const file = input.value?.files[0];
  if (file) {
    selectedFile.name = file.name;
    selectedFile.base64 = await getBase64(file);
    emit("file", selectedFile.base64);
  } else {
    selectedFile.name = "";
    selectedFile.base64 = "";
  }
}

onMounted(async () => {
  if (attrs.type === "file" && input.value) {
    input.value.addEventListener("change", fileEventListener);
  }
});

onBeforeUnmount(() => {
  if (attrs.type === "file" && input.value) {
    input.value.removeEventListener("change", fileEventListener);
  }
});

defineComponent({
  name: "GtcInput",
});
</script>
<style scoped lang="postcss">
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"] {
  @apply text-base;

  &:focus {
    @apply border-primary-500;
  }
}

.file {
  @apply cursor-pointer w-full inline-block relative;

  input {
    min-width: 14rem;
    @apply hidden m-0;
  }
}

.file-custom {
  user-select: none;
  @apply relative z-10 left-0 top-0 right-0 px-5 py-4 pr-12 rounded-lg outline-1 placeholder-neutral-600 placeholder-opacity-50 outline-primary-500 block w-full;

  &:before {
    top: -0.075rem;
    right: -0.075rem;
    bottom: -0.075rem;
    content: " ";
    background: url(../assets/images/svg/upload.svg) no-repeat center;
    padding: 0.5rem 2rem;
    line-height: 1.5;
    @apply absolute block z-20;
  }
}

input::-webkit-credentials-auto-fill-button {
  visibility: hidden;
  position: absolute;
  right: 0;
}

.input-container {
  @apply w-full h-[56px] relative;

  .input-inner-label {
    &:focus,
    &:not(:placeholder-shown) {
      @apply pt-5 pb-1;
    }

    &:-webkit-autofill,
    &:focus,
    &:not(:placeholder-shown) {
      & ~ .placeholder {
        @apply font-semibold -translate-y-3 translate-x-0 text-sm text-[10px] text-primary-500;
      }
    }
  }

  .placeholder {
    @apply absolute text-sm top-0 bottom-0 my-auto h-5 left-[16px] text-neutral-600 pointer-events-none origin-[0_50%] duration-200;
  }
}
</style>
