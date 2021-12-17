<template>
     <div class="app-container">
        <!-- 条件查询 -->       
        <el-form :inline="true" :model="query" size="small">
             <el-form-item label="标题">
                <el-input v-model.trim="query.title" placeholder="请输入标题"></el-input>
            </el-form-item>
             <el-form-item label="状态:">
                <el-select v-model="query.status" clearable placeholder="请选择">
                    <el-option v-for="item in processStatus" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
                <el-button icon="el-icon-refresh"  @click="reload">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row style="margin-bottom:20px">
          <el-button icon="el-icon-plus" size="small" type="primary" @click="clickShowForm('新增')">新增申请</el-button>
        </el-row>
         <!-- stripe 带斑马纹 -->
        <el-table :data="list" stripe border style="width: 100%">
            <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
            <el-table-column  align="center" prop="username" label="申请人" min-width="90" ></el-table-column>
            <el-table-column align="center" prop="title" label="标题" min-width="160"></el-table-column>
            <el-table-column  align="center" prop="description" label="描述" min-width="90" ></el-table-column>
            <!-- <el-table-column  align="center" prop="dep" label="申请部门" min-width="90" ></el-table-column>
            <el-table-column  align="center" prop="phone" label="联系电话" min-width="90" ></el-table-column> 
            <el-table-column align="center" prop="processType" label="流程类型" min-width="160"></el-table-column>
            <el-table-column align="center" prop="processType" label="文件名称" min-width="160"></el-table-column> -->
            <el-table-column  align="center" prop="createDateStr" label="创建时间" width="160"></el-table-column>
            <el-table-column  align="center" prop="statusStr" label="业务状态" width="90" >
                <template slot-scope="{row}">
                    <el-tag  effect="plain">{{row.statusStr}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="updateDateStr" label="更新日期" width="160"></el-table-column>
            <el-table-column  align="center" label="操作" fixed="right" width="220">
                <template slot-scope="{row}">
                    <!-- 0已撤回，1未提交，2处理中，3已完成 -->
                    <el-button v-if="row.status == 0 || row.status == 1" @click="clickShowForm('编辑', row)" type="text" >编辑</el-button>
                    <el-button v-if="row.status == 2 || row.status == 3 || row.status == 5" type="text" @click="clickDetailShowForm('详情', row)">详情</el-button>
                    <el-button v-if="row.status == 2" @click="clickCancelProcess(row)" type="text" >撤回</el-button>
                    <!-- <el-button v-if="row.status == 0" @click="clickSubmitApply(row)" type="text" >重新申请</el-button>
                    <el-button v-if="row.status == 1" @click="clickSubmitApply(row)" type="text" >提交申请</el-button> -->
                    <el-button v-if="row.status == 0" @click="clickSubmit(row)" type="text" >重新申请</el-button>
                    <el-button v-if="row.status == 1" @click="clickSubmit(row)" type="text" >提交申请</el-button>
                    <el-button v-if="row.status == 2 || row.status == 3 || row.status == 4" @click="clickProcessHistory(row)" type="text" >审批历史</el-button>
                </template>
            </el-table-column>
        </el-table>



        <!-- 合作区块筛选及报批表单 -->
        <el-dialog v-dialogDrag :title="operate" :visible.sync="formVisible" @close="closeForm(false)" width="1000px" destroy-on-close>
            <scrap-form :operate="operate" :businessKey="row.id" @close="closeForm"></scrap-form>
        </el-dialog>
        <!-- 撤回申请 -->
        <cancel-apply ref="cancelRef" :businessKey="row.id" :procInstId="row.processInstanceId"></cancel-apply>

         <!-- 审批历史 -->
        <history ref="historyRef" :businessKey="row.id" :processInstanceId="row.processInstanceId" ></history>

         <!-- 合作区块筛选及报批表单详情信息 -->
        <el-dialog v-dialogDrag :title="operate" :visible.sync="detailFormVisible" @close="closeForm(false)" width="1000px" destroy-on-close>
            <scrap-detail :operate="operate" :businessKey="row.id" @close="closeForm"></scrap-detail>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api/scrap'
import apiIns from '@/api/instance'
import ScrapDetail from './components/ScrapDetail'
import CancelApply from './components/CancelApply'
import ScrapForm from '@/components/Process/Form/ScrapForm'
import History from '@/components/Process/History'
// 流程状态
const processStatus = [
    {value: 0, label: '已撤回'},
    {value: 1, label: '待提交'},
    {value: 2, label: '处理中'},
    {value: 3, label: '已完成'},
    {value: 4, label: '已作废'},
    {value: 5, label: '已删除'},
]
export default {
    name: 'Scrap',
    components:{
        ScrapForm,
        ScrapDetail,
        CancelApply,
        History
    },
     data() {
        return {
            query: {},
            processStatus, // 流程状态
            page: {
                current: 1,
                size: 10,
                total: 0
            },
            operate: '新增', // 操作标识：新增，编辑，详情
            row: {}, //点击的行数据
            formVisible: false, // 显示隐藏业务表单
            detailFormVisible: false,
            list: [
                 {
                "id":"leave2:3:62509",
                "username": "meng1",
                "title":"测试",
                "startDateStr":"2022-02-24 08:12:12",
                "endDateStr":"2023-04-15 15:37:36",
                "statusStr": "处理中",
                "status": 2,
                "createDateStr": "2022-01-24 17:07:16"
              },
            ]
        }
    },
    created() {
        // 加载列表数据
        this.fetchData()
    },
    methods: {
        // 条件查询方法
        queryData() {
            this.page.current = 1
            this.fetchData()
        },
        // 分页条件查询文章列表
        async fetchData() {
        
            const { data } = await api.getList(this.query, this.page.current, this.page.size)
       
            console.log(data);
            this.list = data.data.records
            this.page.total = data.data.total
        },
           // 刷新重置
        reload() {
            this.query = {}
            this.fetchData()
        },
             // 点击显示表单
        clickShowForm(operate, row = {}) {
            this.operate = operate
            this.row = row
            this.formVisible = true
        },
           // 关闭表单
        closeForm(refresh) {
            // 清空点击数据
            this.row = {}
            // 隐藏
            this.formVisible = false
            // 刷新列表
            if(refresh) {
                this.fetchData()
            }
        },
         // 提交申请
        clickSubmit(row) {
            this.$confirm('此操作将发起申请, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                // console.log(row);
                const data = {
                            businessRoute: this.$route.name, // 当前业务路由名
                            businessKey: row.id, // 业务id
                            variables: {entity: row}, // 变量
                            //assignees: this.formData.assignees.split(',') // 审批人转为数组
                            //assignees: this.formData.assignees
                        }
                        // console.log(data);
                    apiIns.startProcessApply(data).then(res => {
                    // console.log(res);
                    if(res.data.code !== 200) return this.$message.error('申请失败')
                    this.$message.success('申请成功!')
                    this.fetchData()
                })

            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消申请'
            });          
            });
        },

          // 详情页
        clickDetailShowForm(operate, row = {}) {
            this.operate = operate
            this.row = row
            this.detailFormVisible = true
        },

          // 撤回申请
        clickCancelProcess(row) {
            this.row = row
            this.$refs.cancelRef.visible = true
        },

          // 点击审批进度
        clickProcessHistory(row) {
            this.row = row
            this.$refs.historyRef.visible = true

        },



    }
    
}
</script>

<style scoped>

</style>