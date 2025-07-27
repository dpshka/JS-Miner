import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}
const _hoisted_2 = ["stroke"]
const _hoisted_3 = ["stroke"]

import { defineComponent } from "vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Copy',
  props: {
  color: {
    type: String,
    default: "#5F7FA3",
  },
},
  setup(__props) {



defineComponent({
  name: "CopyIcon",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("svg", _hoisted_1, [
    _createElementVNode("rect", {
      x: "6.992",
      y: "6.996",
      width: "14.006",
      height: "14.006",
      rx: "2",
      stroke: __props.color,
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, 8, _hoisted_2),
    _createElementVNode("path", {
      d: "M6.994 17.002H4.993a2 2 0 0 1-2-2V4.996a2 2 0 0 1 2-2h10.004a2 2 0 0 1 2.001 2v2",
      stroke: __props.color,
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, 8, _hoisted_3)
  ]))
}
}

})