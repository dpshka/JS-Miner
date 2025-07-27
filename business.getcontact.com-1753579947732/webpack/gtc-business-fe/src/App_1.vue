<template>
  <teleport to="body">
    <div
      :dir="dir"
      class="fixed top-3 right-3 overflow-auto max-h-screen scrollbar scrollbar-none z-50"
    >
      <ul v-if="toasts.length">
        <li
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'bg-white-100 p-6 rounded-lg shadow-lg relative mb-3',
            {
              'bg-red-100': toast.type === 'error',
              'bg-green-100': toast.type === 'success',
              'bg-yellow-100': toast.type === 'info',
            },
          ]"
        >
          <span class="font-medium text-sm">{{ toast.message }}</span>
          <button class="absolute top-2 right-2" @click="removeToast(toast)">
            <i>
              <Icon name="Close" class="w-4 h-4 rounded-full" />
            </i>
          </button>
        </li>
      </ul>
    </div>
  </teleport>

  <div :dir="dir">
    <router-view />
  </div>
  <noscript>
    <iframe
      :src="'https://www.googletagmanager.com/ns.html?id=' + GTM_ID"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    >
    </iframe>
  </noscript>
</template>

<script lang="ts" setup>
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
</script>
