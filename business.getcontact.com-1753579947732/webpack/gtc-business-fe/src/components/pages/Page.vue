import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, renderSlot as _renderSlot } from "vue"

const _hoisted_1 = ["src"]
const _hoisted_2 = { class: "text-xs text-primary-500 font-normal ml-1 mt-px" }
const _hoisted_3 = {
  key: 1,
  class: "mb-5 text-neutral-1000 text-center md:text-left"
}
const _hoisted_4 = {
  key: 2,
  class: "mb-5 text-neutral-1000"
}
const _hoisted_5 = { class: "mb-12" }
const _hoisted_6 = {
  key: 0,
  class: "block text-center md:text-left"
}
const _hoisted_7 = {
  key: 1,
  class: "block animate-pulse rounded-full bg-secondary-100 h-6 w-[50rem] opacity-50"
}
const _hoisted_8 = { class: "relative" }

import { defineComponent } from "vue";

import GtcButton from "@/components/Button.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Page',
  props: {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  backTo: {
    type: Object,
    default: () => ({}),
  },
  wizardPage: {
    type: Boolean,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  alerts: {
    type: Array,
    default: () => [],
  },
  alertMin: {
    type: Boolean,
    default: false,
  },
},
  setup(__props) {



defineComponent({
  name: "GtcPage",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("article", {
    class: _normalizeClass([
      'px-4 py-6 bg-white-100 flex-1 md:px-14 md:py-12',
      { 'pt-4': __props.wizardPage },
      { 'hide-elements': !__props.visible },
    ])
  }, [
    (Object.keys(__props.backTo).length)
      ? (_openBlock(), _createBlock(GtcButton, {
          key: 0,
          class: _normalizeClass([
        'flex items-center pt-0 !pl-0 transform mb-4',
        { '-mt-10 md:-mt-14': !__props.alerts.length },
      ]),
          theme: "none",
          onClick: _cache[0] || (_cache[0] = ($event: any) => (_ctx.$router.push(__props.backTo)))
        }, {
          default: _withCtx(() => [
            _createElementVNode("img", {
              src: require('../../assets/images/svg/arrow-left.svg')
            }, null, 8, _hoisted_1),
            _createElementVNode("span", _hoisted_2, _toDisplayString(_ctx.$t("common.back")), 1)
          ]),
          _: 1
        }, 8, ["class"]))
      : _createCommentVNode("", true),
    (__props.title)
      ? (_openBlock(), _createElementBlock("h2", _hoisted_3, _toDisplayString(__props.title), 1))
      : _createCommentVNode("", true),
    (__props.title === null)
      ? (_openBlock(), _createElementBlock("h2", _hoisted_4, _cache[1] || (_cache[1] = [
          _createElementVNode("div", { class: "animate-pulse rounded-full bg-secondary-100 h-10 w-60 opacity-50" }, null, -1)
        ])))
      : _createCommentVNode("", true),
    _createElementVNode("p", _hoisted_5, [
      (__props.description)
        ? (_openBlock(), _createElementBlock("span", _hoisted_6, _toDisplayString(__props.description), 1))
        : _createCommentVNode("", true),
      (__props.description === null)
        ? (_openBlock(), _createElementBlock("span", _hoisted_7))
        : _createCommentVNode("", true),
      (__props.alerts.length && __props.alertMin)
        ? (_openBlock(true), _createElementBlock(_Fragment, { key: 2 }, _renderList(__props.alerts, (alert, index) => {
            return (_openBlock(), _createElementBlock("span", {
              key: index,
              class: "block mt-3 text-base font-medium text-[#f9a221]"
            }, _toDisplayString(alert.message), 1))
          }), 128))
        : _createCommentVNode("", true)
    ]),
    _createElementVNode("div", _hoisted_8, [
      _renderSlot(_ctx.$slots, "default")
    ])
  ], 2))
}
}

})