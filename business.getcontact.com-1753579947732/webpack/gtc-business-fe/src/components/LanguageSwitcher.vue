import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, createTextVNode as _createTextVNode, withCtx as _withCtx, createVNode as _createVNode } from "vue"

const _hoisted_1 = { class: "language-switcher" }
const _hoisted_2 = {
  class: "inline-flex items-center",
  "data-test": "language-switcher"
}
const _hoisted_3 = { class: "mr-2" }
const _hoisted_4 = ["src"]
const _hoisted_5 = { class: "languages" }
const _hoisted_6 = { "data-test": "language-list" }
const _hoisted_7 = ["onClick"]

import { defineComponent, onMounted } from "vue";

import GtcPopover from "@/components/Popover.vue";
import { useLocale } from "@/composables/useLocale";
import { getFlagOfLocale } from "@/utils";


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

function changeLocale(newLocale: string) {
  locale.value = newLocale;
}

onMounted(watchLocale);



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
                _createElementVNode("span", {
                  class: _normalizeClass([
                  'fi fis mr-3',
                  `fi-${_unref(getFlagOfLocale)(availableLocale.locale)}`,
                ])
                }, null, 2),
                _createTextVNode(" " + _toDisplayString(availableLocale.localeName), 1)
              ], 8, _hoisted_7))
            }), 128))
          ])
        ])
      ]),
      default: _withCtx(() => [
        _createElementVNode("button", _hoisted_2, [
          _createElementVNode("span", _hoisted_3, _toDisplayString(`${_unref(locale)}`.toUpperCase()), 1),
          _createElementVNode("img", {
            src: 
            __props.dark
              ? require('../assets/images/svg/icons/locale-icon.svg')
              : require('../assets/images/svg/icons/locale-icon-dark.svg')
          ,
            alt: "Locale icon"
          }, null, 8, _hoisted_4)
        ])
      ]),
      _: 1
    })
  ]))
}
}

})