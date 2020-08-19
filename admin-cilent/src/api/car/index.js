import api from '../index'
import urls from './urls'

export default {

    getallcarsinfo() { //管理员获取所有车位的所有信息
        return api.get(urls.getallcarsinfo)
    },

    postcarinfo(params) { //管理员发布车位
        params = {
            c_id: params
        }
        return api.post(urls.postcarinfo + '/' + params.c_id)
    },

    putcarinfo(params) { //管理员取消发布车位
        params = {
            c_id: params
        }
        return api.put(urls.putcarinfo + '/' + params.c_id)
    },

    deletecar(params) { //管理员删除车位
        params = {
            c_id: params
        }
        return api.delete(urls. deletecar + '/' + params.c_id)
    },
}

