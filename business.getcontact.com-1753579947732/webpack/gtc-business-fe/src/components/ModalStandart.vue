import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, renderSlot as _renderSlot, createTextVNode as _createTextVNode, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

const _hoisted_1 = ["src"]
const _hoisted_2 = ["textContent"]
const _hoisted_3 = ["textContent"]

import { defineComponent, Ref, ref, watch } from "vue";

import GtcButton from "@/components/Button.vue";
import GtcModal from "@/components/Modal.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'ModalStandart',
  props: {
  modelValue: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: require("@/assets/images/svg/icons/tick-circle.svg"),
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  button: {
    type: Object,
    default: () => ({}),
  },
},
  emits: ["update:modelValue", "clickButton", "onCloseModal"],
  setup(__props, { emit: __emit }) {

const emit = __emit;

const props = __props;

const val: Ref<boolean> = ref(props.modelValue);

const onClose = () => {
  emit("onCloseModal");
};

watch(
  () => props.modelValue,
  (e) => {
    val.value = e;
    emit("update:modelValue", e);
  }
);

watch(
  () => val.value,
  (e) => {
    emit("update:modelValue", e);
  }
);

defineComponent({
  name: "GtcModalStandart",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(GtcModal, {
    modelValue: val.value,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event: any) => ((val).value = $event)),
    class: "w-[600px] text-center",
    key: String(val.value),
    onModalCloseEvent: onClose
  }, {
    default: _withCtx(() => [
      _createElementVNode("img", {
        src: __props.image,
        class: "mx-auto mb-4"
      }, null, 8, _hoisted_1),
      _createElementVNode("p", {
        class: "text-[28px] font-bold text-center text-neutral-1000 mb-4 leading-[1.14]",
        textContent: _toDisplayString(__props.title),
        "data-test": "modalstandart-title"
      }, null, 8, _hoisted_2),
      _createElementVNode("p", {
        class: "text-base leading-[1.38] text-center text-secondary-1000 mb-6 max-w-[450px] mx-auto",
        textContent: _toDisplayString(__props.description),
        "data-test": "modalstandart-desc"
      }, null, 8, _hoisted_3),
      _renderSlot(_ctx.$slots, "default"),
      _createVNode(GtcButton, {
        disabled: !__props.button.status,
        theme: __props.button.theme,
        class: "w-[320px] max-w-full mb-3",
        loading: __props.button.loading,
        "data-test": "modalstandart-button",
        onClick: _cache[0] || (_cache[0] = ($event: any) => (emit('clickButton')))
      }, {
        default: _withCtx(() => [
          _createTextVNode(_toDisplayString(__props.button.text), 1)
        ]),
        _: 1
      }, 8, ["disabled", "theme", "loading"])
    ]),
    _: 3
  }, 8, ["modelValue"]))
}
}

})