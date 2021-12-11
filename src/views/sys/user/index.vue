<template>
  <div>
<!--    卡片区域视图-->
    <el-card>
<!--      标题区域-->
      <el-row class="title" >
        <el-col :span="20">用户列表</el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddUserDialog">新增</el-button>
        </el-col>
      </el-row>
<!--      搜索框表单-->
      <el-form :inline="true" size="small">
        <el-form-item label="用户名称">
          <el-input v-model="queryInfo.query" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-search" type="primary" @click="getUserList">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch" >重置</el-button>
        </el-form-item>
      </el-form>
<!--      刷新按鈕-->
      <el-row class="title">
        <el-col :span="4" :offset="22">
          <el-button type="info" icon="el-icon-refresh" @click="getUserList"></el-button>
        </el-col>
      </el-row>
<!--      用户列表表格区域视图-->
      <el-table :data = "userlist" border stripe>
        <el-table-column fixed align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="用户名" min-width="160" prop="username"></el-table-column>
        <el-table-column label="昵称" min-width="160" prop="nickName"></el-table-column>
        <el-table-column label="手机号" min-width="160" prop="mobile"></el-table-column>
        <!-- <el-table-column label="角色" min-width="140"></el-table-column> -->
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditUserDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false" >
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="assignRole(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.current"
        :page-sizes="[10, 20, 50]"
        :page-size="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo.total">
      </el-pagination>
    </el-card>
<!--    新增对话框-->
    <el-dialog
      title="新增用户"
      :visible.sync="addUserDialogVisible"
      width="50%"
      @close="addUserDialogClosed">
      <el-form :model="addUserForm" :rules="addUserFormRules" ref="addUserFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
         <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="addUserForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addUserDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
