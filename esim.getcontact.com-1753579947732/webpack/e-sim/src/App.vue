<template>
  <Navbar @showSidebar="showSidebarMenu" />
  <Sidebar :show-sidebar="showSidebar" @hideSidebar="hideSidebarMenu" />
  <router-view />
  <Footer v-if="$route.meta.showFooter" :cardLogo="cardLogo" />
  <AlertModal
    :show="alertModal.show"
    :message="
      alertModal.show && alertModal.message
        ? $t(alertModal.message.toString())
        : ''
    "
    :alert-type="alertModal.type"
    @hide="hideAlertModal" />
  <CookiePolicyNotification />
</template>
<script>
import Navbar from "@/views/layouts/Navbar"
import Footer from "@/views/layouts/Footer"
import Sidebar from "@/views/layouts/Sidebar"
import AlertModal from "@/components/Common/AlertModal"
import CookiePolicyNotification from "@/components/Common/CookiePolicyNotification"

export default {
  components: { AlertModal, Sidebar, Footer, Navbar, CookiePolicyNotification },
  data() {
    return {
      showSidebar: false,
      cardLogo: false,
    }
  },
  mounted() {
    const locale = this.$i18n.locale
    const selectedLang = this.$cookies.get("selectedLang")
    this.cardLogo = this.$cookies.get("ipCountry") == 'RU' && this.$cookies.get("selectedLang") == "ru"

    if (selectedLang !== locale) {
      const urlParts = location.hostname.split(".")
      // without subdomain
      const domain = urlParts
        .slice(0)
        .slice(-(urlParts.length === 4 ? 3 : 2))
        .join(".")

      // undefined vars will be get default values
      this.$cookies.set("selectedLang", locale, undefined, undefined, domain)
    }

    // desk360chat click event
    if (process.env.VUE_APP_GTM_ENABLED) {
      window.addEventListener("message", function (e) {
        const data = e.data

        if (data && data.message && data.message.show) {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: "GAEvent",
            eventCategory: "Click",
            eventAction: "Chat Button",
            eventLabel: "",
          })

          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: "chatClick",
            clickCategory: "Chat Button",
          })
        }
      })
    }
  },
  computed: {
    alertModal() {
      return this.$store.state.alertModal
    },
  },
  methods: {
    showSidebarMenu() {
      this.showSidebar = true

      document.querySelector("body").classList.add("overflow-hidden")
    },
    hideSidebarMenu() {
      this.showSidebar = false

      document.querySelector("body").classList.remove("overflow-hidden")
    },
    hideAlertModal() {
      this.$store.commit("hideAlertModal")
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        let title = this.$t("page-titles.app-name")

        if (to.meta.pageTitle) {
          title += " - " + this.$t(`page-titles.${to.meta.pageTitle}`)
        }

        document.title = title
      },
    },
  },
}
</script>
