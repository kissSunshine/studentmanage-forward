<template>
  <el-container style="height: 100%;">
    <!-- 左侧导航 -->
    <el-aside width="200px">
      <el-menu background-color="#2a2a2a" style="height: 100%;" :unique-opened="true" :collapse="isCollapse" text-color="#fff" :router="true">
        <h3 style="margin-left: 30px;color: #fff;" v-show="!isCollapse">学生管理系统</h3>
        <h3 style="margin-left: 30px;margin-right: 40px;" v-show="isCollapse"></h3>
        <MenuList :menuList="this.menuList"></MenuList>
      </el-menu>
    </el-aside>
    <!-- 右侧内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header></Header>
      </el-header>
      <!-- 主体展示 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import MenuList from './MenuList.vue'
import Header from './Header.vue'

export default {
  name: 'Main',
  components: {
    MenuList,
    Header
  },
  data() {
    return {
      menuList: [
        {
          id: 'Men1',
          name: '学生管理',
          parentId: 'Men0',
          path: '/studentManage',
          icon: 'el-icon-user-solid'
        },
        {
          id: 'Men2',
          name: '活动管理',
          parentId: 'Men0',
          path: '/activityManage',
          icon: 'el-icon-user-solid'
        },
        {
          id: 'Men3',
          name: '教师管理',
          parentId: 'Men0',
          path: '/teacherManage',
          icon: 'el-icon-user-solid'
        },
        {
          id: 'Men4',
          name: '班级管理',
          parentId: 'Men0',
          path: '/classManage',
          icon: 'el-icon-user-solid'
        },
        {
          id: 'Men5',
          name: '校区管理',
          parentId: 'Men0',
          path: '/schoolManage',
          icon: 'el-icon-user-solid'
        },
        {
          id: 'Men6',
          name: '菜单管理',
          parentId: 'Men0',
          path: '/menuManage',
          icon: 'el-icon-user-solid'
        }
      ]
    }
  },
  computed: {
    isCollapse(){
      return this.$store.state.isCollapse
    }
  },
  mounted(){
    // 请求校区信息、校区下拉、部门下拉、职位下拉、学科下拉存放于vuex
    this.$store.commit('getSchoolList',false)
    this.$store.commit('getSchoolOptions')
    this.$store.commit('getDepartmentOptions')
    this.$store.commit('getPositionOptions')
    this.$store.commit('getSubjectOptions')
    this.$store.commit('getCurrentDate') //当前日期
  }
}

</script>

<style scoped="scoped">
.el-header {
  background-color: #2a2a2a;
}

</style>
