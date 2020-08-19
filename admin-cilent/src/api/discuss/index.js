import api from '../index'
import urls from './urls'

export default {
    
    getalldiscussadmin() {  //管理员获取所有评论
        return api.get(urls.getalldiscussadmin)
    },

    deletediscuss(params) { //删除评论
        params = {
            d_id: params
        }
        return api.delete(urls. deletediscuss + '/' + params.d_id)
    },

}