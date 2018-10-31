import * as types from './mutation-types'
import {saveGood, removeGood} from '../common/js/cache'

export const saveCartList = function ({commit}, good) {
  commit(types.SET_CART_LIST, saveGood(good))
}

export const removeCartList = function ({commit}, productId) {
  commit(types.SET_CART_LIST, removeGood(productId))
}
