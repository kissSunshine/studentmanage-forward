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
            <!-- 直接关闭更新卡片，更新标志就是false -->
            <el-button @click="changeDialogFormVisible(false)">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </el-card>
</template>

<script>
export default {
  name: 'StudentDialogUpdate',
  props: ['studentForm'],
  data(){
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
      updateFlag: false, // 判断是否进行了信息变更
      genderOptions: [], // 查询条件
      statusOptions: [],
      schoolOptions: [],
      // 校验学生信息
      updateRules: {
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
    updateStudent(){
      // 0、先判断是否页面信息是否更改过
      this.getUpdateFlag(this.studentForm,this.studentFormUpdate)
      // 没更改，直接阻断提示
      if(!this.updateFlag){
        this.$message({showClose: true, message: '未修改学生信息', type: 'error'})
        return false
      }
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
            id: this.studentFormUpdate.id,
            name: this.studentFormUpdate.name,
            nickname: this.studentFormUpdate.nickname,
            idcard: this.studentFormUpdate.idcard,
            gender: this.studentFormUpdate.gender,
            birthday: this.studentFormUpdate.birthday,
            phone: this.studentFormUpdate.phone,
            status: this.studentFormUpdate.status,
            schoolid: this.studentFormUpdate.schoolid,
            homeaddress: this.studentFormUpdate.homeaddress,
            updatedPerson: this.studentFormUpdate.updatedPerson
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
          // 5、关闭添加卡片，更新标志置为true
          this.changeDialogFormVisible(true);

        }).catch((error) => {
          this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
        })

      })
    },
    // 关闭添加学生对话框
    changeDialogFormVisible(updateFlag){
      this.$emit("changeDialogFormUpdate",updateFlag)
    },
    getUpdateFlag(oldForm,newForm){
      for(let key in oldForm){
        if(oldForm[key] != newForm[key]){
          this.updateFlag = true
          break
        }
      }
    }
  },
  watch: {
    studentForm: {
      handler(){
        this.studentFormUpdate.id = this.studentForm.id
        this.studentFormUpdate.name = this.studentForm.name
        this.studentFormUpdate.nickname = this.studentForm.nickname
        this.studentFormUpdate.idcard = this.studentForm.idcard
        this.studentFormUpdate.gender = this.studentForm.gender
        this.studentFormUpdate.birthday = this.studentForm.birthday
        this.studentFormUpdate.phone = this.studentForm.phone
        this.studentFormUpdate.status = this.studentForm.status
        this.studentFormUpdate.schoolid = this.studentForm.schoolid
        this.studentFormUpdate.homeaddress = this.studentForm.homeaddress
        this.studentFormUpdate.updatedPerson = this.studentForm.updatedPerson
      },
      immediate: true // 代表第一次就执行；不加则第一次进入修改信息页面带不出数据
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
