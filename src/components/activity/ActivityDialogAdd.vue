<template>
  <el-card>

    <div slot="header">
      <h3 style="text-align:center">添加活动</h3>
    </div>

    <el-form ref="activityFormAdd" :model="activityFormAdd" :rules="addRules" label-width="80px">

      <!-- 行：1 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="名称" prop="name">
            <el-input v-model="activityFormAdd.name" autocomplete="off" placeholder="20个字符以内"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="开始" prop="startDateTime">
            <el-date-picker v-model="activityFormAdd.startDateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期时间" ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="结束" prop="endDateTime">
            <el-date-picker v-model="activityFormAdd.endDateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束日期时间"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 行：2 -->
      <el-row :gutter="20">
        <!-- 列：1 -->
        <el-col :span="8">
          <el-form-item label="费用" prop="cost">
            <el-input v-model="activityFormAdd.cost" placeholder="请输入费用，非零开头最多带一位小数"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="折扣" prop="discount">
            <el-input-number v-model="activityFormAdd.discount" :step="1" step-strictly :min="1" :max="10"></el-input-number>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select v-model="activityFormAdd.status" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="" >
            <el-table ref="schoolTable" :data="schoolList" tooltip-effect="dark" style="width: 100%" >
              <!-- 多选框 -->
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="校区" width="120"></el-table-column>
              <el-table-column label="活动教师" width="100">
                <template slot-scope="scope">
                  <!-- 添加每个校区付责教师 -->
                  <el-button type="success" icon="el-icon-s-custom" @click="openDrawerAdd(scope.row.id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column label="活动详细地址">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.activityAddress" placeholder="可以补充详细地址"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="addActivity">添 加</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <!-- 直接关闭新增卡片，新增标志就是false -->
            <el-button @click="changeDialogFormVisible(false)">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <!-- 添加每个校区付责教师 -->
    <el-drawer :visible.sync="showFlagAddActivityTeacher" direction="rtl" size="60%" :modal="false" :show-close="false">
      <ActivityTeacherDrawerAdd @closeDrawerAdd="closeDrawerAdd" @addActivityTeacher="addActivityTeacher" :schoolList="schoolList" :schoolidSelected="schoolidSelected"></ActivityTeacherDrawerAdd>
    </el-drawer>

  </el-card>
</template>

<script>
import ActivityTeacherDrawerAdd from './ActivityTeacherDrawerAdd.vue'

