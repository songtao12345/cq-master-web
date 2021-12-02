<template>
  <div>
<!--    卡片区域视图-->
    <el-card>
<!--      标题区域-->
      <el-row class="title" >
        <el-col :span="20">角色列表</el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddRoleDialog">新增</el-button>
        </el-col>
      </el-row>
      <!--      搜索框表单-->
      <el-form :inline="true" size="small">
        <el-form-item label="角色名称">
          <el-input v-model="query" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-search" type="primary" @click="getRoleList">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch" >重置</el-button>
        </el-form-item>
      </el-form>
      <!--      刷新按鈕-->
      <el-row class="title">
        <el-col :span="4" :offset="22">
          <el-button type="info" icon="el-icon-refresh" @click="getRoleList"></el-button>
        </el-col>
      </el-row>
<!--      角色列表表格区域视图-->
      <el-table :data = "rolelist" border stripe>
        <el-table-column fixed align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="角色名称" min-width="160" prop="name"></el-table-column>
        <el-table-column label="角色描述" min-width="160" prop="remark"></el-table-column>
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditRoleDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRoles(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--    新增对话框-->
    <el-dialog
      title="新增角色"
      :visible.sync="addRoleDialogVisible"
      width="50%"
    @close="addRoleDialogClosed">
      <el-form :model="addRoleForm" :rules="addRoleFormRules" ref="addRoleFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="remark">
          <el-input v-model="addRoleForm.remark"></el-input>
        </el-form-item>
        <!--树形控件  -->
        <el-tree
          :data = "permissionlist"
          :props="treeProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys = "defKeys"
          ref = "treeRef"></el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRole">确 定</el-button>
  </span>
    </el-dialog>
    <!--    修改对话框-->
    <el-dialog
      title="修改角色信息"
      :visible.sync="editRoleDialogVisible"
      width="50%"
      @close="editRoleDialogClosed">
      <el-form :model="editRoleForm" :rules="editRoleFormRules" ref="editRoleFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editRoleForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="name">
          <el-input v-model="editRoleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRole">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getRoles, getRolesInfo, editRoles, deleteRoles, addRoles, getPermission} from '@/api/system/roles'
export default {
  name: 'Roles',
  data() {
    return {
      // 角色列表
      rolelist: [],
      // 查询数据
      query: '',
      //  控制新增角色对话框的显示与隐藏
      addRoleDialogVisible: false,
      // 新增对话框的表单数据对象
      addRoleForm: {},
      // 新增表单的验证对象
      addRoleFormRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '角色名称的长度在3到10之间', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      // 控制修改对话框的显示与隐藏
      editRoleDialogVisible: false,
      // 修改对话框的表单对象
      editRoleForm: {},
      // 修改对话框的表单验证对象
      editRoleFormRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '角色名称的长度在3到10之间', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      permissionlist: [],
      // 树形控件绑定对象
      treeProps: {
        label: 'name',
        children: 'children'
      },
      //   默认选中节点Id值数组
      defKeys: [],
      //   当前即将分配角色权限的id
      roleId: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const {data : res} = await getRoles(this.query)
      // const { data: res } = await this.$http.post('sys/role/list', this.query)
      if (res.code !== 200) {
        this.$message.error('获取角色列表失败')
      }
      // debugger
      this.rolelist = res.data
      // debugger
    },
    // 搜索框的重置方法
    resetSearch() {
      this.query = ''
      this.getRoleList()
    },
    // 获取权限列表
    async getPermissionList() {

      const {data: res} = await getPermission()
      // const { data: res } = await this.$http.post('/sys/permission/list')
      if (res.code !== 200) {
        this.$message.error('获取权限列表失败')
      }
      // console.log(res)
      this.permissionlist = res.data
    },
    // 展示新增角色的对话框
    showAddRoleDialog() {
      this.addRoleDialogVisible = true
      this.getPermissionList()
    },
    // 添加角色
    async addRole() {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (!valid) return
        //   校验通过发送请求
        console.log(this.roleId)
        console.log(this.defKeys)
        const {data: res} = await addRoles(this.addUserForm)
        // const { data: res } = await this.$http.post('sys/role/save')
    
        if (res.code !== 200) {
          this.$message.error('添加角色失败')
        }
        // 添加角色成功
        this.$message.success('添加角色成功！')
        //  关闭对话框
        this.addRoleDialogVisible = false
        //  重新获取数据列表
        this.getRoleList()
      })
    },
    // 监听新增对话框的关闭事件
    addRoleDialogClosed() {
      // 关闭对话框，清空表单内容
      this.$refs.addRoleFormRef.resetFields()
    },
    // 展示编辑用户对话框
    async showEditRoleDialog(id) {
      // 根据用户id获取用户信息
      console.log(id)
     const { data: res } = await getRolesInfo(id)

      // const { data: res } = await this.$http.post('sys/role/detail/', id)
      console.log(res)
      if (res.code !== 200) {
        this.$message.error('获取角色信息失败')
      }
      // 将返回数据放到编辑表单中
      this.editRoleForm = res.data
      this.editRoleDialogVisible = true
    },
    // 关闭编辑用户对话框时，触发该函数
    editRoleDialogClosed() {
      // 关闭对话框，清空表单内容
      this.$refs.editRoleFormRef.resetFields()
    },

      // 根据用户id删除用户信息
    async removeRoles(id) {
      // 弹框询问用户是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      //   如果用户确认删除，则返回值为字符串confirm
      //   如果用户取消删除，则返回值为字符串cancle
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
    
      const {data : res} = await deleteRoles(id)
      
    //   const { data: res } = await this.$http.post('sys/user/del/' + id)
      if (res.code !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      // 重新获取数据列表
      this.getRoleList()

    }

  }
}
</script>

<style scoped>

</style>
