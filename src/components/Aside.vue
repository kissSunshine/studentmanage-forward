<template>
  <el-menu default-active="" class="">

    <h3 style="margin-left: 30px;margin-right: 40px;">大熊数学</h3>
    <!-- 没有子菜单 -->
    <el-menu-item v-for="item in noChildren" :index="item.id" :key="item.id">
      <i :class="item.icon"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-submenu v-for="item in hasChildren" :index="item.id" :key="item.id">
      <!-- 父级 -->
      <template slot="title">
        <i class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <!-- 子级 -->
      <Aside :menuList="this.menuList"></aside>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: 'Aside',
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
