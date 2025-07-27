import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createVNode as _createVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createBlock as _createBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = { class: "md:hidden" }
const _hoisted_2 = { class: "px-4 md:px-14 pt-7 bg-white-100 flex justify-center md:justify-between" }
const _hoisted_3 = { class: "md:pr-10 grow" }
const _hoisted_4 = { class: "w-full" }
const _hoisted_5 = {
  key: 0,
  class: "flex"
}
const _hoisted_6 = ["src"]
const _hoisted_7 = { class: "text-xs text-primary-500 font-normal ml-1 mt-px" }
const _hoisted_8 = {
  key: 1,
  class: "steps flex items-center"
}
const _hoisted_9 = ["onClick"]
const _hoisted_10 = { class: "flex-1" }
const _hoisted_11 = { class: "hidden md:block" }

import { computed, defineComponent } from "vue";

import GtcAlert from "@/components/Alert.vue";
import GtcButton from "@/components/Button.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'PanelNav',
  props: {
  goBack: {
    type: Boolean,
    default: false,
  },
  goNext: {
    type: Boolean,
    default: false,
  },
  steps: {
    type: Object,
    default: () => ({}),
  },
  alerts: {
    type: Array,
    default: () => [],
  },
  alertMin: {
    type: Boolean,
    default: false,
  },
  languageSwitcher: {
    type: Boolean,
    default: true,
  },
},
  emits: ["step"],
  setup(__props, { emit: __emit }) {

const emit = __emit;

const props = __props;

defineComponent({
  name: "PanelNav",
  components: {
    LanguageSwitcher,
  },
});

const activeStep = computed(() => props.steps.active);
const haveWizard = computed(() => {
  return props.goBack || Object.keys(props.steps).length;
});

const allSteps = computed(() =>
  Array(props.steps.number)
    .fill(0)
    .map((_, i) => i)
);

function goToStep(step) {
  emit("step", step);
}

function previous() {
  emit("step", activeStep.value > 0 ? activeStep.value - 1 : 0);
}

return (_ctx: any,_cache: any) => {
  const _component_router_link = _resolveComponent("router-link")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", _hoisted_1, [
      _renderSlot(_ctx.$slots, "home")
    ]),
    _createElementVNode("div", _hoisted_2, [
      _createElementVNode("div", _hoisted_3, [
        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.alerts, (alert, i) => {
          return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
            (alert?.message && !__props.alertMin)
              ? (_openBlock(), _createElementBlock("div", {
                  key: 0,
                  class: _normalizeClass(["flex justify-center md:my-2 alert", `alert-${i} flex justify-center md:my-2 alert`])
                }, [
                  _createElementVNode("div", _hoisted_4, [
                    _createVNode(GtcAlert, {
                      title: alert.title,
                      message: alert.message,
                      type: alert.type,
                      button: alert.button,
                      noScrollBehavior: true
                    }, {
                      default: _withCtx(() => [
                        (!!alert?.button)
                          ? (_openBlock(), _createBlock(_component_router_link, {
                              key: 0,
                              to: alert.button.href
                            }, {
                              default: _withCtx(() => [
                                _createVNode(GtcButton, {
                                  textContent: _toDisplayString(alert.button.text),
                                  disabled: !alert.button.status,
                                  theme: "danger",
                                  class: "text-sm ml-6"
                                }, null, 8, ["textContent", "disabled"])
                              ]),
                              _: 2
                            }, 1032, ["to"]))
                          : _createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["title", "message", "type", "button"])
                  ]),
                  (haveWizard.value)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
                        (__props.goBack)
                          ? (_openBlock(), _createElementBlock("div", {
                              key: 0,
                              class: _normalizeClass({
                'opacity-50 pointer-events-none': activeStep.value === 0,
              })
                            }, [
                              _createElementVNode("a", {
                                onClick: previous,
                                "data-test": "wizard-back-button"
                              }, [
                                _createVNode(GtcButton, {
                                  class: "flex items-center pl-0",
                                  theme: "none"
                                }, {
                                  default: _withCtx(() => [
                                    _createElementVNode("img", {
                                      src: require('../../assets/images/svg/arrow-left.svg')
                                    }, null, 8, _hoisted_6),
                                    _createElementVNode("span", _hoisted_7, _toDisplayString(_ctx.$t("common.back")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ], 2))
                          : _createCommentVNode("", true),
                        (Object.keys(__props.steps).length)
                          ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(allSteps.value, (item) => {
                                return (_openBlock(), _createElementBlock("a", {
                                  key: item,
                                  class: _normalizeClass([{
                  'bg-primary-500': item <= __props.steps.active,
                  'bg-secondary-100': item > __props.steps.active,
                  'pointer-events-none': !__props.goNext,
                }, "w-[60px] h-[6px] rounded-xl mr-2.5 active:opacity-90 hover:opacity-70 cursor-pointer transition-opacity"]),
                                  onClick: ($event: any) => (__props.goNext && goToStep(item))
                                }, null, 10, _hoisted_9))
                              }), 128))
                            ]))
                          : _createCommentVNode("", true),
                        _createElementVNode("div", _hoisted_10, [
                          _renderSlot(_ctx.$slots, "default")
                        ])
                      ]))
                    : _createCommentVNode("", true)
                ], 2))
              : _createCommentVNode("", true)
          ], 64))
        }), 128)),
        _createElementVNode("div", _hoisted_11, [
          _renderSlot(_ctx.$slots, "home")
        ])
      ]),
      (__props.languageSwitcher)
        ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            class: _normalizeClass(["hidden md:flex", {
        'items-center': __props.alerts.length <= 1,
        'justify-center': __props.alerts.length > 1,
      }])
          }, [
            _createVNode(LanguageSwitcher)
          ], 2))
        : _createCommentVNode("", true)
    ])
  ], 64))
}
}

})