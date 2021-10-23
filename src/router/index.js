import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/Login.vue'
import Main from '@/components/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/studentManage',
          name: 'studentManage',
          component: () => import('@/components/student/studentManage.vue'),
        },
        {
          path: '/activityManage',
          name: 'activityManage',
          component: () => import('@/components/activity/activityManage.vue'),
        },
        {
          path: '/teacherManage',
          name: 'teacherManage',
          component: () => import('@/components/teacher/teacherManage.vue'),
        },
        {
          path: '/classManage',
          name: 'classManage',
          component: () => import('@/components/class/classManage.vue'),
        },
        {
          path: '/schoolManage',
          name: 'schoolManage',
          component: () => import('@/components/school/schoolManage.vue'),
        },
        {
          path: '/menuManage',
          name: 'menuManage',
          component: () => import('@/components/menu/menuManage.vue'),
        }
      ]
    }
  ]
})
