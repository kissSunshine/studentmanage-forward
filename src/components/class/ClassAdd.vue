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
                        <el-input v-model="formAdd.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="8">
                    <el-form-item label="开班日期" prop="birthday">
                        <el-input v-model="formAdd.birthday" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 行：3 -->
			<el-row :gutter="20">
				<!-- 列：1 -->
				<el-col :span="6">
					<el-form-item label="语文" prop="yuwen">
						<el-select v-model="formAdd.yuwen" clearable placeholder="请选择">
							<el-option v-for="item in yuwenOptions" :key="item.value" :label="item.label" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- 列：2 -->
				<el-col :span="6">
					<el-form-item label="日期" prop="yuwenWeek">
						<el-select v-model="formAdd.yuwenWeek" clearable placeholder="请选择">
							<el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- 列：3 -->
				<el-col :span="6">
					<el-form-item label="开始" prop="yuwenStartTime">
                        <el-select v-model="formAdd.yuwenStartTime" clearable placeholder="请选择" @change="setEndTime(formAdd.yuwenStartTime,'yuwen')">
							<el-option v-for="item in startTimeOptions" :key="item.value" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
                <!-- 列：4 -->
				<el-col :span="6">
					<el-form-item label="结束" prop="yuwenEndTime">
                        <el-input v-model="formAdd.yuwenEndTime" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

            <!-- 行：4 -->
			<el-row :gutter="20">
				<!-- 列：1 -->
				<el-col :span="6">
					<el-form-item label="数学" prop="math">
						<el-select v-model="formAdd.math" clearable placeholder="请选择">
							<el-option v-for="item in mathOptions" :key="item.value" :label="item.label" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- 列：2 -->
				<el-col :span="6">
					<el-form-item label="日期" prop="mathWeek">
						<el-select v-model="formAdd.mathWeek" clearable placeholder="请选择">
							<el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- 列：3 -->
				<el-col :span="6">
					<el-form-item label="开始" prop="mathStartTime">
                        <el-select v-model="formAdd.mathStartTime" clearable placeholder="请选择" @change="setEndTime(formAdd.mathStartTime,'math')">
							<el-option v-for="item in startTimeOptions" :key="item.value" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
                <!-- 列：4 -->
				<el-col :span="6">
					<el-form-item label="结束" prop="mathEndTime">
                        <el-input v-model="formAdd.mathEndTime" :disabled="true"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

            <!-- 行：5 -->
			<el-row :gutter="20">
				<!-- 列：1 -->
				<el-col :span="6">
					<el-form-item label="英语" prop="english">
						<el-select v-model="formAdd.english" clearable placeholder="请选择">
							<el-option v-for="item in englishOptions" :key="item.value" :label="item.label" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- 列：2 -->
				<el-col :span="6">
					<el-form-item label="日期" prop="englishWeek">
						<el-select v-model="formAdd.englishWeek" clearable placeholder="请选择">
							<el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- 列：3 -->
				<el-col :span="6">
					<el-form-item label="开始" prop="englishStartTime">
                        <el-select v-model="formAdd.englishStartTime" clearable placeholder="请选择" @change="setEndTime(formAdd.englishStartTime,'english')">
							<el-option v-for="item in startTimeOptions" :key="item.value" :value="item.value"/>
						</el-select>
					</el-form-item>
				</el-col>
                <!-- 列：4 -->
				<el-col :span="6">
					<el-form-item label="结束" prop="englishEndTime">
                        <el-input v-model="formAdd.englishEndTime" :disabled="true"></el-input>
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
        props: ['yuwenOptions','mathOptions','englishOptions'],
        data() {
            return {
                formAdd: {
                    schoolid: '',
                    grade: '',
                    classmaster: '',
                    name: '',
                    birthday: this.$store.state.currentDate,
                    yuwen: '',
                    yuwenWeek: '',
                    yuwenStartTime: '',
                    yuwenEndTime: '',
                    math: '',
                    mathWeek: '',
                    mathStartTime: '',
                    mathEndTime: '',
                    english: '',
                    englishWeek: '',
                    englishStartTime: '',
                    englishEndTime: '',
                    updatedPerson: '大熊'
                },
                schoolOptions: [],
                gradeOptions: [],
                classmasterOptions: [],
                weekOptions: [{ value: "1", label: '周一' }, { value: "2", label: '周二' }, { value: "3", label: '周三' },
                              { value: "4", label: '周四' }, { value: "5", label: '周五' }, { value: "6", label: '周六' }, { value: "7", label: '周日' }],
                startTimeOptions: [{ value: "08:30"}, { value: "10:30"}, { value: "13:30"}, { value: "15:30"}, { value: "17:30"}],
                // 校验添加的班级信息
                addRules: {
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
            addOne() {
                // 1、校验
                this.$refs.formAdd.validate( valid => {
                    // 校验失败，则阻断提示
                    if (!valid) {
                        this.$message({ showClose: true, message: '请按照要求，重新输入!', type: 'error'})
                        return false
                    }
                    
                    this.postRequest('/classes/add', this.formAdd).then(responsevo => {
                        if(!responsevo){  return  }
                        
                        // 添加成功
                        this.$message({ showClose: true, message: responsevo.msg, type: 'success'})
                        this.closeAddPage(true)
                    })
                })  
            },
            closeAddPage(addFlag){
                this.$emit("closeClassAddPage", addFlag)
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
                    case "yuwen": this.formAdd.yuwenEndTime = endTime;break
                    case "math": this.formAdd.mathEndTime = endTime;break
                    case "english": this.formAdd.englishEndTime = endTime;break
                }
            }
        },
        mounted() {
            this.schoolOptions = this.$store.state.schoolOptions
            this.gradeOptions = this.$store.state.gradeOptions
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
