import request from '@/utils/request'

// 薪酬管理标准和实施细则
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/smsaIr?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/smsaIr/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/smsaIr/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/smsaIr',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/smsaIr/upload`,
          method: 'post',
          data
      })
   },

   //下载文件
   downLoadFile(id){
       return request({
           url: `/smsaIr/download/${id}`,
           method: 'get'
       })
   }

}