import axios from "@/plugins/axios"

const loginInit = async () => {
  let { result } = (await axios.get(`/auth/login-init`)).data

  return result
}

const login = async ({ type, token, state, name }) => {
  try {
    let formData = new FormData()
    formData.append("type", type)
    formData.append("token", token)

    if (state) {
      formData.append("state", state)
    }

    if (name) {
      formData.append("fullName", name)
    }

    let {
      result: { user },
    } = (await axios.post(`/auth/login`, formData)).data

    setUser(user)

    return { user, loggedIn: true }
  } catch (e) {
    throw e.response.data
  }
}

const loginByVerifykit = async (hash, sessionId) => {
  let formData = new FormData()
  formData.append("hash", hash)
  formData.append("sessionId", sessionId)

  try {
    let {
      result: { user },
    } = (await axios.post(`/auth/login-verifykit`, formData)).data

    setUser(user)

    return { user, loggedIn: true }
  } catch (e) {
    throw e.response
  }
}

const loginByGtcToken = async token => {
  try {
    // await logout()

    let {
      result: { user },
    } = (await axios.post(`/auth/login-gtctoken/${token}`, new FormData())).data

    localStorage.setItem("loggedInWithGtcToken", "true")

    setUser(user)

    return { user, loggedIn: true, loggedInWithGtcToken: true }
  } catch (e) {
    let responseData = { message: "An error occurred. Please try again." }

    if (e.response) {
      let data = e.response.data

      if (data.meta) {
        responseData = { message: data.meta.errorCode }
      }
    }

    throw responseData
  }
}

const getProfile = async () => {
  try {
    let {
      result: { user },
    } = (await axios.get(`/auth/profile`)).data

    setUser(user)

    return user
  } catch (e) {
    throw e.response
  }
}

const updateProfile = async (name, surname, email, gender, country) => {
  try {
    let {
      result: { user },
    } = (
      await axios.patch(`/auth/profile`, {
        name,
        surname,
        email,
        gender,
        country,
      })
    ).data

    setUser(user)

    return user
  } catch (e) {
    const response = e.response
    if (response && response.data.meta) {
      const meta = response.data.meta
      throw { errorCode: meta.errorCode }
    }

    throw { message: "An error occurred. Please try again." }
  }
}

const logout = async () => {
  try {
    await axios.post(`/auth/logout`)

    removeUser()

    return true
  } catch (e) {
    return false
  }
}

const setUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user))
}

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("authUser"))
  } catch (e) {
    return null
  }
}

const removeUser = () => {
  localStorage.removeItem("authUser")

  localStorage.removeItem("loggedInWithGtcToken")
}

const checkValidUserData = user => {
  return user.name.length && user.surname.length && user.email.length
}

export default {
  loginInit,
  login,
  loginByVerifykit,
  loginByGtcToken,
  getProfile,
  updateProfile,
  logout,
  getUser,
  removeUser,
  checkValidUserData,
}
