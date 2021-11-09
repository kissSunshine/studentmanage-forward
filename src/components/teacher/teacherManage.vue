<template>
  <el-card class="box-card">
    <!-- 查询条件区 -->
    <div slot="header">
      <!-- 查询表单 -->
      <el-form ref="formQuery" :model="formQuery" label-width="80px">
        <!-- 行：1 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="formQuery.name"></el-input>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="昵称">
              <el-input v-model="formQuery.nickname"></el-input>
            </el-form-item>
          </el-col>
          <!-- 列：3 -->
          <el-col :span="3">
            <el-form-item>
              <!-- 查询按钮默认都查询第1页 -->
              <el-button type="primary" @click="queryList(1,pageComponents.pageSize)">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 行：2 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="6">
            <el-form-item label="性别">
              <el-select v-model="formQuery.gender" clearable placeholder="请选择">
                <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="formQuery.status" clearable placeholder="请选择">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 列：3 -->
          <el-col :span="3">
            <el-form-item>
              <el-button type="success" @click="opeanDialogAdd">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <!-- 结果展示区 -->
    <div>
      <el-table :data="queryResultList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="genderName" label="性别" width="50"/>
        <el-table-column prop="schoolName" label="校区"/>
        <el-table-column prop="subjectName" label="学科" width="70"/>
        <el-table-column prop="departmentName" label="部门"/>
        <el-table-column prop="positionName" label="职位"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="statusName" label="状态" width="70"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 更新 -->
            <el-button id="updateButton" type="warning" icon="el-icon-edit" @click="opeanDialogUpdate(scope.row)"></el-button>
            <!-- 删除 -->
            <el-button id="deleteButton" type="danger" icon="el-icon-delete" @click="deleteConfirm(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- @current-change:当前页码改变时触发 -->
      <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
        :total="pageComponents.total" :page-size="pageComponents.pageSize" @current-change="queryCurrentPage">
      </el-pagination>
    </div>

    <!-- 点击新增，弹出对话框填写教师信息 -->
    <el-dialog :visible.sync="showFlagDialogAdd" width="80%" :show-close="false" :close-on-press-escape="false" >
      <DialogAdd @closeDialogAdd="closeDialogAdd" :genderOptions="genderOptions" :statusOptions="statusOptions" :schoolOptions="schoolOptions" :departmentOptions="departmentOptions" :positionOptions="positionOptions" :subjectOptions="subjectOptions">
      </DialogAdd>
    </el-dialog>

    <!-- 点击修改，弹出对话框修改教师信息 -->
    <el-dialog :visible.sync="showFlagDialogUpdate" width="80%" :destroy-on-close="true" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <DialogUpdate @closeDialogUpdate="closeDialogUpdate" :oneUpdate="oneUpdate" :genderOptions="genderOptions" :statusOptions="statusOptions" :schoolOptions="schoolOptions" :departmentOptions="departmentOptions" :positionOptions="positionOptions" :subjectOptions="subjectOptions">
      </DialogUpdate>
    </el-dialog>

  </el-card>
</template>

<script>
import DialogAdd from '@/components/teacher/TeacherDialogAdd.vue'
import DialogUpdate from '@/components/teacher/TeacherDialogUpdate.vue'

