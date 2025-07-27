import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, unref as _unref, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createVNode as _createVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, createElementBlock as _createElementBlock, withModifiers as _withModifiers, resolveComponent as _resolveComponent, Fragment as _Fragment } from "vue"
import _imports_0 from '@/assets/images/svg/google.svg'


const _hoisted_1 = { class: "w-[344px] max-w-full m-auto" }
const _hoisted_2 = { class: "page-title text-center" }
const _hoisted_3 = {
  key: 1,
  class: "or"
}
const _hoisted_4 = { class: "login-info" }
const _hoisted_5 = ["innerHTML"]

import useVuelidate from "@vuelidate/core";
import { computed, defineComponent, onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import GtcButton from "@/components/Button.vue";
import GtcContainer from "@/components/Container.vue";
import CookiePopup from "@/components/CookiePopup.vue";
import GtcInput from "@/components/Input.vue";
import GtcModal from "@/components/Modal.vue";
import GtcLoggedOut from "@/components/pages/LoggedOut.vue";
import { useAccountStore } from "@/stores/account.store";
// import {
//   isRecaptchaActive,
//   useGoogleReCaptcha,
// } from "@/composables/useGoogleReCaptcha";
import { useAuthStore } from "@/stores/auth.store";
import { useTemplateStore } from "@/stores/template.store";
import { email, maxLength, minLength, required } from "@/utils/i18n-validators";
import { $wait } from "@/wait";


export default /*@__PURE__*/_defineComponent({
  __name: 'Login',
  setup(__props) {

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const accountStore = useAccountStore();
const authStore = useAuthStore();
const templateStore = useTemplateStore();
const modalStatus = ref(false);
const modalTitle = ref(t("account.login.error.userNotFound.title"));
const country = computed(() => authStore.getCountry);
const modalContent = ref(`
  <span>
    ${t("account.login.error.userNotFound.description")}
  </span>`);

let loginState = reactive({
  googleUrl: "",
  showNameInput: false,
});

const token = route.params?.gtcToken;
let provider: string | string[] | null = route.params?.provider;
const redirectPath = route.query?.redirect;
let loginInit: any = null;

const state = reactive({
  fullName: "",
  email: "",
});

const rules = computed(() => {
  const localRules = {
    fullName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50),
    },
    email: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(50),
      email,
    },
  };

  return localRules;
});

const v$ = useVuelidate(rules, state);

const formStatus = ref(false);

onBeforeMount(async () => {
  if (route.query?.type === "auth-error" && authStore.getErrorMessage.length) {
    modalTitle.value = t(authStore.getErrorMessage);
    modalStatus.value = true;
  }

  if (!provider) {
    loginInit = await authStore.loginInit();
  }

  const failureCode = templateStore.getFailureCode;

  if (failureCode) {
    modalStatus.value = true;
    modalContent.value = `<span>${failureCode}</span>`;
  }

  if (token && typeof token === "string") {
    const tokenOfLocale = localStorage.getItem("VKToken");

    if (tokenOfLocale && tokenOfLocale === token) {
      router.push({ name: "returnToApp" });
      return;
    } else {
      localStorage.setItem("VKToken", token);
    }

    try {
      const data = await authStore.loginByGtcToken(token);

      if (redirectPath && typeof redirectPath === "string") {
        router.push(redirectPath);

        return;
      }

      if (!accountStore.isCountryEnabled) {
        modalStatus.value = true;
        modalTitle.value = t("account.login.error.country.title");
        modalContent.value = t("account.login.error.country.description");

        return;
      }

      if (data.needPolicy) {
        router.push({ name: "purchasePolicy" });

        return;
      }

      if (authStore.getLoggedIn) {
        const intendedUrl = templateStore.getIntendedUrl;
        const target = intendedUrl ? intendedUrl : "/balance/earned";
        router.push(target);
      }
    } catch (error) {
      if (redirectPath && typeof redirectPath === "string") {
        templateStore.setIntendedUrl(redirectPath);
        router.push(redirectPath);

        return;
      }

      modalStatus.value = true;
      modalTitle.value = t("account.login.error.userNotFound.title");
      modalContent.value = t("account.login.error.userNotFound.description");

      return;
    }
  } else if (provider && typeof provider === "string") {
    if (window.opener) {
      window.opener.location.href = window.location.href;
      window.close();

      return;
    }

    if (route.query.error === "access_denied") {
      provider = null;
      router.push({ name: "login" });

      return;
    }

    try {
      await authStore.login({
        type: provider as "facebook" | "google" | "email",
        token: route.query.code as string,
        state: route.query.state as string,
      });
    } catch (error: any) {
      if (error?.meta?.httpStatusCode === 400 && error?.result) {
        router.push({
          name: "loginByVerifykit",
        });
      } else {
        loginErrorAction(error);
      }
    }
  } else {
    if (loginInit) {
      formStatus.value = true;
      loginState.showNameInput = loginInit.showNameInput;
      loginState.googleUrl = loginInit.googleUrl;
    }
  }
});

function clearErrorStatus() {
  if (authStore.getLoggedIn) {
    authStore.logout();
  } else {
    router.replace("/login");
    authStore.setErrorMessage("");
  }
}

const isWaitingLogin = computed(() => {
  return $wait.is("login");
});

const loginByEmail = async () => {
  // if (process.env.VUE_APP_GTM_ENABLED) {
  //   this.addEmptyInputsToList(this.inputs);

  //   this.sendHistoryToGA("Login Form");
  // }

  try {
    const result = await authStore.login({
      type: "email",
      fullName: state.fullName,
      token: state.email,
    });

    if (result) {
      router.push({ name: "emailVerification" });
    }
  } catch (error: any) {
    loginErrorAction(error);
  }
};

/*
const loginSuccessAction = (result, platform) => {
  authStore.updateUser(result.user);
  sendLoginEventToGA(platform);
  redirectToNext();
};
*/

const loginErrorAction = (error: any) => {
  const { meta } = error;
  let errorCode = "general-error-message";

  if (meta) {
    errorCode = meta.errorCode.toString();
  }

  modalStatus.value = true;
  modalContent.value = `<span>${t(errorCode)}</span>`;

  if (meta.errorMessage) {
    modalTitle.value = meta.errorMessage;
  }
};

function openLoginWindow(url: string) {
  const popupWidth = 600;
  const popupHeight = 600;
  const left = (screen.width - popupWidth) / 2;
  const top = (screen.height - popupHeight) / 3;

  window.open(
    url,
    "",
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
  );
}

defineComponent({
  name: "GTCLogin",
});

return (_ctx: any,_cache: any) => {
  const _component_router_link = _resolveComponent("router-link")!
  const _component_i18n_t = _resolveComponent("i18n-t")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    (formStatus.value)
      ? (_openBlock(), _createBlock(GtcLoggedOut, { key: 0 }, {
          default: _withCtx(() => [
            _createVNode(GtcContainer, null, {
              default: _withCtx(() => [
                _createElementVNode("div", _hoisted_1, [
                  _createElementVNode("h1", _hoisted_2, _toDisplayString(_ctx.$t("account.login.pageTitle")), 1),
                  _createElementVNode("form", {
                    action: "#",
                    onSubmit: _withModifiers(loginByEmail, ["prevent"]),
                    method: "post"
                  }, [
                    (_unref(loginState)?.showNameInput)
                      ? (_openBlock(), _createBlock(GtcInput, {
                          key: 0,
                          disabled: isWaitingLogin.value,
                          modelValue: _unref(v$).fullName.$model,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event: any) => ((_unref(v$).fullName.$model) = $event)),
                          modelModifiers: { trim: true },
                          innerLabel: _ctx.$t('account.forms.labelText.nameSurname'),
                          type: "text",
                          invalid: _unref(v$).fullName.$error,
                          errorMessage: (_unref(v$).fullName.$errors[0]?.$message as string),
                          placeholder: " "
                        }, null, 8, ["disabled", "modelValue", "innerLabel", "invalid", "errorMessage"]))
                      : _createCommentVNode("", true),
                    _createVNode(GtcInput, {
                      disabled: isWaitingLogin.value,
                      modelValue: _unref(v$).email.$model,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event: any) => ((_unref(v$).email.$model) = $event)),
                      modelModifiers: { trim: true },
                      innerLabel: _ctx.$t('account.forms.labelText.email'),
                      type: "email",
                      invalid: _unref(v$).email.$error,
                      errorMessage: (_unref(v$).email.$errors[0]?.$message as string),
                      placeholder: " "
                    }, null, 8, ["disabled", "modelValue", "innerLabel", "invalid", "errorMessage"]),
                    _createVNode(GtcButton, {
                      class: "block w-full",
                      loading: isWaitingLogin.value,
                      type: "submit",
                      disabled: isWaitingLogin.value || _unref(v$).$invalid
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(_toDisplayString(_ctx.$t("account.forms.cta.login")), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"]),
                    (_unref(loginState).googleUrl)
                      ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
                          _createElementVNode("span", null, _toDisplayString(_ctx.$t("account.common.or")), 1)
                        ]))
                      : _createCommentVNode("", true)
                  ], 32),
                  (_unref(loginState).googleUrl)
                    ? (_openBlock(), _createBlock(GtcButton, {
                        key: 0,
                        class: "flex w-full font-medium text-sm",
                        loading: isWaitingLogin.value,
                        type: "button",
                        theme: "default-outline",
                        onClick: _cache[2] || (_cache[2] = _withModifiers(($event: any) => (openLoginWindow(_unref(loginState).googleUrl)), ["prevent"]))
                      }, {
                        default: _withCtx(() => [
                          _cache[5] || (_cache[5] = _createElementVNode("img", {
                            src: _imports_0,
                            alt: "Login with google",
                            class: "mr-2"
                          }, null, -1)),
                          _createElementVNode("span", null, _toDisplayString(_ctx.$t("account.forms.cta.loginWithGoogle")), 1)
                        ]),
                        _: 1
                      }, 8, ["loading"]))
                    : _createCommentVNode("", true),
                  _createElementVNode("div", _hoisted_4, [
                    _createVNode(_component_i18n_t, {
                      keypath: "account.login.contracts.text",
                      tag: "p",
                      class: "text-xs mt-6 text-center text-neutral-600"
                    }, {
                      link1: _withCtx(() => [
                        _createVNode(_component_router_link, {
                          to: "/terms",
                          target: "_blank",
                          class: "text-primary-500 font-semibold"
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(_toDisplayString(_ctx.$t("account.login.contracts.link1_text")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      link2: _withCtx(() => [
                        _createVNode(_component_router_link, {
                          to: "/privacy",
                          target: "_blank",
                          class: "text-primary-500 font-semibold"
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(_toDisplayString(_ctx.$t("account.login.contracts.link2_text")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _createVNode(CookiePopup)
              ]),
              _: 1
            })
          ]),
          _: 1
        }))
      : _createCommentVNode("", true),
    _createVNode(GtcModal, {
      modelValue: modalStatus.value,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event: any) => ((modalStatus).value = $event)),
      title: modalTitle.value,
      onModalAccept: _cache[4] || (_cache[4] = ($event: any) => (clearErrorStatus()))
    }, {
      content: _withCtx(() => [
        _createElementVNode("div", { innerHTML: modalContent.value }, null, 8, _hoisted_5)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64))
}
}

})