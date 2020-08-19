import api from '../index'
import urls from './urls'

export default {
    
    getallordercheckadmin() {  //管理员获取所有 “待分配” 的订单的所有信息
        return api.get(urls.getallordercheckadmin)
    },

    getallorderNopaymentadmin() {  //管理员获取所有 “待支付” 的订单的所有信息
        return api.get(urls.getallorderNopaymentadmin)
    },

    getallorderSuccessadmin() { //管理员获取所有 “支付完成” 的订单的所有信息
        return api.get(urls.getallorderSuccessadmin)
    },

    getallorderOveradmin() { //管理员获取所有 “超时订单” 的订单的所有信息
        return api.get(urls.getallorderOveradmin)
    },

    getallorderLoseadmin() { //管理员获取所有 “已失效订单” 的订单的所有信息
        return api.get(urls.getallorderLoseadmin)
    },

    deleteorder(params){ //删除订单
        params = {
            o_id: params
        }
        return api.delete(urls.deleteorder + '/' + params.o_id)
    },

}