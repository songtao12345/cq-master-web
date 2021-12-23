<template>
    <div class="app-container">
        <!-- 条件查询 -->        
        <el-form  :inline="true" :model="query" size="small">
            <el-form-item label="流程名称">
                <el-input v-model.trim="query.processName" placeholder="请输入流程名称"></el-input>
            </el-form-item>
            <el-form-item label="流程发起人">
              <el-input v-model.trim="query.proposer" placeholder="请输入流程发起人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
                <el-button icon="el-icon-refresh"  @click="reload">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- stripe 带斑马纹 -->
        <el-table :data="list" stripe border style="width: 100%">
            <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
            <el-table-column align="center" prop="proposer" label="流程发起人" width="180" ></el-table-column>
            <el-table-column align="center" prop="processInstanceName" label="流程名称" min-width="100"></el-table-column>
            <el-table-column align="center" prop="status" label="业务状态" width="80" ></el-table-column>
            <el-table-column align="center" prop="deleteReason" label="原因详情" min-width="170" ></el-table-column>
            <el-table-column align="center" prop="processKey" label="流程标识Key" width="150"></el-table-column>
            <el-table-column align="center" label="版本号" width="90" >
                <template slot-scope="{row}"> v{{row.version}}.0</template>
            </el-table-column>
            <el-table-column align="center" prop="processInstanceId" label="流程实例ID" min-width="150"></el-table-column>
            <el-table-column align="center" prop="startTime" label="开始日期" width="160"></el-table-column>
            <el-table-column align="center" prop="endTime" label="结束日期" width="160"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="230">
                <template slot-scope="{row}">
                    <el-button @click="clickProcessHistory(row)" type="text" >审批历史</el-button>
                    <el-button type="text" @click="download(row)" >下载</el-button>
                    <el-popconfirm :title="`您确定删除【${row.processInstanceName || row.processKey}】和审批历史记录吗？`" @onConfirm="clickDelete(row.processInstanceId)" >
                        <el-button slot="reference" type="text" style="margin-left: 12px">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 20, 50]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>

        <!-- 审批历史 -->
        <history ref="historyRef" :businessKey="row.businessKey" :processInstanceId="row.processInstanceId" ></history>

    </div>
</template>
<script>
import api from '@/api/instance'

import History from '@/components/Process/History'

export default {
    name: 'Finish', // 和对应路由表中配置的name值一致
    components: {History},
    data() {
        return {
            list: [
                {
                    "processInstanceId":"fc6176cb-e232-11eb-8cf6-2c337a6d7e1d",
                    "proposer":"mengxuegu",
                    "businessKey":"1414169550256177154",
                    "processKey":"leaveProcess",
                    "startTime":"2021-07-11 18:30:17",
                    "endTime":"2021-07-11 19:20:21",
                    "version":2,
                    "processInstanceName":"请假流程",
                    "status":"已完成"
                }
            ],
            page: {
                current: 1,
                size: 10,
                total: 0
            },
            query: {}, // 查询条件
            row: {}, // 点击的行数据
        }
    },

    created() {
        this.fetchData()
    },

    methods: {
        // 分页条件查询列表
        async fetchData() {
            const { data } = await api.getProcInstListFinish(this.query, this.page.current, this.page.size)
            this.list = data.data.records
            this.page.total = data.data.total
        },
        // 当每页显示多少条改变后触发
        handleSizeChange(val) {
            this.page.size = val
            this.fetchData()
        },
        // 切换页码触发
        handleCurrentChange(val) {
            this.page.current = val
            this.fetchData()
        },

        // 条件查询方法
        queryData() {
            this.page.current = 1
            this.fetchData()
        },

        // 刷新重置
        reload() {
            this.query = {}
            this.fetchData()
        },

        // 点击审批历史
        clickProcessHistory(row) {
            this.row = row
            this.$refs.historyRef.visible = true
        },

        // 删除流程实例和审批历史记录
        async clickDelete(procInstId) {
            // 发送删除请求
            // code    code
            const {data} = await api.deleteProcInstAndHistory(procInstId)
            if(data.code === 200) {
                this.$message.success('删除成功')
                // 刷新列表数据
                this.fetchData()
            }
        },

          // 下载
        download(row){
            console.log(row);
            if(row.processName === '油气资产弃置流程'){
                window.open('http://localhost:9528/doaa/download/'+row.businessKey)
            }else if(row.processName === '合同管理流程'){
                window.open('http://localhost:9528/cmc/download/'+row.businessKey)
            }else if(row.processName === '薪酬管理标准和实施细则'){
                window.open('http://localhost:9528/smsaIr/download/'+row.businessKey)
            }else if(row.processName === '油水井资产报废流程'){
                window.open('http://localhost:9528/soaga/download/'+row.businessKey)
            }else if(row.processName === '合作项目年度审计'){
                window.open('http://localhost:9528/aacp/download/'+row.businessKey)
            }else if(row.processName === '石油合作项目操作费预算'){
                window.open('http://localhost:9528/dpp/download/'+row.businessKey)
            }else if(row.processName === '安全生产费用使用'){
                window.open('http://localhost:9528/uospf/download/'+row.businessKey)
            }else if(row.processName === '老油田稳产方案'){
                window.open('http://localhost:9528/spoof/download/'+row.businessKey)
            }else if(row.processName === '年度开发计划'){
                window.open('http://localhost:9528/adp/download/'+row.businessKey)
            }else if(row.processName === '原油结算'){
                window.open('http://localhost:9528/cos/download/'+row.businessKey)
            }else if(row.processName === '合作项目管理'){
                window.open('http://localhost:9528/cpm/download/'+row.businessKey)
            }else if(row.processName === '召开联管会'){
                window.open('http://localhost:9528/hjmm/download/'+row.businessKey)
            }else if(row.processName === '项目申报与审批'){
                window.open('http://localhost:9528/paaac/download/'+row.businessKey)
            }else if(row.processName === '合作方招标'){
                window.open('http://localhost:9528/pb/download/'+row.businessKey)
            }else if(row.processName === '合作区块筛选及报批'){
                window.open('http://localhost:9528/cbsp/download/'+row.businessKey)
            }
            
        }




    }
}
</script>