export default {
  name: 'ActivityDialogAdd',
  props: ['statusOptions'],
  components: {
    ActivityTeacherDrawerAdd
  },
  data(){
    // 自定义校验规则
    var statusRule = (rule, value, callback) => {
      if(value != "0" && value != "1" && value != "2"){
        callback(new Error('请正确的选择状态'))
      }
      callback()
    };
    var startDateTimeRule = (rule, value, callback) => {
      // 获取当前日期
      if(this.currentDate == ""){
        this.getDefaultDateTime();
      }
      // 当前日期 - 开始日期 < 0 则阻断提示
      const diffDate = this.getDiffDate(value.substring(0,10),this.currentDate);
      if(diffDate < 0 ){
        callback(new Error('开始日期不能早于当前日期'))
        return false
      }

      callback()
    };
    var endDateTimeRule = (rule, value, callback) => {
      if(this.currentDate == ""){
        this.getDefaultDateTime();
      }
      // 当前日期 - 结束日期 < 0 则阻断提示
      let diffDate = this.getDiffDate(value.substring(0,10),this.currentDate);
      // 999没有计算过
      if(diffDate != 999 && diffDate < 0 ){
        callback(new Error('结束日期不能早于当前日期'))
        return false
      }
      // 结束日期 - 开始日期 < 0 则阻断提示
      if(this.activityFormAdd.endDateTime != "" && this.activityFormAdd.startDateTime != ""){
        diffDate = this.getDiffDate(this.activityFormAdd.endDateTime.substring(0,10), this.activityFormAdd.startDateTime.substring(0,10));
        // 999没有计算过
        if(diffDate != 999 && diffDate < 0 ){
          callback(new Error('结束日期不能早于开始日期'))
          return false
        }
      }
      callback()
    };
    var costRule = (rule, value, callback) => {
      const regExp = /^([1-9][0-9]*)+(\.[0-9]{1})?$/g  // 非零开头的最多带一位小数的数字
      if(!regExp.test(value)){
        callback(new Error('请填写正确格式的费用'))
      }
      callback()
    };
    var discountRule = (rule, value, callback) => {
      const regExp = /^([1-9][0-9]*)+(\.[0-9]{1})?$/g  // 非零开头的最多带一位小数的数字
      if(!regExp.test(value)){
        callback(new Error('请填写正确格式的费用'))
      }
      callback()
    };
    return {
      activityFormAdd: {
        name: '',
        startDateTime: '',
        endDateTime: '',
        status: 0,
        cost: '',
        discount: 10
      },
      // 活动校区及对应的老师
      activityRealTeacher: [],
      // 校验添加的学生信息
      addRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 20, message: '姓名在20个字符以内', trigger: 'blur' }
        ],
        startDateTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
          { validator: startDateTimeRule, trigger: 'blur'},
        ],
        endDateTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
          { validator: endDateTimeRule, trigger: 'blur'},
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' },
          { validator: statusRule, trigger: 'blur' }, // 自定义规则
        ],
        cost: [
          { required: true, message: '请填写费用', trigger: 'blur' },
          { validator: costRule, trigger: 'blur' }, // 自定义规则
        ],
        discount: [{ validator: discountRule, trigger: 'blur' } // 自定义规则
        ]
      },
      // 当前日期
      currentDate: '',
      // 所有校区列表
      schoolList: [],
      // 添加活动付责教师抽屉显示标记  true-显示；false-隐藏
      showFlagAddActivityTeacher: false,
      // 点击添加教师时，所选择的校区
      schoolidSelected: ''
    }
  },
  methods: {
    // 添加活动
    addActivity(){
      // 1、校验
      this.$refs.activityFormAdd.validate((valid) => {
        // 校验失败，则阻断提示
        if (!valid) {
          this.$message({showClose: true, message: '请按照要求，重新输入!', type: 'error'})
          return false
        }
      })
      // 2、校验成功，发送ajax请求
      this.axios({
        method: 'post',
        url: 'http://localhost:8090/activity/add',
        data: {
          name: this.activityFormAdd.name,
          startDateTime: this.activityFormAdd.startDateTime,
          endDateTime: this.activityFormAdd.endDateTime,
          status: this.activityFormAdd.status,
          cost: this.activityFormAdd.cost,
          discount: (this.activityFormAdd.discount / 10),
          address: this.$refs.schoolTable.selection,
          updatedPerson: "Tea666" // 待调整
        }
      }).then((res) => {
        const data = res.data
          // 3、添加活动失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg, type: 'error'})
          return false
        }

        // 4、添加活动成功
        this.$message({showClose: true, message: data.msg, type: 'success'})
        this.changeDialogFormVisible(true);

      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    // 关闭添加活动对话框
    changeDialogFormVisible(addFlag){
      this.$emit("changeDialogFormAdd",addFlag)
    },
    // 获取当前时间，格式为  yyyy-mm-dd
    getDefaultDateTime(){
      this.currentDate = new Date().toLocaleDateString().replace(new RegExp("/","gm"),"-");
    },
    // 计算相差天数 第一个参数 减去 第二个参数  注意日期参数必须为 yyyy-mm-dd 格式
    getDiffDate(minuend,subtrahend){
      if(minuend == "" || subtrahend == ""){
        return 999
      }
      const minuendArr = minuend.split('-')
      const subtrahendArr = subtrahend.split('-')
      let diffYear = minuendArr[0] - subtrahendArr[0]
      let diffMonth = minuendArr[1] - subtrahendArr[1]
      let diffDay = minuendArr[2] - subtrahendArr[2]

      return (diffYear * 365) + (diffMonth * 30) + diffDay
    },
    // 查询所有校区
    getSchool(){
      this.axios({
        method: 'get',
        url: 'http://localhost:8090/school/queryAll'
      }).then((res) => {
        const data = res.data
          // 1、查询失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg, type: 'error'})
          return false
        }

        // 2、查询成功
        this.schoolList = data.data
      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    // 显示添加活动老师的抽屉
    openDrawerAdd(id){
      this.schoolidSelected = id
      this.showFlagAddActivityTeacher = false
      this.showFlagAddActivityTeacher = true
    },
    // 隐藏添加校区活动教师的抽屉
    closeDrawerAdd(){
      this.showFlagAddActivityTeacher = false
    },
    // 将添加校区活动教师的抽屉选择的数据存放在data中
    addActivityTeacher(schoolid,teacherList){
      debugger
      const teacheridList = []
      for(let i = 0; i < teacherList.length; i++ ){
        teacheridList.push(teacherList[i].id)
      }
      const activityRealTeacherOne = {"schoolid": schoolid,"teacheridList": teacheridList}
      this.activityRealTeacher.push(activityRealTeacherOne)
    }
  },
  mounted(){
    this.getSchool()
  }
}
</script>

<style scoped="scoped">
.el-card {
  margin-bottom: 30px;
}
.el-card >>> .el-drawer {
  background-color: #f0f9eb;
}
</style>
