const baseUrl = '/api'
export default {

    postorder: baseUrl + '/postorder', //填写订单接口
    getallordercheckclient: baseUrl + '/getallordercheckclient', //用户获取所有 “待分配” 的订单的所有信息接口
    getallorderNopaymentclient: baseUrl + '/getallorderNopaymentclient', //用户获取所有 “待支付” 的订单的所有信息接口
    getallorderSuccessclient: baseUrl + '/getallorderSuccessclient', //用户获取所有 “支付完成” 的订单的所有信息接口
    getallorderLoseclient: baseUrl + '/getallorderLoseclient', //用户获取所有 “已失效订单” 的订单的所有信息接口
    deleteorderinfo: baseUrl + '/deleteorderinfo', //用户取消预订接口
    putmoney: baseUrl + '/putmoney', //用户支付金额接口
    putordersystem: baseUrl + '/putordersystem', //系统自身修改预约单结果接口
    getoneorderSuccessclient: baseUrl + '/getoneorderSuccessclient' //用户获取某张 “支付完成” 的订单的详细信息接口
}
