<template>
    <div>
        <!--    卡片区域视图-->
    <el-card>
    <!--      标题区域-->
      <el-row class="title" >
        <el-col :span="20">权限列表</el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddPermissionDialog">新增</el-button>
        </el-col>
      </el-row>
      <!--      搜索框表单-->
      <el-form :inline="true" size="small">
        <!-- <el-form-item label="权限名称">
          <el-input v-model="query" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-search" type="primary" @click="getPermissionList">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch" >重置</el-button>
        </el-form-item> -->
      </el-form>
      <!--      刷新按鈕-->
      <el-row class="title">
        <el-col :span="4" :offset="22">
          <el-button type="info" icon="el-icon-refresh" @click="getPermissionList"></el-button>
        </el-col>
      </el-row>
<!--      菜单列表表格区域视图-->
      <el-table :data = "permissionList" border stripe  row-key="id" lazy :load="getChildMenus"   :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
        <el-table-column fixed align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="菜单标题" min-width="160" prop="title"></el-table-column>
        <el-table-column label="路径" min-width="160" prop="path"></el-table-column>
        <el-table-column label="菜单类型" min-width="160" prop="level">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level === 1">一级</el-tag>
              <el-tag v-if="scope.row.level === 2">二级</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditPermissionDialog(scope.row.id)"></el-button>
            <el-button type="danger"  icon="el-icon-delete" size="mini" @click="removePermission(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--    新增对话框-->
    <el-dialog
      title="新增菜单"
      :visible.sync="addPermissionDialogVisible"
      width="50%"
    @close="addPermissionDialogClosed">
      <el-form :model="addPermissionForm" :rules="addPermissionFormRules" ref="addPermissionFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="name">
          <!-- <el-input v-model="addPermissionForm.name"></el-input> -->
          <el-radio-group v-model="addPermissionForm.level">
            <el-radio-button label="1" >一级菜单</el-radio-button>
            <el-radio-button label="2" >二级菜单</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="addPermissionForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addPermissionDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addPermission">确 定</el-button>
  </span>
    </el-dialog>



    </div>
</template>

<script>
import {getPermission, editPermission, deletePermission, addPermission} from '@/api/system/permission'
export default {
    name: 'Permission',
    data() {
      return {
        addPermissionDialogVisible: false,
        permissionList: [],
        // 查询数据
        query: '',
        addPermissionForm: {},
        // 新增表单的验证对象
        addPermissionFormRules: {
          title: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
            { min: 1, max: 10, message: '权限名称的长度在1到10之间', trigger: 'blur' }
          ]
         
        },


        
        }
    },
    created() {
      this.getPermissionList()
    },
    methods: {
         // 展示新增角色的对话框
        showAddPermissionDialog() {
        this.addPermissionDialogVisible = true
        // this.getPermissionList()
        },
         // 获取权限列表
        async getPermissionList() {
        const {data : res} = await getPermission(this.query)
        console.log(res);
        if (res.code !== 200) {
            this.$message.error('获取角色列表失败')
        }
        // debugger
        this.permissionList = res.data
        // console.log(this.permissionList);
        
        },
         // 搜索框的重置方法
        resetSearch() {
        this.query = ''
        this.getPermissionList()
        },
        async showEditPermissionDialog(id) {
            console.log(id);
        },
        // 根据用户id删除用户信息
        async removePermission(id) {
            console.log(id);
        },

        getChildMenus(tree, treeNode, resolve) {
            console.log(tree);
        },

          // 监听新增对话框的关闭事件
        addPermissionDialogClosed() {
          // 关闭对话框，清空表单内容
          this.$refs.addPermissionFormRef.resetFields()
        },

         // 添加角色
        async addPermission() {
          this.$refs.addPermissionFormRef.validate(async valid => {
            if (!valid) return
            //   校验通过发送请求
            // console.log(this.roleId)
            // console.log(this.defKeys)
            const {data: res} = await addPermission(this.addPermissionForm)
            // const { data: res } = await this.$http.post('sys/role/save')
        
            if (res.code !== 200) {
              this.$message.error('添加角色失败')
            }
            // 添加角色成功
            this.$message.success('添加角色成功！')
            //  关闭对话框
            this.addPermissionDialogVisible = false
            //  重新获取数据列表
            this.getPermissionList()
          })
        },

        
            


    }
}
</script>

<style scoped>

</style>