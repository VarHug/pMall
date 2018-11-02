// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// axios插件
import Axios from 'axios'

// ElementUi库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vuex状态管理
import store from './store'

// 基础样式
import '@/common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = Axios

Vue.filter('price', (value) => {
  return `¥${value}`
})

router.beforeEach((to, from, next) => {
  if (to.fullPath.substring(0, 1) !== '/') {
    next('/home')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
