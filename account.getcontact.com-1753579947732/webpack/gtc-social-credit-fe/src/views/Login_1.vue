<template>
  <GtcLoggedOut v-if="formStatus">
    <GtcContainer>
      <div class="w-[344px] max-w-full m-auto">
        <h1 class="page-title text-center">
          {{ $t("account.login.pageTitle") }}
        </h1>
        <form action="#" @submit.prevent="loginByEmail" method="post">
          <GtcInput
            v-if="loginState?.showNameInput"
            :disabled="isWaitingLogin"
            v-model.trim="v$.fullName.$model"
            :innerLabel="$t('account.forms.labelText.nameSurname')"
            type="text"
            :invalid="v$.fullName.$error"
            :errorMessage="(v$.fullName.$errors[0]?.$message as string)"
            placeholder=" "
          />
          <GtcInput
            :disabled="isWaitingLogin"
            v-model.trim="v$.email.$model"
            :innerLabel="$t('account.forms.labelText.email')"
            type="email"
            :invalid="v$.email.$error"
            :errorMessage="(v$.email.$errors[0]?.$message as string)"
            placeholder=" "
          />
          <GtcButton
            class="block w-full"
            :loading="isWaitingLogin"
            type="submit"
            :disabled="isWaitingLogin || v$.$invalid"
          >
            {{ $t("account.forms.cta.login") }}
          </GtcButton>
          <div v-if="loginState.googleUrl" class="or">
            <span>{{ $t("account.common.or") }}</span>
          </div>
        </form>
        <GtcButton
          v-if="loginState.googleUrl"
          class="flex w-full font-medium text-sm"
          :loading="isWaitingLogin"
          type="button"
          theme="default-outline"
          @click.prevent="openLoginWindow(loginState.googleUrl)"
        >
          <img
            src="@/assets/images/svg/google.svg"
            alt="Login with google"
            class="mr-2"
          />
          <span>{{ $t("account.forms.cta.loginWithGoogle") }}</span>
        </GtcButton>
        <div class="login-info">
          <i18n-t
            keypath="account.login.contracts.text"
            tag="p"
            class="text-xs mt-6 text-center text-neutral-600"
          >
            <template #link1>
              <router-link
                to="/terms"
                target="_blank"
                class="text-primary-500 font-semibold"
              >
                {{ $t("account.login.contracts.link1_text") }}
              </router-link>
            </template>
            <template #link2>
              <router-link
                to="/privacy"
                target="_blank"
                class="text-primary-500 font-semibold"
              >
                {{ $t("account.login.contracts.link2_text") }}
              </router-link>
            </template>
          </i18n-t>
        </div>
      </div>
      <CookiePopup />
    </GtcContainer>
  </GtcLoggedOut>

  <GtcModal
    v-model="modalStatus"
    :title="modalTitle"
    @modalAccept="clearErrorStatus()"
  >
    <template #content>
      <div v-html="modalContent"></div>
    </template>
  </GtcModal>
</template>

<script setup lang="ts">
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
</script>

<style lang="postcss">
.or {
  @apply w-full h-[21px] relative my-4;

  &:after {
    @apply content-[''] w-full h-[1px] bg-gray-200 absolute left-0 top-[10px];
  }

  span {
    @apply block w-fit m-auto leading-[21px] px-4 bg-white-100 text-neutral-500 text-[10px] font-semibold relative z-10;
  }
}
</style>
