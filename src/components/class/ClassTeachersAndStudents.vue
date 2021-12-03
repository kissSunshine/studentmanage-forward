<template>
    <el-card class="box-card">
      <!-- 查询条件区 -->
      <div slot="header">
         <h3 style="text-align:center">添加教师学生</h3>
      </div>
    
      <!-- 查询表单 -->
      <el-form ref="formUpdate" :model="formUpdate" label-width="70px">
        <!-- 行：1 -->
        <el-row :gutter="20">
          <!-- 列：1 -->
          <el-col :span="8">
            <el-form-item label="语文" prop="yuwen">
                <el-select v-model="formUpdate.yuwen" clearable placeholder="请选择">
                    <el-option v-for="item in yuwenOptions" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="8">
            <el-form-item label="数学" prop="math">
                <el-select v-model="formUpdate.math" clearable placeholder="请选择">
                    <el-option v-for="item in mathOptions" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
            </el-form-item>
          </el-col>
          <!-- 列：2 -->
          <el-col :span="8">
            <el-form-item label="英语" prop="english">
                <el-select v-model="formUpdate.english" clearable placeholder="请选择">
                    <el-option v-for="item in englishOptions" :key="item.value" :label="item.label" :value="item.value"/>
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
        
        
    
        <!-- 添加按钮 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="">
              <el-button type="primary" >确 定</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="">
              <!-- 直接关闭新增卡片，新增标志就是false -->
              <el-button @click="closeClassTASPage(false)">取 消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
    
      </el-form>
    </el-card>
</template>

<script>
    export default {
        name: 'ClassTeachersAndStudents',
        data() {
            return {
                formUpdate: {
                    yuwen: '',
                    math: '',
                    english: ''
                },
                subjectTeachers: [],
            }
        },
        computed: {
            yuwenOptions(){
                return this.getOneSubjectOptions("语文")
            },
            mathOptions(){
                return this.getOneSubjectOptions("数学")
            },
            englishOptions(){
                return this.getOneSubjectOptions("英语")
            }
        },
        methods: {
            // 获取三大学科老师
            getSubjectTeachers(){
                this.getRequest('/teacher/querySubjectTeacher').then( responsevo => {
                    if(!responsevo){ return }
                    this.subjectTeachers = responsevo.data
                })
            },
            // 获取学科教师下拉选
            getOneSubjectOptions(subject){
                const subjectOptions = this.$store.state.subjectOptions.find( item => item.label == subject)
                const options = []
                this.subjectTeachers.forEach( item => {
                    if(item[2] == subjectOptions.value){
                        let option = {
                            value: '',
                            label: ''
                        }
                        option.value = item[0]
                        option.label = item[1]
                        options.push(option)
                    }
                })
                
                return options
            },
            // 关闭该页面
            closeClassTASPage(updateFlag){
                this.$emit('closeClassTASPage',updateFlag)
            }
        },
        mounted() {
            this.getSubjectTeachers()
        }
    }
</script>

<style>
</style>
