<template>
  <el-card>

    <div slot="header">
      <h3 style="text-align:center">修改信息</h3>
    </div>

    <el-form ref="studentFormUpdate" :model="studentFormUpdate" :rules="updateRules" label-width="80px">

      <!-- 行：1 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="studentFormUpdate.name" autocomplete="off" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="studentFormUpdate.nickname" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="studentFormUpdate.idcard" placeholder="非必填"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：2 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="studentFormUpdate.gender" clearable placeholder="请选择">
              <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="studentFormUpdate.birthday" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="手机" prop="phone">
            <el-input v-model="studentFormUpdate.phone" placeholder="11位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：3 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select v-model="studentFormUpdate.status" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="校区" prop="schoolid">
            <el-select v-model="studentFormUpdate.schoolid" clearable placeholder="请选择">
              <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：4 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="家庭地址" prop="homeaddress">
            <el-input type="textarea" v-model="studentFormUpdate.homeaddress" placeholder="500个字符以内"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 修改按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="updateStudent">修 改</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <el-button @click="changeDialogFormVisible">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </el-card>
</template>

<script>
export default {
  name: 'StudentDialogUpdate',
  props: ['genderOptions','statusOptions','schoolOptions','studentForm'],
  data(){
    // 自定义校验规则
    var genderRule = (rule, value, callback) => {
      if(value != "0" && value != "1"){
        callback(new Error('请正确的选择性别'))
      }
      callback()
    };
    var phoneRule = (rule, value, callback) => {
      var reg = /^\d{11}$/g
      if(!reg.test(value)){
        callback(new Error('请输入11位数字'))
      }
      callback()
    };
    var statusRule = (rule, value, callback) => {
      if(value != "0" && value != "1"){
        callback(new Error('请正确的选择状态'))
      }
      callback()
    };
    return {
      studentFormUpdate: {
        id: '',
        name: '',
        nickname: '',
        idcard: '',
        gender: '',
        birthday: '',
        phone: '',
        status: '',
        schoolid: '',
        homeaddress: ''
      },
      passwordsecond: '', // 再次输入密码

      // 校验学生信息
      updateRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 20, message: '姓名在20个字符以内', trigger: 'blur' }
        ],
      	nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 20, message: '昵称在20个字符以内', trigger: 'blur' }
        ],
        idcard: [{ min: 18, max: 18, message: '身份证号码必须18位', trigger: 'blur' }],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' },
          { validator: genderRule, trigger: 'change' }, // 自定义规则
        ],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        phone: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { validator: phoneRule, trigger: 'blur' }],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' },
          { validator: statusRule, trigger: 'change' }, // 自定义规则
        ],
        schoolid: [{ required: true, message: '请选择校区', trigger: 'change' }],
      	password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码在6到20个字符范围内', trigger: 'blur' },
        ],
        passwordsecond: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
        homeaddress: [{ min: 0, max: 500, message: '家庭住址在500个字符以内', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 添加学生
    updateStudent(){
      console.log(this.studentForm.name)
      // 1、校验
      this.$refs.studentFormUpdate.validate((valid) => {
        // 校验失败，则阻断提示
        if (!valid) {
          this.$message({showClose: true, message: '请按照要求，重新输入!', type: 'error'})
          return false
        }

        // 2、校验成功，发送ajax请求
        this.axios({
          method: 'post',
          url: 'http://localhost:8090/student/update',
          data: {
            name: this.studentFormUpdate.name,
            nickname: this.studentFormUpdate.nickname,
            idcard: this.studentFormUpdate.idcard,
            gender: this.studentFormUpdate.gender,
            birthday: this.studentFormUpdate.birthday,
            phone: this.studentFormUpdate.phone,
            status: this.studentFormUpdate.status,
            schoolid: this.studentFormUpdate.schoolid,
            password: this.studentFormUpdate.password,
            homeaddress: this.studentFormUpdate.homeaddress,
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
          this.changeDialogFormVisible();

        }).catch((error) => {
          this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
        })

      })
    },
    // 关闭添加学生对话框
    changeDialogFormVisible(){
      this.$emit("changeDialogFormUpdate")
    }
  },
  watch: {
    studentForm(){
      this.studentFormUpdate = this.studentForm
    }
  }
}
</script>

<style scoped="scoped">
.el-card {
  margin-bottom: 30px;
}
</style>
