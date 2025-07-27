import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = {
  width: "15",
  height: "15",
  viewBox: "0 0 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}
const _hoisted_2 = ["fill"]

import { defineComponent } from "vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Hamburger',
  props: {
  color: {
    type: String,
    default: "white",
  },
},
  setup(__props) {



defineComponent({
  name: "HamburgerIcon",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("svg", _hoisted_1, [
    _createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M14.884 13.147c0-.601-.488-1.088-1.088-1.088H1.088a1.088 1.088 0 1 0 0 2.176h12.708c.6 0 1.088-.487 1.088-1.088zM13.796 6.03a1.088 1.088 0 0 1 0 2.177H1.088a1.088 1.088 0 0 1 0-2.177h12.707zm0-6.03a1.088 1.088 0 0 1 0 2.177H1.088a1.088 1.088 0 0 1 0-2.176h12.708z",
      fill: __props.color
    }, null, 8, _hoisted_2)
  ]))
}
}

})