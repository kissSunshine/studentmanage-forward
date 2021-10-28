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
              <!-- 查询按钮默认都查询第1页 -->
              <el-button type="primary" @click="queryStudentList(1,pageComponents.pageSize)">查询</el-button>
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
              <el-button type="success" @click="opeanDialogFormAdd">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <!-- 结果展示区 -->
    <div>
      <el-table :data="studentList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="nickname" label="昵称"/>
        <el-table-column prop="birthday" label="生日"/>
        <el-table-column prop="genderName" label="性别"/>
        <el-table-column prop="schoolName" label="校区"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="statusName" label="状态"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 更新 -->
            <el-button id="updateStudent" type="warning" icon="el-icon-edit" @click="opeanDialogFormUpdate(scope.row)"></el-button>
            <!-- 删除 -->
            <el-button id="deleteStudent" type="danger" icon="el-icon-delete" @click="deleteStudentConfirm(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- @current-change:当前页码改变时触发 -->
      <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
        :total="pageComponents.total" :page-size="pageComponents.pageSize"
        @current-change="queryCurrentPage">
      </el-pagination>
    </div>

    <!-- 点击新增，弹出对话框填写学生信息 -->
    <el-dialog :visible.sync="dialogFormAdd" width="80%" :show-close="false" :close-on-press-escape="false" >
      <StudentDialogAdd @changeDialogFormAdd="closeDialogFormAdd"
        :dialogFormVisible="dialogFormAdd" :genderOptions="genderOptions" :statusOptions="statusOptions" :schoolOptions="schoolOptions">
      </StudentDialogAdd>
    </el-dialog>

    <!-- 点击修改，弹出对话框修改学生信息 -->
    <el-dialog :visible.sync="dialogFormUpdate" width="80%" :destroy-on-close="true" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <StudentDialogUpdate @changeDialogFormUpdate="closeDialogFormUpdate" :studentForm="studentFormUpdate"
        :genderOptions="genderOptions" :statusOptions="statusOptions" :schoolOptions="schoolOptions">
      </StudentDialogUpdate>
    </el-dialog>

  </el-card>
</template>

<script>
import StudentDialogAdd from '@/components/student/studentDialogAdd.vue'
import StudentDialogUpdate from '@/components/student/StudentDialogUpdate.vue'

export default {
  name: 'studentManage',
  components: {
    StudentDialogAdd,
    StudentDialogUpdate
  },
  data(){
    return {
      studentForm: {
        name: '',
        nickname: '',
        gender: '',
        status: ''
      },
      genderOptions: [{ value: 0, label: '女' }, { value: 1, label: '男' }], // 查询条件
      statusOptions: [{ value: 0, label: '离校' }, { value: 1, label: '在校' }],
      studentList: [], // 查询出的学生信息
      dialogFormAdd: false, //新增学生对话框是否显示；true-显示；false-隐藏
      schoolList: [], //初始化查询校区
      schoolOptions: [], // 校区下拉选
      pageComponents: {
        total: 0, // 查询出的学生总人数
        pageSize: 5, // 分页组件每页显示数量
      },
      dialogFormUpdate: false, //修改学生对话框是否显示；true-显示；false-隐藏
      studentFormUpdate: [], // 需要修改的学生信息
    }
  },
  methods: {
    queryStudentList(currentPage,pageSize){
      this.axios({
        method: 'get',
        url: 'http://localhost:8090/student/query',
        params: {
          name: this.studentForm.name,
          nickname: this.studentForm.nickname,
          gender: this.studentForm.gender,
          status: this.studentForm.status,
          currentPage,
          pageSize,
        }
      }).then((res) => {
        const resVo = res.data
        //查询失败
        if(resVo.status !== 1) {
          this.$message({showClose: true, message: resVo.msg, type: 'error'})
          return false
        }

        // 查询成功
        this.studentList = resVo.data.data
        this.pageComponents.total = resVo.data.total

      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    tableRowClassName({row, rowIndex}) {
      if((rowIndex % 5) == 1){
        return 'rowOne'
      } else if((rowIndex % 5) == 3){
        return 'rowTwo'
      }
      return ''
    },
    opeanDialogFormAdd(){
      if(this.schoolOptions.length === 0){
        for(let i = 0; i < this.schoolList.length; i++ ){
          let school = { value: '', label: ''}
          school.value = this.schoolList[i].id
          school.label = this.schoolList[i].name
          this.schoolOptions.push(school)
        }
      }

      this.dialogFormAdd = false;
      this.dialogFormAdd = true;
    },
    closeDialogFormAdd(addFlag){
      // 添加过新生才重新查询
      if(addFlag){
        this.queryStudentList(1,this.pageComponents.pageSize)
      }
      this.dialogFormAdd = false;
    },
    querySchoolList(){
       this.axios({
        method: 'post',
        url: 'http://localhost:8090/school/queryAll'
      }).then((res) => {
        const data = res.data
        //查询失败
        if(data.status !== 1) {
          return false
        }
        // 查询成功
        this.schoolList = data.data

      }).catch((error) => {
        const data = error.data
        this.$message({showClose: true, message: data.msg,type: 'error'})
        return false
      })
    },
    queryCurrentPage(currentPage){
      this.queryStudentList(currentPage,this.pageComponents.pageSize)
    },
    opeanDialogFormUpdate(row){
      this.studentFormUpdate = row
      if(this.schoolOptions.length === 0){
        for(let i = 0; i < this.schoolList.length; i++ ){
          let school = { value: '', label: ''}
          school.value = this.schoolList[i].id
          school.label = this.schoolList[i].name
          this.schoolOptions.push(school)
        }
      }
      this.dialogFormUpdate = false
      this.dialogFormUpdate = true
    },
    closeDialogFormUpdate(updateFlag){
      // 更新过信息才重新查询
      if(updateFlag){
        this.queryStudentList(1,this.pageComponents.pageSize)
      }
      this.dialogFormUpdate = false
    },
    deleteStudentConfirm(id){
      this.$confirm('此操作将永久删除该学生, 是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.deleteStudent(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    deleteStudent(id){
      this.axios({
        method: 'post',
        url: 'http://localhost:8090/student/delete',
        data: {
          id,
        }
      }).then((res) => {
        const resVo = res.data
        // 删除失败
        if(resVo.status !== 1) {
          this.$message({showClose: true, message: resVo.msg, type: 'error'})
          return false
        }

        // 删除成功
        this.$message({showClose: true, message: resVo.msg, type: 'success'})
        this.queryStudentList(1,this.pageComponents.pageSize)

      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    }

  },
  mounted() {
    this.querySchoolList()
  }
}
</script>

<style scoped="scoped">
.el-table >>> .rowOne {
  background: oldlace;
}

.el-table >>> .rowTwo {
  background: #f0f9eb;
}

/* 卡片组件 */
.el-card {
  background-color: #d6d6d6;
}
/* 分页组件 */
.el-pagination {
  margin-top: 20px;
}
/* 对话框组件 */
 .el-card >>> .el-dialog {
  background-color: #f0f9eb;
}
</style>
