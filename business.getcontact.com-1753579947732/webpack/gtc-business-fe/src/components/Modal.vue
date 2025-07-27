import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, mergeProps as _mergeProps, createElementVNode as _createElementVNode, Transition as _Transition, withCtx as _withCtx, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = ["dir"]

import { defineComponent } from "vue";

import Icon from "@/components/icons/IconRenderer.vue";
import { useDir } from "@/composables/useDir";


export default /*@__PURE__*/_defineComponent({
  __name: 'Modal',
  props: {
  modelValue: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: "",
  },
},
  emits: ["update:modelValue", "modalCloseEvent"],
  setup(__props, { emit: __emit }) {

const emit = __emit;



const { dir } = useDir();

const close = () => {
  emit("update:modelValue", false);
  emit("modalCloseEvent", true);
};

defineComponent({
  name: "GtcModal",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, { name: "modal" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              dir: _unref(dir),
              class: "fixed inset-0 bg-neutral-1000 bg-opacity-50 overflow-y-auto scrollbar scrollbar-thin h-screen w-screen z-50 flex items-center justify-center",
              "data-test": "modal-teleport"
            }, [
              _createElementVNode("div", _mergeProps(_ctx.$attrs, {
                class: ['modal-wrap', __props.className, { 'modal-closed': __props.modelValue }],
                "data-test": "modal"
              }), [
                (__props.closable)
                  ? (_openBlock(), _createElementBlock("button", {
                      key: 0,
                      class: "absolute top-4 right-4 h-4 w-4 hover:opacity-50",
                      onClick: close,
                      "data-test": "close-modal-button"
                    }, [
                      _createVNode(Icon, {
                        name: "Close",
                        class: "w-4 h-4 rounded-full",
                        alt: "close"
                      })
                    ]))
                  : _createCommentVNode("", true),
                _renderSlot(_ctx.$slots, "default")
              ], 16)
            ], 8, _hoisted_1))
          : _createCommentVNode("", true)
      ]),
      _: 3
    })
  ]))
}
}

})