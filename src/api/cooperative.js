import request from '@/utils/request'

// 合作区块筛选及报批
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/cbsp?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/cbsp/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/cbsp/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/cbsp',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/cbsp/upload`,
          method: 'post',
          data
      })
   },

   //下载文件
   downLoadFile(id){
       return request({
           url: `/cbsp/download/${id}`,
           method: 'get'
       })
   }

}