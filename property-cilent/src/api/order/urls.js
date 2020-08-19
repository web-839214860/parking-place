const baseUrl = '/api'
export default {
    
    getallordercheck: baseUrl + '/getallordercheck', //物业获取所有 “待分配” 的订单的所有信息接口
    postorderinfo: baseUrl + '/postorderinfo', //物业分配订单接口
    deleteorderinfo: baseUrl + '/deleteorderinfo', //物业删除"待分配"订单接口
    getallorderNopayment: baseUrl + '/getallorderNopayment', //物业获取所有 “待支付” 的订单的所有信息接口
    getallorderSuccess: baseUrl + '/getallorderSuccess', //物业获取所有 “支付完成” 的订单的所有信息接口
    getallorderOver: baseUrl + '/getallorderOver',  //物业获取所有 “超时订单” 的订单的所有信息接口
    getallorderLose: baseUrl + '/getallorderLose', //物业获取所有 “已失效订单” 的订单的所有信息接口
    deleteorder: baseUrl + '/deleteorder', //物业删除订单接口
    putorderbegin: baseUrl + '/putorderbegin', //物业开始计时接口
    putorderend: baseUrl + '/putorderend', //物业结束计时接口
    puttime: baseUrl + '/puttime', //物业结算时间接口

}
