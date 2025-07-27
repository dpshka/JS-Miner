import axios from "@/plugins/axios"

const getCountries = async () => {
  try {
    let {
      result: { countries, banner },
    } = (await axios.get("/countries")).data

    return { countries, banner }
  } catch (error) {
    console.error(error)

    return []
  }
}

const getCountryPackages = async countryCode => {
  try {
    let {
      result: { packages, packageTabs },
    } = (await axios.get(`/countries/${countryCode}/packages`)).data

    return { packages, packageTabs }
  } catch (error) {
    return []
  }
}

export default { getCountries, getCountryPackages }
