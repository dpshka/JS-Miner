import { defineComponent as _defineComponent } from 'vue'
import { createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, unref as _unref, withModifiers as _withModifiers } from "vue"
import _imports_0 from '@/assets/images/svg/gtc-business-logo.svg'


const _hoisted_1 = { class: "lg:container mx-auto lg:px-20 h-full md:h-auto sm:px-5 flex items-center flex-wrap content-start justify-between" }
const _hoisted_2 = {
  key: 0,
  class: "ml-6 sm:ml-2 xl:ml-6"
}
const _hoisted_3 = {
  key: 1,
  class: "ml-6 sm:ml-2 xl:ml-6 pl-6 sm:pl-2 xl:pl-6 mt-auto border-l-2 border-l-secondary-700 whitespace-nowrap"
}
const _hoisted_4 = { key: 2 }
const _hoisted_5 = {
  key: 3,
  class: "mt-auto text-center"
}

import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Icon from "@/components/icons/IconRenderer.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useInitialize } from "@/composables/useInitialize";
import { useLogin } from "@/composables/useLogin";
import router from "@/router";


export default /*@__PURE__*/_defineComponent({
  __name: 'Navbar',
  props: {
  items: {
    type: Array,
    default: () => [],
  },
},
  setup(__props) {

const { flushSiteData } = useInitialize();
const { logout, isLoggedIn } = useLogin();
const menuCollapsed = ref(false);

onMounted(() => {
  window.addEventListener("resize", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeDropdown);
});

const closeDropdown = () => {
  menuCollapsed.value = false;
};

const toggle = () => {
  menuCollapsed.value = !menuCollapsed.value;
};



defineComponent({
  name: "GtcNavbar",
  components: {
    LanguageSwitcher,
  },
});

const onLogout = () => {
  logout(flushSiteData).then(() => router.push({ name: "login" }));
};

return (_ctx: any,_cache: any) => {
  const _component_router_link = _resolveComponent("router-link")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("nav", {
      class: _normalizeClass([
      'bg-secondary-1000 py-2 text-white-100 top-0 fixed md:relative z-50 w-full',
      {
        'w-[80%] h-full md:h-auto collapsed': menuCollapsed.value,
      },
    ])
    }, [
      _createElementVNode("div", _hoisted_1, [
        (!menuCollapsed.value)
          ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              type: "button",
              class: "hamb-button p-2.5 md:invisible cursor-pointer md:px-0 md:w-0",
              "aria-label": "Hamburger menu",
              onClick: toggle
            }, [
              _createVNode(Icon, { name: "Hamburger" })
            ]))
          : _createCommentVNode("", true),
        _createVNode(_component_router_link, {
          to: { name: 'home' },
          class: "hover:opacity-100 mx-auto md:left-auto relative",
          "data-test": "logo"
        }, {
          default: _withCtx(() => _cache[0] || (_cache[0] = [
            _createElementVNode("img", {
              src: _imports_0,
              alt: "Getcontact Business",
              class: "h-9"
            }, null, -1)
          ])),
          _: 1,
          __: [0]
        }),
        _createElementVNode("ul", {
          class: _normalizeClass([
          'w-full md:flex md:items-center md:w-auto md:p-0 h-[calc(100%-55px)] text-base sm:text-sm lg:text-base',
          {
            'flex flex-col': menuCollapsed.value,
          },
          {
            hidden: !menuCollapsed.value,
          },
        ])
        }, [
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (item) => {
            return (_openBlock(), _createElementBlock("li", {
              key: item.name,
              class: "ml-6 sm:ml-2 xl:ml-6 whitespace-nowrap md:my-0"
            }, [
              _createVNode(_component_router_link, {
                class: _normalizeClass(['block w-full py-5 md:py-0', { 'font-bold': item.active }]),
                to: item.to
              }, {
                default: _withCtx(() => [
                  _createTextVNode(_toDisplayString(_ctx.$t(`menu.top.${item.name}`)), 1)
                ]),
                _: 2
              }, 1032, ["class", "to"])
            ]))
          }), 128)),
          (_unref(isLoggedIn))
            ? (_openBlock(), _createElementBlock("li", _hoisted_2, [
                _createElementVNode("a", {
                  href: "#",
                  onClick: _withModifiers(onLogout, ["prevent"])
                }, _toDisplayString(_ctx.$t("common.logout")), 1)
              ]))
            : _createCommentVNode("", true),
          (!menuCollapsed.value)
            ? (_openBlock(), _createElementBlock("li", _hoisted_3, [
                _createVNode(_component_router_link, {
                  to: { name: 'contact_menu' },
                  class: "mr-5"
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.top.contactUs")), 1)
                  ]),
                  _: 1
                })
              ]))
            : _createCommentVNode("", true),
          (!menuCollapsed.value)
            ? (_openBlock(), _createElementBlock("li", _hoisted_4, [
                _createVNode(LanguageSwitcher, { dark: "" })
              ]))
            : _createCommentVNode("", true),
          (menuCollapsed.value)
            ? (_openBlock(), _createElementBlock("li", _hoisted_5, [
                _createVNode(_component_router_link, {
                  to: { name: 'contact_menu' },
                  class: "mr-5"
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(_toDisplayString(_ctx.$t("menu.top.contactUs")), 1)
                  ]),
                  _: 1
                }),
                _createVNode(LanguageSwitcher, {
                  dark: "",
                  class: "inline"
                })
              ]))
            : _createCommentVNode("", true)
        ], 2)
      ])
    ], 2),
    (menuCollapsed.value)
      ? (_openBlock(), _createElementBlock("button", {
          key: 0,
          type: "button",
          class: "fixed top-0 right-0 p-4 z-50",
          onClick: toggle
        }, [
          _createVNode(Icon, {
            name: "Close",
            class: "w-3"
          })
        ]))
      : _createCommentVNode("", true)
  ], 64))
}
}

})