<template>
    <el-card>

        <div slot="header">
            <h3 style="text-align:center">添加校区</h3>
        </div>

        <el-form ref="formAdd" :model="formAdd" :rules="addRules" label-width="80px">

            <!-- 行：1 -->
            <el-row :gutter="20">
                <!-- 列：1 -->
                <el-col :span="8">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="formAdd.name" autocomplete="off" placeholder="20个字符以内"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="8">
                    <el-form-item label="校长" prop="schoolmaster">
                        <el-select v-model="formAdd.schoolmaster" clearable placeholder="请选择">
                            <el-option v-for="item in schoolmasterOptions" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- 列：3 -->
                <el-col :span="8">
                    <el-form-item label="校长电话" prop="phone">
                        <el-input v-model="formAdd.phone" autocomplete="off" placeholder="11位手机号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 行：2 -->
            <el-row :gutter="20">
                <!-- 列：1 -->
                <el-col :span="8">
                    <el-form-item label="校区电话" prop="telephone">
                        <el-input v-model="formAdd.telephone" autocomplete="off" placeholder="8位座机号码"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="8">
                    <el-form-item label="建校日期" prop="birthday">
                        <el-date-picker v-model="formAdd.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <!-- 行：3 -->
            <el-row :gutter="20">
                <!-- 列：1 -->
                <el-col :span="24">
                    <el-form-item label="地址" prop="address">
                        <el-input type="textarea" v-model="formAdd.address" placeholder="500个字符以内"></el-input>
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
        name: 'SchoolAdd',
        props: ['schoolmasterOptions'],
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
                // 校验添加的校区信息
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
            // 添加校区
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
            this.formAdd.birthday = this.$store.state.currentDate
        }
    }
</script>

<style scoped="scoped">
    .el-card {
        margin-bottom: 30px;
        background-color: #d6d6d6;
    }
</style>
