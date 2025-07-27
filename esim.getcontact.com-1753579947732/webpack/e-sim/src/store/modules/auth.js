import AuthService from "../../services/auth"

const user = AuthService.getUser()
const loggedInWithGtcToken =
  localStorage.getItem("loggedInWithGtcToken") === "true"

const initialState = user
  ? {
      loggedInWithGtcToken,
      loggedIn: true,
      user,
    }
  : {
      loggedInWithGtcToken,
      loggedIn: false,
      user: null,
    }

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getCanLogout: state => {
      if (state.loggedInWithGtcToken) {
        const standalone = window.navigator.standalone,
          userAgent = window.navigator.userAgent.toLowerCase(),
          safari = /safari/.test(userAgent),
          ios = /iphone|ipod|ipad/.test(userAgent)

        if (ios) {
          //ios uiwebview
          if (!standalone && !safari) {
            return false
          }

          //android uiwebview
        } else if (window.Android) {
          return false
        }

        return false
      }

      return true
    },
  },
  actions: {
    async logout({ commit }) {
      const isLoggedOut = await AuthService.logout()
      localStorage.removeItem("intendedUrl")

      if (isLoggedOut) {
        commit("logout")

        return true
      }

      return false
    },
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    login(state, user = false) {
      state.loggedIn = true
      state.user = user
    },
    logout(state) {
      state.loggedIn = false
      state.user = null
    },
    loggedInWithGtcToken(state, value) {
      state.loggedInWithGtcToken = value
    },
  },
}
