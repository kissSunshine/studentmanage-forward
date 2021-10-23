<template>
  <div>
    <!-- 没有子菜单 -->
    <el-menu-item v-for="(item,index) in noChildren" :index="item.id" :key="item.id" :route="item.path">
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
      <el-menu-item v-for="(child,index) in item.children" :index="child.id" :key="child.id" :route="child.path">
        <i :class="child.icon"></i>
        <span slot="title">{{child.name}}</span>
      </el-menu-item>
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
