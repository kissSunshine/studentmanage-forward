import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.use(Vuex)

router.beforeEach((to,from,next) => {
  let user = sessionStorage.getItem('USER')
  // 没登录，跳转登录页
  if(user == null){
    next(path: '/login')
  }
  // 主动登出，清除信息，跳转登录页
  if(to.path == '/logout'){
    sessionStorage.clear()
    next(path: '/login')
  }
  // 其余路径，正常跳转
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
