import request from './req.js'

// 老油田表单管理
export default {
  
  // 新增申请
  add(data) {
    return request({
        url: '/oldOilProd',
        method: 'post',
        data:{
            data
        }
    })
  },

//   add(data) {
//     return request({
//         url: `/oldOilProd`,
//         method: 'post',
//         data:{
//             data
//         }
//     })
//   },
//   adds(data) {
//     return request({
//         url: '/oldOilProd/single',
//         method: 'post',
//         data
//     })
//   },
// add(data,file) {
//     return request({
//         url: `/oldOilProd?title=${data.title}&description=${data.description}`,
//         method: 'post',
//         data: {
//           data,
//           file
//         }
//     })
//   },
  addman(title,description) {
    return request({
        url: `/oldOilProd/manytwo?title=${title}&description=${description}`,
        method: 'post',
        data:{
            title,
            description
        }
            
    })
  },
  addmanyone(title,description,file) {
    return request({
        url: `/oldOilProd/manyone?title=${title}&description=${description}`,
        method: 'post',
        data:{
            title,
            description,
            file
        }
            
    })
  },

//   addmanyone(file) {
//     return request({
//         url: `/oldOilProd/manyone`,
//         method: 'post',
//         data:{
//             file
//         }
            
//     })
//   },
//   addbegin(data) {
//     return request({
//         url: '/oldOilProd/begin',
//         method: 'post',
//         data
//     })
//   },
//   addmanyone(data) {
//     return request({
//         url: '/oldOilProd/manyone',
//         method: 'post',
//         data
//     })
//   },

   // 上传文件
   upLoadFile(data) {
      return request({
          url: `/oldOilProd/upload`,
          method: 'post',
          data
      })
   }

}