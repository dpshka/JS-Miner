import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, withCtx as _withCtx, createVNode as _createVNode, unref as _unref, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withModifiers as _withModifiers, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, Fragment as _Fragment } from "vue"
import _imports_0 from '@/assets/images/svg/gtc-logo.svg'
import _imports_1 from '@/assets/images/svg/arrow-right.svg'
import _imports_2 from '@/assets/images/png/user-default.jpg'
import _imports_3 from '@/assets/images/svg/logout.svg'
import _imports_4 from '@/assets/images/svg/logout-black.svg'
import _imports_5 from '@/assets/images/svg/hamburger.svg'


const _hoisted_1 = {
  href: "#",
  class: "flex items-center"
}
const _hoisted_2 = { class: "w-8 h-8 rounded-2xl overflow-hidden mr-2" }
const _hoisted_3 = ["src"]
const _hoisted_4 = {
  key: 1,
  src: _imports_2,
  class: "object-cover"
}
const _hoisted_5 = { class: "text-primary-500 font-bold" }
const _hoisted_6 = {
  key: 1,
  src: _imports_3
}
const _hoisted_7 = {
  key: 0,
  href: "#",
  class: "flex items-center"
}
const _hoisted_8 = { class: "w-8 h-8 rounded-2xl overflow-hidden mr-2" }
const _hoisted_9 = ["src"]
const _hoisted_10 = {
  key: 1,
  src: _imports_2,
  class: "object-cover"
}
const _hoisted_11 = { class: "text-primary-500 font-bold" }
const _hoisted_12 = {
  key: 1,
  src: _imports_4
}

import { storeToRefs } from "pinia";
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

import { primary } from "@/colors";
import GtcAlert from "@/components/Alert.vue";
import CloseIcon from "@/components/icons/Close.vue";
import GtcSpinner from "@/components/icons/Spinner.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import GtcPopover from "@/components/Popover.vue";
import { useAlert } from "@/composables/useAlert";
import { useHelpers } from "@/helpers/useHelpers";
import withdraw from "@/helpers/useWithdraw";
import { useAuthStore } from "@/stores/auth.store";
import { $wait } from "@/wait";


