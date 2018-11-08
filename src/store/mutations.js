import * as types from './mutation-types'

const mutations = {
  [types.SET_CART_LIST](state, list) {
    state.cartList = list
  },
  [types.SET_IS_LOGIN](state, isLogin) {
    state.isLogin = isLogin
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_CHECKED_LIST](state, list) {
    state.checkedList = list
  }
}

export default mutations
