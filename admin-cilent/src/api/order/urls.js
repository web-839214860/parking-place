const baseUrl = '/api'
export default {
    
    getallordercheckadmin: baseUrl + '/getallordercheckadmin', //管理员获取所有 “待分配” 的订单的所有信息接口
    getallorderNopaymentadmin: baseUrl + '/getallorderNopaymentadmin', //管理员获取所有 “待支付” 的订单的所有信息接口
    getallorderSuccessadmin: baseUrl + '/getallorderSuccessadmin', //管理员获取所有 “支付完成” 的订单的所有信息接口
    getallorderOveradmin: baseUrl + '/getallorderOveradmin',  //管理员获取所有 “超时订单” 的订单的所有信息接口
    getallorderLoseadmin: baseUrl + '/getallorderLoseadmin', //管理员获取所有 “已失效订单” 的订单的所有信息接口
    deleteorder: baseUrl + '/deleteorder', //物业删除订单接口
    
}
