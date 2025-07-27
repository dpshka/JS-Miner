import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = {
  width: "30",
  height: "30",
  viewBox: "0 0 30 30",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}
const _hoisted_2 = ["stroke"]
const _hoisted_3 = ["stroke"]
const _hoisted_4 = ["stroke"]

import { defineComponent } from "vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Warning',
  props: {
  color: {
    type: String,
    default: "#000",
  },
},
  setup(__props) {



defineComponent({
  name: "WarningIcon",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("svg", _hoisted_1, [
    _createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M15 26.25C8.7868 26.25 3.75 21.2132 3.75 15V15C3.75 8.7868 8.7868 3.75 15 3.75V3.75C21.2132 3.75 26.25 8.7868 26.25 15V15C26.25 21.2132 21.2132 26.25 15 26.25V26.25Z",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      stroke: __props.color
    }, null, 8, _hoisted_2),
    _createElementVNode("path", {
      d: "M15 16.2501V10.7896",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      stroke: __props.color
    }, null, 8, _hoisted_3),
    _createElementVNode("path", {
      d: "M15 18.9475V19.0133",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      stroke: __props.color
    }, null, 8, _hoisted_4)
  ]))
}
}

})