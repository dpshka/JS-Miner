import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue"

const _hoisted_1 = { class: "bg-secondary-1000 flex" }
const _hoisted_2 = { class: "container mx-auto md:px-20 md:px-6" }
const _hoisted_3 = ["src", "alt"]
const _hoisted_4 = { class: "grid grid-rows-5 md:grid-rows-1 grid-flow-col gap-5 mt-3 text-center md:text-left" }
const _hoisted_5 = { class: "footer-block" }
const _hoisted_6 = {
  href: "https://web.getcontact.com/",
  target: "_blank"
}
const _hoisted_7 = {
  href: "https://premium.getcontact.com/",
  target: "_blank"
}
const _hoisted_8 = {
  href: "https://www.getcontact.com/features",
  target: "_blank"
}
const _hoisted_9 = {
  href: "https://www.getcontact.com/stories",
  target: "_blank"
}
const _hoisted_10 = {
  href: "https://www.getcontact.com/career",
  target: "_blank"
}
const _hoisted_11 = { class: "footer-block" }
const _hoisted_12 = {
  href: "https://getcontactforbusiness.faq.desk360.com/",
  target: "_blank"
}
const _hoisted_13 = { class: "footer-block" }
const _hoisted_14 = { class: "footer-block" }
const _hoisted_15 = { class: "footer-block" }
const _hoisted_16 = {
  href: "https://www.facebook.com/getcontactapp/",
  target: "_blank",
  "aria-label": "Facebook"
}
const _hoisted_17 = ["src"]
const _hoisted_18 = {
  href: "https://x.com/getcontact/",
  target: "_blank",
  "aria-label": "X"
}
const _hoisted_19 = ["src"]
const _hoisted_20 = {
  href: "https://www.instagram.com/getcontact/",
  target: "_blank",
  "aria-label": "Instagram"
}
const _hoisted_21 = ["src"]
const _hoisted_22 = {
  href: "https://www.linkedin.com/company/getcontact/",
  target: "_blank",
  "aria-label": "Linkedin"
}
const _hoisted_23 = ["src"]
const _hoisted_24 = { class: "border-t border-blue-border mt-10 text-xs text-secondary-100" }
const _hoisted_25 = { class: "opacity-50 md:float-right block md:inline text-center md:text-right py-4" }
const _hoisted_26 = {
  key: 0,
  class: "flex bg-white-100 justify-center align-middle py-1"
}
const _hoisted_27 = ["src"]
const _hoisted_28 = ["src"]
const _hoisted_29 = ["src"]

import { defineComponent, ref } from "vue";

