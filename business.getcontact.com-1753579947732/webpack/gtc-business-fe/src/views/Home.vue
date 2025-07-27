import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, withCtx as _withCtx, createBlock as _createBlock, vModelCheckbox as _vModelCheckbox, withDirectives as _withDirectives, resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, mergeProps as _mergeProps, createTextVNode as _createTextVNode } from "vue"
import _imports_0 from '@/assets/images/svg/icons/business-icon.svg'


const _hoisted_1 = { class: "flex w-full gap-5 md:gap-8 bg-white-100 flex-col lg:flex-row" }
const _hoisted_2 = ["src"]
const _hoisted_3 = {
  key: 0,
  class: "my-5 flex justify-center text-left items-center"
}
const _hoisted_4 = { class: "pl-2 pt-0.5 md:w-2/3" }
const _hoisted_5 = ["alt"]
const _hoisted_6 = { class: "py-10 text-neutral-1000 text-center md:text-left" }
const _hoisted_7 = { class: "text-center md:text-left" }
const _hoisted_8 = { class: "bg-white-100 w-full" }
const _hoisted_9 = { class: "container px-5 md:px-20 mx-auto mt-10" }
const _hoisted_10 = ["alt", "src"]
const _hoisted_11 = { class: "font-medium mb-5" }
const _hoisted_12 = ["alt", "src"]
const _hoisted_13 = { class: "font-medium mb-5" }
const _hoisted_14 = {
  key: 0,
  class: "cookies",
  "data-test": "cookie"
}
const _hoisted_15 = { key: 0 }
const _hoisted_16 = {
  href: "https://getcontact.com/privacy",
  target: "_blank"
}
const _hoisted_17 = {
  key: 2,
  class: "buttons"
}

import { useCookies } from "@vueuse/integrations/useCookies";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import ActionBox from "@/components/ActionBox.vue";
import GtcButton from "@/components/Button.vue";
import GtcFooter from "@/components/layout/Footer.vue";
import GtcModalStandart from "@/components/ModalStandart.vue";
import GtcLoggedOut from "@/components/pages/LoggedOut.vue";
import GtcPanel from "@/components/pages/Panel.vue";
import { useAcceptPopupTerms } from "@/composables/useAcceptPopupTerms";
import { useGoogleEvents } from "@/composables/useGoogleEvents";
import { useInitialize } from "@/composables/useInitialize";
import { useLandingInit } from "@/composables/useLandingInit";
import { useLocale } from "@/composables/useLocale";
import { useLogin } from "@/composables/useLogin";
import { useMainPage } from "@/composables/useMainPage";
import { usePageInit } from "@/composables/usePageInit";


