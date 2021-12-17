import request from '@/utils/request'

// 石油合作项目操作费预算
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/dpp?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/dpp/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/dpp/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/dpp',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/dpp/upload`,
          method: 'post',
          data
      })
   },

   //下载文件
   downLoadFile(id){
       return request({
           url: `/dpp/download/${id}`,
           method: 'get'
       })
   }

}