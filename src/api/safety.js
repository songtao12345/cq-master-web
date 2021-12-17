import request from '@/utils/request'

// 安全生产费用使用计划
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/uospf?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/uospf/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/uospf/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/uospf',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/uospf/upload`,
          method: 'post',
          data
      })
   },

    //下载文件
    downLoadFile(id){
      return request({
          url: `/uospf/download/${id}`,
          method: 'get'
      })
  }

}