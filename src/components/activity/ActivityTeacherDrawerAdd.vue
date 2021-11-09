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
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="校区" prop="schoolid">
              <el-select v-model="formQuery.schoolid" clearable placeholder="请选择">
                <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
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

      </el-form>
    </div>

    <!-- 结果展示区 -->
    <div>
      <el-table :data="queryResultList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="genderName" label="性别"/>
        <el-table-column prop="schoolName" label="校区"/>
        <el-table-column prop="subjectName" label="学科"/>
        <el-table-column prop="departmentName" label="部门"/>
        <el-table-column prop="positionName" label="职位"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="statusName" label="状态"/>
      </el-table>
      <!-- 分页 -->
      <!-- @current-change:当前页码改变时触发 -->
      <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
        :total="pageComponents.total" :page-size="pageComponents.pageSize" @current-change="queryCurrentPage">
      </el-pagination>
    </div>

  </el-card>
</template>

<script>
export default {
  name: 'ActivityTeacherDrawerAdd',
  props: ['schoolList','schoolidSelected'],
  data(){
    return {
      formQuery: {
        name: '',
        nickname: '',
        gender: '',
        schoolid: '',
        status: 1
      },
      genderOptions: [{ value: 0, label: '女' }, { value: 1, label: '男' }], // 查询条件
      statusOptions: [{ value: 0, label: '离校' }, { value: 1, label: '在校' }],
      queryResultList: [], // 查询出的教师信息
      pageComponents: {
        total: 0, // 查询出的教师总人数
        pageSize: 5, // 分页组件每页显示数量
      },
      //-------------------------------------------------------------------------------------------
      schoolOptions: []
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
          schoolid: this.formQuery.schoolid,
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
    queryCurrentPage(currentPage){
      this.queryStudentList(currentPage,this.pageComponents.pageSize)
    },
    //------------------------------------------------------------------------------------------------------
    getSchoolOptions(){
      if(this.schoolOptions.length === 0){
        for(let i = 0; i < this.schoolList.length; i++ ){
          let school = { value: '', label: ''}
          school.value = this.schoolList[i].id
          school.label = this.schoolList[i].name
          this.schoolOptions.push(school)
        }
      }
    }
  },
  mounted() {
    this.getSchoolOptions()
  },
  watch: {
    schoolidSelected: {
      handler(){
        this.formQuery.schoolid = this.schoolidSelected
      },
      immediate: true // 代表第一次就执行；不加则第一次进入修改信息页面带不出数据
    }
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
</style>
