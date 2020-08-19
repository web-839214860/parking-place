import api from '../index'
import urls from './urls'
export default {

    postlogin (params) { //登录
        return api.post(urls.postlogin,params)
    },
    
    userinfo () { //用户信息
        return api.get(urls.userinfo)
    },

    getalladmininfo(){  //管理员获取所有高级管理员信息
        return api.get(urls.getalladmininfo)
    },

    getallpropertyinfo(){  //管理员获取所有物业用户信息
        return api.get(urls.getallpropertyinfo)
    },

    getallcarinfo(){  //管理员获取所有车位车主信息
        return api.get(urls.getallcarinfo)
    },

    getallcommoninfo(){  //管理员获取所有普通用户信息
        return api.get(urls.getallcommoninfo)
    },

    putpassword(params){ //修改密码
        params={
            u_userId:params.u_userId,
            old_password:params.oldpassword,
            new_password:params.newpassword
        }
        return api.put(urls.putpassword, params)
    },

    postoneuser(params){  //管理员添加用户
        return api.post(urls.postoneuser, params)
    },

    deleteuser(params) { //管理员删除用户
        params = {
            u_userId: params
        }
        return api.delete(urls.deleteuser + '/' + params.u_userId)
    },
    
    getoneuserinfo(params){ //管理员获取需要编辑的用户的信息
        params={
            u_userId: params
        }
        return api.get(urls.getoneuserinfo + '/' + params.u_userId)
    },

    putoneuserinfo(params,id){  //管理员编辑用户信息
        return api.put(urls.putoneuserinfo + '/' + id,params)
    },

}

