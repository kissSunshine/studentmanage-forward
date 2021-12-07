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
            
            <!-- 行：3 -->
            <el-row :gutter="20">
            	<!-- 列：1 -->
            	<el-col :span="6">
            		<el-form-item label="语文" prop="yuwen">
            			<el-select v-model="formUpdate.yuwen" clearable placeholder="请选择">
            				<el-option v-for="item in yuwenOptions" :key="item.value" :label="item.label" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
            	<!-- 列：2 -->
            	<el-col :span="6">
            		<el-form-item label="日期" prop="yuwenWeek">
            			<el-select v-model="formUpdate.yuwenWeek" clearable placeholder="请选择">
            				<el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
            	<!-- 列：3 -->
            	<el-col :span="6">
            		<el-form-item label="开始" prop="yuwenStartTime">
                        <el-select v-model="formUpdate.yuwenStartTime" clearable placeholder="请选择" @change="setEndTime(formUpdate.yuwenStartTime,'yuwen')">
            				<el-option v-for="item in startTimeOptions" :key="item.value" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>   
                <!-- 列：4 -->
            	<el-col :span="6">
            		<el-form-item label="结束" prop="yuwenEndTime">
                        <el-input v-model="formUpdate.yuwenEndTime" :disabled="true"></el-input>
            		</el-form-item>
            	</el-col>
            </el-row>
            
            <!-- 行：4 -->
            <el-row :gutter="20">
            	<!-- 列：1 -->
            	<el-col :span="6">
            		<el-form-item label="数学" prop="math">
            			<el-select v-model="formUpdate.math" clearable placeholder="请选择">
            				<el-option v-for="item in mathOptions" :key="item.value" :label="item.label" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
            	<!-- 列：2 -->
            	<el-col :span="6">
            		<el-form-item label="日期" prop="mathWeek">
            			<el-select v-model="formUpdate.mathWeek" clearable placeholder="请选择">
            				<el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
            	<!-- 列：3 -->
            	<el-col :span="6">
            		<el-form-item label="开始" prop="mathStartTime">
                        <el-select v-model="formUpdate.mathStartTime" clearable placeholder="请选择" @change="setEndTime(formUpdate.mathStartTime,'math')">
            				<el-option v-for="item in startTimeOptions" :key="item.value" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
                <!-- 列：4 -->
            	<el-col :span="6">
            		<el-form-item label="结束" prop="mathEndTime">
                        <el-input v-model="formUpdate.mathEndTime" :disabled="true"></el-input>
            		</el-form-item>
            	</el-col>
            </el-row>
            
            <!-- 行：5 -->
            <el-row :gutter="20">
            	<!-- 列：1 -->
            	<el-col :span="6">
            		<el-form-item label="英语" prop="english">
            			<el-select v-model="formUpdate.english" clearable placeholder="请选择">
            				<el-option v-for="item in englishOptions" :key="item.value" :label="item.label" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
            	<!-- 列：2 -->
            	<el-col :span="6">
            		<el-form-item label="日期" prop="englishWeek">
            			<el-select v-model="formUpdate.englishWeek" clearable placeholder="请选择">
            				<el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
            	<!-- 列：3 -->
            	<el-col :span="6">
            		<el-form-item label="开始" prop="englishStartTime">
                        <el-select v-model="formUpdate.englishStartTime" clearable placeholder="请选择" @change="setEndTime(formUpdate.englishStartTime,'english')">
            				<el-option v-for="item in startTimeOptions" :key="item.value" :value="item.value"/>
            			</el-select>
            		</el-form-item>
            	</el-col>
                <!-- 列：4 -->
            	<el-col :span="6">
            		<el-form-item label="结束" prop="englishEndTime">
                        <el-input v-model="formUpdate.englishEndTime" :disabled="true"></el-input>
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
        props: ['oneUpdate','yuwenOptions','mathOptions','englishOptions','weekOptions','startTimeOptions'],
        data() {
            return {
                formUpdate: {
                    schoolid: '',
                    grade: '',
                    classmaster: '',
                    name: '',
                    birthday: '',
                    yuwenCRTID: '',
                    yuwen: '',
                    yuwenWeek: '',
                    yuwenStartTime: '',
                    yuwenEndTime: '',
                    mathCRTID: '',
                    math: '',
                    mathWeek: '',
                    mathStartTime: '',
                    mathEndTime: '',
                    englishCRTID: '',
                    english: '',
                    englishWeek: '',
                    englishStartTime: '',
                    englishEndTime: '',
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
                    yuwen: [{required: true, message: '请选择语文教师', trigger: 'blur'}],
                    yuwenWeek: [{required: true, message: '请选择语文上课日期', trigger: 'blur'}],
                    yuwenStartTime: [{required: true, message: '请选择语文上课时间', trigger: 'blur'}],
                    yuwenEndTime: [{required: true, message: '请选择语文上课时间', trigger: 'blur'}],
                    math: [{required: true, message: '请选择数学教师', trigger: 'blur'}],
                    mathWeek: [{required: true, message: '请选择数学上课日期', trigger: 'blur'}],
                    mathStartTime: [{required: true, message: '请选择数学上课时间', trigger: 'blur'}],
                    mathEndTime: [{required: true, message: '请选择数学上课时间', trigger: 'blur'}],
                    english: [{required: true, message: '请选择英语教师', trigger: 'blur'}],
                    englishWeek: [{required: true, message: '请选择英语上课日期', trigger: 'blur'}],
                    englishStartTime: [{required: true, message: '请选择英语上课时间', trigger: 'blur'}],
                    englishEndTime: [{required: true, message: '请选择英语上课时间', trigger: 'blur'}],
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
            },
            // 选择开始时间后自动计算结束时间
            setEndTime(startTime,subject){
                let endTime = ""
                switch(startTime){
                    case "08:30": endTime = "10:30";break
                    case "10:30": endTime = "12:30";break
                    case "13:30": endTime = "15:30";break
                    case "15:30": endTime = "17:30";break
                    case "17:30": endTime = "19:30";break
                }
                switch(subject){
                    case "yuwen": this.formUpdate.yuwenEndTime = endTime;break
                    case "math": this.formUpdate.mathEndTime = endTime;break
                    case "english": this.formUpdate.englishEndTime = endTime;break
                }
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
