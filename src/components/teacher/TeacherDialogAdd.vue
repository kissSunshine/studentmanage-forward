<template>
  <el-card>

    <div slot="header">
      <h3 style="text-align:center">添加教师</h3>
    </div>

    <el-form ref="formAdd" :model="formAdd" :rules="addRules" label-width="80px">

      <!-- 行：1 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formAdd.name" autocomplete="off" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="formAdd.nickname" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="formAdd.idcard" placeholder="非必填"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：2 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="formAdd.gender" clearable placeholder="请选择">
              <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="formAdd.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="手机" prop="phone">
            <el-input v-model="formAdd.phone" placeholder="11位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：3 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formAdd.status" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="校区" prop="schoolid">
            <el-select v-model="formAdd.schoolid" clearable placeholder="请选择">
              <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="部门" prop="department">
            <el-select v-model="formAdd.department" clearable placeholder="请选择">
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
            <el-select v-model="formAdd.position" clearable placeholder="请选择">
              <el-option v-for="item in positionOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="学科" prop="subject">
            <el-select v-model="formAdd.subject" clearable placeholder="请选择">
              <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：5 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formAdd.password" autocomplete="off" placeholder="6到20个字符"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="再次输入" prop="passwordsecond">
            <el-input type="password" v-model="formAdd.passwordsecond" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：6 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="家庭地址" prop="homeaddress">
            <el-input type="textarea" v-model="formAdd.homeaddress" placeholder="500个字符以内"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="addOne">添 加</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <!-- 直接关闭新增卡片，新增标志就是false -->
            <el-button @click="closeDialogAdd(false)">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </el-card>
</template>

<script>
export default {
  name: 'DialogAdd',
  props: ['genderOptions','statusOptions','schoolOptions','departmentOptions','positionOptions','subjectOptions'],
  data(){
    return {
      formAdd: {
        name: '',
        nickname: '',
        idcard: '',
        gender: 1,
        birthday: '',
        phone: '',
        status: 1,
        schoolid: '',
        department: '',
        position: '',
        subject: '',
        password: '',
        homeaddress: ''
      },
      passwordsecond: '', // 再次输入密码

      // 校验添加的教师信息
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
    // 添加教师
    addOne(){
      // 1、校验
      this.$refs.formAdd.validate((valid) => {
        // 校验失败，则阻断提示
        if (!valid) {
          this.$message({showClose: true, message: '请按照要求，重新输入!', type: 'error'})
          return false
        }
      })

      // 2、校验成功，发送ajax请求
      this.axios({
        method: 'post',
        url: 'http://localhost:8090/teacher/add',
        data: {
          name: this.formAdd.name,
          nickname: this.formAdd.nickname,
          idcard: this.formAdd.idcard,
          gender: this.formAdd.gender,
          birthday: this.formAdd.birthday,
          phone: this.formAdd.phone,
          status: this.formAdd.status,
          schoolid: this.formAdd.schoolid,
          department: this.formAdd.department,
          position: this.formAdd.position,
          subject: this.formAdd.subject,
          password: this.formAdd.password,
          homeaddress: this.formAdd.homeaddress,
          updatedPerson: "Tea666" // 待调整
        }
      }).then((res) => {
        const data = res.data
         // 3、添加教师失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        }

        // 4、添加教师成功
        this.$message({showClose: true, message: data.msg,type: 'success'})
        this.closeDialogAdd(true);

      }).catch((error) => {
       this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    // 关闭添加教师对话框
    closeDialogAdd(addFlag){
      this.$emit("closeDialogAdd",addFlag)
    }
  }
}
</script>

<style scoped="scoped">
.el-card {
  margin-bottom: 30px;
}
</style>
