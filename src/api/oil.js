import request from '@/utils/request'

// 老油田表单管理
export default {
  
  // 新增申请
  // add(data) {
  //   return request({
  //       url: '/oldOilProd',
  //       method: 'post',
  //       data
  //   })
  // },

  add(data,obj) {
    return request({
        // url: `/oldOilProd?title=${obj.title}&description=${obj.description}`,
        url: `/spoof?title=${obj.title}&description=${obj.description}`,
        method: 'post',
        data
    })
  },


 
  // adds(data) {
  //   return request({
  //       url: '/oldOilProd/single',
  //       method: 'post',
  //       data
  //   })
  // },
  // addmany(data) {
  //   return request({
  //       url: '/oldOilProd/manytwo',
  //       method: 'post',
  //       data
  //   })
  // },
  // addbegin(data) {
  //   return request({
  //       url: '/oldOilProd/begin',
  //       method: 'post',
  //       data
  //   })
  // },
  // addmanyone(data) {
  //   return request({
  //       url: '/oldOilProd/manyone',
  //       method: 'post',
  //       data
  //   })
  // },
  // addmany(data) {
  //   return request({
  //       url: '/oldOilProd/many',
  //       method: 'post',
  //       data
  //   })
  // },
  

  // 申请列表
  getList(data, current, size) {
    return request({
        // url: '/oldOilProd/list',
        url: '/spoof/list',
        method: 'post',
        data: {...data, current, size}
    })
  },


  // 查询详情
  getById(id) {
    return request({
        url: `/spoof/${id}`,
        method: 'get'
    })
  },

  // 修改申请
  update(data) {
    return request({
        url: '/spoof',
        method: 'put',
        data
    })
  },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/spoof/upload`,
          method: 'post',
          data
      })
   }

}