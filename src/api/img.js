import request from '@/utils/request'

export default  {
    imgurl(modelId) {
        return request({
            url: `/modeler.html?modelId=${modelId}`,
            method: 'get'
        })
    }
}