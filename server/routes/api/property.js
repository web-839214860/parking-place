const router = require('koa-router')()
const propertyController = require('../../controllers/property')
const passport = require("../../middlewares/passport")
const upload = require("../../middlewares/multer")


router.prefix('/api')

router.all('/*',
    passport.authenticate('jwt', { session: false })
    , async (ctx, next) => {
    console.log(ctx.request)
    await next()
})

router.post('/postonepropertyuser', upload.single('u_image') , propertyController.postonepropertyuser)//管理员添加物业用户

router.delete('/deletepropertyuser/:id', propertyController.deletepropertyuser)//管理员删除物业用户

router.get('/getonepropertyinfo/:id', propertyController.getonepropertyinfo)//管理员获取需要编辑的物业用户的信息

router.put('/putonepropertyinfo/:id', propertyController.putonepropertyinfo)//管理员修改物业用户信息

module.exports = router