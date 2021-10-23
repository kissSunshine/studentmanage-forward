import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 数据仓库
const state = {
  isCollapse: true
}
// 接收组件中dispatch触发的方法，如：this.$store.dispatch('handlerAdd', value)
const actions = {

}
// 接收actions或组件中commit触发的方法，如：context.commit('HandlerAdd', value) ；this.$store.commit('HandlerAdd', 1)
const mutations = {
  // state：仓库 ； value：自定义参数
  collapseMenu(state) {
    state.isCollapse = !state.isCollapse
  }
}
// 导出，供main.js使用
export default new Vuex.Store({
  state,
  actions,
  mutations
})
