<template>
  <el-card>
    <!-- 查询条件区 -->
    <div slot="header">
      <!-- 查询表单 -->
      <el-form ref="avtivityForm" :model="avtivityForm" label-width="80px">
        <!-- 行：1 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="6">
            <el-form-item label="名称">
              <el-input v-model="avtivityForm.name"></el-input>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="avtivityForm.status" clearable placeholder="请选择">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 列：3 -->
          <el-col :span="3">
            <el-form-item>
              <!-- 查询按钮默认都查询第1页 -->
              <el-button type="primary" @click="queryActivityList(1,pageComponents.pageSize)">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 行：2 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="6">
            <el-form-item label="开始">
              <el-date-picker v-model="avtivityForm.startDateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期时间" :default-value="defaultDateTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="结束">
              <el-date-picker v-model="avtivityForm.endDateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 列：3 -->
          <el-col :span="3">
            <el-form-item>
              <el-button type="success" >新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <!-- 结果展示区 -->
    <div>
      <el-table :data="activityList" style="width: 100%">
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="nickname" label="昵称"/>
        <el-table-column prop="birthday" label="生日"/>
        <el-table-column prop="genderName" label="性别"/>
        <el-table-column prop="schoolName" label="校区"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="statusName" label="状态"/>
        <el-table-column label="操作">
          
        </el-table-column>
      </el-table>
    </div>

  </el-card>
</template>

<script>
export default {
  name: 'activityManage',
  data(){
    return {
      avtivityForm: {
        name: '',
        status: 0,
        startDateTime: '',
        endDateTime: ''
      },
      statusOptions: [{ value: 0, label: '未开始' }, { value: 1, label: '活动中' }, { value: 2, label: '已结束' }],
      defaultDateTime: {}, // 默认开始日期时间为当前时间
      activityList: [], // 查询出的活动列表
      pageComponents: {
        total: 0, // 查询出的活动总数
        pageSize: 5, // 分页组件每页显示数量
      },
    }
  },
  methods: {
    getDefaultDateTime(){
      this.defaultDateTime = new Date()
    },
    queryActivityList(currentPage,pageSize){
      this.axios({
        method: 'get',
        url: 'http://localhost:8090/activity/query',
        params: {
          name: this.avtivityForm.name,
          status: this.avtivityForm.status,
          startDateTime: this.avtivityForm.startDateTime,
          endDateTime: this.avtivityForm.endDateTime,
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
    }
  },
  mounted(){
    this.getDefaultDateTime()
  }
}
</script>

<style>
/* 卡片组件 */
.el-card {
  background-color: #d6d6d6;
}
</style>
