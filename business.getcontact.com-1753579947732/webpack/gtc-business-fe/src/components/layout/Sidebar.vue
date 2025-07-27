import { defineComponent as _defineComponent } from 'vue'
import { createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, withCtx as _withCtx, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, vShow as _vShow, withDirectives as _withDirectives, unref as _unref, withModifiers as _withModifiers } from "vue"
import _imports_0 from '@/assets/images/svg/gtc-business-logo.svg'
import _imports_1 from '@/assets/images/svg/icons/help.svg'
import _imports_2 from '@/assets/images/svg/icons/avatar.svg'
import _imports_3 from '@/assets/images/svg/icons/avatar-fill.svg'


const _hoisted_1 = { class: "flex md:mb-10 py-2 md:px-5 md:justify-center md:pt-6" }
const _hoisted_2 = ["onClick"]
const _hoisted_3 = ["src"]
const _hoisted_4 = { class: "flex-1" }
const _hoisted_5 = { key: 1 }
const _hoisted_6 = { key: 0 }
const _hoisted_7 = {
  key: 1,
  class: "relative"
}
const _hoisted_8 = {
  class: "menu-item !opacity-100 flex relative",
  href: "#"
}
const _hoisted_9 = { class: "flex-1" }
const _hoisted_10 = { class: "text-white" }
const _hoisted_11 = { class: "sidebar-user-menu" }
const _hoisted_12 = {
  key: 0,
  class: "flex flex-col"
}
const _hoisted_13 = { class: "text-neutral-1000 font-medium" }
const _hoisted_14 = { class: "text-xs text-neutral-600" }

