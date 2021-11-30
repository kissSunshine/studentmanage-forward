import Vue from 'vue'
import Vuex from 'vuex'
import { getRequest } from '@/assets/js/axiosUtil.js'

Vue.use(Vuex)
// 数据仓库
const state = {
    // 左侧菜单折叠
    isCollapse: false,
    // 下拉选项：性别
    genderOptions: [{ value: 0, label: '女' }, { value: 1, label: '男' }],
    // 下拉选项：人员状态
    statusOptions: [{ value: 0, label: '离校' }, { value: 1, label: '在校' }],
    // 下拉选项：活动状态
    activityStatusOptions: [{ value: 0, label: '未开始' }, { value: 1, label: '活动中' }, { value: 2, label: '已结束' }],
    // 下拉选项：校区
    schoolOptions: [],
    // 下拉选项：部门
    departmentOptions: [],
    // 下拉选项：职位
    positionOptions: [],
    // 下拉选项：学科
    subjectOptions: [],
    // 校区信息
    schoolList: [],
    // 当前日期，格式：yyyy-mm-dd
    currentDate: ''
}
// 接收组件中dispatch触发的方法，如：this.$store.dispatch('handlerAdd', value)
const actions = {

}
// 接收actions或组件中commit触发的方法，如：context.commit('HandlerAdd', value) ；this.$store.commit('HandlerAdd', 1)
const mutations = {
    // state：仓库 ； value：自定义参数
    // 1、左侧菜单折叠
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    // 2、获取下拉选项：校区
    getSchoolOptions(state) {
        // 已经有值，直接返回
        if (state.schoolOptions.length != 0) {
            return
        }
        // 没有值，请求后端
        getRequest('/school/queryAll', '').then(responsevo => {
            if (!responsevo) {
                return []
            }
            // 返回结果需要拼装
            const schoolList = responsevo.data
            for (let i = 0; i < schoolList.length; i++) {
                let school = {
                    value: '',
                    label: ''
                }
                school.value = schoolList[i].id
                school.label = schoolList[i].name
                state.schoolOptions.push(school)
            }
        })
    },
    // 3、获取下拉选项：部门
    getDepartmentOptions(state) {
        if (state.departmentOptions.length != 0) {
            return
        }
        getRequest('/enum/department', '').then(responsevo => {
            if (!responsevo) {
                return []
            }
            // 获取部门成功
            responsevo.data.forEach(one => {
                state.departmentOptions.push(one)
            });
        })
    },
    // 4、获取下拉选项：职位
    getPositionOptions(state) {
        if (state.positionOptions.length != 0) {
            return
        }
        getRequest('/enum/position', '').then(responsevo => {
            if (!responsevo) {
                return []
            }
            // 获取部门成功
            responsevo.data.forEach(one => {
                state.positionOptions.push(one)
            });
        })
    },
    // 5、获取下拉选项：学科
    getSubjectOptions(state) {
        if (state.subjectOptions.length != 0) {
            return
        }
        getRequest('/enum/subject', '').then(responsevo => {
            if (!responsevo) {
                return []
            }
            // 获取部门成功
            responsevo.data.forEach(one => {
                state.subjectOptions.push(one)
            });
        })
    },
    // 6、获取校区信息
    getSchoolList(state,queryFlag) {
        // 已经有值，直接返回
        if (!queryFlag && state.schoolList.length != 0) {
            return
        }
        
        // 没有值，请求后端
        getRequest('/school/queryAll', '').then(responsevo => {
            if (!responsevo) {
                return []
            }
            responsevo.data.forEach(one => {
                state.schoolList.push(one)
            });
        })
    },
    getCurrentDate(state){
        state.currentDate = new Date().toLocaleDateString().replace(new RegExp("/", "gm"), "-");
    }
}
// 导出，供main.js使用
export default new Vuex.Store({
    state,
    actions,
    mutations
})
