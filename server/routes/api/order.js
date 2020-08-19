const router = require('koa-router')()
const orderController = require('../../controllers/order')
const passport = require("../../middlewares/passport")


router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})


//管理员
router.get('/getallordercheckadmin', orderController.getallordercheckadmin) //管理员获取所有 “待分配” 的订单的所有信息

router.get('/getallorderNopaymentadmin', orderController.getallorderNopaymentadmin) //管理员获取所有 “待支付” 的订单的所有信息

router.get('/getallorderSuccessadmin', orderController.getallorderSuccessadmin)  //管理员获取所有 “支付完成” 的订单的所有信息

router.get('/getallorderOveradmin', orderController.getallorderOveradmin)  //管理员获取所有 “超时订单” 的订单的所有信息

router.get('/getallorderLoseadmin', orderController.getallorderLoseadmin)  //管理员获取所有 “已失效订单” 的订单的所有信息

//物业
router.get('/getallordercheck', orderController.getallordercheck) //物业获取所有 “待分配” 的订单的所有信息

router.post('/postorderinfo/:id', orderController.postorderinfo) //物业分配订单

router.delete('/deleteorderinfo/:id', orderController.deleteorderinfo) //物业删除"待分配"订单

router.get('/getallorderNopayment', orderController.getallorderNopayment)  //物业获取所有 “待支付” 的订单的所有信息

router.get('/getallorderSuccess', orderController.getallorderSuccess)  //物业获取所有 “支付完成” 的订单的所有信息

router.get('/getallorderOver', orderController.getallorderOver)  //物业获取所有 “超时订单” 的订单的所有信息

router.get('/getallorderLose', orderController.getallorderLose)  //物业获取所有 “已失效订单” 的订单的所有信息

router.put('/putorderbegin/:id', orderController.putorderbegin) //物业开始计时

router.put('/putorderend/:id', orderController.putorderend) //物业结束计时

router.put('/puttime/:id', orderController.puttime) //物业结算时间

router.delete('/deleteorder/:id', orderController.deleteorder) //物业删除订单

//用户
router.post('/postorder', orderController.postorder) //填写订单

router.get('/getallordercheckclient', orderController.getallordercheckclient) //用户获取所有 “待分配” 的订单的所有信息

router.get('/getallorderNopaymentclient', orderController.getallorderNopaymentclient)  //用户获取所有 “待支付” 的订单的所有信息

router.get('/getallorderSuccessclient', orderController.getallorderSuccessclient)  //用户获取所有 “支付完成” 的订单的所有信息

router.get('/getoneorderSuccessclient/:id', orderController.getoneorderSuccessclient)  //用户获取某张 “支付完成” 的订单的详细信息

router.get('/getallorderLoseclient', orderController.getallorderLoseclient)  //用户获取所有 “已失效订单” 的订单的所有信息

router.put('/putmoney/:id', orderController.putmoney) //用户支付金额

router.put('/putordersystem', orderController.putordersystem) //系统自身修改预约单结果

module.exports = router