import { defineComponent as _defineComponent } from 'vue'
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock } from "vue"

import { computed } from "vue";

import i18n from "@/utils/i18n";


export default /*@__PURE__*/_defineComponent({
  __name: 'App',
  setup(__props) {

const html = document.querySelector("html") as HTMLElement,
  rtlLocales = ["ar"],
  locale = computed(() => i18n.global.locale),
  dir = computed(() => (rtlLocales.includes(locale.value) ? "rtl" : "ltr"));

html.setAttribute("dir", dir.value);

return (_ctx: any,_cache: any) => {
  const _component_router_view = _resolveComponent("router-view")!

  return (_openBlock(), _createBlock(_component_router_view))
}
}

})