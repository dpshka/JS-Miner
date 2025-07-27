import { defineComponent as _defineComponent } from 'vue'
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createBlock as _createBlock, mergeProps as _mergeProps, Teleport as _Teleport } from "vue"
import _imports_0 from '@/assets/images/svg/info.svg'


const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-neutral-1000 bg-opacity-50 overflow-y-auto scrollbar-thin h-screen w-screen z-50",
  "data-test": "modal-teleport"
}
const _hoisted_2 = { class: "modal-icon mb-4" }
const _hoisted_3 = ["innerHTML"]
const _hoisted_4 = ["innerHTML"]
const _hoisted_5 = ["innerHTML"]
const _hoisted_6 = { class: "modal-content text-sm text-neutral-600" }
const _hoisted_7 = { class: "modal-buttons mt-6 flex justify-between" }

import { defineComponent } from "vue";

import GtcButton from "@/components/Button.vue";
import CloseIcon from "@/components/icons/Close.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Modal',
  props: {
  modelValue: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  warning: {
    type: String,
    default: "",
  },
  acceptButton: {
    type: String,
    default: "account.common.accept",
  },
  cancelButton: {
    type: String,
    default: "",
  },
},
  emits: ["update:modelValue", "modalCancel", "modalAccept"],
  setup(__props, { emit: __emit }) {

const emit = __emit;



function cancel() {
  emit("update:modelValue", false);
  emit("modalCancel");
}

function accept() {
  emit("update:modelValue", false);
  emit("modalAccept");
}

defineComponent({
  name: "GtcModal",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, {
      name: "modal",
      onClick: cancel
    }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", _hoisted_1))
          : _createCommentVNode("", true)
      ]),
      _: 1
    }),
    _createVNode(_Transition, { name: "modal" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", _mergeProps({ key: 0 }, _ctx.$attrs, {
              class: ["modal-wrap", { 'modal-closed': __props.modelValue }],
              "data-test": "modal"
            }), [
              _createElementVNode("div", _hoisted_2, [
                _renderSlot(_ctx.$slots, "icon", {}, () => [
                  _cache[0] || (_cache[0] = _createElementVNode("img", {
                    src: _imports_0,
                    class: "mb-2 mx-auto"
                  }, null, -1))
                ])
              ]),
              (__props.title)
                ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "modal-title text-xl font-bold mb-2",
                    innerHTML: _ctx.$t(__props.title)
                  }, null, 8, _hoisted_3))
                : _createCommentVNode("", true),
              (__props.message)
                ? (_openBlock(), _createElementBlock("p", {
                    key: 1,
                    class: "modal-message text-sm text-neutral-600",
                    innerHTML: _ctx.$t(__props.message)
                  }, null, 8, _hoisted_4))
                : _createCommentVNode("", true),
              (__props.warning)
                ? (_openBlock(), _createElementBlock("p", {
                    key: 2,
                    class: "modal-warning text-sm text-red-200",
                    innerHTML: _ctx.$t(__props.warning)
                  }, null, 8, _hoisted_5))
                : _createCommentVNode("", true),
              _createElementVNode("div", _hoisted_6, [
                _renderSlot(_ctx.$slots, "content")
              ]),
              _createElementVNode("div", _hoisted_7, [
                (__props.cancelButton)
                  ? (_openBlock(), _createBlock(GtcButton, {
                      key: 0,
                      theme: "light-blue",
                      onClick: cancel,
                      class: "mr-2 grow only:m-0"
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(_toDisplayString(_ctx.$t(__props.cancelButton)), 1)
                      ]),
                      _: 1
                    }))
                  : _createCommentVNode("", true),
                (__props.acceptButton)
                  ? (_openBlock(), _createBlock(GtcButton, {
                      key: 1,
                      onClick: accept,
                      class: "ml-2 grow only:m-0"
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(_toDisplayString(_ctx.$t(__props.acceptButton)), 1)
                      ]),
                      _: 1
                    }))
                  : _createCommentVNode("", true)
              ]),
              (__props.closable)
                ? (_openBlock(), _createBlock(GtcButton, {
                    key: 3,
                    class: "flex absolute top-2 right-2 !p-0 w-10",
                    theme: "white",
                    size: "xs",
                    onClick: cancel,
                    "data-test": "close-modal-button"
                  }, {
                    default: _withCtx(() => [
                      _createVNode(CloseIcon, {
                        class: "m-auto",
                        alt: "close",
                        color: "#c4d5ff",
                        weight: "light"
                      })
                    ]),
                    _: 1
                  }))
                : _createCommentVNode("", true)
            ], 16))
          : _createCommentVNode("", true)
      ]),
      _: 3
    })
  ]))
}
}

})