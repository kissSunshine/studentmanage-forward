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
                            <el-button type="success" @click="openAddPage">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- 结果展示区 -->
        <div>
            <el-table :data="resultList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="schoolName" label="校区" />
                <el-table-column prop="gradeName" label="年级" />
                <el-table-column prop="yuwen" label="语文" />
                <el-table-column prop="math" label="数学" />
                <el-table-column prop="english" label="英语" />
                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <!-- 更新 -->
                        <el-tooltip effect="dark" content="更新班级" placement="top">
                            <el-button size="mini" type="warning" icon="el-icon-edit" @click="openClassUpdatePage(scope.row)"></el-button>
                        </el-tooltip>
                        <!-- 删除 -->
                        <el-tooltip effect="dark" content="删除班级" placement="top">
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="openClassDeletePage(scope.row.id)"></el-button>
                        </el-tooltip>
                        <!-- 增删改班级教师 -->
                        <el-tooltip effect="dark" content="修改教师" placement="top">
                            <el-button size="mini" type="warning" icon="el-icon-s-custom" @click="openClassTeacherPage(scope.row)"></el-button>
                        </el-tooltip>
                        <!-- 增删改班级学生 -->
                        <el-tooltip effect="dark" content="修改学生" placement="top">
                            <el-button size="mini" type="warning" icon="el-icon-user" @click="openClassStudentPage(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- @current-change:当前页码改变时触发 -->
            <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
                :total="pageComponents.total" :page-size="pageComponents.pageSize" @current-change="queryCurrentPage">
            </el-pagination>
        </div>

         <!-- 点击新增，弹出对话框填写学生信息 -->
        <el-dialog :visible.sync="showFlagAddPage" width="80%" :show-close="false" :close-on-press-escape="false" >
            <ClassAdd >
            </ClassAdd>
        </el-dialog>

    </el-card>
</template>

<script>
    import ClassAdd from '@/components/class/ClassAdd.vue' 

    export default {
        name: 'studentManage',
        components: {
           ClassAdd,
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
                pageComponents: {
                    total: 0, // 查询出的学生总人数
                    pageSize: 5, // 分页组件每页显示数量
                }
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
            deleteStudentConfirm(id) {
                this.$confirm('此操作将永久删除该班级, 是否继续？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.deleteClass(id)
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消' });
                });
            },
            deleteClass(id) {
                this.postRequest('/class/delete', { id }).then( responsevo => {
                    if (!responsevo) { return }
                    // 删除成功
                    this.$message({ showClose: true, message: responsevo.msg, type: 'success' })
                    this.queryClassList(1, this.pageComponents.pageSize)
                })
            },
            // 打开新增页面
            openAddPage(){

            },
            // 打开修改页面
            openUpdatePage(row){

            },
            // 打开关闭页面
            openDeletePage(id){

            },
            // 增删改班级教师
            openClassTeacherPage(row){

            },
            // 增删改班级学生
            openClassStudentPage(){

            }
        },
        mounted() {
            this.schoolOptions = this.$store.state.schoolOptions
            this.gradeOptions = this.$store.state.gradeOptions
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
