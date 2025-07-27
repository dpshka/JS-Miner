import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, renderSlot as _renderSlot } from "vue"
import _imports_0 from '@/assets/images/svg/icons/alarm-clock-time.svg'


const _hoisted_1 = {
  key: 0,
  class: "disabled-cover"
}
const _hoisted_2 = { class: "action-box-inside" }
const _hoisted_3 = { class: "text-content" }
const _hoisted_4 = { class: "flex-2" }
const _hoisted_5 = {
  key: 1,
  class: "font-normal text-neutral-600 mb-0 text-sm"
}

import GtcButton from "./Button.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'ActionBox',
  props: {
  isVertical: {
    type: Boolean,
    default: true,
  },
  isReversed: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  disabledText: {
    type: String,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: "blue",
  },
  button: {
    type: Object,
    default: () => ({}),
  },
},
  setup(__props) {



return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    "data-test": "action-box",
    class: _normalizeClass([
      'action-box',
      __props.isVertical ? 'vertical' : 'horizontal',
      {
        'bg-blue-200': __props.color === 'blue',
        'bg-purple-100': __props.color === 'purple',
        'bg-green-100': __props.color === 'green',
        'bg-yellow-300': __props.color === 'yellow',
        'md:p-14': !__props.dense,
        dense: __props.dense,
        reversed: __props.isReversed,
        disabled: __props.disabled,
      },
    ])
  }, [
    (__props.disabled)
      ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
          _createElementVNode("div", null, [
            _cache[0] || (_cache[0] = _createElementVNode("img", { src: _imports_0 }, null, -1)),
            _createElementVNode("h4", null, _toDisplayString(__props.disabledText), 1)
          ])
        ]))
      : _createCommentVNode("", true),
    _createElementVNode("div", _hoisted_2, [
      _createElementVNode("div", _hoisted_3, [
        _createElementVNode("div", _hoisted_4, [
          (__props.title)
            ? (_openBlock(), _createElementBlock("h3", {
                key: 0,
                class: _normalizeClass([
              'text-[18px] font-bold mb-4 leading-[1.14]',
              {
                'text-blue-300': __props.color === 'blue',
                'text-purple-500': __props.color === 'purple',
                'text-green-500': __props.color === 'green',
              },
            ])
              }, _toDisplayString(__props.title), 3))
            : _createCommentVNode("", true),
          (_ctx.$slots.text)
            ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
                _renderSlot(_ctx.$slots, "text")
              ]))
            : _createCommentVNode("", true)
        ])
      ]),
      (_ctx.$slots.image)
        ? _renderSlot(_ctx.$slots, "image", { key: 0 })
        : _createCommentVNode("", true)
    ])
  ], 2))
}
}

})