import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createVNode as _createVNode, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode, Teleport as _Teleport, createBlock as _createBlock, resolveComponent as _resolveComponent } from "vue"

const _hoisted_1 = ["dir"]
const _hoisted_2 = { key: 0 }
const _hoisted_3 = { class: "font-medium text-sm" }
const _hoisted_4 = ["onClick"]
const _hoisted_5 = ["dir"]
const _hoisted_6 = ["src"]

import { useHead } from "@vueuse/head";
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import Icon from "@/components/icons/IconRenderer.vue";
import { useDir } from "@/composables/useDir";
import { useInitialize } from "@/composables/useInitialize";
import { useLocale } from "@/composables/useLocale";
import { useLogin } from "@/composables/useLogin";
import { useToast } from "@/composables/useToast";
import { IsLoggedIn, LoggedInUser } from "@/injections";

export default /*@__PURE__*/_defineComponent({
  __name: 'App',
  setup(__props) {

const { t } = useI18n({});
const { locale } = useLocale();
const router = useRouter();
const GTM_ID = process.env.VUE_APP_GTM_ID;

const { loggedInUser, startTokenTimer, stopTokenTimer, isLoggedIn } =
  useLogin();

const { flushSiteData } = useInitialize();
const { toasts, removeToast } = useToast();
const { dir } = useDir();

const siteData = reactive({
  title: t("google.meta.title"),
  description: t("google.meta.description"),
  keywords: t("google.meta.keywords"),
});

useHead({
  title: computed(() => siteData.title),
  meta: [
    {
      name: `description`,
      content: computed(() => siteData.description),
    },
    {
      name: `keywords`,
      content: computed(() => siteData.keywords),
    },
    {
      property: `og:image`,
      content:
        window.location.origin + require("@/assets/images/png/og-image.png"),
    },
    {
      property: `og:image:type`,
      content: `image/png`,
    },
    {
      property: `og:image:width`,
      content: `1200`,
    },
    {
      property: `og:image:height`,
      content: `630`,
    },
    {
      property: `og:locale`,
      content: locale.value,
    },
    {
      property: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      property: `twitter:site`,
      content: `@getcontact`,
    },
    {
      property: `twitter:title`,
      content: computed(() => siteData.title),
    },
    {
      name: `twitter:description`,
      content: computed(() => siteData.description),
    },
    {
      name: `twitter:image`,
      content:
        window.location.origin + require("@/assets/images/png/og-image.png"),
    },
  ],
});

// Provide the loggedInUser to the child components, you can use inject to
// get these
provide(LoggedInUser, loggedInUser);
provide(IsLoggedIn, isLoggedIn);

function checkLoggedInUser() {
  if (
    router.currentRoute.value.meta?.public ||
    router.currentRoute.value.path === "/"
  ) {
    return;
  }

  if (isLoggedIn.value) {
    startTokenTimer({ onLogout: flushSiteData });
    return;
  }
  stopTokenTimer();
  router.replace({ name: "login" });
}

watch(loggedInUser, checkLoggedInUser);

onBeforeMount(() => {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", GTM_ID);
});

onMounted(checkLoggedInUser);

onBeforeUnmount(stopTokenTimer);

return (_ctx: any,_cache: any) => {
  const _component_router_view = _resolveComponent("router-view")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      _createElementVNode("div", {
        dir: _unref(dir),
        class: "fixed top-3 right-3 overflow-auto max-h-screen scrollbar scrollbar-none z-50"
      }, [
        (_unref(toasts).length)
          ? (_openBlock(), _createElementBlock("ul", _hoisted_2, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_unref(toasts), (toast) => {
                return (_openBlock(), _createElementBlock("li", {
                  key: toast.id,
                  class: _normalizeClass([
            'bg-white-100 p-6 rounded-lg shadow-lg relative mb-3',
            {
              'bg-red-100': toast.type === 'error',
              'bg-green-100': toast.type === 'success',
              'bg-yellow-100': toast.type === 'info',
            },
          ])
                }, [
                  _createElementVNode("span", _hoisted_3, _toDisplayString(toast.message), 1),
                  _createElementVNode("button", {
                    class: "absolute top-2 right-2",
                    onClick: ($event: any) => (_unref(removeToast)(toast))
                  }, [
                    _createElementVNode("i", null, [
                      _createVNode(Icon, {
                        name: "Close",
                        class: "w-4 h-4 rounded-full"
                      })
                    ])
                  ], 8, _hoisted_4)
                ], 2))
              }), 128))
            ]))
          : _createCommentVNode("", true)
      ], 8, _hoisted_1)
    ])),
    _createElementVNode("div", { dir: _unref(dir) }, [
      _createVNode(_component_router_view)
    ], 8, _hoisted_5),
    _createElementVNode("noscript", null, [
      _createElementVNode("iframe", {
        src: 'https://www.googletagmanager.com/ns.html?id=' + _unref(GTM_ID),
        height: "0",
        width: "0",
        style: {"display":"none","visibility":"hidden"}
      }, null, 8, _hoisted_6)
    ])
  ], 64))
}
}

})