import api from '../index'
import urls from './urls'
export default {

    getallpropertyinfo() {  //获取物业名称（用于下拉选择）
        return api.get(urls.getallpropertyinfo)
    },

    getonebeginnerinfo() {  //获取用户自身升级单（用于页面渲染、读取时间）
        return api.get(urls.getonebeginnerinfo)
    },

    postbeginneruser(params) { //普通用户升级为车位车主
        return api.post(urls.postbeginneruser,params)
    }

}