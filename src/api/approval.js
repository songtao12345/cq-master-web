import request from '@/utils/request'

// 项目申报与审批
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/cpm?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/cpm/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/cpm/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/cpm',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/cpm/upload`,
          method: 'post',
          data
      })
   },

   //下载文件
   downLoadFile(id){
       return request({
           url: `/cpm/download/${id}`,
           method: 'get'
       })
   }

}