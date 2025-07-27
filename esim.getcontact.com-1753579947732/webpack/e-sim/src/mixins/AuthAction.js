export default {
  methods: {
    redirectToNext(disableIntendedUrl = false) {
      let intendedUrl = this.$store.getters.getIntendedUrl

      if (disableIntendedUrl || !intendedUrl) {
        intendedUrl = "/"
      } else {
        this.$store.commit("setIntendedUrl", null)
      }

      this.$router.push(intendedUrl)
    },
    logout() {
      this.$store.dispatch("auth/logout").then(isLoggedOut => {
        if (isLoggedOut) {
          window.location.href = "/"

          return false
        }
      })
    },
  },
}
