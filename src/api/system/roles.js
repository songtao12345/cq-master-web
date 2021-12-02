import request from '@/utils/request'
 // 获取角色信息

export function getRoles(name) {
    return request({
        url: 'sys/role/list',
        method: 'post',
        params: {name}
    })
}
 // 编辑角色
export function editRoles(data) {
    return request({
        url: '/sys/user/edit',
        method: 'post',
        data
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
export function getRolesInfo(userId) {
    return request({
        url: '/sys/user/detail',
        method: 'post',
        params: {
          userId
       }
       
    })
}

//删除角色
export function deleteRoles(userId) {
    return request({
        url: '/sys/user/del',
        method: 'post',
        params: {
            userId
        }
    }) 
}

// 新增角色
 export function addRoles(data) {
     return request({
         url: '/sys/user/save',
         method: 'post',
         data
     })
 }