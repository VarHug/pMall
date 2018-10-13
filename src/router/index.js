import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Home from '../pages/home/home.vue'
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
        }
      ]
    }
  ]
})
