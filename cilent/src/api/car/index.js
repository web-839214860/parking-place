import api from '../index'
import urls from './urls'
export default {

    postcar(params){  //添加车位
        return api.post(urls.postcar, params)
    },

    getallcarsCaruser() {  //车位车主获取个人所发布车位的信息
        return api.get(urls.getallcarsCaruser)
    },

    postcarinfo(params) { //发布车位
        params = {
            c_id: params
        }
        return api.post(urls.postcarinfo + '/' + params.c_id)
    },

    putcarinfo(params) { //取消发布车位
        params = {
            c_id: params
        }
        return api.put(urls.putcarinfo + '/' + params.c_id)
    },

    deletecar(params) { //删除车位
        params = {
            c_id: params
        }
        return api.delete(urls.deletecar + '/' + params.c_id)
    },
    
    getonecarinfo(params) { //车位车主获取“我的车位”的车位详情信息
        params = {
            c_id: params
        }
        return api.get(urls.getonecarinfo + '/' + params.c_id)
    },

    putcaruserinfo(params, id) { //车位车主修改车位信息
        return api.put(urls.putcaruserinfo + '/' + id, params)
    },

    getallcarsinfocilent() {  //车位车主、普通用户 首页车位信息
        return api.get(urls.getallcarsinfocilent)
    },

}