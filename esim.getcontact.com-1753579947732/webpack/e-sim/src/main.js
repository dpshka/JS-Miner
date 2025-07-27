import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "@/plugins/axios"
import "./tailwind.scss"
import i18n from "./i18n"
import { maska } from "maska"
import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"
import VueCookies from "vue3-cookies"

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  },
  enumerable: false,
})

const app = createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(VueCookies)
  .directive("maska", maska)

if (
  process.env.NODE_ENV === "production" &&
  process.env.VUE_APP_SENTRY_ENABLED
) {
  Sentry.init({
    app,
    dsn: process.env.VUE_APP_SENTRY_ENDPOINT,
    integrations: [new BrowserTracing()],
  })
}

if (process.env.VUE_APP_VERSION) {
  window.VERSION = process.env.VUE_APP_VERSION
}

app.config.globalProperties.axios = axios

app.config.globalProperties.auth = store.state.auth

let locale = store.state.languages.find(lang => lang.id === i18n.global.locale)

document.body.dir = locale && locale.rtl ? "rtl" : "ltr"

app.mount("#app")
