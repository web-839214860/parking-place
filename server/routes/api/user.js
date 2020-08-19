const router = require('koa-router')()
const userController = require('../../controllers/user')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")

router.prefix('/api')


router.post('/postlogin', userController.postlogin)//登录

router.post('/postuser', upload.single('u_image'), userController.postuser) //注册


router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})

router.get('/userinfo', userController.userinfo) //用户信息

router.get('/getalladmininfo', userController.getalladmininfo)//管理员获取所有高级管理员信息

router.get('/getallpropertyinfo', userController.getallpropertyinfo)//管理员获取所有物业用户信息

router.get('/getallcarinfo', userController.getallcarinfo)//管理员获取所有车位车主信息

router.get('/getallcommoninfo', userController.getallcommoninfo)//管理员获取所有普通用户信息

router.put('/putpassword',userController.putpassword) //修改密码

router.post('/postoneuser', upload.single('u_image') , userController.postoneuser)//管理员添加用户

router.delete('/deleteuser/:id', userController.deleteuser) //管理员删除用户

router.get('/getoneuserinfo/:id', userController.getoneuserinfo)//管理员获取需要编辑的用户的信息

router.put('/putoneuserinfo/:id', userController.putoneuserinfo)//管理员修改用户信息

module.exports = router