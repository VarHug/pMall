// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// ElementUi库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 基础样式
import '@/common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
