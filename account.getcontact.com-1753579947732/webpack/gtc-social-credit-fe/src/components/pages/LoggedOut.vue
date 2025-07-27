import { defineComponent as _defineComponent } from 'vue'
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "text-center md:text-left m-10 mb-8 text-neutral-1000"
}
const _hoisted_2 = {
  key: 1,
  class: "mb-7"
}

import { defineComponent } from "vue";

import GtcNavbar from "@/components/layout/Navbar.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'LoggedOut',
  props: {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
},
  setup(__props) {



defineComponent({
  name: "GtcLoggedOut",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", null, [
    _createVNode(GtcNavbar),
    _createElementVNode("main", null, [
      (__props.title)
        ? (_openBlock(), _createElementBlock("h2", _hoisted_1, _toDisplayString(__props.title), 1))
        : _createCommentVNode("", true),
      (__props.description)
        ? (_openBlock(), _createElementBlock("p", _hoisted_2, _toDisplayString(__props.description), 1))
        : _createCommentVNode("", true),
      _renderSlot(_ctx.$slots, "default")
    ])
  ]))
}
}

})