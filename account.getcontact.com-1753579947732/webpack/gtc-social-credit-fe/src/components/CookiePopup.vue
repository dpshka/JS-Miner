import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createBlock as _createBlock } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "cookies",
  "data-test": "cookie"
}
const _hoisted_2 = { key: 0 }
const _hoisted_3 = {
  href: "https://getcontact.com/privacy",
  target: "_blank",
  class: "underline"
}
const _hoisted_4 = {
  href: "https://getcontact.com/privacy",
  target: "_blank"
}
const _hoisted_5 = {
  key: 2,
  class: "buttons"
}

import { useCookies } from "@vueuse/integrations/useCookies";
import { onMounted, ref } from "vue";

import { useTemplateStore } from "@/stores/template.store";

export default /*@__PURE__*/_defineComponent({
  __name: 'CookiePopup',
  setup(__props) {

const { set, get } = useCookies();
const templateStore = useTemplateStore();
const cookies = ref(false);
const consent = ref(false);

function manageCookies(value: boolean) {
  const expireDate = new Date();
  // Since there is no defined gtag, the consent declaration has not been made.
  if (value) {
    expireDate.setTime(expireDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000); // 6 months
  } else {
    expireDate.setTime(expireDate.getTime() + 259200000); // 3 days
  }

  set("cookieInform", value ? "accept" : "reject", {
    expires: expireDate,
    path: "/",
    secure: true,
  });
  cookies.value = false;
}

async function getConsent() {
  const data = await templateStore.getConsentMode();

  if (data) {
    consent.value = data;
  }

  cookies.value = !get("cookieInform");
}

onMounted(() => {
  getConsent();
});

return (_ctx: any,_cache: any) => {
  const _component_i18n_t = _resolveComponent("i18n-t")!

  return (cookies.value)
    ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
        (!consent.value)
          ? (_openBlock(), _createElementBlock("p", _hoisted_2, [
              _createTextVNode(_toDisplayString(_ctx.$t("home.cookies.description")) + " ", 1),
              _createElementVNode("a", _hoisted_3, _toDisplayString(_ctx.$t("menu.footer.cookie")), 1)
            ]))
          : (_openBlock(), _createBlock(_component_i18n_t, {
              key: 1,
              keypath: "landing.cookies.description",
              tag: "p"
            }, {
              cookie: _withCtx(() => [
                _createElementVNode("a", _hoisted_4, _toDisplayString(_ctx.$t("landing.cookies.policy")), 1)
              ]),
              _: 1
            })),
        (consent.value)
          ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
              _createElementVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event: any) => (manageCookies(false)))
              }, _toDisplayString(_ctx.$t("landing.cookies.reject")), 1),
              _createElementVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event: any) => (manageCookies(true)))
              }, _toDisplayString(_ctx.$t("landing.cookies.accept")), 1)
            ]))
          : _createCommentVNode("", true),
        _createElementVNode("span", {
          onClick: _cache[2] || (_cache[2] = ($event: any) => (manageCookies(false)))
        }, "  ")
      ]))
    : _createCommentVNode("", true)
}
}

})