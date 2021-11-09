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
            <el-date-picker v-model="formUpdate.birthday" type="date" placeholder="选择日期"></el-date-picker>
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
export default {
  name: 'DialogUpdate',
  props: ['genderOptions','statusOptions','schoolOptions','oneUpdate','departmentOptions','positionOptions','subjectOptions'],
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
      updateFlag: false, // 判断是否进行了信息变更

      // 校验教师信息
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
      },
      //---------------------------------------------------------------------------------------------------
    }
  },
  methods: {
    // 添加教师
    updateOne(){
      // 0、先判断是否页面信息是否更改过
      this.getUpdateFlag(this.oneUpdate,this.formUpdate)
      // 没更改，直接阻断提示
      if(!this.updateFlag){
        this.$message({showClose: true, message: '未修改教师信息', type: 'error'})
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
      this.axios({
        method: 'post',
        url: 'http://localhost:8090/teacher/update',
        data: {
          id: this.formUpdate.id,
          name: this.formUpdate.name,
          nickname: this.formUpdate.nickname,
          idcard: this.formUpdate.idcard,
          gender: this.formUpdate.gender,
          birthday: this.formUpdate.birthday,
          phone: this.formUpdate.phone,
          status: this.formUpdate.status,
          schoolid: this.formUpdate.schoolid,
          department: this.formUpdate.department,
          position: this.formUpdate.position,
          subject: this.formUpdate.subject,
          homeaddress: this.formUpdate.homeaddress,
          updatedPerson: this.formUpdate.updatedPerson
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
        // 5、关闭添加卡片，更新标志置为true
        this.closeDialogUpdate(true);

      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    // 关闭添加教师对话框
    closeDialogUpdate(updateFlag){
      this.$emit("closeDialogUpdate",updateFlag)
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
  }
}
</script>

<style scoped="scoped">
.el-card {
  margin-bottom: 30px;
}
</style>
