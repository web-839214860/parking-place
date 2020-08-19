import api from '../index'
import urls from './urls'

export default {

    deletecaruser(params) { //管理员删除车位车主
        params = {
            u_userId: params
        }
        return api.delete(urls.deletecaruser + '/' + params.u_userId)
    },
    
}

