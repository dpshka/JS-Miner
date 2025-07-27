import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, vModelDynamic as _vModelDynamic, mergeProps as _mergeProps, unref as _unref, createElementVNode as _createElementVNode, withDirectives as _withDirectives, normalizeClass as _normalizeClass, createTextVNode as _createTextVNode, Fragment as _Fragment, createBlock as _createBlock } from "vue"
import _imports_0 from '@/assets/images/svg/search.svg'


const _hoisted_1 = {
  key: 0,
  class: "mb-1 text-sm"
}
const _hoisted_2 = { class: "input-container" }
const _hoisted_3 = {
  key: 0,
  class: "absolute top-1/2 left-3 translate-y-[-50%]"
}
const _hoisted_4 = ["disabled", "type"]
const _hoisted_5 = ["innerHTML"]
const _hoisted_6 = {
  key: 6,
  class: "pt-2 text-xs text-status-red"
}
const _hoisted_7 = {
  key: 7,
  class: "pt-2 text-xs text-gray-soft"
}

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


export default /*@__PURE__*/_defineComponent({
  __name: 'Input',
  props: {
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
},
  emits: ["update:modelValue", "file"],
  setup(__props, { emit: __emit }) {

const input = ref();
const props = __props;

const emit = __emit;
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

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("label", {
    class: _normalizeClass([{ file: _ctx.$attrs.type === 'file' }, "block mb-4 relative"])
  }, [
    (__props.label)
      ? (_openBlock(), _createElementBlock("div", _hoisted_1, _toDisplayString(__props.label), 1))
      : _createCommentVNode("", true),
    _createElementVNode("div", _hoisted_2, [
      (_ctx.$slots.prepend)
        ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
            _renderSlot(_ctx.$slots, "prepend")
          ]))
        : _createCommentVNode("", true),
      _withDirectives(_createElementVNode("input", _mergeProps({
        ref_key: "input",
        ref: input,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event: any) => ((inputValue).value = $event)),
        class: [
          'pl-4 py-3 rounded-lg placeholder-neutral-600 placeholder-opacity-50 outline-none block w-full bg-gray-100 leading-6 border border-transparent h-14',
          { 'border-status-red outline-0': __props.invalid },
          { 'bg-gray-100 text-neutral-500 opacity-100': __props.disabled },
          { 'pr-5': !__props.isPassword && !__props.clipboard },
          { 'pr-[74px]': __props.isPassword && __props.clipboard },
          { 'pr-8': __props.symbol },
          { 'input-inner-label': __props.innerLabel },
          {
            'pr-[42px]':
              (__props.isPassword && !__props.clipboard) || (!__props.isPassword && __props.clipboard),
          },
          { 'pl-9': _ctx.$slots.prepend },
        ],
        disabled: __props.disabled,
        type: inputType.value
      }, _ctx.$attrs), null, 16, _hoisted_4), [
        [_vModelDynamic, inputValue.value],
        [_unref(vMaska), void 0, __props.maskaOptions]
      ]),
      (__props.innerLabel)
        ? (_openBlock(), _createElementBlock("span", {
            key: 1,
            class: _normalizeClass(['placeholder', { '!text-neutral-500': __props.disabled }])
          }, _toDisplayString(__props.innerLabel), 3))
        : _createCommentVNode("", true)
    ]),
    (_ctx.$attrs.type === 'file')
      ? (_openBlock(), _createElementBlock("span", {
          key: 1,
          class: _normalizeClass([
        'file-custom bg-white-100 cursor-pointer border border-neutral-100 min-h-[3.6rem] truncate',
        { 'border border-status-red outline-0': __props.invalid },
        { 'bg-gray-100 cursor-not-allowed': __props.disabled },
      ])
        }, [
          (_ctx.$attrs.type === 'file' && selectedFile.name)
            ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                _createTextVNode(_toDisplayString(selectedFile.name), 1)
              ], 64))
            : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                _createTextVNode(_toDisplayString(inputValue.value ? inputValue.value : _ctx.$attrs.placeholder), 1)
              ], 64))
        ], 2))
      : _createCommentVNode("", true),
    (__props.search)
      ? (_openBlock(), _createElementBlock("img", {
          key: 2,
          class: _normalizeClass([
        'absolute right-4 top-[3.2rem] pointer-events-none',
        { 'top-[1.2rem]': !__props.label },
      ]),
          src: _imports_0
        }, null, 2))
      : _createCommentVNode("", true),
    (__props.clipboard && _unref(isSupported))
      ? (_openBlock(), _createBlock(CopyIcon, {
          key: 3,
          class: _normalizeClass([
        'absolute right-4 top-12 cursor-pointer',
        { 'right-12': __props.visible },
        { 'top-[1.1rem]': !__props.label },
      ]),
          onClick: _cache[1] || (_cache[1] = ($event: any) => (_unref(copy)(inputValue.value)))
        }, null, 8, ["class"]))
      : _createCommentVNode("", true),
    (__props.symbol)
      ? (_openBlock(), _createElementBlock("span", {
          key: 4,
          class: _normalizeClass([
        'absolute right-4 top-12 pointer-events-none font-medium',
        { 'top-[1.1rem]': !__props.label },
        { 'right-12': __props.visible },
        { 'top-[1.1rem]': !__props.label },
      ]),
          innerHTML: __props.symbol
        }, null, 10, _hoisted_5))
      : _createCommentVNode("", true),
    (_unref(copied) && __props.clipboard && _unref(isSupported))
      ? (_openBlock(), _createElementBlock("span", {
          key: 5,
          class: _normalizeClass(['absolute right-1 top-0', { '-top-7 right-1': !__props.label }])
        }, _toDisplayString(_ctx.$t("common.copied")), 3))
      : _createCommentVNode("", true),
    (__props.errorMessage)
      ? (_openBlock(), _createElementBlock("div", _hoisted_6, _toDisplayString(__props.errorMessage), 1))
      : _createCommentVNode("", true),
    (__props.hint)
      ? (_openBlock(), _createElementBlock("div", _hoisted_7, _toDisplayString(__props.hint), 1))
      : _createCommentVNode("", true)
  ], 2))
}
}

})