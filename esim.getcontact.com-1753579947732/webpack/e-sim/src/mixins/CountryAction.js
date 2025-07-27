export default {
  data() {
    return {
      countries: this.$store.state.packageModule.countries,
      bannerConfig: null,
    }
  },
  methods: {
    async getCountries() {
      const result = await this.$store.dispatch("packageModule/getCountries")
      this.countries = result.countries.map(country => {
        const id = country.code.toLowerCase()

        return {
          ...country,
          id: id,
        }
      })

      this.bannerConfig = result.banner

      return this.countries
    },
  },
}
