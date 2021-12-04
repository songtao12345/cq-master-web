import request from '@/utils/request'
 // 获取菜单信息
export function getPermission(name) {
    return request({
        url: 'sys/permission/list',
        method: 'post',
        params: {name}
    })
}
 // 编辑菜单
export function editPermission(data) {
    return request({
        url: '/sys/permission/edit',
        method: 'post',
        data
    })
}

// //获取菜单权限
// export function getPermission() {
//     return request({
//         url: '/sys/permission/list',
//         method: 'post'
//     })
// }

//  // 根据ID获取菜单信息
// export function getPermissionInfo(roleId) {
//     return request({
//         url: `/sys/role/detail/${roleId}`,
//         method: 'post',
//         params: {
//           roleId
//        }
       
//     })
// }

//删除菜单
export function deletePermission(id) {
    return request({
        url: `/sys/permission/remove/${id}`,
        method: 'delete',
        params: {
            id
        }
    }) 
}

// 新增菜单
 export function addPermission(data) {
     return request({
         url: '/sys/permission/add',
         method: 'post',
         data
     })
 }