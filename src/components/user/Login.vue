// eslint-disable-next-line
<template>
  <!-- 登录卡片 -->
  <el-card class="box-card">
    <!-- 欢迎语 -->
    <div slot="header" class="clearfix">
      <span>请登录</span>
    </div>

    <!-- 登录信息 -->
    <div>
      <!-- 内容（表格） -->
      <el-form :model="loginForm" :rules="loginRules" ref="form">
        <el-form-item  prop="username">
          <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"/>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked">记住我</el-checkbox>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" style="width: 100%;" @click='submit'>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Login',
  data() {
  	return {
  		loginForm: {
  			username: '',
  			password: ''
  		},
  		checked: '',
      loginRules: {
  			username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  			password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  		}
  	}
  }
}
</script>
<style scoped="scoped">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
