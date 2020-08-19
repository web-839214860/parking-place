const router = require('koa-router')()
const beginnerController = require('../../controllers/beginner')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")


router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})

router.get('/getallcarbeginner', beginnerController.getallcarbeginner) //物业获取对应物业的用户升级单

router.post('/postbeginnerinfo/:id', beginnerController.postbeginnerinfo) //物业审核用户升级单

router.put('/putbeginnerinfo/:id', beginnerController.putbeginnerinfo) //物业取消审核用户升级单

router.delete('/deletecaruser/:id', beginnerController.deletecaruser) //删除用户升级单、管理员删除车位车主用户

router.get('/getsomecarinfo', beginnerController.getsomecarinfo) //物业获取所属车位车主信息

router.get('/getonebeginnerinfo', beginnerController.getonebeginnerinfo) //获取用户自身升级单

router.post('/postbeginneruser', upload.single('b_photo') , beginnerController.postbeginneruser) //普通用户升级为车位车主

module.exports = router