import LanguageSwitcher from "@/components/LanguageSwitcher.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Footer',
  props: {
  cardLogo: {
    type: Boolean,
    default: false,
  },
},
  setup(__props) {

const year = ref(new Date().getFullYear());



defineComponent({
  name: "GtcFooter",
  components: { LanguageSwitcher },
});

return (_ctx: any,_cache: any) => {
  const _component_router_link = _resolveComponent("router-link")!

  return (_openBlock(), _createElementBlock("footer", null, [
    _createElementVNode("div", _hoisted_1, [
      _createElementVNode("div", _hoisted_2, [
        _createElementVNode("img", {
          src: require('@/assets/images/svg/gtc-logo.svg'),
          alt: _ctx.$t('site.title'),
          class: "w-28 mt-12 mx-auto md:mx-0"
        }, null, 8, _hoisted_3),
        _createElementVNode("div", _hoisted_4, [
          _createElementVNode("div", _hoisted_5, [
            _createElementVNode("h1", null, _toDisplayString(_ctx.$t("menu.footer.getcontact")), 1),
            _createElementVNode("ul", null, [
              _createElementVNode("li", null, [
                _createElementVNode("a", _hoisted_6, _toDisplayString(_ctx.$t("menu.footer.getcontactWeb")), 1)
              ]),
              _createElementVNode("li", null, [
                _createElementVNode("a", _hoisted_7, _toDisplayString(_ctx.$t("menu.footer.premiumAndTariffs")), 1)
              ]),
              _createElementVNode("li", null, [
                _createElementVNode("a", _hoisted_8, _toDisplayString(_ctx.$t("menu.footer.features")), 1)
              ]),
              _createElementVNode("li", null, [
                _createElementVNode("a", _hoisted_9, _toDisplayString(_ctx.$t("menu.footer.successStories")), 1)
              ]),
              _createElementVNode("li", null, [
                _createVNode(_component_router_link, { to: "/" }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.footer.aboutUs")), 1)
                  ]),
                  _: 1
                })
              ]),
              _createElementVNode("li", null, [
                _createElementVNode("a", _hoisted_10, _toDisplayString(_ctx.$t("menu.footer.career")), 1)
              ])
            ])
          ]),
          _createElementVNode("div", _hoisted_11, [
            _createElementVNode("h1", null, _toDisplayString(_ctx.$t("menu.footer.help")), 1),
            _createElementVNode("ul", null, [
              _createElementVNode("li", null, [
                _createElementVNode("a", _hoisted_12, _toDisplayString(_ctx.$t("menu.footer.helpCenter")), 1)
              ]),
              _createElementVNode("li", null, [
                _createVNode(_component_router_link, { to: "/contact-us" }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.footer.contactUs")), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _createElementVNode("div", _hoisted_13, [
            _createElementVNode("h1", null, _toDisplayString(_ctx.$t("menu.footer.legacy")), 1),
            _createElementVNode("ul", null, [
              _createElementVNode("li", null, [
                _createVNode(_component_router_link, {
                  to: "/privacy",
                  target: "_blank"
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.footer.privacy")), 1)
                  ]),
                  _: 1
                })
              ]),
              _createElementVNode("li", null, [
                _createVNode(_component_router_link, {
                  to: "/terms",
                  target: "_blank"
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.footer.terms")), 1)
                  ]),
                  _: 1
                })
              ]),
              _createElementVNode("li", null, [
                _createVNode(_component_router_link, {
                  to: "/purchases-policy",
                  target: "_blank"
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.footer.purchase")), 1)
                  ]),
                  _: 1
                })
              ]),
              _createElementVNode("li", null, [
                _createVNode(_component_router_link, {
                  to: "/cookies-policy",
                  target: "_blank"
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.footer.cookie")), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _createElementVNode("div", _hoisted_14, [
            _createElementVNode("h1", null, _toDisplayString(_ctx.$t("menu.footer.email")), 1),
            _cache[0] || (_cache[0] = _createElementVNode("ul", null, [
              _createElementVNode("li", null, [
                _createElementVNode("a", { href: "mailto:info-business@getcontact.com" }, "info-business@getcontact.com")
              ]),
              _createElementVNode("li", null, [
                _createElementVNode("a", { href: "mailto:business@getcontact.com" }, "business@getcontact.com")
              ])
            ], -1))
          ]),
          _createElementVNode("div", _hoisted_15, [
            _createElementVNode("h1", null, _toDisplayString(_ctx.$t("menu.footer.follow")), 1),
            _createElementVNode("a", _hoisted_16, [
              _createElementVNode("img", {
                alt: "Facebook",
                src: require('@/assets/images/svg/icons/follow/facebook.svg')
              }, null, 8, _hoisted_17)
            ]),
            _createElementVNode("a", _hoisted_18, [
              _createElementVNode("img", {
                alt: "X",
                src: require('@/assets/images/svg/icons/follow/x.svg')
              }, null, 8, _hoisted_19)
            ]),
            _createElementVNode("a", _hoisted_20, [
              _createElementVNode("img", {
                alt: "Instagram",
                src: 
                  require('@/assets/images/svg/icons/follow/instagram.svg')
                
              }, null, 8, _hoisted_21)
            ]),
            _createElementVNode("a", _hoisted_22, [
              _createElementVNode("img", {
                alt: "LinkedIn",
                src: require('@/assets/images/svg/icons/follow/linkedin.svg')
              }, null, 8, _hoisted_23)
            ])
          ])
        ]),
        _createElementVNode("div", _hoisted_24, [
          _createVNode(LanguageSwitcher, {
            dark: "",
            class: "py-4 hidden md:inline-block"
          }),
          _createElementVNode("span", _hoisted_25, _toDisplayString(_ctx.$t("menu.footer.copyright", { year: year.value })), 1)
        ])
      ])
    ]),
    (__props.cardLogo)
      ? (_openBlock(), _createElementBlock("div", _hoisted_26, [
          _createElementVNode("img", {
            alt: "Visa",
            src: require('@/assets/images/svg/footer-logos/visa-logo.svg')
          }, null, 8, _hoisted_27),
          _createElementVNode("img", {
            alt: "Mastercard",
            src: require('@/assets/images/svg/footer-logos/mastercard-logo.svg')
          }, null, 8, _hoisted_28),
          _createElementVNode("img", {
            alt: "MNP",
            src: require('@/assets/images/svg/footer-logos/mnp-logo.svg')
          }, null, 8, _hoisted_29)
        ]))
      : _createCommentVNode("", true)
  ]))
}
}

})