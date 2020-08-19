import api from '../index'
import urls from './urls'

export default {
    
    postorder(params) { //填写订单
        return api.post(urls.postorder, params)
    },

    getallordercheckclient() {  //用户获取所有 “待分配” 的订单的所有信息
        return api.get(urls.getallordercheckclient)
    },

    getallorderNopaymentclient() { //用户获取所有 “待支付” 的订单的所有信息
        return api.get(urls.getallorderNopaymentclient)
    },

    getallorderSuccessclient() { //用户获取所有 “支付完成” 的订单的所有信息
        return api.get(urls.getallorderSuccessclient)
    },

    getallorderLoseclient() { //用户获取所有 “已失效订单” 的订单的所有信息
        return api.get(urls.getallorderLoseclient)
    },

    deleteorderinfo(params){ //用户取消预订
        params = {
            o_id: params
        }
        return api.delete(urls.deleteorderinfo + '/' + params.o_id)
    },

    putmoney(params){ //用户支付金额
        params = {
            o_id: params
        }
        return api.put(urls.putmoney + '/' + params.o_id)
    },

    putordersystem(){
        return api.put(urls.putordersystem) //系统自身修改预约单结果
    },

    getoneorderSuccessclient(params){ //用户获取某张 “支付完成” 的订单的详细信息
        params = {
            o_id: params
        }
        return api.get(urls.getoneorderSuccessclient + '/' + params.o_id)
    },

}