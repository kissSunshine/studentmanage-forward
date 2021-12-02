<template>
    <el-card>

        <div slot="header">
            <h3 style="text-align:center">修改班级</h3>
        </div>

        <el-form ref="formUpdate" :model="formUpdate" :rules="updateRules" label-width="80px">

            <!-- 行：1 -->
            <el-row :gutter="20">
                <!-- 列：1 -->
                <el-col :span="8">
                    <el-form-item label="校区" prop="schoolid">
                        <el-select v-model="formUpdate.schoolid" clearable placeholder="请选择">
                            <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="8">
                    <el-form-item label="年级" prop="grade">
                        <el-select v-model="formUpdate.grade" clearable placeholder="请选择">
                            <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- 列：3 -->
                <el-col :span="8">
                    <el-form-item label="班主任" prop="classmaster">
                        <el-select v-model="formUpdate.classmaster" clearable placeholder="请选择">
                            <el-option v-for="item in classmasterOptions" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 行：2 -->
            <el-row :gutter="20">
                <!-- 列：1 -->
                <el-col :span="8">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="formUpdate.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="8">
                    <el-form-item label="开班日期" prop="birthday">
                        <el-input v-model="formUpdate.birthday" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <!-- 修改按钮 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="">
                        <el-button type="primary" @click="updateOne">修 改</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="">
                        <!-- 直接关闭修改卡片，修改标志就是false -->
                        <el-button @click="closeUpdatePage(false)">取 消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        
    </el-card>
</template>

<script>
    import {getUpdateFlag} from '@/assets/js/toolUtil.js'

    export default {
        name: 'ClassUpdate',
        props: ['oneUpdate'],
        data() {
            return {
                formUpdate: {
                    schoolid: '',
                    grade: '',
                    classmaster: '',
                    name: '',
                    birthday: '',
                    updatedPerson: '大熊'
                },
                schoolOptions: [],
                gradeOptions: [],
                classmasterOptions: [],
                // 校验修改的班级信息
                updateRules: {
                    schoolid: this.formRules.schoolid,
                    grade: [{required: true, message: '请选择年级', trigger: 'blur'}],
                    classmaster: [{required: true, message: '请选择校长', trigger: 'blur'}],
                    name: [{required: true, message: '请填写班级名称', trigger: 'blur'}],
                    birthday: [{required: true, message: '请填写开班日期', trigger: 'blur'}],
                },
            }
        },
        methods: {
            // 添加班级
            updateOne() {
                // 0、先判断是否页面信息是否更改过，没更改则直接阻断提示
                if(!getUpdateFlag(this.oneUpdate,this.formUpdate)){
                    this.$message({showClose: true, message: '未修改班级信息，不需要更新', type: 'error'})
                    return false
                }
                // 1、校验
                this.$refs.formUpdate.validate( valid => {
                    // 校验失败，则阻断提示
                    if (!valid) {
                        this.$message({ showClose: true, message: '请按照要求，重新输入!', type: 'error'})
                        return false
                    }
                    
                    this.postRequest('/classes/update', this.formUpdate).then(responsevo => {
                        if(!responsevo){  return  }
                        
                        // 添加成功
                        this.$message({ showClose: true, message: responsevo.msg, type: 'success'})
                        this.closeUpdatePage(true)
                    })
                })  
            },
            closeUpdatePage(updateFlag){
                this.$emit("closeClassUpdatePage", updateFlag)
            }
        },
        watch: {
            oneUpdate: {
              handler(){
                // 利用JSON格式化进行属性的拷贝
                this.formUpdate = JSON.parse(JSON.stringify(this.oneUpdate))
              },
              immediate: true // 代表第一次就执行；不加则第一次进入修改信息页面带不出数据
            }
        },
        mounted() {
            this.schoolOptions = this.$store.state.schoolOptions
            this.gradeOptions = this.$store.state.gradeOptions
            this.$store.commit('getClassmasterOptions') //班主任
            this.classmasterOptions = this.$store.state.classmasterOptions
        }
    }
</script>

<style scoped="scoped">
    .el-card {
        margin-bottom: 30px;
        background-color: #d6d6d6;
    }
</style>
