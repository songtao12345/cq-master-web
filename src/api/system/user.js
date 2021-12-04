import request from '@/utils/request'
 // 获取用户信息

export function getUser(username, current, size) {
    return request({
        url: '/sys/user/page',
        method: 'post',
        params: {username, current, size}
    })
}
 // 编辑用户
export function editUser(data) {
    return request({
        url: '/sys/user/edit',
        method: 'post',
        data
    })
}

 // 根据ID获取用户信息
export function getUserInfo(userId) {
    return request({
        url: `/sys/user/detail/${userId}`,
        method: 'post',
        params: {
          userId
       }
       
    })
}

//删除用户
export function deleteUser(userId) {
    return request({
        url: '/sys/user/del',
        method: 'post',
        params: {
            userId
        }
    }) 
}

// 新增用户
 export function addUser(data) {
     return request({
         url: '/sys/user/save',
         method: 'post',
         data
     })
 }