import { defineComponent, onMounted, onUnmounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";

import Icon from "@/components/icons/IconRenderer.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import GtcPopover from "@/components/Popover.vue";
import { useAlert } from "@/composables/useAlert";
import { useInitialize } from "@/composables/useInitialize";
import { useLogin } from "@/composables/useLogin";
import router from "@/router";


export default /*@__PURE__*/_defineComponent({
  __name: 'Sidebar',
  props: {
  items: {
    type: Array,
    required: true,
  },
  status: {},
},
  setup(__props) {

const { loggedInUser, logout } = useLogin();
const { removeAlert } = useAlert();
const { flushSiteData } = useInitialize();

const { siteData } = useInitialize();
const route = useRoute();

const expanded: Ref<string[]> = ref([]);
const menuCollapsed = ref(false);

function toggleMenu(e: Event, item) {
  e.preventDefault();
  e.stopPropagation();

  // The following report section has to stay unless there is an initialization screen for reports.
  if (item.path !== "/reports") router.push(item.path);

  if (!item.children.length) {
    return;
  }

  expanded.value = isExpanded(item)
    ? expanded.value.filter((i) => i !== item.title)
    : [...expanded.value, item.title];
}

function splitter(item: string, term: string, position: number) {
  return item.split(term)[position];
}

function isExpanded(item) {
  if (item.children.length) {
    // This effects only items with children.
    if (splitter(route.path, "/", 1) === splitter(item.path, "/", 1))
      return true;
  } else {
    if (route.path.includes(item.path)) return true;
  }
  return expanded.value.includes(item.title);
}

const toggle = () => {
  menuCollapsed.value = !menuCollapsed.value;
};

onMounted(() => {
  window.addEventListener("resize", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeDropdown);
});

const closeDropdown = () => {
  menuCollapsed.value = false;
};



defineComponent({
  name: "GtcContainer",
});

return (_ctx: any,_cache: any) => {
  const _component_router_link = _resolveComponent("router-link")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("aside", {
      class: _normalizeClass([
      'sidebar',
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
              class: "p-2.5 md:hidden cursor-pointer",
              onClick: toggle
            }, [
              _createVNode(Icon, { name: "Hamburger" })
            ]))
          : _createCommentVNode("", true),
        _createVNode(_component_router_link, {
          to: { name: 'home' },
          class: _normalizeClass([
          'hover:opacity-100 mx-auto md:left-auto relative',
          { '-left-5': !menuCollapsed.value },
        ])
        }, {
          default: _withCtx(() => _cache[1] || (_cache[1] = [
            _createElementVNode("img", {
              src: _imports_0,
              alt: "GetContact Business",
              class: "align-middle h-6 sm:h-7 md:h-auto min-h-[35px]"
            }, null, -1)
          ])),
          _: 1,
          __: [1]
        }, 8, ["class"])
      ]),
      _createElementVNode("ul", {
        class: _normalizeClass([
        'flex-1 px-4 md:items-center md:w-auto',
        {
          'hidden md:block': !menuCollapsed.value,
        },
      ])
      }, [
        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (item) => {
          return (_openBlock(), _createElementBlock("li", {
            key: item.title,
            class: "pb-1"
          }, [
            (item.path !== '/invoices')
              ? (_openBlock(), _createElementBlock("a", {
                  key: 0,
                  class: _normalizeClass([
            'menu-item sidebar-menu',
            {
              'bg-secondary-700 rounded-lg menu-item-expanded':
                isExpanded(item),
              disabled: !item.status,
            },
          ]),
                  onClick: ($event: any) => (item.status ? toggleMenu($event, item) : '')
                }, [
                  (item.icon)
                    ? (_openBlock(), _createElementBlock("img", {
                        key: 0,
                        src: item.icon,
                        alt: "",
                        class: "pr-2"
                      }, null, 8, _hoisted_3))
                    : _createCommentVNode("", true),
                  _createElementVNode("span", _hoisted_4, _toDisplayString(_ctx.$t(item.title)), 1),
                  (item.children?.length)
                    ? (_openBlock(), _createElementBlock("i", _hoisted_5, [
                        _createVNode(Icon, {
                          name: "Chevron",
                          direction: isExpanded(item) ? 'up' : 'down'
                        }, null, 8, ["direction"])
                      ]))
                    : _createCommentVNode("", true)
                ], 10, _hoisted_2))
              : _createCommentVNode("", true),
            _withDirectives(_createElementVNode("ul", null, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(item.children, (child) => {
                return (_openBlock(), _createElementBlock("li", {
                  class: "text-secondary-100",
                  key: child.path
                }, [
                  _createVNode(_component_router_link, {
                    class: _normalizeClass([
                'p-2.5 pl-12 text-xs block hover:text-white-100 sidebar-menu',
                {
                  'font-bold text-white-100': isExpanded(child),
                  disabled: !child.status,
                },
              ]),
                    to: { path: child.status ? child.path : '' }
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(_toDisplayString(_ctx.$t(child.title)), 1)
                    ]),
                    _: 2
                  }, 1032, ["class", "to"])
                ]))
              }), 128))
            ], 512), [
              [_vShow, isExpanded(item)]
            ])
          ]))
        }), 128))
      ], 2),
      _createElementVNode("ul", {
        class: _normalizeClass([
        'sidebar-menu',
        {
          'hidden md:block': !menuCollapsed.value,
        },
      ])
      }, [
        (_unref(siteData)?.help)
          ? (_openBlock(), _createElementBlock("li", _hoisted_6, [
              _createVNode(_component_router_link, {
                to: _unref(siteData).help.href,
                class: _normalizeClass([
            'menu-item',
            {
              disabled: __props.status !== 1,
            },
          ])
              }, {
                default: _withCtx(() => [
                  _cache[2] || (_cache[2] = _createElementVNode("img", {
                    src: _imports_1,
                    alt: "",
                    class: "pr-2"
                  }, null, -1)),
                  _createElementVNode("span", null, _toDisplayString(_ctx.$t(_unref(siteData).help.text)), 1)
                ]),
                _: 1,
                __: [2]
              }, 8, ["to", "class"])
            ]))
          : _createCommentVNode("", true),
        (_unref(loggedInUser))
          ? (_openBlock(), _createElementBlock("li", _hoisted_7, [
              _createVNode(GtcPopover, null, {
                content: _withCtx(() => [
                  _createElementVNode("ul", _hoisted_11, [
                    _createElementVNode("li", null, [
                      _cache[5] || (_cache[5] = _createElementVNode("img", {
                        src: _imports_3,
                        alt: "User",
                        class: "mr-4"
                      }, null, -1)),
                      (_unref(siteData)?.businessCompany)
                        ? (_openBlock(), _createElementBlock("div", _hoisted_12, [
                            _createElementVNode("div", _hoisted_13, _toDisplayString(_unref(siteData).businessCompany.accountName), 1),
                            _createElementVNode("div", _hoisted_14, [
                              _createTextVNode(_toDisplayString(_unref(siteData).businessCompany.email) + " ", 1),
                              _cache[4] || (_cache[4] = _createElementVNode("br", null, null, -1)),
                              _createTextVNode(" " + _toDisplayString(_unref(siteData).businessCompany.msisdn), 1)
                            ])
                          ]))
                        : _createCommentVNode("", true)
                    ]),
                    _createElementVNode("li", null, [
                      _createElementVNode("a", {
                        class: "text-md px-4 py-3 block text-status-red",
                        href: "#",
                        onClick: _cache[0] || (_cache[0] = _withModifiers(($event: any) => (_unref(logout)(_unref(flushSiteData)).then(_unref(removeAlert))), ["prevent"])),
                        "data-test": "logout"
                      }, _toDisplayString(_ctx.$t("common.logout")), 1)
                    ])
                  ])
                ]),
                default: _withCtx(() => [
                  _createElementVNode("div", _hoisted_8, [
                    _cache[3] || (_cache[3] = _createElementVNode("img", {
                      src: _imports_2,
                      alt: "",
                      class: "pr-2",
                      "data-test": "avatar"
                    }, null, -1)),
                    _createElementVNode("span", _hoisted_9, _toDisplayString(_unref(loggedInUser).accountName), 1),
                    _createElementVNode("span", _hoisted_10, [
                      _createVNode(Icon, { name: "More" })
                    ])
                  ])
                ]),
                _: 1
              })
            ]))
          : _createCommentVNode("", true)
      ], 2),
      _createElementVNode("small", {
        class: _normalizeClass([
        'border-t px-4 py-4 text-center text-secondary-100 opacity-70',
        { 'hidden md:block': !menuCollapsed.value },
      ])
      }, _toDisplayString(_ctx.$t("site.title")), 3),
      _createElementVNode("p", {
        class: _normalizeClass([
        'text-center my-4',
        { block: menuCollapsed.value },
        { hidden: !menuCollapsed.value },
      ])
      }, [
        _createVNode(LanguageSwitcher, {
          dark: "",
          class: "inline"
        })
      ], 2)
    ], 2),
    (menuCollapsed.value)
      ? (_openBlock(), _createElementBlock("button", {
          key: 0,
          type: "button",
          class: "fixed top-0 right-0 p-2.5 z-50",
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