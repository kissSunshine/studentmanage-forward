<template>
  <el-card class="box-card">
    <!-- 查询条件区 -->
    <div slot="header">
      <!-- 查询表单 -->
      <el-form ref="studentForm" :model="studentForm" label-width="80px">
        <!-- 行：1 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="studentForm.name"></el-input>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="昵称">
              <el-input v-model="studentForm.nickname"></el-input>
            </el-form-item>
          </el-col>
          <!-- 列：3 -->
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="queryStudentList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 行：2 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="6">
            <el-form-item label="性别">
              <el-select v-model="studentForm.gender" clearable placeholder="请选择">
                <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="studentForm.status" clearable placeholder="请选择">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 列：3 -->
          <el-col :span="3">
            <el-form-item>
              <el-button type="success" @click="opeanDialogFormVisible">新增</el-button>
            </el-form-item>

            <!-- 点击新增，弹出对话框填写学生信息 -->
            <StudentDialogAdd @changeDialogFormVisible="closeDialogFormVisible"
              :dialogFormVisible="dialogFormVisible" :genderOptions="genderOptions" :statusOptions="statusOptions">
            </StudentDialogAdd>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <!-- 结果展示区 -->
    <div>
      <el-table :data="studentList" style="width: 100%" stripe>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="nickname" label="昵称"/>
        <el-table-column prop="birthday" label="生日"/>
        <el-table-column prop="gender" label="性别"/>
        <el-table-column prop="schoolid" label="校区"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="status" label="状态"/>
        <el-table-column label="操作">
          <!-- 更新 -->
          <el-button type="warning" icon="el-icon-edit"></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </el-table-column>
      </el-table>
    </div>

  </el-card>
</template>

<script>
import StudentDialogAdd from '@/components/student/studentDialogAdd.vue'

export default {
  name: 'studentManage',
  components: {
    StudentDialogAdd,
  },
  data(){
    return {
      studentForm: {
        name: '',
        nickname: '',
        gender: '',
        status: ''
      },
      genderOptions: [{ value: '0',label: '女' }, { value: '1',label: '男' }], // 查询条件
      statusOptions: [{ value: '0',label: '离校' }, { value: '1',label: '在校' }],
      studentList: [], // 查询出的学生信息
      dialogFormVisible: false //新增学生对话框是否显示；true-显示；false-隐藏
    }
  },
  methods: {
    queryStudentList(){
      this.axios({
        method: 'post',
        url: 'http://localhost:8090/student/query',
        data: {
          name: this.studentForm.name,
          nickname: this.studentForm.nickname,
          gender: this.studentForm.gender,
          status: this.studentForm.status
        }
      }).then((res) => {
        debugger
        const data = res.data
        //查询失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        }

        // 查询成功
        this.studentList = data.data

      }).catch((error) => {
        const data = error.data
        this.$message({showClose: true, message: data.msg,type: 'error'})
        return false
      })
    },
    tableRowClassName({row, rowIndex}) {
      debugger
      if (rowIndex === 0) {
        return 'warning-row'
      } else if (rowIndex === 1) {
        return 'success-row'
      }
      return '';
    },
    opeanDialogFormVisible(){
      this.dialogFormVisible = false;
      this.dialogFormVisible = true;
    },
    closeDialogFormVisible(){
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped="scoped">
.el-table .warning-row {
  background: #e2e200;
}

.el-table .success-row {
  background: #39ab00;
}

.el-card {
  background-color: #d6d6d6;
}
</style>
