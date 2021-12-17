import request from '@/utils/request'

// 油水井资产报废流程
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/soaga?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/soaga/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/soaga/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/soaga',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/soaga/upload`,
          method: 'post',
          data
      })
   },

   //下载文件
   downLoadFile(id){
       return request({
           url: `/soaga/download/${id}`,
           method: 'get'
       })
   }

}