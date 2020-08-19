import api from '../index'
import urls from './urls'
export default {

    postlogin (params) { //登录
        return api.post(urls.postlogin,params)
    },
    
    userinfo () { //用户信息
        return api.get(urls.userinfo)
    },

    putpassword(params){ //修改密码
        params={
            u_userId:params.u_userId,
            old_password:params.oldpassword,
            new_password:params.newpassword
        }
        return api.put(urls.putpassword, params)
    },

}

