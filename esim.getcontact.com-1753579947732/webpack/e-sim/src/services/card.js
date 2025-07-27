import axios from "@/plugins/axios"

const getCards = async () => {
  try {
    let {
      result: { cards },
    } = (await axios.get("/saved-cards")).data

    return cards
  } catch (e) {
    console.error(e)

    return []
  }
}

const saveCard = async ({
  cardNumber,
  cardOwner,
  cardMonth,
  cardYear,
  cardSecurityCode,
}) => {
  let formData = new FormData()
  formData.append("cardNumber", cardNumber)
  formData.append("cardOwner", cardOwner)
  formData.append("cardMonth", cardMonth)
  formData.append("cardYear", cardYear)
  formData.append("cardSecurityCode", cardSecurityCode)

  return axios.post("/saved-cards", formData)
}

const deleteCard = token => {
  return axios.delete(`/saved-cards/${token}`)
}

export default {
  getCards,
  saveCard,
  deleteCard,
}
