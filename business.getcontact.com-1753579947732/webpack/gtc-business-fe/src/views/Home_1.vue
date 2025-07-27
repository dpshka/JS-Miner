<template>
  <template v-if="isLoggedIn">
    <GtcPanel :description="$t(description)" :title="$t(title)">
      <div class="flex w-full gap-5 md:gap-8 bg-white-100 flex-col lg:flex-row">
        <ActionBox
          v-for="service in services"
          v-bind:key="service.key"
          :button="{
            link: service.button?.href,
            text: $t(service.button?.text),
            status: service.button?.status,
          }"
          :color="service.color"
          :title="$t(service.title)"
          class="mx-5 lg:mx-0 lg:w-2/4 lg:max-w-[330px]"
        >
          <template #image>
            <img
              :src="service.imageSrc"
              class="py-4 max-w-full w-full"
              alt=""
            />
          </template>
          <template #text>
            <p>{{ $t(service.description) }}</p>
          </template>
        </ActionBox>
      </div>
      <GtcModalStandart
        @clickButton="modalButton()"
        @onCloseModal="clearQS"
        v-bind="modalArgs"
        v-model="modalArgs.showModal"
      >
        <label
          class="my-5 flex justify-center text-left items-center"
          v-if="modalArgs.popupTerms"
        >
          <div>
            <input
              id="terms"
              v-model="modalArgs.button.status"
              type="checkbox"
            />
          </div>
          <div class="pl-2 pt-0.5 md:w-2/3">
            <i18n-t
              keypath="home.permission.text"
              tag="p"
              class="text-[10px] leading-[1.2] text-gray-soft"
            >
              <template #link1>
                <router-link
                  to="/terms"
                  target="_blank"
                  class="text-primary-500"
                  v-html="t('menu.footer.terms')"
                />
              </template>
              <template #link2>
                <router-link
                  to="/privacy"
                  target="_blank"
                  class="text-primary-500"
                  v-html="t('menu.footer.privacy')"
                />
              </template>
            </i18n-t>
          </div>
        </label>
      </GtcModalStandart>
    </GtcPanel>
  </template>
  <template v-else>
    <GtcLoggedOut>
      <img
        :alt="$t('home.section1.title')"
        src="@/assets/images/svg/icons/business-icon.svg"
        class="w-28 mt-12"
      />
      <h1 class="py-10 text-neutral-1000 text-center md:text-left">
        {{ $t("home.section1.title") }}
      </h1>
      <p class="text-center md:text-left">
        {{ $t("home.section1.description") }}
      </p>
      <GtcButton
        class="block m-8 uppercase"
        type="button"
        @click="start(1)"
        data-test="start-now"
      >
        {{ $t("home.section1.button") }}
      </GtcButton>
      <section class="bg-white-100 w-full">
        <div class="container px-5 md:px-20 mx-auto mt-10">
          <!-- <ActionBox
            :button="{
              click: () => start(2),
              theme: 'primary-outline',
              text: $t('home.callerSection.button'),
              status: true,
            }"
            :dense="false"
            :isVertical="false"
            :isReversed="true"
            :title="$t('home.callerSection.title')"
            class="container md:px-20 sm:px-6 mx-auto flex mb-10"
          >
            <template #image>
              <div class="flex justify-center">
                <img
                  :alt="$t('home.callerSection.title')"
                  src="@/assets/images/svg/phone1.svg"
                  class="w-2/5 md:w-44 m-4"
                />
                <img
                  :alt="$t('home.callerSection.title')"
                  src="@/assets/images/svg/phone2.svg"
                  class="w-2/5 md:w-44 m-4"
                />
              </div>
            </template>
            <template #text>
              <p class="font-medium mb-5">
                {{ $t("home.callerSection.description") }}
              </p>
              <ul class="pt-5">
                <li class="list-disc list-inside pb-2">
                  {{ $t("home.callerSection.listItem1") }}
                </li>
                <li class="list-disc list-inside pb-2">
                  {{ $t("home.callerSection.listItem2") }}
                </li>
                <li class="list-disc list-inside pb-2">
                  {{ $t("home.callerSection.listItem3") }}
                </li>
              </ul>
            </template>
          </ActionBox> -->
          <ActionBox
            :button="{
              // link: '/register', // DISABLED: User registration and package upgrade functionality
              link: '/login',
              theme: 'primary-outline',
              text: $t('home.spamAPI.button'),
              status: true,
            }"
            :dense="false"
            :isVertical="false"
            :isReversed="true"
            :title="$t('home.spamAPI.title')"
            class="mx-auto flex mb-10"
            color="purple"
          >
            <template #image>
              <img
                :alt="$t('home.spamAPI.title')"
                :src="require('@/assets/images/svg/spam-api.svg')"
                class="w-96"
              />
            </template>
            <template #text>
              <p class="font-medium mb-5">
                {{ $t("home.spamAPI.description") }}
              </p>
              <p>
                {{ $t("home.spamAPI.p1") }}
              </p>
            </template>
          </ActionBox>
          <ActionBox
            :button="{
              // link: '/register', // DISABLED: User registration and package upgrade functionality
              link: '/login',
              theme: 'primary-outline',
              text: $t('home.userVerifySection.button'),
              status: true,
            }"
            :dense="false"
            :isVertical="false"
            :isReversed="true"
            :title="$t('home.userVerifySection.title')"
            class="mx-auto flex mb-10"
            color="green"
          >
            <template #image>
              <img
                :alt="$t('home.userVerifySection.title')"
                :src="require('./../assets/images/svg/user-verify.svg')"
                class="w-96"
              />
            </template>
            <template #text>
              <p class="font-medium mb-5">
                {{ $t("home.userVerifySection.description") }}
              </p>
              <p>
                {{ $t("home.userVerifySection.p1") }}
              </p>
            </template>
          </ActionBox>
        </div>
      </section>
      <div class="cookies" v-if="cookies" data-test="cookie">
        <p v-if="!consent">
          {{ $t("home.cookies.description") }}
          <router-link to="/cookies-policy" class="underline" target="_blank">{{
            $t("menu.footer.cookie")
          }}</router-link>
        </p>
        <i18n-t keypath="landing.cookies.description" tag="p" v-else>
          <template #cookie>
            <a href="https://getcontact.com/privacy" target="_blank">
              {{ $t("landing.cookies.policy") }}
            </a>
          </template>
        </i18n-t>
        <div class="buttons" v-if="consent">
          <button @click="manageCookies(false)">
            {{ $t("landing.cookies.reject") }}
          </button>
          <button @click="manageCookies(true)">
            {{ $t("landing.cookies.accept") }}
          </button>
        </div>
        <span
          class="h-2 cursor-pointer absolute right-3 top-4"
          @click="consent ? (cookies = false) : manageCookies(false)"
        >
          
        </span>
      </div>
    </GtcLoggedOut>
    <GtcFooter :cardLogo="footerLogo" />
  </template>
</template>

<script lang="ts" setup>
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
</script>
<style scoped>
.cookies {
  @apply fixed flex w-[calc(100%_-_30px)] m-[15px] justify-between items-start sm:items-center flex-col sm:flex-row bottom-0 rounded-md bg-black-pure/80 text-white-100 text-[12px] p-[16px] pr-[30px] z-[9999999];
  div.buttons {
    @apply space-x-1 pt-3 sm:pt-[0] whitespace-nowrap;
    button {
      @apply bg-white-100 text-black-pure rounded-full py-[4px] px-[8px];
    }
  }
}
.feature-list div > span {
  @apply w-9 h-9 bg-blue-500 rounded-full flex content-center justify-center items-center;
}
</style>
