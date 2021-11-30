import request from '@/utils/request'

export default {
    getMenus() {
        return request({
            url: '/index/nav',
            method: 'get'
        })
    }
}