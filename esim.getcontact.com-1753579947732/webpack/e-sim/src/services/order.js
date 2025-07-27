import axios from "@/plugins/axios"

const getOrders = async () => {
  try {
    let {
      result: { orders },
    } = (await axios.get("/orders")).data

    return orders
  } catch (error) {
    console.error(error)

    return []
  }
}

const getOrder = async orderId => {
  try {
    let {
      result: { order },
    } = (await axios.get(`/orders/${orderId}`)).data

    return order
  } catch (error) {
    const response = error.response

    if (response && [400, 404].includes(response.status)) {
      throw { meta: response.data.meta, httpStatus: response.status }
    }

    throw { message: "An error occurred. Please try again." }
  }
}

const getOrderInfo = async orderId => {
  try {
    let {
      result: { order },
    } = (await axios.get(`/orders/${orderId}/info`)).data

    return order
  } catch (error) {
    const response = error.response

    if (response && response.status === 400) {
      throw { meta: response.data.meta }
    }

    throw { message: "An error occurred. Please try again." }
  }
}

export default {
  getOrders,
  getOrder,
  getOrderInfo,
}
