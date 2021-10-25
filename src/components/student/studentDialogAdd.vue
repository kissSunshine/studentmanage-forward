<template>
  <el-dialog title="添加学生" :visible.sync="dialogFormVisible" width="80%" center>
    <el-form ref="studentFormAdd" :model="studentFormAdd"  label-width="80px">

      <!-- 行：1 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="studentFormAdd.name" autocomplete="off" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="昵称">
            <el-input v-model="studentFormAdd.nickname" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input v-model="studentFormAdd.idcard" placeholder="非必填"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：2 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select v-model="studentFormAdd.gender" clearable placeholder="请选择">
              <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="出生日期">
            <el-date-picker v-model="studentFormAdd.birthday" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="手机">
            <el-input v-model="studentFormAdd.phone" placeholder="11位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：3 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="studentFormAdd.status" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="校区">
            <el-select v-model="studentFormAdd.schoolid" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：4 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="密码">
            <el-input v-model="studentFormAdd.password" autocomplete="off" placeholder="6到20个字符"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="再次输入">
            <el-input v-model="studentFormAdd.passwordsecond" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：5 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="家庭地址">
            <el-input type="textarea" v-model="studentFormAdd.homeaddress" placeholder="500个字符以内"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="changeDialogFormVisible">添 加</el-button>
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
  props: ['dialogFormVisible','genderOptions','statusOptions'],
  data(){
    return {
      studentFormAdd: {
        name: '',
        nickname: '',
        idcard: '',
        gender: '',
        birthday: '',
        phone: '',
        status: '1',
        schoolid: '',
        password: '',
        homeaddress: ''
      },
      passwordsecond: ''
    }
  },
  methods: {
    changeDialogFormVisible(){
      this.$emit("changeDialogFormVisible")
    }
  }
}
</script>

<style>
</style>
