import "./registerServiceWorker";
import "./styles/app.css";

import { createHead } from "@vueuse/head";
import { createApp } from "vue";

import store from "@/config/store.config";

import App from "./App.vue";
import router from "./router";
import i18n from "./utils/i18n";

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(i18n);
app.use(head);
app.use(store);
app.mount("#app");
