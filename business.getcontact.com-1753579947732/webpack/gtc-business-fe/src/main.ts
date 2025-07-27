import "./registerServiceWorker";
import "./styles/app.css";
import "./auth";

import { createHead } from "@vueuse/head";
import Maska from "maska";
import { createApp } from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";

import {
  isRecaptchaActive,
  recaptchaKey,
} from "@/composables/useGoogleReCaptcha";

import App from "./App.vue";
import router from "./router";
import i18n from "./utils/i18n";

const app = createApp(App);
const head = createHead();

if (isRecaptchaActive) {
  app.use(VueReCaptcha, {
    siteKey: recaptchaKey as string,
    loaderOptions: { autoHideBadge: true },
  });
}

app.use(router);
app.use(i18n);
app.use(Maska);
app.use(head);
app.mount("#app");