export default /*@__PURE__*/_defineComponent({
  __name: 'Navbar',
  setup(__props) {

const authStore = useAuthStore();
const { getLoggedIn, getUser, getNeedPolicy } = storeToRefs(authStore);

const isMenuExpanded = ref(false);

const isMenuFull = computed(() => {
  return getLoggedIn.value && !getNeedPolicy.value;
});

const route = useRoute();
const { alert } = useAlert();
const { isAndroid } = useHelpers();

onMounted(() => {
  window.addEventListener("resize", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeDropdown);
});

const closeDropdown = () => {
  isMenuExpanded.value = false;
};

const toggle = () => {
  isMenuExpanded.value = !isMenuExpanded.value;
};

const isWaitingLogout = computed(() => {
  return $wait.is("logout");
});

const onLogout = () => {
  if (!isWaitingLogout.value) {
    authStore.logout();
  }
};

defineComponent({
  name: "GtcNavbar",
});

return (_ctx: any,_cache: any) => {
  const _component_router_link = _resolveComponent("router-link")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("nav", {
      class: _normalizeClass([
      'nav',
      {
        'h-full lg:h-auto collapsed border-transparent border-neutral-200':
          isMenuExpanded.value,
      },
    ])
    }, [
      _createElementVNode("div", {
        class: _normalizeClass([
        'nav-inside',
        { 'flex-col !justify-start': isMenuExpanded.value },
        { 'lg:!py-0': isMenuFull.value },
      ])
      }, [
        _createVNode(_component_router_link, {
          to: { name: 'home' },
          class: _normalizeClass([
          'hover:opacity-100 relative lg:mx-0 w-fit',
          {
            'mb-6': isMenuExpanded.value,
          },
        ])
        }, {
          default: _withCtx(() => _cache[3] || (_cache[3] = [
            _createElementVNode("img", {
              src: _imports_0,
              alt: "Getcontact",
              class: "h-6"
            }, null, -1)
          ])),
          _: 1
        }, 8, ["class"]),
        (isMenuFull.value)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              class: _normalizeClass([
          'main-menu',
          {
            hidden: !isMenuExpanded.value,
          },
        ])
            }, [
              _createElementVNode("a", {
                href: "#",
                onClick: _cache[0] || (_cache[0] = _withModifiers(($event: any) => (_unref(withdraw)()), ["prevent"])),
                class: _normalizeClass({
            'router-link-active': _unref(route).path.includes('withdrawal'),
          })
              }, [
                _createTextVNode(_toDisplayString(_ctx.$t("menu.top.withdraw")) + " ", 1),
                _cache[4] || (_cache[4] = _createElementVNode("img", {
                  src: _imports_1,
                  alt: "Menu item arrow"
                }, null, -1))
              ], 2),
              _createVNode(_component_router_link, { to: { name: 'balance' } }, {
                default: _withCtx(() => [
                  _createTextVNode(_toDisplayString(_ctx.$t("menu.top.acquisitions")) + " ", 1),
                  _cache[5] || (_cache[5] = _createElementVNode("img", {
                    src: _imports_1,
                    alt: "Menu item arrow"
                  }, null, -1))
                ]),
                _: 1
              })
            ], 2))
          : _createCommentVNode("", true),
        _createElementVNode("div", {
          class: _normalizeClass(['user-and-lang-menu', { grow: isMenuExpanded.value }])
        }, [
          (isMenuFull.value)
            ? (_openBlock(), _createElementBlock("div", {
                key: 0,
                class: _normalizeClass(['user-menu', { '!hidden !lg:flex': !isMenuExpanded.value }])
              }, [
                _createElementVNode("a", _hoisted_1, [
                  _createElementVNode("div", _hoisted_2, [
                    (_unref(getUser).profileImage)
                      ? (_openBlock(), _createElementBlock("img", {
                          key: 0,
                          src: (_unref(getUser).profileImage as any),
                          class: "object-cover"
                        }, null, 8, _hoisted_3))
                      : (_openBlock(), _createElementBlock("img", _hoisted_4))
                  ]),
                  _createElementVNode("span", _hoisted_5, _toDisplayString(_unref(getUser).name) + " " + _toDisplayString(_unref(getUser).surname), 1)
                ]),
                (!_unref(isAndroid))
                  ? (_openBlock(), _createElementBlock("a", {
                      key: 0,
                      href: "#",
                      onClick: _cache[1] || (_cache[1] = _withModifiers(($event: any) => (onLogout()), ["prevent"]))
                    }, [
                      (isWaitingLogout.value)
                        ? (_openBlock(), _createBlock(GtcSpinner, { key: 0 }))
                        : (_openBlock(), _createElementBlock("img", _hoisted_6))
                    ]))
                  : _createCommentVNode("", true)
              ], 2))
            : _createCommentVNode("", true),
          _createVNode(GtcPopover, {
            theme: "light",
            arrow: true,
            class: "hidden lg:block order-2"
          }, {
            content: _withCtx(() => [
              _createElementVNode("a", {
                href: "#",
                onClick: _cache[2] || (_cache[2] = _withModifiers(($event: any) => (onLogout()), ["prevent"])),
                class: "logout-link"
              }, [
                _createElementVNode("span", null, _toDisplayString(_ctx.$t("menu.top.logout")), 1),
                (isWaitingLogout.value)
                  ? (_openBlock(), _createBlock(GtcSpinner, {
                      key: 0,
                      class: "w-[20px] h-[20px]"
                    }))
                  : (_openBlock(), _createElementBlock("img", _hoisted_12))
              ])
            ]),
            default: _withCtx(() => [
              (isMenuFull.value && !_unref(isAndroid))
                ? (_openBlock(), _createElementBlock("a", _hoisted_7, [
                    _createElementVNode("div", _hoisted_8, [
                      (_unref(getUser).profileImage)
                        ? (_openBlock(), _createElementBlock("img", {
                            key: 0,
                            src: (_unref(getUser).profileImage as any),
                            class: "object-cover"
                          }, null, 8, _hoisted_9))
                        : (_openBlock(), _createElementBlock("img", _hoisted_10))
                    ]),
                    _createElementVNode("span", _hoisted_11, _toDisplayString(_unref(getUser).name) + " " + _toDisplayString(_unref(getUser).surname), 1)
                  ]))
                : _createCommentVNode("", true)
            ]),
            _: 1
          }),
          _createVNode(LanguageSwitcher, {
            class: _normalizeClass([
            'inline h-5 lg:order-1 lg:mx-6',
            {
              'hidden lg:inline': isMenuFull.value && !isMenuExpanded.value,
            },
          ])
          }, null, 8, ["class"])
        ], 2)
      ], 2),
      (!isMenuExpanded.value && isMenuFull.value)
        ? (_openBlock(), _createElementBlock("button", {
            key: 0,
            type: "button",
            class: "hamb-button",
            "aria-label": "Hamburger menu",
            onClick: toggle
          }, _cache[6] || (_cache[6] = [
            _createElementVNode("img", {
              src: _imports_5,
              alt: "Hamburger menu"
            }, null, -1)
          ])))
        : _createCommentVNode("", true),
      (isMenuExpanded.value && isMenuFull.value)
        ? (_openBlock(), _createElementBlock("button", {
            key: 1,
            type: "button",
            class: "close-button",
            onClick: toggle
          }, [
            _createVNode(CloseIcon, {
              class: "w-3",
              color: _unref(primary)[500]
            }, null, 8, ["color"])
          ]))
        : _createCommentVNode("", true)
    ], 2),
    (_unref(alert)?.message)
      ? (_openBlock(), _createElementBlock("div", {
          key: 0,
          class: _normalizeClass([
      { 'container max-w-full mt-10 !mb-0': _unref(alert)?.display !== 'modal' },
    ])
        }, [
          _createVNode(GtcAlert, {
            title: _unref(alert).title,
            message: _unref(alert).message,
            type: _unref(alert).type,
            display: _unref(alert).display
          }, null, 8, ["title", "message", "type", "display"])
        ], 2))
      : _createCommentVNode("", true)
  ], 64))
}
}

})