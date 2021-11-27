<template>
  <el-card class="box-card">
    <!-- 查询条件区 -->
    <div slot="header">
       <h3 style="text-align:center">添加活动教师</h3>
    </div>

    <!-- 查询表单 -->
    <el-form ref="formQuery" :model="formQuery" label-width="70px">
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
          <el-form-item label="活动校区" prop="schoolid">
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
      <!-- 行：2 -->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="" >
            <!-- 查询结果展示区 -->
            <div>
              <el-table ref="queryResultTable" :data="queryResultList" style="width: 100%" :row-class-name="tableRowClassName" @select="resultTableSelectedOne" @select-all="resultTableSelectedAll">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="nickname" label="昵称" />
                <el-table-column prop="schoolName" label="所在校区" />
                <el-table-column prop="phone" label="手机" />
              </el-table>
              <!-- 分页 -->
              <!-- @current-change:当前页码改变时触发 -->
              <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
                :total="pageComponents.total" :page-size="pageComponents.pageSize" @current-change="queryCurrentPage">
              </el-pagination>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-form label-width="70px">
      <!-- 行：1 -->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="" >
            <!-- 勾选教师展示区 -->
            <div>
              <el-table ref="selectedTable" :data="selectedtList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="nickname" label="昵称" width="120" />
                <el-table-column label="开始日期" >
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.startDate" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" >
                  <template slot-scope="scope" >
                    <el-date-picker v-model="scope.row.endDate" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <!-- 删除 -->
                    <el-button type="danger" icon="el-icon-delete" @click="deselection(scope.row.id)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="">
            <el-button type="primary" @click="addActivityTeacher">确 定</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="">
            <!-- 直接关闭新增卡片，新增标志就是false -->
            <el-button @click="closeDrawerAdd">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'ActivityTeacherDrawerAdd',
  // schoolidSelected：准备添加教师的校区；activityRealTeacherSelectedtList：已经添加的教师
  props: ['schoolidSelected','activityRealTeacherSelectedtList'],
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
        pageSize: 10, // 分页组件每页显示数量
      },
      selectedtList: [],
      //-------------------------------------------------------------------------------------------
      schoolOptions: []
    }
  },
  methods: {
    queryList(currentPage,pageSize){
      // 拼装请求参数
      let queryParams = {
        name: this.formQuery.name,
        nickname: this.formQuery.nickname,
        schoolid: this.formQuery.schoolid,
        status: this.formQuery.status,
        currentPage,
        pageSize
      }
      this.getRequest('/teacher/query',queryParams).then( responsevo => {
        if(!responsevo){return} // 查询失败
        const pageVo = responsevo.data
        this.queryResultList = pageVo.data
        this.pageComponents.total = pageVo.total
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
    closeDrawerAdd(){
      this.$emit("closeDrawerAdd")
      this.queryResultList = []
    },
    // 确定勾选的教师信息
    addActivityTeacher(){
      this.closeDrawerAdd()
      // 先向外触发函数，带出参数selectedtList
      this.$emit("addActivityTeacher",this.schoolidSelected,this.selectedtList)
      // 再将selectedtList置空
      this.selectedtList = []
      this.queryResultList = []
    },
    // 勾选一个教师信息后，展示在下方表格
    resultTableSelectedOne(selection,row){
      // 1、判断该次勾选操作是选中操作还是取消勾选
      let selectFlag = false
      for (let one of selection) {
        if(one.id == row.id){
          selectFlag = true
        }
      }
      // 2、添加或删除
      if(selectFlag){
        // 勾选操作则把勾选数据放入
        const index = this.selectedtList.findIndex(item => item.nickname == row.nickname)
        if(index == -1){
          this.selectedtList.push(row)
        }
      }else{
        // 取消操作则把取消数据弹出
        const index = this.selectedtList.findIndex(item => item.nickname == row.nickname)
        if(index != -1){
          this.selectedtList.splice(index,1)
        }
      }
    },
    resultTableSelectedAll(selection){
      if(selection.length > 0){
        // 如果是全选，则selection是有值的，将值添加到选中数据
        for(let row of selection){
          const index = this.selectedtList.findIndex(item => item.nickname == row.nickname)
          if(index == -1){
            this.selectedtList.push(row)
          }
        }
      }else{
        // 如果是全不选，则是把当前页面查询的数据即this.queryResultList从已选中的列表中删除
        for(let row of this.queryResultList){
          const index = this.selectedtList.findIndex(item => item.nickname == row.nickname)
          if(index != -1){
            this.selectedtList.splice(index,1)
          }
        }
      }

    },
    // 取消勾选的一个教师
    deselection(id){
      // 1、获取要取消的教师的下标
      const deselectionIndex = this.selectedtList.findIndex(item => item.nickname == row.nickname)
      // 2、从selectedtList中删除
      this.selectedtList.splice(deselectionIndex,1)
    },
    // 点击查询后，展示教师信息列表中如果有已经勾选的教师，需要将勾选框状态置为勾选
    setQueryResultTableSelected(){
      let selectedFlag = false
      this.queryResultList.forEach(row =>{
        // 每次循环开始，勾选标识置为false
        selectedFlag = false
        // 循环对比该行数据是否在已勾选的信息中，已被勾选，则勾选标识置为true
        this.selectedtList.forEach(selectOne => {
          if(selectOne.nickname == row.nickname){
            selectedFlag = true
          }
        })
        // 一行数据勾选标识设置好后，开始处理
        this.$refs.queryResultTable.toggleRowSelection(row,selectedFlag)
      })
    },
    //------------------------------------------------------------------------------------------------------
  },
  mounted() {
    this.schoolOptions = this.$store.state.schoolOptions
  },
  updated() {
    this.setQueryResultTableSelected()
  },
  watch: {
    schoolidSelected: {
      handler(){
        this.formQuery.schoolid = this.schoolidSelected
      },
      immediate: true // 代表第一次就执行；不加则第一次进入修改信息页面带不出数据
    },
    activityRealTeacherSelectedtList: {
      handler(){
        this.selectedtList = [...this.activityRealTeacherSelectedtList]
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
