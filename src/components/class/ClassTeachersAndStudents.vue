<template>
    <el-card class="box-card">
      	<!-- 查询条件区 -->
		<div slot="header">
			<h3 style="text-align:center">添加学生</h3>
		</div>
    
		<!-- 查询表单 -->
		<el-form ref="formAdd" :model="formAdd" label-width="70px">
        <!-- 行：1 -->
            <el-row :gutter="20">
                <!-- 列：1 -->
                <el-col :span="6">
                    <el-form-item label="昵称">
                        <el-input v-model="formQuery.name"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="6">
                    <el-form-item label="昵称">
                        <el-input v-model="formQuery.nickname"></el-input>
                    </el-form-item>
                </el-col>
                <!-- 列：2 -->
                <el-col :span="6">
                    <el-form-item label="活动校区" prop="schoolid">
                        <el-select v-model="formQuery.schoolid" clearable placeholder="请选择">
                        <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value"/>
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

			<!-- 行：2 -->
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="" >
						<!-- 查询结果展示区 -->
						<div>
							<el-table ref="queryResultList" :data="queryResultList" style="width: 100%" :row-class-name="tableRowClassName" 
								@select="resultTableSelectedOne" @select-all="resultTableSelectedAll">

								<el-table-column type="selection" width="55"></el-table-column>
								<el-table-column prop="nickname" label="昵称" />
								<el-table-column prop="schoolName" label="所在校区" />
								<el-table-column prop="phone" label="手机" />
							</el-table>
							<!-- 分页 -->
							<!-- @current-change:当前页码改变时触发 -->
							<el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
								:total="pageComponents.total" :page-size="pageComponents.pageSize" @current-change="queryCurrentPage">
							</el-pagination>
						</div>
					</el-form-item>
				</el-col>
			</el-row>
			
			<!-- 添加按钮 -->
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="">
						<el-button type="primary" @click="submitData">确 定</el-button>
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
                formAdd: {
                    yuwen: '',
                    math: '',
                    english: ''
                },
                pageComponents: {
                    total: 0, // 查询出的学生总人数
                    pageSize: 5, // 分页组件每页显示数量
                },
                queryResultList: [],
            }
        },
        methods: {
            // 单选
            resultTableSelectedOne(){

            },
            // 全选
            resultTableSelectedAll(){

            },
            // 确定
            submitData(){

            },
            // 关闭该页面
            closeClassTASPage(updateFlag){
                this.$emit('closeClassTASPage',updateFlag)
            },
            queryCurrentPage(){

            },
            // 
            getStudentList(){

            },
            tableRowClassName({ row, rowIndex }) {
                if ((rowIndex % 5) == 1) {
                    return 'rowOne'
                } else if ((rowIndex % 5) == 3) {
                    return 'rowTwo'
                }
                return ''
            },
        },
        mounted() {
            
        }
    }
</script>

<style>
</style>
