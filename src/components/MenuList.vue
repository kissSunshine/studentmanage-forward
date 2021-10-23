<template>
  <div>
    <!-- 没有子菜单 -->
    <el-menu-item v-for="(item,index) in noChildren" :index="item.id" :key="item.id">
      <i :class="item.icon"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-submenu v-for="(item,index) in hasChildren" :index="item.id" :key="item.id">
      <!-- 父级 -->
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <!-- 子级 -->
      <MenuList :menuList="item.children"></MenuList>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuList',
  props: ['menuList'],
  computed: {
    noChildren () {
      return this.menuList.filter(item => !item.children)
    },
    hasChildren () {
      return this.menuList.filter(item => item.children)
    }
  }
}
</script>

<style>
</style>
