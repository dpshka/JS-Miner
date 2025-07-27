import debounce from "lodash.debounce"

export default {
  name: "Filter Countries",
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filteredCountries: [],
      searchCountries: "",
    }
  },
  methods: {
    filterCountries: debounce(function (value, clearWhenValueEmpty = true) {
      if (process.env.VUE_APP_GTM_ENABLED) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "GAEvent",
          eventCategory: "Click",
          eventAction: "Search",
          eventLabel: value,
        })

        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "microFunnel",
          clickCategory: "searchClick",
          keyword: value,
        })
      }

      this.searchCountries = value

      if (!value.length) {
        if (clearWhenValueEmpty) {
          if (this.filteredCountries.length) {
            this.filteredCountries = []
          }

          return
        }

        this.filteredCountries = this.countries

        return
      }

      this.filteredCountries = this.countries.filter(item => {
        let code = item.code || item
        return this.$t(`countries.${code}`)
          .toLocaleLowerCase("tr")
          .startsWith(value.toLocaleLowerCase("tr"))
      })
    }, 300),
  },
}
