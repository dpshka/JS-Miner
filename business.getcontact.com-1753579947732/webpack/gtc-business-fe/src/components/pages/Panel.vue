import { defineComponent as _defineComponent } from 'vue'
import { mergeProps as _mergeProps, createVNode as _createVNode, unref as _unref, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, isRef as _isRef, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, Fragment as _Fragment, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue"

const _hoisted_1 = { class: "flex min-h-screen" }

import { useVModel } from "@vueuse/core";
import { computed, defineComponent, onMounted, useAttrs } from "vue";

import GtcLoading from "@/components/Loading.vue";
import GtcPage from "@/components/pages/Page.vue";
import GtcWizard from "@/components/Wizard.vue";
import { useAlert } from "@/composables/useAlert";
import {
  convertMainMenuToSidebarMenu,
  useInitialize,
} from "@/composables/useInitialize";
import { useLogin } from "@/composables/useLogin";

import Sidebar from "../layout/Sidebar.vue";
import PanelNav from "../pages/PanelNav.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Panel',
  props: {
  modelValue: {
    type: Number,
    default: 0,
  },
  goNext: {
    type: Boolean,
    default: false,
  },
  wizard: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String as () => string | null,
    default: null,
  },
  description: {
    type: String as () => string | null,
    default: null,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  alertMin: {
    type: Boolean,
    default: false,
  },
},
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {

const attrs = useAttrs();
const { isLoggedIn } = useLogin();

const { fetchSiteData, siteData } = useInitialize();
const { alerts } = useAlert();

const items = computed(() => [
  ...convertMainMenuToSidebarMenu(siteData.value?.mainMenu),
  ...(Array.isArray(attrs.items) ? attrs.items : []),
]);

const props = __props;

const emit = __emit;
const step = useVModel(props, "modelValue", emit);

const companyStatus = computed(() => {
  if (isLoggedIn.value) {
    return siteData.value.businessCompany?.status;
  } else {
    return false;
  }
});

onMounted(async () => {
  fetchSiteData();

  // Project management team wanted this part to work like this. We should improve this code block later.
  if (companyStatus.value !== 1) {
    const time = 600000; // 10 Minutes
    setInterval(() => window.location.reload(), time);
  }
});

defineComponent({
  name: "GtcPanel",
  components: {
    GtcPage,
    Sidebar,
    PanelNav,
  },
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("main", _hoisted_1, [
    _createVNode(Sidebar, _mergeProps({ items: items.value }, _ctx.$attrs, { status: companyStatus.value }), null, 16, ["items", "status"]),
    _createElementVNode("div", {
      class: _normalizeClass([
        'w-full md:pl-72 flex flex-col flex-1',
        { 'bg-white-100': __props.wizard },
      ])
    }, [
      (__props.wizard)
        ? (_openBlock(), _createBlock(GtcWizard, {
            key: 0,
            modelValue: _unref(step),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event: any) => (_isRef(step) ? (step).value = $event : null)),
            goNext: props.goNext
          }, {
            steps: _withCtx((stepper) => [
              _renderSlot(_ctx.$slots, "steps", _normalizeProps(_guardReactiveProps(stepper)))
            ]),
            _: 3
          }, 8, ["modelValue", "goNext"]))
        : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
            _createVNode(PanelNav, _mergeProps(_ctx.$attrs, {
              alerts: _unref(alerts),
              alertMin: __props.alertMin
            }), {
              home: _withCtx(() => [
                _renderSlot(_ctx.$slots, "home")
              ]),
              default: _withCtx(() => [
                _renderSlot(_ctx.$slots, "nav")
              ]),
              _: 3
            }, 16, ["alerts", "alertMin"]),
            _renderSlot(_ctx.$slots, "info"),
            (!__props.visible)
              ? (_openBlock(), _createBlock(GtcLoading, {
                  key: 0,
                  class: "bg-white-100"
                }))
              : _createCommentVNode("", true),
            _createVNode(GtcPage, _mergeProps(_ctx.$attrs, {
              title: __props.title || '',
              description: __props.description || '',
              class: ['flex-1', { 'hide-elements': !__props.visible }],
              alerts: _unref(alerts),
              alertMin: __props.alertMin
            }), {
              default: _withCtx(() => [
                _renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 16, ["title", "description", "class", "alerts", "alertMin"])
          ], 64))
    ], 2)
  ]))
}
}

})