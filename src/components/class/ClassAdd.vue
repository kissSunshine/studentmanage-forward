<template>
    <el-card>

        <div slot="header">
            <h3 style="text-align:center">添加班级</h3>
        </div>

        <el-form ref="formAdd" :model="formAdd" :rules="addRules" label-width="80px">

            <!-- 行：1 -->
            <el-row :gutter="20">
                <!-- 列：1 -->
                <el-col :span="8">
                    <el-form-item label="校区" prop="schoolid">
                        <el-select v-model="formAdd.schoolid" clearable placeholder="请选择">
                            <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="8">
                    <el-form-item label="年级" prop="grade">
                        <el-select v-model="formAdd.grade" clearable placeholder="请选择">
                            <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- 列：3 -->
                <el-col :span="8">
                    <el-form-item label="班主任" prop="classmaster">
                        <el-select v-model="formAdd.classmaster" clearable placeholder="请选择">
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
                        <el-input v-model="formAdd.name" autocomplete="off" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="8">
                    <el-form-item label="开班日期" prop="birthday">
                        <el-input v-model="formAdd.birthday" autocomplete="off" :placeholder="currentDate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <!-- 添加按钮 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="">
                        <el-button type="primary" @click="addOne">添 加</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="">
                        <!-- 直接关闭新增卡片，新增标志就是false -->
                        <el-button @click="closeAddPage(false)">取 消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        
    </el-card>
</template>

<script>
    export default {
        name: 'ClassAdd',
        data() {
            return {
                formAdd: {
                    name: '',
                    birthday: '',
                    phone: '',
                    telephone: '',
                    address: '',
                    schoolmaster: '',
                    updatedPerson: '大熊'
                },
                schoolOptions: [],
                gradeOptions: [],
                classmasterOptions: [],
                currentDate: '',
                // 校验添加的班级信息
                addRules: {
                    name: this.formRules.name,
                    birthday: this.formRules.birthday,
                    phone: this.formRules.phone,
                    telephone: this.formRules.telephone,
                    address: this.formRules.schoolAddress,
                    schoolmaster: [{required: true, message: '请选择校长', trigger: 'blur'}]
                },
            }
        },
        methods: {
            // 添加班级
            addOne() {
                // 1、校验
                this.$refs.formAdd.validate( valid => {
                    // 校验失败，则阻断提示
                    if (!valid) {
                        this.$message({ showClose: true, message: '请按照要求，重新输入!', type: 'error'})
                        return false
                    }
                    
                    this.postRequest('/school/add', this.formAdd).then(responsevo => {
                        if(!responsevo){  return  }
                        
                        // 添加成功
                        this.$message({ showClose: true, message: responsevo.msg, type: 'success'})
                        this.closeAddPage(true)
                    })
                })  
            },
            closeAddPage(addFlag){
                this.$emit("closeAddPage", addFlag)
            }
        },
        mounted() {
            this.schoolOptions = this.$store.state.schoolOptions
            this.gradeOptions = this.$store.state.gradeOptions
            this.classmasterOptions = this.$store.state.classmasterOptions
            this.currentDate = this.$store.state.currentDate
        }
    }
</script>

<style scoped="scoped">
    .el-card {
        margin-bottom: 30px;
        background-color: #d6d6d6;
    }
</style>