export default {
  name: 'TeacherManage',
  components: {
    DialogAdd,
    DialogUpdate
  },
  data(){
    return {
      formQuery: {
        name: '',
        nickname: '',
        gender: '',
        status: ''
      },
      genderOptions: [{ value: 0, label: '女' }, { value: 1, label: '男' }], // 查询条件
      statusOptions: [{ value: 0, label: '离校' }, { value: 1, label: '在校' }],
      queryResultList: [], // 查询出的教师信息
      showFlagDialogAdd: false, //新增教师对话框是否显示；true-显示；false-隐藏
      pageComponents: {
        total: 0, // 查询出的教师总人数
        pageSize: 5, // 分页组件每页显示数量
      },
      showFlagDialogUpdate: false, //修改教师对话框是否显示；true-显示；false-隐藏
      oneUpdate: [], // 需要修改的教师信息
      //-------------------------------------------------------------------------------------------
      schoolList: [], //初始化查询校区
      schoolOptions: [], // 校区下拉选
      departmentOptions: '', // 部门下拉选值
      positionOptions: '', // 职位下拉选值
      subjectOptions: '', // 学科下拉选值
    }
  },
  methods: {
    queryList(currentPage,pageSize){
      this.axios({
        method: 'get',
        url: 'http://localhost:8090/teacher/query',
        params: {
          name: this.formQuery.name,
          nickname: this.formQuery.nickname,
          gender: this.formQuery.gender,
          status: this.formQuery.status,
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
        this.queryResultList = resVo.data.data
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
    opeanDialogAdd(){
      if(this.schoolOptions.length === 0){
        for(let i = 0; i < this.schoolList.length; i++ ){
          let school = { value: '', label: ''}
          school.value = this.schoolList[i].id
          school.label = this.schoolList[i].name
          this.schoolOptions.push(school)
        }
      }

      this.showFlagDialogAdd = false;
      this.showFlagDialogAdd = true;
    },
    closeDialogAdd(addFlag){
      // 添加过教师才重新查询
      if(addFlag){
        this.queryList(1,this.pageComponents.pageSize)
      }
      this.showFlagDialogAdd = false;
    },
    queryCurrentPage(currentPage){
      this.queryStudentList(currentPage,this.pageComponents.pageSize)
    },
    opeanDialogUpdate(row){
      this.oneUpdate = row
      if(this.schoolOptions.length === 0){
        for(let i = 0; i < this.schoolList.length; i++ ){
          let school = { value: '', label: ''}
          school.value = this.schoolList[i].id
          school.label = this.schoolList[i].name
          this.schoolOptions.push(school)
        }
      }
      this.showFlagDialogUpdate = false
      this.showFlagDialogUpdate = true
    },
    closeDialogUpdate(updateFlag){
      // 更新过信息才重新查询
      if(updateFlag){
        this.queryList(1,this.pageComponents.pageSize)
      }
      this.showFlagDialogUpdate = false
    },
    deleteConfirm(id){
      this.$confirm('此操作将永久删除该教师, 是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.deleteOne(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    deleteOne(id){
      this.axios({
        method: 'post',
        url: 'http://localhost:8090/teacher/delete',
        data: {
          id
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
        this.queryList(1,this.pageComponents.pageSize)

      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    //------------------------------------------------------------------------------------------------------
    querySchoolList(){
       this.axios({
        method: 'get',
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
    getDepartmentOptions(){
      if(this.departmentOptions != ''){
        return true
      }

      this.axios({
        method: 'get',
        url: 'http://localhost:8090/enum/department'
      }).then((res) => {
        const data = res.data
         // 获取部门失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        }

        // 获取部门成功
        this.departmentOptions = data.data;
      }).catch((error) => {
       this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    // 职位下拉选值
    getPositionOptions(){
      if(this.positionOptions != ''){
        return true
      }
      this.axios({
        method: 'get',
        url: 'http://localhost:8090/enum/position'
      }).then((res) => {
        const data = res.data
         // 获取职位失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        }

        // 获取职位成功
        this.positionOptions = data.data;
      }).catch((error) => {
       this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    // 学科下拉选值
    getSubjectOptions(){
      if(this.subjectOptions != ''){
        return true
      }
      this.axios({
        method: 'get',
        url: 'http://localhost:8090/enum/subject'
      }).then((res) => {
        const data = res.data
         // 获取学科失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        }

        // 获取学科成功
        this.subjectOptions = data.data;
      }).catch((error) => {
       this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    }
  },
  mounted() {
    this.querySchoolList()
    this.getDepartmentOptions()
    this.getPositionOptions()
    this.getSubjectOptions()
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
