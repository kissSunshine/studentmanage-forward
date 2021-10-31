<template>
  <el-card>

    <div slot="header">
      <h3 style="text-align:center">添加活动</h3>
    </div>

    <el-form ref="studentFormAdd" :model="activityFormAdd" :rules="addRules" label-width="80px">

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
          <el-form-item label="状态" prop="gender">
            <el-select v-model="activityFormAdd.gender" clearable placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 列：2 -->
        <el-col :span="8">
          <el-form-item label="费用" prop="cost">
            <el-input v-model="activityFormAdd.cost" placeholder="请输入费用"></el-input>
          </el-form-item>
        </el-col>
        <!-- 列：3 -->
        <el-col :span="8">
          <el-form-item label="折扣" prop="discount">
            <el-input v-model="activityFormAdd.discount" placeholder=""></el-input>
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

  </el-card>
</template>

<script>
export default {
  name: 'ActivityDialogAdd',
  props: ['statusOptions'],
  data(){
    // 自定义校验规则
    var statusRule = (rule, value, callback) => {
      if(value != "0" && value != "1" && value != "2"){
        callback(new Error('请正确的选择状态'))
      }
      callback()
    };
    return {
      activityFormAdd: {
        name: '',
        startDateTime: '',
        endDateTime: '',
        address: '',
        cost: '',
        discount: '',
        status: 0
      },
      // 校验添加的学生信息
      addRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 20, message: '姓名在20个字符以内', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' },
          { validator: statusRule, trigger: 'change' }, // 自定义规则
        ],
        schoolid: [{ required: true, message: '请选择校区', trigger: 'change' }]
      }
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
          discount: this.activityFormAdd.discount,
          updatedPerson: "Tea666" // 待调整
        }
      }).then((res) => {
        const data = res.data
          // 3、添加活动失败
        if(data.status !== 1) {
          this.$message({showClose: true, message: data.msg,type: 'error'})
          return false
        }

        // 4、添加活动成功
        this.$message({showClose: true, message: data.msg,type: 'success'})
        this.changeDialogFormVisible(true);

      }).catch((error) => {
        this.$message({showClose: true, message: "服务器错误，请重试或联系管理员", type: 'error'})
      })
    },
    // 关闭添加学生对话框
    changeDialogFormVisible(addFlag){
      this.$emit("changeDialogFormAdd",addFlag)
    }
  }
}
</script>

<style scoped="scoped">
.el-card {
  margin-bottom: 30px;
}
</style>
