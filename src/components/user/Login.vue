// eslint-disable-next-line
 /* eslint-disable */
<template>
  <!-- 登录卡片 -->
  <el-card class="box-card">
    <!-- 欢迎语 -->
    <div slot="header" class="clearfix">
      <h2 align="center">请登录</h2>
    </div>

    <!-- 登录信息 -->
    <div>
      <!-- 内容（表格） -->
      <!-- loginRules：校验规则；form：表单名 -->
      <el-form :model="loginForm" :rules="loginRules" ref="form">
        <el-form-item  prop="nickname"> <!-- 【prop】校验规则对应字段 -->
          <el-input type="text" auto-complete="false" v-model="loginForm.nickname" placeholder="请输入用户名"/>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked">记住我</el-checkbox>
          <el-switch v-model="loginForm.userType" active-color="#13ce66" active-value="Stu" active-text="学生" inactive-color="#5555ff" inactive-value="Tea" inactive-text="教师">
          </el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click='login'>登录</el-button>
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
  			nickname: '', // 昵称
  			password: '', // 密码
        userType: 'Tea' // 用户类型
  		},
  		checked: '', // 记住密码
      loginRules: {
  			nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '昵称在20个字符以内', trigger: 'blur' }
        ],
  			password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  		}
  	}
  },
  methods: {
    login() {
      // 1、校验
      // 调用表单【form】的校验回调函数
      // 【form】与【el-form】的【ref】值相同
      this.$refs.form.validate((valid) => {
        // 校验失败，则阻断提示
        if (!valid) {
          this.$message({showClose: true, message: '请按照要求，重新输入!', type: 'error'})
          return false
        }
        // 2、校验成功，发送ajax请求
        this.axios({
          method: 'post',
          url: 'http://localhost:8090/user/login',
          data: {
            nickname: this.loginForm.nickname,
            password: this.loginForm.password,
            userType: this.loginForm.userType
          }
        }).then((res) => {
          const data = res.data
          //登录失败
          if(data.status !== 1) {
            this.$message({showClose: true, message: data.msg,type: 'error'})
            return false
          }

          // 登录成功
          sessionStorage.setItem('USER', data.data) // 保存学生对象
          this.$router.push("/main") // 跳转页面
          
        }).catch((error) => {
          const data = error.data
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        })
      })
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
  margin-top: 10%;/* 上边距 */
  margin-left: 35%;/* 左边距 */
  border-radius: 30px;/* 圆角 */
  width: 450px;/* 大小 */
}
</style>
