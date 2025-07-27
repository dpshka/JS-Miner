import { defineComponent as _defineComponent } from 'vue'
import { openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, mergeProps as _mergeProps, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["disabled"]

import { defineComponent } from "vue";

import GtcSpinner from "./icons/Spinner.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Button',
  props: {
  theme: {
    type: String,
    default: "primary",
    validator: (prop: string) =>
      [
        "none",
        "primary",
        "primary-outline",
        "danger",
        "danger-outline",
        "secondary",
        "light",
        "white",
        "success",
        "success-outline",
        "default-outline",
        "light-blue",
      ].includes(prop),
  },
  dense: {
    type: Boolean,
  },
  size: {
    type: String,
    default: "small",
    validator: (prop: string) =>
      ["large", "medium", "small", "xs", "xxs"].includes(prop),
  },
  disabled: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
},
  emits: ["click"],
  setup(__props, { emit: __emit }) {

const emit = __emit;



defineComponent({
  name: "GtcButton",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", _mergeProps({
    "data-test": "button",
    class: [`button ${__props.size} ${__props.theme}`, { dense: __props.dense, disabled: __props.disabled }],
    disabled: __props.disabled
  }, _ctx.$attrs, {
    onClick: _cache[0] || (_cache[0] = ($event: any) => (emit('click', $event)))
  }), [
    (__props.loading)
      ? (_openBlock(), _createBlock(GtcSpinner, { key: 0 }))
      : _renderSlot(_ctx.$slots, "default", { key: 1 })
  ], 16, _hoisted_1))
}
}

})