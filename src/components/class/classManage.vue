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
                            <el-select v-model="formAdd.schoolid" clearable placeholder="请选择">
                                <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- 列：2 -->
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="formAdd.grade" clearable placeholder="请选择">
                                <el-option v-for="item in  gradeOptions" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- 结果展示区 -->
        <div>
            <el-table :data="queryResultList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="schoolName" label="校区" />
                <el-table-column prop="gradeName" label="年级" />
                <el-table-column prop="yuwen" label="语文" />
                <el-table-column prop="math" label="数学" />
                <el-table-column prop="english" label="英语" />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- @current-change:当前页码改变时触发 -->
            <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
                :total="pageComponents.total" :page-size="pageComponents.pageSize" @current-change="queryCurrentPage">
            </el-pagination>
        </div>

    </el-card>
</template>

<script>
  

    export default {
        name: 'studentManage',
        components: {
           
        },
        data() {
            return {
                classForm: {
                    schoolid: '',
                    grade: ''
                },
                schoolOptions: [], 
                gradeOptions: [],
                pageComponents: {
                    total: 0, // 查询出的学生总人数
                    pageSize: 5, // 分页组件每页显示数量
                }
            }
        },
        methods: {
            queryClassList(currentPage, pageSize) {
                this.getRequest('/class/query', this.classForm).then(responsevo => {
                    if (!responsevo) { return } // 查询失败
                    const pageVo = responsevo.data

                    // 查询成功
                    this.queryResultList = pageVo.data
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
                this.queryqueryResultList(currentPage, this.pageComponents.pageSize)
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
                this.postRequest('/student/delete', { id }).then( responsevo => {
                    if (!responsevo) { return }
                    // 删除成功
                    this.$message({ showClose: true, message: responsevo.msg, type: 'success' })
                    this.queryqueryResultList(1, this.pageComponents.pageSize)
                })
            }
        },
        mounted() {
            this.schoolOptions = this.$store.state.schoolOptions
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