export default /*@__PURE__*/_defineComponent({
  __name: 'Home',
  setup(__props) {

const { postTerms } = useAcceptPopupTerms();
const { locale } = useLocale();
const { t } = useI18n({});
const { gtaEvent } = useGoogleEvents();
const { isLoggedIn, lightLogout } = useLogin();
const paymentType = ref("");
const router = useRouter();
const { fetchSiteData } = useInitialize();
const route = useRoute();
const { set, get, remove } = useCookies();
const { getLandingInit, getConsentMode } = useLandingInit();
const { getMainPage } = useMainPage();

let modalArgs = ref({
  popupTerms: false,
  showModal: false,
  title: "",
  description: "",
  button: {
    status: true,
    theme: "primary",
    text: "",
    loading: false,
  },
  image: "",
});

const cookies = ref(false);
const consent = ref(false);
const footerLogo = ref(false);

const { pageData, title, description } = usePageInit(async () => {
  if (isLoggedIn.value) {
    gtaEvent({
      event: "GAVirtual",
      virtualPageUrl: "/panel/home-page",
    });
    const data = await getMainPage();
    if (data.content.body.popupTerms == 0 && get("popupTerms") == 1) {
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 3600000);
      remove("popupTerms");
      modalArgs.value.popupTerms = true;
      modalArgs.value.showModal = true;
      modalArgs.value.title = t("home.permission.title");
      modalArgs.value.description = t("home.permission.paragraph");
      modalArgs.value.button.text = t("home.permission.button");
      modalArgs.value.image = require("@/assets/images/svg/permission.svg");
      modalArgs.value.button.status = false;
    }
    return data;
  } else {
    const displayLogo = await getLandingInit();
    footerLogo.value = !displayLogo?.viewBusinessCard && locale.value == "ru";
    gtaEvent({
      event: "GAVirtual",
      virtualPageUrl: "/virtual-page/home-page",
    });
    lightLogout();
  }
});

const serviceColorMap: Record<string, "green" | "blue" | "purple"> = {
  caller_id_package: "green",
  user_verify_package: "blue",
  boost_ads_package: "purple",
  spam_package: "purple",
};

const services = computed(() => {
  return pageData.value?.content?.body?.services.map((service) => {
    return {
      ...service,
      color: serviceColorMap[service.key],
    };
  });
});

const manageCookies = (value: boolean) => {
  const expireDate = new Date();

  if (value) {
    cookieConsentSet("update", "granted");
    expireDate.setTime(expireDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000); // 6 months
  } else {
    cookieConsentSet("update", "denied");
    expireDate.setTime(expireDate.getTime() + 259200000); // 3 days
  }

  set("cookieInform", value ? "accept" : "reject", {
    expires: expireDate,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  cookies.value = false;
};

const modalButton = () => {
  if (pageData.value.content.body.popupTerms == 0) {
    postTerms();
    modalArgs.value.popupTerms = false;
    modalArgs.value.showModal = false;
  } else {
    // This part can be improved in the future. Since the router is dynamically managed, the relevant links may be disabled at this stage. Before the 1st deployment, we solve this problem with location.href
    if (paymentType.value == "caller-id") {
      window.location.href = "/caller-id/manage-numbers";
    } else if (paymentType.value === "user-verify") {
      window.location.href = "/user-verify/api-document";
    } else if (paymentType.value === "tag-viewing") {
      window.location.href = "/user-verify/tag-view/api-documents";
    } else if (paymentType.value === "spam") {
      window.location.href = "user-verify/spam/api-documents";
    }
  }
};

const clearQS = () => {
  router.push({
    name: "home",
  });
};

const start = (button: number) => {
  // Google Tag Manager & Analytics Events START
  if (button == 1) {
    gtaEvent({
      event: "GAEvent",
      eventCategory: "Click",
      eventAction: "Home Page",
      eventLabel: "Hemen Ba_lay1n",
    });
    gtaEvent({
      event: "click",
      clickCategory: "Home Page",
      clickName: "Hemen Ba_lay1n",
    });
  } else {
    gtaEvent({
      event: "GAEvent",
      eventCategory: "Click",
      eventAction: "Home Page",
      eventLabel: "^imdi Ba_lay1n  - DIAK",
    });
    gtaEvent({
      event: "click",
      clickCategory: "Home Page",
      clickName: "^imdi Ba_lay1n  - DIAK",
    });
  }
  // Google Tag Manager & Analytics Events END
  router.push({
    name: "login",
  });
};

onMounted(async () => {
  consent.value = await getConsentMode();
  if (consent.value) {
    cookieConsentSet("default", "denied");
    if (get("cookieInform") == "accept") cookieConsentSet("update", "granted");
    else if (get("cookieInform") == "reject")
      cookieConsentSet("update", "denied");
  } else {
    cookieConsentSet("default", "granted");
  }
  cookies.value = !get("cookieInform");
  remove("planSummary");

  const type = route.query?.type;

  if (get("ga-purchase") || get("ga-ecEvent")) {
    gtaEvent(get("ga-purchase"));
    gtaEvent(get("ga-ecEvent"));
    remove("ga-purchase");
    remove("ga-ecEvent");
  }

  if (type) {
    switch (type) {
      case "user-verify":
        modalArgs.value.title = t("user-verify.modal.success.title");
        modalArgs.value.description = t(
          "user-verify.modal.success.description"
        );
        modalArgs.value.button.text = t(
          "user-verify.modal.success.button.text"
        );
        break;
      case "tag-viewing":
        modalArgs.value.title = t("user-verify.modal.success.title");
        modalArgs.value.description = t("tag-view.modal.success.description");
        modalArgs.value.button.text = t(
          "user-verify.modal.success.button.text"
        );
        break;
      case "spam":
        modalArgs.value.title = t("spam-api.modal.success.title");
        modalArgs.value.description = t("spam-api.modal.success.description");
        modalArgs.value.button.text = t("spam-api.modal.success.button.text");
        break;
      case "caller-id":
        modalArgs.value.title = t("caller-id.modal.success.title");
        modalArgs.value.description = t("caller-id.modal.success.description");
        modalArgs.value.button.text = t("caller-id.modal.success.button.text");
    }

    modalArgs.value.image = require("@/assets/images/svg/icons/tick-circle.svg");
    modalArgs.value.showModal = true;
    paymentType.value = type;

    await fetchSiteData();
  }
});

const cookieConsentSet = (property: string, value: string) => {
  gtaEvent("consent", property, {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
    functionality_storage: value,
    personalization_storage: value,
    security_storage: value,
  });
};

defineComponent({
  name: "GtcHome",
});

return (_ctx: any,_cache: any) => {
  const _component_router_link = _resolveComponent("router-link")!
  const _component_i18n_t = _resolveComponent("i18n-t")!

  return (_unref(isLoggedIn))
    ? (_openBlock(), _createBlock(GtcPanel, {
        key: 0,
        description: _ctx.$t(_unref(description)),
        title: _ctx.$t(_unref(title))
      }, {
        default: _withCtx(() => [
          _createElementVNode("div", _hoisted_1, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(services.value, (service) => {
              return (_openBlock(), _createBlock(ActionBox, {
                key: service.key,
                button: {
            link: service.button?.href,
            text: _ctx.$t(service.button?.text),
            status: service.button?.status,
          },
                color: service.color,
                title: _ctx.$t(service.title),
                class: "mx-5 lg:mx-0 lg:w-2/4 lg:max-w-[330px]"
              }, {
                image: _withCtx(() => [
                  _createElementVNode("img", {
                    src: service.imageSrc,
                    class: "py-4 max-w-full w-full",
                    alt: ""
                  }, null, 8, _hoisted_2)
                ]),
                text: _withCtx(() => [
                  _createElementVNode("p", null, _toDisplayString(_ctx.$t(service.description)), 1)
                ]),
                _: 2
              }, 1032, ["button", "color", "title"]))
            }), 128))
          ]),
          _createVNode(GtcModalStandart, _mergeProps({
            onClickButton: _cache[1] || (_cache[1] = ($event: any) => (modalButton())),
            onOnCloseModal: clearQS
          }, _unref(modalArgs), {
            modelValue: _unref(modalArgs).showModal,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event: any) => ((_unref(modalArgs).showModal) = $event))
          }), {
            default: _withCtx(() => [
              (_unref(modalArgs).popupTerms)
                ? (_openBlock(), _createElementBlock("label", _hoisted_3, [
                    _createElementVNode("div", null, [
                      _withDirectives(_createElementVNode("input", {
                        id: "terms",
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event: any) => ((_unref(modalArgs).button.status) = $event)),
                        type: "checkbox"
                      }, null, 512), [
                        [_vModelCheckbox, _unref(modalArgs).button.status]
                      ])
                    ]),
                    _createElementVNode("div", _hoisted_4, [
                      _createVNode(_component_i18n_t, {
                        keypath: "home.permission.text",
                        tag: "p",
                        class: "text-[10px] leading-[1.2] text-gray-soft"
                      }, {
                        link1: _withCtx(() => [
                          _createVNode(_component_router_link, {
                            to: "/terms",
                            target: "_blank",
                            class: "text-primary-500",
                            innerHTML: _unref(t)('menu.footer.terms')
                          }, null, 8, ["innerHTML"])
                        ]),
                        link2: _withCtx(() => [
                          _createVNode(_component_router_link, {
                            to: "/privacy",
                            target: "_blank",
                            class: "text-primary-500",
                            innerHTML: _unref(t)('menu.footer.privacy')
                          }, null, 8, ["innerHTML"])
                        ]),
                        _: 1
                      })
                    ])
                  ]))
                : _createCommentVNode("", true)
            ]),
            _: 1
          }, 16, ["modelValue"])
        ]),
        _: 1
      }, 8, ["description", "title"]))
    : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
        _createVNode(GtcLoggedOut, null, {
          default: _withCtx(() => [
            _createElementVNode("img", {
              alt: _ctx.$t('home.section1.title'),
              src: _imports_0,
              class: "w-28 mt-12"
            }, null, 8, _hoisted_5),
            _createElementVNode("h1", _hoisted_6, _toDisplayString(_ctx.$t("home.section1.title")), 1),
            _createElementVNode("p", _hoisted_7, _toDisplayString(_ctx.$t("home.section1.description")), 1),
            _createVNode(GtcButton, {
              class: "block m-8 uppercase",
              type: "button",
              onClick: _cache[3] || (_cache[3] = ($event: any) => (start(1))),
              "data-test": "start-now"
            }, {
              default: _withCtx(() => [
                _createTextVNode(_toDisplayString(_ctx.$t("home.section1.button")), 1)
              ]),
              _: 1
            }),
            _createElementVNode("section", _hoisted_8, [
              _createElementVNode("div", _hoisted_9, [
                _createVNode(ActionBox, {
                  button: {
              // link: '/register', // DISABLED: User registration and package upgrade functionality
              link: '/login',
              theme: 'primary-outline',
              text: _ctx.$t('home.spamAPI.button'),
              status: true,
            },
                  dense: false,
                  isVertical: false,
                  isReversed: true,
                  title: _ctx.$t('home.spamAPI.title'),
                  class: "mx-auto flex mb-10",
                  color: "purple"
                }, {
                  image: _withCtx(() => [
                    _createElementVNode("img", {
                      alt: _ctx.$t('home.spamAPI.title'),
                      src: require('@/assets/images/svg/spam-api.svg'),
                      class: "w-96"
                    }, null, 8, _hoisted_10)
                  ]),
                  text: _withCtx(() => [
                    _createElementVNode("p", _hoisted_11, _toDisplayString(_ctx.$t("home.spamAPI.description")), 1),
                    _createElementVNode("p", null, _toDisplayString(_ctx.$t("home.spamAPI.p1")), 1)
                  ]),
                  _: 1
                }, 8, ["button", "title"]),
                _createVNode(ActionBox, {
                  button: {
              // link: '/register', // DISABLED: User registration and package upgrade functionality
              link: '/login',
              theme: 'primary-outline',
              text: _ctx.$t('home.userVerifySection.button'),
              status: true,
            },
                  dense: false,
                  isVertical: false,
                  isReversed: true,
                  title: _ctx.$t('home.userVerifySection.title'),
                  class: "mx-auto flex mb-10",
                  color: "green"
                }, {
                  image: _withCtx(() => [
                    _createElementVNode("img", {
                      alt: _ctx.$t('home.userVerifySection.title'),
                      src: require('./../assets/images/svg/user-verify.svg'),
                      class: "w-96"
                    }, null, 8, _hoisted_12)
                  ]),
                  text: _withCtx(() => [
                    _createElementVNode("p", _hoisted_13, _toDisplayString(_ctx.$t("home.userVerifySection.description")), 1),
                    _createElementVNode("p", null, _toDisplayString(_ctx.$t("home.userVerifySection.p1")), 1)
                  ]),
                  _: 1
                }, 8, ["button", "title"])
              ])
            ]),
            (cookies.value)
              ? (_openBlock(), _createElementBlock("div", _hoisted_14, [
                  (!consent.value)
                    ? (_openBlock(), _createElementBlock("p", _hoisted_15, [
                        _createTextVNode(_toDisplayString(_ctx.$t("home.cookies.description")) + " ", 1),
                        _createVNode(_component_router_link, {
                          to: "/cookies-policy",
                          class: "underline",
                          target: "_blank"
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(_toDisplayString(_ctx.$t("menu.footer.cookie")), 1)
                          ]),
                          _: 1
                        })
                      ]))
                    : (_openBlock(), _createBlock(_component_i18n_t, {
                        key: 1,
                        keypath: "landing.cookies.description",
                        tag: "p"
                      }, {
                        cookie: _withCtx(() => [
                          _createElementVNode("a", _hoisted_16, _toDisplayString(_ctx.$t("landing.cookies.policy")), 1)
                        ]),
                        _: 1
                      })),
                  (consent.value)
                    ? (_openBlock(), _createElementBlock("div", _hoisted_17, [
                        _createElementVNode("button", {
                          onClick: _cache[4] || (_cache[4] = ($event: any) => (manageCookies(false)))
                        }, _toDisplayString(_ctx.$t("landing.cookies.reject")), 1),
                        _createElementVNode("button", {
                          onClick: _cache[5] || (_cache[5] = ($event: any) => (manageCookies(true)))
                        }, _toDisplayString(_ctx.$t("landing.cookies.accept")), 1)
                      ]))
                    : _createCommentVNode("", true),
                  _createElementVNode("span", {
                    class: "h-2 cursor-pointer absolute right-3 top-4",
                    onClick: _cache[6] || (_cache[6] = ($event: any) => (consent.value ? (cookies.value = false) : manageCookies(false)))
                  }, "  ")
                ]))
              : _createCommentVNode("", true)
          ]),
          _: 1
        }),
        _createVNode(GtcFooter, { cardLogo: footerLogo.value }, null, 8, ["cardLogo"])
      ], 64))
}
}

})