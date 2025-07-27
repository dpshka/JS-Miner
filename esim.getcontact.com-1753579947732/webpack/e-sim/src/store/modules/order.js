import OrderService from "@/services/order"

export default {
  namespaced: true,
  state: {
    orders: [],
    fetchTimeout: process.env.VUE_APP_FETCH_ORDER_DETAIL_INTERVAL_TIMEOUT,
    fetchRetryCount: process.env.VUE_APP_FETCH_ORDER_DETAIL_RETRY_COUNT,
  },
  getters: {
    getFetchTimeout: state =>
      state.fetchTimeout && state.fetchTimeout.length
        ? parseInt(state.fetchTimeout)
        : 1500,
    getFetchRetryCount: state =>
      state.fetchRetryCount && state.fetchRetryCount.length
        ? parseInt(state.fetchRetryCount)
        : 1,
  },
  actions: {
    async getOrders({ commit }) {
      let orders = await OrderService.getOrders()

      commit("setOrders", orders)

      return orders
    },
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    },
  },
}
