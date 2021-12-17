import request from '@/utils/request'

// 合作方招标
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/pb?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/pb/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/pb/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/pb',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/pb/upload`,
          method: 'post',
          data
      })
   },
     //下载文件
     downLoadFile(id){
      return request({
          url: `/pb/download/${id}`,
          method: 'get'
      })
  }

}