<!--    修改对话框-->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editUserDialogVisible"
      width="50%"
      @close="editUserDialogClosed">
      <el-form :model="editUserForm" :rules="editUserFormRules" ref="editUserFormRef" label-width="100px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="editUserForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editUserDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
    </el-dialog>

  <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogVisible" width="50%" @close="roleClose">
       <!-- <div> -->
                     
            <!-- <p>用户:  {{userInfo.username}}</p> -->
            <!-- <p>当前的角色:  {{userInfo.role_name}}</p> -->
            <!-- <p>用户当前角色:
            <p>分配新角色:
                <el-select v-model="selectedRoleId" placeholder="请选择" multiple>
                <el-option v-for="item in rolesList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
                </el-select>    
            </p>
        </div> -->
        <el-form ref="assignRoleFormRef" :model="assignRoleForm" label-width="100px">
            <el-form-item label="当前用户">
              <el-input v-model="assignRoleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="用户拥有角色">
              <el-tag v-for="role in assignRoleForm.roleList" :key="role.id">{{role.name}}</el-tag>
            </el-form-item>
            <el-form-item label="用户分配角色">
              <el-select v-model="selectedRoleId" placeholder="请选择" multiple>
              <el-option v-for="item in rolesList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
              </el-select>
            </el-form-item>  
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="roleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="savaRoleInfo">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import {getUser, getUserInfo, editUser, deleteUser, addUser} from '@/api/system/user'
import {getRoles, assignRoles} from '@/api/system/roles'
export default {
  name: 'User',
  data() {
    //   验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 用戶列表數據
      userlist: [],
      userInfo: {},
      roleDialogVisible: false,
      selectedRoleId: '',
      rolesList: [],
      queryInfo: {
        query: '',
        current: 1,
        size: 10,
        total: 0
      },
      // 控制新增对话框的显示与隐藏
      addUserDialogVisible: false,
      // 新增用户表单数据对象
      addUserForm: {
        // 用户名
        username: '',
        // 用户昵称
        nickName: '',
        // 手机号
        mobile: '',
        // 用户角色列表
        roleList: []
      },
      // 新增用户表单的校验对象
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名的长度在2到10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名的长度在2到10之间', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      },
      // 控制编辑用户对话框的显示与隐藏
      editUserDialogVisible: false,
      // 编辑用户的表单对象
      editUserForm: {},
      //  编辑用户表单的验证对象
      editUserFormRules: {
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      // 分配角色表单数据对象
      assignRoleForm: {
        id: '',
        username: '',
        roleIds: [],
        rolesList: []
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表数据
    async getUserList() {
     const {data : res} = await getUser(this.queryInfo.query,this.queryInfo.current,this.queryInfo.size)
     console.log(res.data.records);
    //   const { data: res } = await this.$http.post('sys/user/page/', this.queryInfo)
      if (res.code !== 200) {
        this.$message.error('用户列表获取失败')
      }
      this.userlist = res.data.records
      this.queryInfo.total = res.data.total
    },
    // 点击重置按钮触发
    async resetSearch() {
      this.queryInfo.query = ''
      const {data : res} = await getUser(this.queryInfo.query,this.queryInfo.current,this.queryInfo.size)
    //   const { data: res } = await this.$http.post('sys/user/page/', this.queryInfo)
      if (res.code !== 200) {
        this.$message.error('用户列表获取失败')
      }
      this.userlist = res.data.records
      this.queryInfo.total = res.data.total
    },
    // 当每页显示多少条改变后触发
    handleSizeChange(val) {
      this.page.size = val
      this.getUserList()
    },
    // 切换页码触发
    handleCurrentChange(val) {
      this.page.current = val
      this.getUserList()
    },
    // 展示新增用户对话框
    showAddUserDialog() {
      this.addUserDialogVisible = true
    },
    // 新增用戶对话框关闭时触发该函数
    addUserDialogClosed() {
      // 关闭对话框，清空表单内容
      this.$refs.addUserFormRef.resetFields()
    },
    // 点击按钮新增用户
    addUser() {
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return
        // 校验通过发起请求
 
        const {data: res} = await addUser(this.addUserForm)
        // const { data: res } = await this.$http.post('sys/user/save/', this.addUserForm)
        if (res.code !== 200) {
          this.$message.error('添加用户失败')
        }
        this.$message.success('添加成功！')
        // 隐藏添加对话框
        this.addUserDialogVisible = false
        //  重新获取用户列表数据
        this.getUserList()
      })
    },
    // 展示编辑用户对话框
    async showEditUserDialog(id) {
      // 根据用户id获取用户信息
       const { data: res } = await getUserInfo(id)
    //   const { data: res } = await this.$http.post('sys/user/detail/' + id)
      if (res.code !== 200) {
        this.$message.error('获取用户信息失败')
      }
    //   console.log(res.data);
      // 将返回数据放到编辑表单中
      this.editUserForm = res.data
      this.editUserDialogVisible = true
    },
    // 关闭编辑用户对话框时，触发该函数
    editUserDialogClosed() {
      // 关闭对话框，清空表单内容
      this.$refs.editUserFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return
         console.log(this.editUserForm);
         const {data: res} = await editUser(this.editUserForm)

        //  通过校验发送请求
        // const { data: res } = await this.$http.post('sys/user/edit', this.editUserForm)
        if (res.code !== 200) {
          this.$message.error('修改用户信息失败')
        }
        console.log(res)
        // 关闭对话框
        this.editUserDialogVisible = false
        // 重新获取数据列表
        this.getUserList()
        // 提示用户修改成功
        this.$message.success('修改成功！')
      })
    },
    // 根据用户id删除用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      //   如果用户确认删除，则返回值为字符串confirm
      //   如果用户取消删除，则返回值为字符串cancle
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
       console.log(id);
      const {data : res} = await deleteUser(id)
      
    //   const { data: res } = await this.$http.post('sys/user/del/' + id)
      if (res.code !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      // 重新获取数据列表
      this.getUserList()

    },

     // 分配权限
       async assignRole(id) {
          const { data: res } = await getUserInfo(id)
          // console.log(res);
          this.assignRoleForm = res.data
            // this.userInfo = userInfo
            // console.log(this.assignRoleForm)
            // // 获取所有角色列表
            getRoles().then(res => {
                // console.log(res)
                if(res.data.code !== 200) return this.$message.error('获取权限列表失败')
                this.rolesList = res.data.data
                // console.log(this.rolesList);
            })

            this.roleDialogVisible = true
           
        },

        roleClose() {
            this.selectedRoleId = ''
            this.userInfo = {}
        },

        savaRoleInfo() {
          // console.log( this.selectedRoleId instanceof Array)
          let newRoleIdsList = this.assignRoleForm.roleIds.concat(this.selectedRoleId)
          let newRoleIds = newRoleIdsList.join(',')
          // console.log(newRoleIds.join(','));
          let idStr = this.selectedRoleId.join(',')
          // console.log(...this.assignRoleForm.roleIds + idStr);
            assignRoles(this.assignRoleForm.id,newRoleIds).then(res => {
              // console.log(res);
                if(res.data.code !== 200) return this.$message.error('分配角色失败')
                this.$message.success('分配角色成功')
                this.getUserList()
            })
           this.roleDialogVisible = false
        },



  }
}
</script>

<style scoped>
.title{
  margin-bottom: 15px;
}
</style>
