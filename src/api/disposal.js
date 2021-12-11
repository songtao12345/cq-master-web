import request from '@/utils/request'

// 油气资产弃置流程管理
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/doaa?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/doaa/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/doaa/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/doaa',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/doaa/upload`,
          method: 'post',
          data
      })
   }

}