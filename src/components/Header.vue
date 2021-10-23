<template>
  <header>

    <div class="l-content">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <h3>首页</h3>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      userImg: require('../assets/img/profile/Winnie.jpg')
    }
  },
  methods: {
    handleMenu () {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style scoped="scoped">
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.l-content {
  display: flex;
  align-items: center;
}

.l-content > .el-button {
  margin-right: 20px;
}

.el-dropdown-link > .user {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding-top: 4px;
}
</style>
