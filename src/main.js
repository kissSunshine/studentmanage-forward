import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index.js'
import './assets/css/global.css'

// 每个页面引入表单规则太麻烦，使用组件形式
import { formRules } from '@/assets/js/formRules.js'
Vue.prototype.formRules = formRules

// 组件形式使用axiosUtils
import { postRequest, getRequest } from '@/assets/js/axiosUtil.js'
Vue.prototype.postRequest = postRequest
Vue.prototype.getRequest = getRequest

// 组件形式使用下载请求
import { downloadRequest } from './assets/js/download'
Vue.prototype.downloadRequest = downloadRequest

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.use(Vuex)

router.beforeEach((to,from,next) => {
  let user = sessionStorage.getItem('USER')
  // 没登录，跳转登录页
  if(user == null && to.path != '/'){
    next('/')
  }
  // 主动登出，清除信息，跳转登录页
  if(to.path == '/logout'){
    sessionStorage.clear()
    next('/login')
  }
  // 其余路径，正常跳转
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
