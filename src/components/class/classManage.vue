<template>
    <el-card class="box-card">
        <!-- 查询条件区 -->
        <div slot="header">
            <!-- 查询表单 -->
            <el-form ref="classForm" :model="classForm" label-width="80px">
                <!-- 行：1 -->
                <el-row :gutter="20">
                    <!-- 列：1 -->
                    <el-col :span="6">
                        <el-form-item label="校区">
                            <el-select v-model="classForm.schoolid" clearable placeholder="请选择">
                                <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- 列：2 -->
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="classForm.grade" clearable placeholder="请选择">
                                <el-option v-for="item in  gradeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- 列：3 -->
                    <el-col :span="3">
                        <el-form-item>
                            <!-- 查询按钮默认都查询第1页 -->
                            <el-button type="primary" @click="queryClassList(1,pageComponents.pageSize)">查询</el-button>
                        </el-form-item>
                    </el-col>
                    <!-- 列：4 -->
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="success" @click="showFlagAddPage = false;showFlagAddPage = true">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- 结果展示区 -->
        <div>
            <el-table :data="resultList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="schoolid" label="校区" :formatter="getTableSchoolname"/>
                <el-table-column prop="gradeName" label="年级" :formatter="getTableGradeName"/>
                <el-table-column prop="name" label="班名"/>
                <el-table-column prop="classmaster" label="班主任" :formatter="getTableClassmasterName"/>
                <el-table-column prop="yuwen" label="语文" :formatter="getTableYuwenName"/>
                <el-table-column prop="math" label="数学" :formatter="getTableMathName"/>
                <el-table-column prop="english" label="英语" :formatter="getTableEnglishName"/>
                <el-table-column prop="studentCount" label="学生（人）"/>
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <!-- 更新 -->
                        <el-button size="mini" type="warning" icon="el-icon-edit" @click="openClassUpdatePage(scope.row)"></el-button>
                        <!-- 删除 -->
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteClass(scope.row.id)"></el-button>
                        <!-- 增删改班级教师 -->
                        <el-button size="mini" type="warning" icon="el-icon-s-custom" @click="openClassTASPage(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- @current-change:当前页码改变时触发、 -->
            <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
                :total="pageComponents.total" :page-size="pageComponents.pageSize" @current-change="queryCurrentPage">
            </el-pagination>
        </div>

        <!-- 点击新增，弹出对话框填写学生信息 -->
        <el-dialog :visible.sync="showFlagAddPage" width="80%" :show-close="false" :close-on-press-escape="false" >
            <ClassAdd @closeClassAddPage="closeClassAddPage" :yuwenOptions="yuwenOptions" :mathOptions="mathOptions" :englishOptions="englishOptions" :weekOptions="weekOptions" :startTimeOptions="startTimeOptions">
            </ClassAdd>
        </el-dialog>
        <!-- 点击修改，弹出对话框填写学生信息 -->
        <el-dialog :visible.sync="showFlagUpdatePage" width="80%" :show-close="false" :close-on-press-escape="false" >
            <ClassUpdate @closeClassUpdatePage="closeClassUpdatePage" :oneUpdate="oneUpdate" :yuwenOptions="yuwenOptions" :mathOptions="mathOptions" :englishOptions="englishOptions" :weekOptions="weekOptions" :startTimeOptions="startTimeOptions">
            </ClassUpdate>
        </el-dialog>
        <!-- 点击修改，展示班级学生教师修改页面 -->
        <el-dialog :visible.sync="showFlagClassTASPage" width="80%" :show-close="false" :close-on-press-escape="false" >
            <ClassTeachersAndStudents @closeClassTASPage="closeClassTASPage">
            </ClassTeachersAndStudents>
        </el-dialog>

    </el-card>
</template>

