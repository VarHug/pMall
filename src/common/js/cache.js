import storage from 'good-storage'

const CART_LIST_KEY = '__cartList__'

// 将商品存入cartList
export function saveGood(goodInfo) {
  let cartList = storage.get(CART_LIST_KEY, [])
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

export function loadCartList() {
  return storage.get(CART_LIST_KEY, [])
}
