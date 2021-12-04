<template>
    <el-card class="box-card">
      	<!-- 查询条件区 -->
		<div slot="header">
			<h3 style="text-align:center">添加教师学生</h3>
		</div>
    
		<!-- 查询表单 -->
		<el-form ref="formUpdate" :model="formUpdate" label-width="70px">
			<!-- 行：2 -->
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="" >
						<!-- 查询结果展示区 -->
						<div>
							<el-table ref="queryResultTable" :data="queryResultList" style="width: 100%" :row-class-name="tableRowClassName" 
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
