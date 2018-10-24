import * as types from './mutation-types'

const mutations = {
  [types.SET_CART_LIST](state, goodsInfo) {

  },
  [types.SET_IS_LOGIN](state, isLogin) {
    state.isLogin = isLogin
  }
}

export default mutations
