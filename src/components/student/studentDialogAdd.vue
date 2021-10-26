<template>
  <el-dialog title="添加学生" :visible.sync="dialogFormVisible" width="80%" center :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
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
            <el-button @click="changeDialogFormVisible">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </el-dialog>
</template>

<script>
export default {
  name: 'StudentDialogAdd',
  props: ['dialogFormVisible','genderOptions','statusOptions','schoolOptions'],
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
      studentFormAdd: {
        name: '',
        nickname: '',
        idcard: '',
        gender: '1',
        birthday: '',
        phone: '',
        status: '1',
        schoolid: '',
        password: '',
        homeaddress: ''
      },
      passwordsecond: '', // 再次输入密码

      // 校验添加的学生信息
      addRules: {
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
          this.changeDialogFormVisible();

        }).catch((error) => {
          const data = error.data
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        })

      })
    },
    // 关闭添加学生对话框
    changeDialogFormVisible(){
      this.$emit("changeDialogFormVisible")
    }
  }
}
</script>

<style>
.el-dialog {
  background-color: #d6d6d6;
}
</style>
