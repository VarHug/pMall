import {loadCartList} from '../common/js/cache'

const state = {
  isLogin: false, // 用户是否登录
  cartList: loadCartList() // 购物车列表
}

export default state
