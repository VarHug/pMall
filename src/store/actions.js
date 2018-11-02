import * as types from './mutation-types'
import axios from 'axios'

import {ERR_OK} from '../api/config'
import {saveGood, removeGood, setLog, setUser} from '../common/js/cache'

export const saveCartList = function ({commit, state}, goodInfo) {
  if (state.isLogin) {
    // 登录，则将商品数据存入购物车
    let uid = state.user.uid || ''
    goodInfo = JSON.stringify(goodInfo)
    let param = {
      uid,
      goodInfo
    }
    axios.get('/api/user/setCartList', {
      params: param
    }).then(res => {
      if (res.data.status === ERR_OK) {
        let cartList = res.data.result.cartList
        commit(types.SET_CART_LIST, cartList)
      }
    })
  } else {
    commit(types.SET_CART_LIST, saveGood(goodInfo))
  }
}

export const removeCartList = function ({commit, state}, productId) {
  if (state.isLogin) {
    let uid = state.user.uid || ''
    let param = {
      uid,
      productId
    }
    axios.get('/api/user/removeCartList', {
      params: param
    }).then(res => {
      if (res.data.status === ERR_OK) {
        let cartList = res.data.result.cartList
        commit(types.SET_CART_LIST, cartList)
      }
    })
  } else {
    commit(types.SET_CART_LIST, removeGood(productId))
  }
}

export const initCartList = function ({commit}, list) {
  commit(types.SET_CART_LIST, list)
}

export const setLogState = function ({commit}, state) {
  commit(types.SET_IS_LOGIN, setLog(state))
}

export const setUserInfo = function ({commit}, user) {
  commit(types.SET_USER, setUser(user))
}
