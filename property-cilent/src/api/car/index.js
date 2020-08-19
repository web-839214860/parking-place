import api from '../index'
import urls from './urls'

export default {

    getallcarsinfoproperty() { //物业获取对应车位的信息（用于审核发布资格）
        return api.get(urls.getallcarsinfoproperty)
    },

    postseniorityproperty(params) { //物业审核发布车位资格
        params = {
            c_id: params
        }
        return api.post(urls.postseniorityproperty + '/' + params.c_id)
    },

    putseniorityproperty(params) { //物业取消审核发布车位资格
        params = {
            c_id: params
        }
        return api.put(urls.putseniorityproperty + '/' + params.c_id)
    },

    getallcarsproperty() { //物业获取对应车位的信息（用于发布、取消发布）
        return api.get(urls.getallcarsproperty)
    },

    postcarinfo(params) { //物业发布车位
        params = {
            c_id: params
        }
        return api.post(urls.postcarinfo + '/' + params.c_id)
    },

    putcarinfo(params) { //物业取消发布车位
        params = {
            c_id: params
        }
        return api.put(urls.putcarinfo + '/' + params.c_id)
    },

    deletecar(params) { //物业删除车位审核、删除车位
        params = {
            c_id: params
        }
        return api.delete(urls. deletecar + '/' + params.c_id)
    },

    postcar(params){  //添加车位
        return api.post(urls.postcar, params)
    },
}

