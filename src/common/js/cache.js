import storage from 'good-storage'

const CART_LIST_KEY = '__cartList__'
const LOGIN_KEY = '__login__'
const USER_KEY = '__user__'

// 将商品存入cartList
export function saveGood(goodInfo) {
  let cartList = []
  cartList = storage.get(CART_LIST_KEY, [])
  let flag = false
  cartList.forEach(good => {
    if (good.pid === goodInfo.pid) {
      good.num += goodInfo.num
      flag = true
    }
  })
  if (!flag) {
    cartList.push(goodInfo)
  }
  storage.set(CART_LIST_KEY, cartList)
  return cartList
}

// 将商品移出cartList
export function removeGood(productId) {
  let cartList = storage.get(CART_LIST_KEY, [])
  let index = cartList.findIndex((good) => {
    return good.pid === productId
  })
  if (index > -1) {
    cartList.splice(index, 1)
  }
  storage.set(CART_LIST_KEY, cartList)
  return cartList
}

// 获取购物车列表
export function loadCartList() {
  return storage.get(CART_LIST_KEY, [])
}

// 记录登录与登出状态
export function setLog(state) {
  storage.set(LOGIN_KEY, state)
  return state
}

// 获取登录与登出状态
export function getLog() {
  return storage.get(LOGIN_KEY, false)
}

// 设置用户基本信息
export function setUser(userInfo) {
  storage.set(USER_KEY, userInfo)
  return userInfo
}

// 获取用户基本信息
export function getUser() {
  return storage.get(USER_KEY, {})
}
