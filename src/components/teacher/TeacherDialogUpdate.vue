<template>
  <el-card>

    <div slot="header">
      <h3 style="text-align:center">修改信息</h3>
    </div>

    <el-form ref="formUpdate" :model="formUpdate" :rules="updateRules" label-width="80px">

      <!-- 行：1 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUpdate.name" autocomplete="off" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="formUpdate.nickname" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="formUpdate.idcard" placeholder="非必填"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：2 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="formUpdate.gender" clearable placeholder="请选择">
              <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="formUpdate.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="手机" prop="phone">
            <el-input v-model="formUpdate.phone" placeholder="11位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：3 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formUpdate.status" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="校区" prop="schoolid">
            <el-select v-model="formUpdate.schoolid" clearable placeholder="请选择">
              <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="部门" prop="department">
            <el-select v-model="formUpdate.department" clearable placeholder="请选择">
              <el-option v-for="item in departmentOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：4 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="职位" prop="position">
            <el-select v-model="formUpdate.position" clearable placeholder="请选择">
              <el-option v-for="item in positionOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="学科" prop="subject">
            <el-select v-model="formUpdate.subject" clearable placeholder="请选择">
              <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：5 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="家庭地址" prop="homeaddress">
            <el-input type="textarea" v-model="formUpdate.homeaddress" placeholder="500个字符以内"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 修改按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="updateOne">修 改</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <!-- 直接关闭更新卡片，更新标志就是false -->
            <el-button @click="closeDialogUpdate(false)">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </el-card>
</template>

<script>
import {getUpdateFlag} from '@/assets/js/toolUtil.js'

export default {
  name: 'DialogUpdate',
  props: ['oneUpdate'],
  data(){
    return {
      formUpdate: {
        id: '',
        name: '',
        nickname: '',
        idcard: '',
        gender: '',
        birthday: '',
        phone: '',
        status: '',
        schoolid: '',
        department: '',
        position: '',
        subject: '',
        homeaddress: '',
        updatedPerson: ''
      },
      passwordsecond: '', // 再次输入密码
      genderOptions: [],
      statusOptions: [],
      schoolOptions: [],
      departmentOptions: [],
      positionOptions: [],
      subjectOptions: [],

      // 校验教师信息
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
    // 添加教师
    updateOne(){
      // 0、先判断是否页面信息是否更改过，没更改则直接阻断提示
      if(!getUpdateFlag(this.oneUpdate,this.formUpdate)){
        this.$message({showClose: true, message: '未修改教师信息，不需要更新', type: 'error'})
        return false
      }
      // 1、校验
      this.$refs.formUpdate.validate((valid) => {
        // 校验失败，则阻断提示
        if (!valid) {
          this.$message({showClose: true, message: '请按照要求，重新输入!', type: 'error'})
          return false
        }
      })
      // 2、校验成功，发送ajax请求
      this.postRequest('/teacher/update',this.formUpdate).then( responsevo => {
        // 4、添加教师成功
        this.$message({showClose: true, message: responsevo.msg,type: 'success'})
        // 5、关闭添加卡片，更新标志置为true
        this.closeDialogUpdate(true);
      })
    },
    // 关闭添加教师对话框
    closeDialogUpdate(updateFlag){
      this.$emit("closeDialogUpdate",updateFlag)
    }
  },
  watch: {
    oneUpdate: {
      handler(){
        this.formUpdate.id = this.oneUpdate.id
        this.formUpdate.name = this.oneUpdate.name
        this.formUpdate.nickname = this.oneUpdate.nickname
        this.formUpdate.idcard = this.oneUpdate.idcard
        this.formUpdate.gender = this.oneUpdate.gender
        this.formUpdate.birthday = this.oneUpdate.birthday
        this.formUpdate.phone = this.oneUpdate.phone
        this.formUpdate.status = this.oneUpdate.status
        this.formUpdate.schoolid = this.oneUpdate.schoolid
        this.formUpdate.department = this.oneUpdate.department
        this.formUpdate.position = this.oneUpdate.position
        this.formUpdate.subject = this.oneUpdate.subject
        this.formUpdate.homeaddress = this.oneUpdate.homeaddress
        this.formUpdate.updatedPerson = this.oneUpdate.updatedPerson
      },
      immediate: true // 代表第一次就执行；不加则第一次进入修改信息页面带不出数据
    }
  },
  mounted(){
    this.genderOptions = this.$store.state.genderOptions
    this.statusOptions = this.$store.state.statusOptions
    this.schoolOptions = this.$store.state.schoolOptions
    this.departmentOptions = this.$store.state.departmentOptions
    this.positionOptions = this.$store.state.positionOptions
    this.subjectOptions = this.$store.state.subjectOptions
  }
}
</script>

<style scoped="scoped">
.el-card {
  margin-bottom: 30px;
}
</style>
