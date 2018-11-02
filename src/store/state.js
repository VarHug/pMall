import {getLog, getUser} from '../common/js/cache'

const state = {
  isLogin: getLog(), // 用户是否登录
  user: getUser(), // 用户基本信息
  cartList: [] // 购物车列表
}

export default state
