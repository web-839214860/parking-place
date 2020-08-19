import api from '../index'
import urls from './urls'

export default {

    postonepropertyuser(params){  //管理员添加物业用户
        return api.post(urls.postonepropertyuser, params)
    },

    deletepropertyuser(params) { //管理员删除物业用户
        params = {
            u_userId: params
        }
        return api.delete(urls.deletepropertyuser + '/' + params.u_userId)
    },

    getonepropertyinfo(params){ //管理员获取需要编辑的物业用户的信息
        params={
            u_userId: params
        }
        return api.get(urls.getonepropertyinfo + '/' + params.u_userId)
    },

    putonepropertyinfo(params,id){  //管理员编辑物业用户信息
        return api.put(urls.putonepropertyinfo + '/' + id,params)
    },
    
}

