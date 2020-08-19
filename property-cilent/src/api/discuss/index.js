import api from '../index'
import urls from './urls'

export default {
    
    getalldiscussproperty() {  //物业获取对应的评论
        return api.get(urls.getalldiscussproperty)
    },

    deletediscuss(params) { //删除评论
        params = {
            d_id: params
        }
        return api.delete(urls. deletediscuss + '/' + params.d_id)
    },

}