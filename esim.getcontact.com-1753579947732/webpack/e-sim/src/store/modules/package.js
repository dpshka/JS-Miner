import PackageService from "@/services/package"

export default {
  namespaced: true,
  state: {
    countries: [],
    packages: {},
    packageTabs: {},
  },
  actions: {
    async getCountries({ commit, state }) {
      if (state.countries.length) {
        return { countries: state.countries }
      }

      let countriesResponse = await PackageService.getCountries()
      if (countriesResponse && Object.keys(countriesResponse).length) {
        commit("setCountries", countriesResponse.countries)
      }

      return countriesResponse
    },
    async getCountryPackages({ commit, state }, countryCode) {
      if (state.packages[countryCode] && state.packageTabs[countryCode]) {
        return {
          packages: state.packages[countryCode],
          packageTabs: state.packageTabs[countryCode],
        }
      }

      const { packages, packageTabs } = await PackageService.getCountryPackages(
        countryCode
      )

      commit("setCountryPackages", { countryCode, packages, packageTabs })

      return { packages, packageTabs }
    },
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries
    },
    setCountryPackages(state, { countryCode, packages, packageTabs }) {
      state.packages[countryCode] = packages

      state.packageTabs[countryCode] = packageTabs
    },
  },
}
