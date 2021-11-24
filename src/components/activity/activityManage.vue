<template>
  <el-card>
    <!-- 查询条件区 -->
    <div slot="header">
      <!-- 查询表单 -->
      <el-form ref="activityForm" :model="activityForm" label-width="80px">
        <!-- 行：1 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="6">
            <el-form-item label="名称">
              <el-input v-model="activityForm.name"></el-input>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="activityForm.status" clearable placeholder="请选择">
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
              <el-date-picker v-model="activityForm.startDateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期时间" :default-value="defaultDateTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="6">
            <el-form-item label="结束">
              <el-date-picker v-model="activityForm.endDateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 列：3 -->
          <el-col :span="3">
            <el-form-item>
              <el-button type="success" @click="openDialogFormAdd">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <!-- 结果展示区 -->
    <div>
      <!-- <el-table :data="activityList" style="width: 100%">
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="startDateTime" label="开始时间"/>
        <el-table-column prop="endDateTime" label="结束时间"/>
        <el-table-column prop="address" label="活动地点"/>
        <el-table-column prop="cost" label="费用"/>
        <el-table-column prop="status" label="状态"/>
        <el-table-column label="操作">

        </el-table-column>
      </el-table> -->
      <!-- 以卡片形式展示 -->
      <!-- 行：1 -->
      <el-row :gutter="30">
        <el-col :span="elColSpan" v-for="activity in activityListFirstRow" :key="activity.id">
          <el-card :body-style="{ padding: '0px' }" @click="opeanDialogUpdate">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>{{activity.name}}</span>
              <div class="bottom clearfix">
                <time class="time">开始时间：{{ activity.startDateTime }}</time><br/>
                <time class="time">结束时间：{{ activity.endDateTime }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 行：2 -->
      <el-row :gutter="30" style="margin-top: 20px;">
        <el-col :span="elColSpan" v-for="activity in activityListSecondRow" :key="activity.id">
          <el-card :body-style="{ padding: '0px' }" @click="opeanDialogUpdate">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>{{activity.name}}</span>
              <div class="bottom clearfix">
                <time class="time">开始时间：{{ activity.startDateTime }}</time><br/>
                <time class="time">结束时间：{{ activity.endDateTime }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 点击新增，弹出对话框填写活动信息 -->
    <el-dialog :visible.sync="showDialogFormAdd" width="80%" :show-close="false" :close-on-press-escape="false" :top="0">
      <ActivityDialogAdd @changeDialogFormAdd="closeDialogFormAdd" :statusOptions="statusOptions">
      </ActivityDialogAdd>
    </el-dialog>

  </el-card>
</template>

<script>
import ActivityDialogAdd from '@/components/activity/ActivityDialogAdd.vue'

export default {
  name: 'ActivityManage',
  components: {
    ActivityDialogAdd,
  },
  data(){
    return {
      activityForm: {
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
        pageSize: 8, // 分页组件每页显示数量  每行展示卡片数量及行中宽度都由此算出。修改时，必须为偶数
      },
      showDialogFormAdd: false, // 是否展示添加活动卡片  true-展示；false-隐藏
      showFlagDialogUpdate: false, //修改活动对话框是否显示；true-显示；false-隐藏
    }
  },
  computed: {
    // 根据每行展示的卡片个数，调整每列宽度
    elColSpan(){
      return 24 / (this.pageComponents.pageSize / 2)
    },
    // 每页展示6个活动卡片，此为第一行的三个
    activityListFirstRow(){
      if(this.activityList.length == 0){
        return this.activityList
      }
      return this.activityList.slice(0,(this.pageComponents.pageSize / 2))
    },
    // 每页展示6个活动卡片，此为第er行的三个
    activityListSecondRow(){
      if(this.activityList.length == 0){
        return this.activityList
      }
      return this.activityList.slice((this.pageComponents.pageSize / 2),this.pageComponents.pageSize)
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
          name: this.activityForm.name,
          status: this.activityForm.status,
          startDateTime: this.activityForm.startDateTime,
          endDateTime: this.activityForm.endDateTime,
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
        this.activityList = resVo.data.data
        this.pageComponents.total = resVo.data.total

      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    openDialogFormAdd(){ // 展示【新增】卡片
      this.showDialogFormAdd = false
      this.showDialogFormAdd = true
    },
    closeDialogFormAdd(addFlag){ // 隐藏【新增】卡片
      // 如果新增了活动，需要重新查询
      if(addFlag){
        this.queryActivityList(1,this.pageComponents.pageSize)
      }

      this.showDialogFormAdd = false
    }
  },
  mounted(){
    this.getDefaultDateTime()
  }
}
</script>

<style scoped="scoped">
/* 卡片组件 */
.el-card {
  background-color: #d6d6d6;
}
/* 对话框组件 */
.el-card >>> .el-dialog {
  background-color: #f0f9eb;
}
/* 活动卡片的图片 */
.image {
  width: 100%;
  display: block;
}
</style>
