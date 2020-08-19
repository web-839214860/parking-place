const orderDao = require('../service/order_dao')
const carDao = require('../service/car_dao')
var moment = require('moment')

module.exports = {

    //管理员获取所有 “待分配” 的订单的所有信息
    getallordercheckadmin: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return  item.o_result == "待分配"
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //管理员获取所有 “待支付” 的订单的所有信息
    getallorderNopaymentadmin: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return  item.o_result == "待支付"
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //管理员获取所有 “支付完成” 的订单的所有信息
    getallorderSuccessadmin: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return item.o_result == "支付完成"
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //管理员获取所有 “超时订单” 的订单的所有信息
    getallorderOveradmin: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return  item.o_over == 1
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //管理员获取所有 “已失效订单” 的订单的所有信息
    getallorderLoseadmin: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return item.o_result == "已失效"
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //物业获取所有 “待分配” 的订单的所有信息
    getallordercheck: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.p_userId == ctx.state.user.u_userId && item.o_result == "待分配")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //物业获取所有 “待支付” 的订单的所有信息
    getallorderNopayment: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.p_userId == ctx.state.user.u_userId && item.o_result == "待支付")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //物业获取所有 “支付完成” 的订单的所有信息
    getallorderSuccess: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.p_userId == ctx.state.user.u_userId && item.o_result == "支付完成")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //物业获取所有 “超时订单” 的订单的所有信息
    getallorderOver: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.p_userId == ctx.state.user.u_userId && item.o_over == 1)
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //物业获取所有 “已失效订单” 的订单的所有信息
    getallorderLose: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.p_userId == ctx.state.user.u_userId && item.o_result == "已失效")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //用户获取所有 “待分配” 的订单的所有信息
    getallordercheckclient: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.u_userId == ctx.state.user.u_userId && item.o_result == "待分配")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //用户获取所有 “待支付” 的订单的所有信息
    getallorderNopaymentclient: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.u_userId == ctx.state.user.u_userId && item.o_result == "待支付")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //用户获取所有 “支付完成” 的订单的所有信息
    getallorderSuccessclient: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.u_userId == ctx.state.user.u_userId && item.o_result == "支付完成")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //用户获取某张 “支付完成” 的订单的详细信息
    getoneorderSuccessclient: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const oneorderinfo = await orderDao.getOrderInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: oneorderinfo
            
        }
    },

    //用户获取所有 “已失效订单” 的订单的所有信息
    getallorderLoseclient: async(ctx) => {
        const orderinfo = await orderDao.getAllOrder();
        const allorderinfo = orderinfo.filter(function(item){ //数组条件筛选
            return (item.u_userId == ctx.state.user.u_userId && item.o_result == "已失效")
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //物业分配订单
    postorderinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);

        let orderInfo = { o_result: '待支付' }
        await orderDao.updateOrder(orderInfo,msg);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '订单分配成功',
            }
        }
    },

    //物业删除"待分配"订单
    deleteorderinfo: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const orderinfo = await orderDao.getOrderInfo(msg);//获取某张预订表
        const orderinfocar = await carDao.getOneCarInfo(orderinfo.c_name); //获取预订表下对应的车位表

        let orderInfoCar = { c_status: '发布成功' }
        await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

        const deleteorder = await orderDao.delectOrder(msg);
        console.log(deleteorder);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //物业开始计时
    putorderbegin: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const orderinfo = await orderDao.getOrderInfo(msg);//获取某张预订表
        const orderinfocar = await carDao.getOneCarInfo(orderinfo.c_name); //获取预订表下对应的车位表

        let orderInfoCar = { c_status: '计费中' }
        await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

        let orderInfo = { o_begintime: moment().format('YYYY-MM-DD HH:mm:ss') }
        await orderDao.updateOrder(orderInfo,msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '订单开始计时'
            }
        }
    },

    //物业结束计时
    putorderend: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const orderinfo = await orderDao.getOrderInfo(msg);//获取某张预订表
        const orderinfocar = await carDao.getOneCarInfo(orderinfo.c_name); //获取预订表下对应的车位表

        let orderInfoCar = { c_status: '发布成功' }
        await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

        let orderInfo = { o_endtime: moment().format('YYYY-MM-DD HH:mm:ss') }
        await orderDao.updateOrder(orderInfo,msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '订单结束计时'
            }
        }
    },

    //物业删除订单
    deleteorder: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);

        const deleteorder = await orderDao.delectOrder(msg);
        console.log(deleteorder);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //填写预约单
    postorder: async (ctx) => {
        const data = ctx.request.body
        const msg={};
        const order = await orderDao.getAllOrderInfo(data.u_userId)  //查询是否存在这张预约单
        //console.log(order)
    
        if(order.length == 0){

            const orderinfocar = await carDao.getOneCarInfo(data.c_name); //获取预订表下对应的车位表
            let orderInfoCar = { c_status: '使用中' }
            await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

            msg.o_name = data.o_name;
            msg.o_phone = data.o_phone;
            msg.o_card = data.o_card;
            msg.o_time = moment().format('YYYY-MM-DD HH:mm:ss');  //获取当前时间
            msg.o_result = "待分配";
            msg.c_name = data.c_name;
            msg.u_userId = data.u_userId;
            msg.p_userId = data.p_userId
            await orderDao.createOrder(msg)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '发起预约成功'
                }
            }
        } else {
            if(new Date().getTime() < new Date(order[order.length-1].o_time).getTime() + 30*60*1000){
                if(order[order.length-1].o_result=="支付完成" || order[order.length-1].o_result=="已失效"){

                    const orderinfocar = await carDao.getOneCarInfo(data.c_name); //获取预订表下对应的车位表
                    let orderInfoCar = { c_status: '使用中' }
                    await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

                    msg.o_name = data.o_name;
                    msg.o_phone = data.o_phone;
                    msg.o_card = data.o_card;
                    msg.o_time = moment().format('YYYY-MM-DD HH:mm:ss');  //获取当前时间
                    msg.o_result = "待分配";
                    msg.c_name = data.c_name;
                    msg.u_userId = data.u_userId;
                    msg.p_userId = data.p_userId
                    await orderDao.createOrder(msg)
        
                    ctx.status = 200;
                    ctx.body = {
                        code: 1,
                        data: {
                            message: '发起预约成功'
                        }
                    }
                } else {
                    ctx.status = 200;
                    ctx.body = {
                        code: -1,
                        data: {
                            message: '当前有订单未完成，请稍后'
                        }
                    }

                }
            } else {
                if(order[order.length-1].o_result=="支付完成" || order[order.length-1].o_result=="已失效"){
 
                    const orderinfocar = await carDao.getOneCarInfo(data.c_name); //获取预订表下对应的车位表
                    let orderInfoCar = { c_status: '使用中' }
                    await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

                    msg.o_name = data.o_name;
                    msg.o_phone = data.o_phone;
                    msg.o_card = data.o_card;
                    msg.o_time = moment().format('YYYY-MM-DD HH:mm:ss');  //获取当前时间
                    msg.o_result = "待分配";
                    msg.c_name = data.c_name;
                    msg.u_userId = data.u_userId;
                    msg.p_userId = data.p_userId
                    await orderDao.createOrder(msg)
        
                    ctx.status = 200;
                    ctx.body = {
                        code: 1,
                        data: {
                            message: '发起预约成功'
                        }
                    }
                } else {
                    ctx.status = 200;
                    ctx.body = {
                        code: 0,
                        data: {
                            message: '暂有订单未支付，请先前往支付'
                        }
                    }

                }
            }
        }
    },

    //物业结算时间
    puttime: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const orderinfo = await orderDao.getOrderInfo(msg);//获取某张预订表
        const orderinfocar = await carDao.getOneCarInfo(orderinfo.c_name); //获取预订表下对应的车位表

        //车位可停秒数
        const data1 = moment(orderinfocar.c_begintime, 'HH:mm:ss')
        const data2 = moment(orderinfocar.c_endtime, 'HH:mm:ss')
        const data3 = data2.diff(data1, 'second')
        //console.log(data3)

        //停车秒数
        const data4 = moment(orderinfo.o_begintime, 'YYYY-MM-DD HH:mm:ss')
        const data5 = moment(orderinfo.o_endtime, 'YYYY-MM-DD HH:mm:ss')
        const data6 = data5.diff(data4, 'second')
        //console.log(data6)

        //获取停车日期 + 车位结束使用的时间（时间拼接）
        const data7 = moment(orderinfo.o_begintime, 'YYYY-MM-DD').format('YYYY-MM-DD')
        //console.log(data7)
        const data8 = moment( data2, data7, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        //console.log(data8)

        if( data6 > data3 ){ //超期
            let orderInfo = { o_over:1, o_money: data6*0.002+100 }
            await orderDao.updateOrder(orderInfo,msg);

            ctx.status = 200;
            ctx.body = {
                code: 0,
                data: {
                    message: '计费成功，该车已超时停车'
                }
            }

        } else {
            if( orderinfo.o_endtime > data8 ){ //超期
                let orderInfo = { o_over:1, o_money: data6*0.002+100 }
                await orderDao.updateOrder(orderInfo,msg);

                ctx.status = 200;
                ctx.body = {
                    code: 0,
                    data: {
                        message: '计费成功，该车已超时停车'
                    }
                }

            } else {
                let orderInfo = { o_over:0, o_money:data6*0.002 }
                await orderDao.updateOrder(orderInfo,msg);

                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    data: {
                        message: '计费成功'
                    }
                }

            }
        }   
    },

    //用户支付金额
    putmoney: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const orderinfo = await orderDao.getOrderInfo(msg);//获取某张预订表
        const orderinfocar = await carDao.getOneCarInfo(orderinfo.c_name); //获取预订表下对应的车位表

        let orderInfo = { o_result: "支付完成" }
        await orderDao.updateOrder(orderInfo,msg);
        
        let orderInfoCar = { c_money: (parseFloat(orderinfocar.c_money) + parseFloat(orderinfo.o_money)).toFixed(1) }  //取一位小数点
        await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '支付成功'
            }
        }
    },

    //系统自身修改预约单结果
    putordersystem: async (ctx) => {
        const data = ctx.state.user
        const order = await orderDao.getAllOrderInfo(data.u_userId)  //获取该账号下的所有预订单
 
        if(order.length !==0){
            const msg=order[order.length-1].o_id;
            const data1 = moment(order[order.length-1].o_time).format('YYYY-MM-DD HH:mm:ss') //下单时间
            //console.log(data1)
            const data2 = moment(data1).add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss') //下单过后30分钟
            //console.log(data2)
            const data3 = moment(data1).add(1, 'days').format('YYYY-MM-DD HH:mm:ss') //下单过后1天
            //console.log(data3)
            const data4 = moment().format('YYYY-MM-DD HH:mm:ss')  //当前时间
            //console.log(data4)

            if( data4 > data2 && order[order.length-1].o_result == "待分配" ){
                const orderinfocar = await carDao.getOneCarInfo(order[order.length-1].c_name); //获取预订表下对应的车位表
                let orderInfoCar = { c_status: '发布成功' }
                await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

                let orderInfo = { o_result: '已失效' }
                await orderDao.updateOrder(orderInfo,msg);

                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    data: {
                        message: '系统自身修改预约单结果成功'
                    }
                }

            } else if( data4 > data3 && order[order.length-1].o_begintime == "Invalid date" ){
                const orderinfocar = await carDao.getOneCarInfo(order[order.length-1].c_name); //获取预订表下对应的车位表
                let orderInfoCar = { c_status: '发布成功' }
                await carDao.updateCar(orderInfoCar,orderinfocar.c_id);

                let orderInfo = { o_result: '已失效' }
                await orderDao.updateOrder(orderInfo,msg);

                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    data: {
                        message: '系统自身修改预约单结果成功'
                    }
                }
            } else {
                ctx.status = 200;
                ctx.body = {
                    code: 0,
                    data: {
                        message: '正常订单，无需修改'
                    }
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前账号还未预约过车位'
                }
            }
        }
    },
    
}