import request from '@/utils/request'

//分配用户角色
export function assignRoles(userId,roleIds) {
    return request({
        method: 'post',
        url: `/sys/user/editUserRole`,
        params: {
            userId,
            roleIds
        }
    })
}

 // 获取角色信息
export function getRoles(name) {
    return request({
        url: 'sys/role/list',
        method: 'post',
        params: {name}
    })
}
 // 编辑角色
export function editRoles(id,name,remark) {
    return request({
        url: '/sys/role/edit',
        method: 'post',
        params: {
            id,
            name,
            remark
        }
    })
}

//获取角色权限
export function getPermission() {
    return request({
        url: '/sys/permission/list',
        method: 'post'
    })
}

 // 根据ID获取角色信息
export function getRolesInfo(roleId) {
    return request({
        url: `/sys/role/detail/${roleId}`,
        method: 'post',
        params: {
          roleId
       }
       
    })
}

//删除角色
export function deleteRoles(userId) {
    return request({
        url: `/sys/role/del/${userId}`,
        method: 'get',
        params: {
            userId
        }
    }) 
}

// 新增角色
 export function addRoles(data) {
     return request({
         url: '/sys/role/save',
         method: 'post',
         data
     })
 }


 // 添加用户权限
 export function assignPermissionData(perIds,roleId) {
    return request({
        url: `/sys/role/editPermission`,
        method: 'post',
        params: {
            perIds,
            roleId
        }
    })
}