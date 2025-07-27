import { defineComponent as _defineComponent } from 'vue'
import { createVNode as _createVNode, unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, renderSlot as _renderSlot, createElementVNode as _createElementVNode } from "vue"

const _hoisted_1 = { class: "flex flex-col justify-center items-center" }
const _hoisted_2 = {
  key: 0,
  class: "w-[942px] max-w-full mt-5"
}
const _hoisted_3 = {
  key: 0,
  class: "text-center md:text-left m-10 mb-8 text-neutral-1000"
}
const _hoisted_4 = {
  key: 1,
  class: "mb-7"
}

import { computed, defineComponent } from "vue";
import { RouteMeta, useRoute, useRouter } from "vue-router";

import GtcAlert from "@/components/Alert.vue";
import { useAlert } from "@/composables/useAlert";
import { useLogin } from "@/composables/useLogin";

import GtcNavbar from "../layout/Navbar.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'LoggedOut',
  props: {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  items: {
    type: Array,
    default: () => [],
  },
},
  setup(__props) {

const router = useRouter();
const route = useRoute();

const { alerts } = useAlert();
const { isLoggedIn } = useLogin();

const routerNavs = computed(() => {
  return router.options.routes
    .filter((route) => route.meta?.navbar)
    .filter((route) => {
      if (isLoggedIn.value) {
        return (route.meta as RouteMeta).navbar.showWhenLoggedIn;
      }
      return true;
    })
    .map((route) => ({
      name: route.meta?.navbar?.title,
      order: route.meta?.navbar?.order || 0,
      to: { name: route.name },
      active: router.currentRoute.value.name === route.name,
    }))
    .sort((a, b) => a.order - b.order);
});

const props = __props;

defineComponent({
  name: "GtcLoggedOut",
  components: {
    GtcNavbar,
  },
});

const itemsWithRoutes = computed(() => {
  return props.items.concat(routerNavs.value);
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createVNode(GtcNavbar, { items: itemsWithRoutes.value }, null, 8, ["items"]),
    _createElementVNode("main", _hoisted_1, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_unref(alerts), (alert) => {
        return (_openBlock(), _createElementBlock(_Fragment, {
          key: alert.page
        }, [
          (
          alert?.message &&
          (!alert?.page || (alert?.page && alert?.page === _unref(route).name))
        )
            ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
                _createVNode(GtcAlert, {
                  title: alert.title,
                  message: alert.message,
                  type: alert.type
                }, null, 8, ["title", "message", "type"])
              ]))
            : _createCommentVNode("", true)
        ], 64))
      }), 128)),
      (__props.title)
        ? (_openBlock(), _createElementBlock("h2", _hoisted_3, _toDisplayString(__props.title), 1))
        : _createCommentVNode("", true),
      (__props.description)
        ? (_openBlock(), _createElementBlock("p", _hoisted_4, _toDisplayString(__props.description), 1))
        : _createCommentVNode("", true),
      _renderSlot(_ctx.$slots, "default")
    ])
  ], 64))
}
}

})