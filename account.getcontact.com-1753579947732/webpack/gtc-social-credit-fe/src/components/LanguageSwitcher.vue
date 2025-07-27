import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, unref as _unref, toDisplayString as _toDisplayString, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, withCtx as _withCtx, createVNode as _createVNode } from "vue"

const _hoisted_1 = { class: "language-switcher" }
const _hoisted_2 = {
  class: "inline-flex items-center",
  "data-test": "language-switcher"
}
const _hoisted_3 = ["src"]
const _hoisted_4 = { class: "ml-1 text-neutral-600 font-medium text-sm" }
const _hoisted_5 = { class: "languages" }
const _hoisted_6 = { "data-test": "language-list" }
const _hoisted_7 = ["onClick"]
const _hoisted_8 = ["src"]

import { defineComponent, onMounted } from "vue";

import GtcPopover from "@/components/Popover.vue";
import { getFlagOfLocale } from "@/utils";
import { useLocale } from "@/utils/locale";


export default /*@__PURE__*/_defineComponent({
  __name: 'LanguageSwitcher',
  props: {
  dark: {
    type: Boolean,
    default: false,
  },
},
  setup(__props) {

const { locale, watchLocale, availableLocales } = useLocale();

onMounted(watchLocale);

function changeLocale(newLocale: string) {
  locale.value = newLocale;
}



defineComponent({
  name: "LanguageSwitcher",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(GtcPopover, { placement: "bottom-end" }, {
      content: _withCtx(({ hide }) => [
        _createElementVNode("div", _hoisted_5, [
          _createElementVNode("ul", _hoisted_6, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_unref(availableLocales), (availableLocale) => {
              return (_openBlock(), _createElementBlock("li", {
                key: availableLocale.locale,
                onClick: ($event: any) => {
                changeLocale(availableLocale.locale);
                hide();
              }
              }, [
                _createElementVNode("img", {
                  src: 
                  require(`@/assets/images/svg/flags/${_unref(getFlagOfLocale)(
                    availableLocale.locale
                  )}.svg`)
                
                }, null, 8, _hoisted_8),
                _createElementVNode("span", null, _toDisplayString(availableLocale.localeName), 1)
              ], 8, _hoisted_7))
            }), 128))
          ])
        ])
      ]),
      default: _withCtx(() => [
        _createElementVNode("button", _hoisted_2, [
          _createElementVNode("img", {
            src: 
            __props.dark
              ? require('../assets/images/svg/locale-icon-dark.svg')
              : require('../assets/images/svg/locale-icon.svg')
          ,
            alt: "Locale icon"
          }, null, 8, _hoisted_3),
          _createElementVNode("span", _hoisted_4, _toDisplayString(`${_unref(locale)}`.toUpperCase()), 1)
        ])
      ]),
      _: 1
    })
  ]))
}
}

})