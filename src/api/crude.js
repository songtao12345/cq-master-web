import request from '@/utils/request'

//原油结算
export default {
  
  // 新增申请

  add(data,obj) {
    return request({
        url: `/cos?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


  // 申请列表
  getList(data, current, size) {
    return request({
        url: '/cos/list',
        method: 'post',
        data: {...data, current, size}
    })
  },




  // 查询详情
  getById(id) {
    return request({
        url: `/cos/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/cos',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/cos/upload`,
          method: 'post',
          data
      })
   },

  //下载文件
  downLoadFile(id){
        return request({
            url: `/cos/download/${id}`,
            method: 'get'
        })
    }

}