<script>
    import ClassAdd from '@/components/class/ClassAdd.vue' 
    import ClassUpdate from '@/components/class/ClassUpdate.vue'
    import ClassTeachersAndStudents from '@/components/class/ClassTeachersAndStudents.vue'

    export default {
        name: 'studentManage',
        components: {
           ClassAdd,
           ClassUpdate,
           ClassTeachersAndStudents
        },
        data() {
            return {
                classForm: {
                    schoolid: '',
                    grade: ''
                },
                resultList: [],
                schoolOptions: [], 
                gradeOptions: [],
                showFlagAddPage: false,
                showFlagUpdatePage: false,
                showFlagClassTASPage: false,//展示班级学生教师修改页面标记
                oneUpdate: {},//需要更新的班级原信息
                classmasterOptions: [],//班主任
                subjectTeachers: [],//三大学科教师
                pageComponents: {
                    total: 0, // 查询出的学生总人数
                    pageSize: 5, // 分页组件每页显示数量
                },
                weekOptions: [{ value: "1", label: '周一' }, { value: "2", label: '周二' }, { value: "3", label: '周三' },
                              { value: "4", label: '周四' }, { value: "5", label: '周五' }, { value: "6", label: '周六' }, { value: "7", label: '周日' }],
                startTimeOptions: [{ value: "08:30"}, { value: "10:30"}, { value: "13:30"}, { value: "15:30"}, { value: "17:30"}],
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
            queryClassList(currentPage, pageSize) {
                // 拼装请求参数
                let queryParams = {
                  schoolid: this.classForm.schoolid,
                  grade: this.classForm.grade,
                  currentPage,
                  pageSize
                }
                
                this.getRequest('/classes/query', queryParams).then(responsevo => {
                    if (!responsevo) { return } // 查询失败
                    const pageVo = responsevo.data
                    // 查询成功
                    this.resultList = pageVo.data
                    this.pageComponents.total = pageVo.total
                })
            },
            tableRowClassName({ row, rowIndex }) {
                if ((rowIndex % 5) == 1) {
                    return 'rowOne'
                } else if ((rowIndex % 5) == 3) {
                    return 'rowTwo'
                }
                return ''
            },
            queryCurrentPage(currentPage) {
                this.queryClassList(currentPage, this.pageComponents.pageSize)
            },
            // 删除班级
            deleteClass(id) {
                this.$confirm('此操作将永久删除该班级, 是否继续？', '警告', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'error'}).then(() => {
                   this.postRequest('/classes/delete', { id }).then( responsevo => {
                        if (!responsevo) { return }
                        // 删除成功
                        this.$message({ showClose: true, message: responsevo.msg, type: 'success' })
                        this.queryClassList(1, this.pageComponents.pageSize)
                    })
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消' });
                });
            },
            // 关闭增加页面
            closeClassAddPage(addFlag){
                if(addFlag){
                    this.queryClassList(1,this.pageComponents.pageSize)
                }
                this.showFlagAddPage = false
            },
            // 打开修改班级信息页面
            openClassUpdatePage(row){
                this.oneUpdate = row
                this.showFlagUpdatePage = false
                this.showFlagUpdatePage =true
            },
            // 关闭修改页面
            closeClassUpdatePage(updateFlag){
                if(updateFlag){
                    this.queryClassList(1,this.pageComponents.pageSize)
                }
                this.showFlagUpdatePage = false
            },
            // 展示班级学生教师修改页面
            openClassTASPage(row){
                this.showFlagClassTASPage = false
                this.showFlagClassTASPage = true
            },
            closeClassTASPage(update){
                if(update){
                    this.queryCurrentPage(1)
                }
                this.showFlagClassTASPage = false
            },
            // 获取表格中校区名称
            getTableSchoolname(row){
                return this.schoolOptions.find( item => item.value == row.schoolid).label
            },
            // 获取表格中班级名称
            getTableGradeName(row){
                return this.gradeOptions.find( item => item.value == row.grade).label
            },
            // 获取表格中班主任名字
            getTableClassmasterName(row){
                return this.classmasterOptions.find( item => item.value == row.classmaster).label
            },
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
            // 获取表格中语文教师名字
            getTableYuwenName(row){
                return this.yuwenOptions.find( item => item.value == row.yuwen).label
            },
            // 获取表格中数学教师名字
            getTableMathName(row){
                return this.mathOptions.find( item => item.value == row.math).label
            },
            // 获取表格中英语教师名字
            getTableEnglishName(row){
                return this.englishOptions.find( item => item.value == row.english).label
            }
        },
        mounted() {
            this.schoolOptions = this.$store.state.schoolOptions
            this.gradeOptions = this.$store.state.gradeOptions
            this.$store.commit('getClassmasterOptions') //班主任
            this.classmasterOptions = this.$store.state.classmasterOptions
            this.getSubjectTeachers()
        }
    }
</script>

<style scoped="scoped">
    .el-table>>>.rowOne {
        background: oldlace;
    }

    .el-table>>>.rowTwo {
        background: #f0f9eb;
    }

    /* 卡片组件 */
    .el-card {
        background-color: #d6d6d6;
    }

    /* 分页组件 */
    .el-pagination {
        margin-top: 20px;
    }

    /* 对话框组件 */
    .el-card>>>.el-dialog {
        background-color: #f0f9eb;
    }
</style>
