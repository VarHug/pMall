import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Home from '../pages/home/home.vue'
import Goods from '../pages/goods/goods.vue'
import Login from '../pages/login/login.vue'
import Cart from '../pages/cart/cart.vue'
import Checkout from '../pages/checkout/checkout.vue'
import GoodsDetail from '../components/goods-detail/goods-detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/goodsDetail',
          name: 'goodsDetail',
          component: GoodsDetail
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/checkout',
      component: Checkout
    }
  ]
})
