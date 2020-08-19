import api from '../index'
import urls from './urls'

export default {
    
    getallcarbeginner() { //物业获取对应物业的用户升级单
        return api.get(urls.getallcarbeginner)
    },

    postbeginnerinfo(params){ //物业审核用户升级单
        params = {
            u_userId: params
        }
        return api.post(urls.postbeginnerinfo + '/' + params.u_userId)
    },

    putbeginnerinfo(params){ //物业取消审核用户升级单
        params = {
            u_userId: params
        }
        return api.put(urls.putbeginnerinfo + '/' + params.u_userId)
    },

    deletecaruser(params) { //物业删除对应物业的用户升级单
        params = {
            u_userId: params
        }
        return api.delete(urls.deletecaruser + '/' + params.u_userId)
    },

    getsomecarinfo() { //物业获取所属车位车主信息
        return api.get(urls.getsomecarinfo)
    },

}