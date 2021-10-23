<template>
  <el-container style="height: 100%;">
    <!-- 左侧导航 -->
    <el-aside width="200px">
      <Aside style="height: 100%;" :menuList="this.menuList"></Aside>
    </el-aside>
    <!-- 右侧内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header></Header>
      </el-header>
      <!-- 主体展示 -->
      <el-main>
        Main
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import Aside from './Aside.vue'
import Header from './Header.vue'

export default {
  name: 'Main',
  components: {
    Aside,
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
          icon: 'el-icon-user-solid',
          children: [
            {
              id: 'Men21',
              name: '增加',
              parentId: 'Men2',
              path: '/add',
              icon: 'el-icon-user-solid'
            },
            {
              id: 'Men22',
              name: '删除',
              parentId: 'Men2',
              path: '/delete',
              icon: 'el-icon-user-solid'
            },
            {
              id: 'Men23',
              name: '修改',
              parentId: 'Men2',
              path: '/update',
              icon: 'el-icon-user-solid'
            }
          ]
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
          icon: 'el-icon-user-solid',
          children: [
            {
              id: 'Men61',
              name: '增加',
              parentId: 'Men6',
              path: '/add',
              icon: 'el-icon-user-solid'
            },
            {
              id: 'Men62',
              name: '删除',
              parentId: 'Men6',
              path: '/delete',
              icon: 'el-icon-user-solid'
            },
            {
              id: 'Men63',
              name: '修改',
              parentId: 'Men6',
              path: '/update',
              icon: 'el-icon-user-solid'
            }
          ]
        }
      ]
    }
  }
}

</script>

<style>
</style>
