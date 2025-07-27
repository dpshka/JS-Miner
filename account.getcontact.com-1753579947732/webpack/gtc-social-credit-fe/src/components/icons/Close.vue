import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Fragment as _Fragment } from "vue"

const _hoisted_1 = {
  key: 0,
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}
const _hoisted_2 = ["fill"]
const _hoisted_3 = {
  key: 1,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}
const _hoisted_4 = { "clip-path": "url(#clip0_1410_2271)" }
const _hoisted_5 = ["fill"]

import { defineComponent } from "vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Close',
  props: {
  color: {
    type: String,
    default: "#d7dbe8",
  },
  weight: {
    type: String,
    default: "medium", // medium - light
  },
},
  setup(__props) {



defineComponent({
  name: "CloseIcon",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    (__props.weight === 'medium')
      ? (_openBlock(), _createElementBlock("svg", _hoisted_1, [
          _createElementVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M19.4095 3.41421C20.1905 2.63317 20.1905 1.36683 19.4095 0.585786C18.6284 -0.195262 17.3621 -0.195262 16.581 0.585786L9.99519 7.17164L3.41421 0.590669C2.63317 -0.190379 1.36683 -0.190379 0.585786 0.590669C-0.195262 1.37172 -0.195262 2.63805 0.585786 3.4191L7.16676 10.0001L0.585786 16.581C-0.195262 17.3621 -0.195262 18.6284 0.585786 19.4095C1.36683 20.1905 2.63317 20.1905 3.41421 19.4095L9.99519 12.8285L16.581 19.4144C17.3621 20.1954 18.6284 20.1954 19.4095 19.4144C20.1905 18.6333 20.1905 17.367 19.4095 16.5859L12.8236 10.0001L19.4095 3.41421Z",
            fill: __props.color
          }, null, 8, _hoisted_2)
        ]))
      : _createCommentVNode("", true),
    (__props.weight === 'light')
      ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [
          _createElementVNode("g", _hoisted_4, [
            _createElementVNode("path", {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: "M4.22183 19.7784C4.79176 20.3483 5.71202 20.3521 6.27728 19.7868L12 14.0641L17.7227 19.7868C18.288 20.3521 19.2082 20.3483 19.7782 19.7784C20.3481 19.2084 20.3519 18.2882 19.7866 17.7229L14.0639 12.0002L19.7866 6.27748C20.3519 5.71221 20.3481 4.79195 19.7782 4.22202C19.2082 3.65209 18.288 3.6483 17.7227 4.21357L12 9.93629L6.27728 4.21357C5.71202 3.64831 4.79176 3.65209 4.22183 4.22202C3.65189 4.79195 3.64811 5.71221 4.21337 6.27748L9.93609 12.0002L4.21337 17.7229C3.64811 18.2882 3.65189 19.2084 4.22183 19.7784Z",
              fill: __props.color
            }, null, 8, _hoisted_5)
          ]),
          _cache[0] || (_cache[0] = _createElementVNode("defs", null, [
            _createElementVNode("clipPath", { id: "clip0_1410_2271" }, [
              _createElementVNode("rect", {
                width: "24",
                height: "24",
                fill: "white"
              })
            ])
          ], -1))
        ]))
      : _createCommentVNode("", true)
  ], 64))
}
}

})