import request from '@/utils/request'

export default {
    getLogin(data) {
        return request({
            url: `/login?username=${data.username}&password=${data.password}`,
            method: 'post',
            
        })
      }

   
}