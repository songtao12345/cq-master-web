import request from '@/utils/request'

// 召开联管会
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/hjmm?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/hjmm/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/hjmm/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/hjmm',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/hjmm/upload`,
          method: 'post',
          data
      })
   },
     //下载文件
     downLoadFile(id){
      return request({
          url: `/hjmm/download/${id}`,
          method: 'get'
      })
  }

}