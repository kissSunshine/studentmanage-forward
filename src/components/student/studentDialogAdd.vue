<template>
  <el-card>

    <div slot="header">
      <h3 style="text-align:center">添加新生</h3>
    </div>

    <el-form ref="studentFormAdd" :model="studentFormAdd" :rules="addRules" label-width="80px">

      <!-- 行：1 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="studentFormAdd.name" autocomplete="off" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="studentFormAdd.nickname" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="studentFormAdd.idcard" placeholder="非必填"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：2 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="studentFormAdd.gender" clearable placeholder="请选择">
              <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="studentFormAdd.birthday" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="手机" prop="phone">
            <el-input v-model="studentFormAdd.phone" placeholder="11位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：3 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select v-model="studentFormAdd.status" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="校区" prop="schoolid">
            <el-select v-model="studentFormAdd.schoolid" clearable placeholder="请选择">
              <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：4 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="studentFormAdd.password" autocomplete="off" placeholder="6到20个字符"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="再次输入" prop="passwordsecond">
            <el-input type="password" v-model="studentFormAdd.passwordsecond" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：5 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="家庭地址" prop="homeaddress">
            <el-input type="textarea" v-model="studentFormAdd.homeaddress" placeholder="500个字符以内"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="addStudent">添 加</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <!-- 直接关闭新增卡片，新增标志就是false -->
            <el-button @click="changeDialogFormVisible(false)">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </el-card>
</template>

<script>
export default {
  name: 'StudentDialogAdd',
  props: ['dialogFormVisible'],
  data(){
    return {
      studentFormAdd: {
        name: '',
        nickname: '',
        idcard: '',
        gender: 1,
        birthday: '',
        phone: '',
        status: 1,
        schoolid: '',
        password: '',
        homeaddress: ''
      },
      passwordsecond: '', // 再次输入密码
      genderOptions: [], // 查询条件
      statusOptions: [],
      schoolOptions: [],
      // 校验添加的学生信息
      addRules: {
        name: this.formRules.name,
      	nickname: this.formRules.nickname,
        idcard: this.formRules.idcard,
        gender: this.formRules.gender,
        birthday: this.formRules.birthday,
        phone: this.formRules.phone,
        status: this.formRules.status,
        schoolid: this.formRules.schoolid,
      	password: this.formRules.password,
        passwordsecond: this.formRules.passwordsecond,
        homeaddress: this.formRules.homeaddress
      }
    }
  },
  methods: {
    // 添加学生
    addStudent(){
      // 1、校验
      this.$refs.studentFormAdd.validate((valid) => {
        // 校验失败，则阻断提示
        if (!valid) {
          this.$message({showClose: true, message: '请按照要求，重新输入!', type: 'error'})
          return false
        }

        // 2、校验成功，发送ajax请求
        this.axios({
          method: 'post',
          url: 'http://localhost:8090/student/add',
          data: {
            name: this.studentFormAdd.name,
            nickname: this.studentFormAdd.nickname,
            idcard: this.studentFormAdd.idcard,
            gender: this.studentFormAdd.gender,
            birthday: this.studentFormAdd.birthday,
            phone: this.studentFormAdd.phone,
            status: this.studentFormAdd.status,
            schoolid: this.studentFormAdd.schoolid,
            password: this.studentFormAdd.password,
            homeaddress: this.studentFormAdd.homeaddress,
            updatedPerson: "Tea666" // 待调整
          }
        }).then((res) => {
          const data = res.data
           // 3、添加学生失败
          if(data.status !== 1) {
            this.$message({showClose: true, message: data.msg,type: 'error'})
            return false
          }

          // 4、添加学生成功
          this.$message({showClose: true, message: data.msg,type: 'success'})
          this.changeDialogFormVisible(true);

        }).catch((error) => {
         this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
        })

      })
    },
    // 关闭添加学生对话框
    changeDialogFormVisible(addFlag){
      this.$emit("changeDialogFormAdd",addFlag)
    }
  },
  mounted() {
    this.schoolOptions = this.$store.state.schoolOptions
    this.genderOptions = this.$store.state.genderOptions
    this.statusOptions = this.$store.state.statusOptions
  }
}
</script>

<style scoped="scoped">
.el-card {
  margin-bottom: 30px;
}
</style>
