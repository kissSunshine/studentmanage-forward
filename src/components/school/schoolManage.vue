<template>
    <div>
        <el-row :gutter="30">
            <el-col :span="6" v-for="school in schoolList" :key="school.id">
                <el-card style="margin-top: 25px;">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image" @click="opeanUpdate(school.id)">
                    <div style="padding: 14px;">
                        <span>{{school.name}}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="margin-top: 25px; height: 328.8px; width: 295.3px;">
                    <el-button type="primary" icon="el-icon-plus" circle style="font-size: 120px;margin-top: 25%;margin-left: 23%;" @click="showFlagAdd = false;showFlagAdd = true"></el-button>
                </el-card>
            </el-col>
        </el-row>
        
        <!-- 新增校区页面 -->
        <el-dialog :visible.sync="showFlagAdd" width="80%" :show-close="false" :close-on-press-escape="false" >
            <SchoolAdd :schoolmasterOptions="schoolmasterOptions" @closeAddPage="closeAddPage"></SchoolAdd>
        </el-dialog>
    </div>
</template>

<script>
import SchoolAdd from './SchoolAdd.vue'    
    
export default {
    name: 'schoolManage',
    components: {
        SchoolAdd
    },
    data(){
        return {
            schoolList: [],//校区列表
            showFlagAdd: false,//新增校区页面展示标志；true-展示；false-隐藏,
            schoolmasterOptions: []
        }
    },
    methods:{
        closeAddPage(addFlag){
            if(addFlag){
                this.$store.commit('getSchoolList')
            }
            this.showFlagAdd = false
        },
        getSchoolmasterList(){
            let queryparams = {
                position: '01',
                currentPage: 1,
                pageSize: 999
            }
            this.getRequest('/teacher/query',queryparams).then( responsevo => {
                if(!responsevo){ return }
                // 查询成功，封装为下拉选
                const schoolmasterList = responsevo.data.data
                for (let i = 0; i < schoolmasterList.length; i++) {
                    let schoolmaster = {
                        value: '',
                        label: ''
                    }
                    schoolmaster.value = schoolmasterList[i].id
                    schoolmaster.label = schoolmasterList[i].name
                    this.schoolmasterOptions.push(schoolmaster)
                }
            })
        }
    },
    mounted() {
        this.schoolList = this.$store.state.schoolList
        this.getSchoolmasterList()
    }
}
</script>

<style>
    .el-dialog {
        background-color: #f0f9eb;
    }
</style>
