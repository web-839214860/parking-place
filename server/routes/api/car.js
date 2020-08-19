const router = require('koa-router')()
const carController = require('../../controllers/car')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")


router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})

//管理员
router.get('/getallcarsinfo', carController.getallcarsinfo) //管理员获取所有车位的所有信息

router.post('/postcarinfo/:id', carController.postcarinfo) //管理员发布车位

router.put('/putcarinfo/:id', carController.putcarinfo) //管理员取消发布车位

router.delete('/deletecar/:id', carController.deletecar) //管理员删除车位

//物业
router.get('/getallcarsinfoproperty', carController.getallcarsinfoproperty) //物业获取对应车位的信息（用于审核发布资格）

router.post('/postseniorityproperty/:id', carController.postseniorityproperty) //物业审核发布车位资格

router.put('/putseniorityproperty/:id', carController.putseniorityproperty) //物业取消审核发布车位资格

router.get('/getallcarsproperty', carController.getallcarsproperty) //物业获取对应车位的信息（用于发布、取消发布）

router.post('/postcar', upload.single('c_image') , carController.postcar) //添加车位

//车位车主
router.get('/getallcarsCaruser', carController.getallcarsCaruser) //车位车主获取个人所发布车位的信息

router.get('/getonecarinfo/:id', carController.getonecarinfo) //车位车主获取“我的车位”的车位详情信息

router.put('/putcaruserinfo/:id', carController.putcaruserinfo) //车位车主修改车位信息

router.get('/getallcarsinfocilent', carController.getallcarsinfocilent) //车位车主、普通用户 首页车位信息


module.exports = router