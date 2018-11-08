import {getLog, getUser} from '../common/js/cache'

const state = {
  isLogin: getLog(), // 用户是否登录
  user: getUser(), // 用户基本信息
  cartList: [], // 购物车列表,
  checkedList: [] // 选中（购买）的商品列表
}

export default state
