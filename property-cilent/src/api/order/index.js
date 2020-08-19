import api from '../index'
import urls from './urls'

export default {
    
    getallordercheck() {  //物业获取所有 “待分配” 的订单的所有信息
        return api.get(urls.getallordercheck)
    },

    postorderinfo(params){ //物业分配订单
        params = {
            o_id: params
        }
        return api.post(urls.postorderinfo + '/' + params.o_id)
    },

    deleteorderinfo(params){ //物业删除"待分配"订单
        params = {
            o_id: params
        }
        return api.delete(urls.deleteorderinfo + '/' + params.o_id)
    },

    getallorderNopayment() { //物业获取所有 “待支付” 的订单的所有信息
        return api.get(urls.getallorderNopayment)
    },

    getallorderSuccess() { //物业获取所有 “支付完成” 的订单的所有信息
        return api.get(urls.getallorderSuccess)
    },

    getallorderOver() { //物业获取所有 “超时订单” 的订单的所有信息
        return api.get(urls.getallorderOver)
    },

    getallorderLose() { //物业获取所有 “已失效订单” 的订单的所有信息
        return api.get(urls.getallorderLose)
    },

    deleteorder(params){ //物业删除订单
        params = {
            o_id: params
        }
        return api.delete(urls.deleteorder + '/' + params.o_id)
    },

    putorderbegin(params){ //物业开始计时
        params = {
            o_id: params
        }
        return api.put(urls.putorderbegin + '/' + params.o_id)
    },

    putorderend(params){ //物业结束计时
        params = {
            o_id: params
        }
        return api.put(urls.putorderend + '/' + params.o_id)
    },

    puttime(params){ //物业结算时间
        params = {
            o_id: params
        }
        return api.put(urls.puttime + '/' + params.o_id)
    },
    
}