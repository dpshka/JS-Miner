import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, renderSlot as _renderSlot } from "vue"

const _hoisted_1 = { class: "flex-1" }
const _hoisted_2 = {
  key: 0,
  class: "font-medium alert-title"
}
const _hoisted_3 = {
  key: 1,
  class: "text-xs text-secondary-1000 alert-message"
}

import { defineComponent, onMounted } from "vue";

import { green, status } from "@/colors";
import Icon from "@/components/icons/IconRenderer.vue";
import { useAlert } from "@/composables/useAlert";

export default /*@__PURE__*/_defineComponent({
  __name: 'Alert',
  props: {
  type: {
    type: String,
    default: "warning",
    validator: (prop) => ["warning", "error", "success"].includes(prop),
  },
  title: {
    type: String,
  },
  button: {},
  message: {
    type: String,
  },
  noScrollBehavior: {
    type: Boolean,
    default: false,
  },
},
  setup(__props) {

const { removeAlert } = useAlert();

const props = __props;

onMounted(() => {
  if (!props.noScrollBehavior) {
    document
      .getElementsByClassName("alert")[0]
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

defineComponent({
  name: "GtcAlert",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    "data-test": "alert",
    class: _normalizeClass([`alert ${__props.type}`])
  }, [
    (__props.type === 'success')
      ? (_openBlock(), _createBlock(Icon, {
          key: 0,
          name: "SuccessCircle",
          color: _unref(green)[500],
          class: "success-icon w-[30px] h-[30px] mr-3"
        }, null, 8, ["color"]))
      : (_openBlock(), _createBlock(Icon, {
          key: 1,
          name: "Warning",
          class: _normalizeClass(`${__props.type}-icon mr-3`),
          color: 
        __props.type === 'warning' ? _unref(status).yellow : __props.type === 'error' ? _unref(status).red : ''
      
        }, null, 8, ["class", "color"])),
    _createElementVNode("div", _hoisted_1, [
      (__props.title)
        ? (_openBlock(), _createElementBlock("strong", _hoisted_2, _toDisplayString(__props.title), 1))
        : _createCommentVNode("", true),
      (__props.message)
        ? (_openBlock(), _createElementBlock("p", _hoisted_3, _toDisplayString(__props.message), 1))
        : _createCommentVNode("", true)
    ]),
    _createElementVNode("div", null, [
      _renderSlot(_ctx.$slots, "default")
    ]),
    (typeof __props.button === 'undefined')
      ? (_openBlock(), _createBlock(Icon, {
          key: 2,
          name: "Close",
          class: "close-icon w-3 mx-2 cursor-pointer",
          color: 
        __props.type === 'warning'
          ? _unref(status).yellow
          : __props.type === 'error'
          ? _unref(status).red
          : __props.type === 'success'
          ? _unref(green)[500]
          : ''
      ,
          onClick: _cache[0] || (_cache[0] = ($event: any) => (_unref(removeAlert)(true)))
        }, null, 8, ["color"]))
      : _createCommentVNode("", true)
  ], 2))
}
}

})