/**
 * 将商品存入购物车中
 * @export
 * @param {Array} cartlist
 * @param {Object} goodInfo
 */
export function saveGood(cartList, goodInfo) {
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
  return cartList
}
