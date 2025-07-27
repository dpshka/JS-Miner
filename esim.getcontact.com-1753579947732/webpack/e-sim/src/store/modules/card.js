import CardService from "@/services/card"

export default {
  namespaced: true,
  state: {
    cards: [],
  },
  actions: {
    async getCards({ commit, state }) {
      if (state.cards.length) {
        return state.cards
      }

      const cards = await CardService.getCards()

      commit("setCards", cards)

      return cards
    },
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards
    },
    addCard(state, card) {
      state.cards.push(card)
    },
    removeCard(state, token) {
      state.cards = state.cards.filter(card => card.token !== token)
    },
  },
}
