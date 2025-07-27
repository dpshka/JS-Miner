import { createStore } from "vuex"
import auth from "./modules/auth"
import packageModule from "@/store/modules/package"
import orderModule from "@/store/modules/order"
import cardModule from "@/store/modules/card"

export default createStore({
  state: {
    qrInstallationSteps: [
      "installation.qr-installation-step-1",
      "installation.qr-installation-step-2",
      "installation.qr-installation-step-3",
      "installation.qr-installation-step-4",
    ],
    manualInstallationSteps: [
      "installation.manual-installation-step-1",
      "installation.manual-installation-step-2",
      "installation.manual-installation-step-3",
      "installation.manual-installation-step-4",
      "installation.manual-installation-step-5",
    ],
    languages: [
      {
        id: "en",
        code: "EN",
        name: "English",
      },
      {
        id: "tr",
        code: "TR",
        name: "Türkçe",
      },
      {
        id: "az",
        code: "AZ",
        name: "Azerbaijani",
      },
      {
        id: "hy",
        code: "HY",
        name: "Armenian",
      },
      {
        id: "ar",
        code: "AR",
        name: "Arabic",
        rtl: true,
      },
      {
        id: "fr",
        code: "FR",
        name: "French",
      },
      {
        id: "ka",
        code: "KA",
        name: "Georgian",
      },
      {
        id: "id",
        code: "ID",
        name: "Indonesian",
      },
      {
        id: "hi",
        code: "HI",
        name: "Hindi",
      },
      {
        id: "kk",
        code: "KK",
        name: "Kazakh",
      },
      {
        id: "ky",
        code: "KY",
        name: "Kyrgyz",
      },
      {
        id: "mn",
        code: "MN",
        name: "Mongolian",
      },
      {
        id: "ms",
        code: "MS",
        name: "Malay",
      },
      {
        id: "ne",
        code: "NE",
        name: "Nepali",
      },
      {
        id: "pt",
        code: "PT",
        name: "Portuguese",
      },
      {
        id: "pt_br",
        code: "PT-BR",
        name: "Portuguese (BR)",
      },
      {
        id: "ru",
        code: "RU",
        name: "Russian",
      },
      {
        id: "es",
        code: "ES",
        name: "Spanish",
      },
      {
        id: "th",
        code: "TH",
        name: "Thai",
      },
      {
        id: "tg",
        code: "TG",
        name: "Tajik",
      },
      {
        id: "tl",
        code: "TL",
        name: "Tagalog",
      },
      {
        id: "uk",
        code: "UK",
        name: "Ukrainian",
      },
      {
        id: "uz",
        code: "UZ",
        name: "Uzbek",
      },
      {
        id: "vi",
        code: "VI",
        name: "Vietnamese",
      },
    ],
    orderStatusTypes: [
      {
        identifier: "REFUND",
        type: "fail",
      },
      {
        identifier: "STARTED",
        type: "pending",
      },
      {
        identifier: "PAYMENT_FAIL",
        type: "fail",
      },
      {
        identifier: "IN_PROGRESS",
        type: "pending",
      },
      {
        identifier: "ORDER_FAIL",
        type: "fail",
      },
      {
        identifier: "PENDING_COMPLETE",
        type: "success",
      },
      {
        identifier: "COMPLETED",
        type: "success",
      },
      {
        identifier: "FINISHED",
        type: "fail",
      },
      {
        identifier: "DELETED",
        type: "fail",
      },
      {
        identifier: "DEPLETED",
        type: "fail",
      },
      {
        identifier: "EXPIRED",
        type: "fail",
      },
    ],
    intendedUrl: null,
    intendedUrlExpirySecond:
      process.env.VUE_APP_INTENDED_URL_EXPIRY_SECOND || 120,
    failureCode: null,
    alertModal: {
      show: false,
      message: "",
      type: "error",
    },
  },
  getters: {
    getIntendedUrl(state) {
      let intendedUrl = state.intendedUrl

      if (!intendedUrl) {
        intendedUrl = localStorage.getItem("intendedUrl")

        try {
          intendedUrl = JSON.parse(intendedUrl)
        } catch (e) {
          intendedUrl = null
        }
      }

      if (!intendedUrl) {
        return null
      }

      const now = new Date()

      localStorage.removeItem("intendedUrl")

      if (now.getTime() > intendedUrl.expiry) {
        return null
      }

      try {
        let url = new URL(intendedUrl.url)

        return url.pathname + url.search
      } catch (e) {
        return intendedUrl.url
      }
    },
    getFailureCode(state) {
      const failureCode = state.failureCode

      state.failureCode = null

      return failureCode
    },
  },
  mutations: {
    setIntendedUrl(state, url) {
      if (!url) {
        localStorage.removeItem("intendedUrl")

        state.intendedUrl = null

        return
      }

      let expiryDate = new Date()
      expiryDate.setSeconds(
        expiryDate.getSeconds() + state.intendedUrlExpirySecond
      )

      const intendedUrl = { url, expiry: expiryDate.getTime() }
      localStorage.setItem("intendedUrl", JSON.stringify(intendedUrl))

      state.intendedUrl = intendedUrl
    },
    setFailureCode(state, code) {
      state.failureCode = code
    },
    showAlertModal(state, { message, type = "error" }) {
      state.alertModal = {
        show: true,
        message,
        type,
      }
    },
    hideAlertModal(state) {
      state.alertModal = {
        show: false,
        message: "",
        type: "error",
      }
    },
  },
  actions: {},
  modules: {
    auth,
    packageModule,
    orderModule,
    cardModule,
  },
})
