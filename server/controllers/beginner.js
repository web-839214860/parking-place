const beginnerDao = require('../service/beginner_dao')
const userDao = require('../service/user_dao')
var moment = require('moment')

module.exports = {

    //物业获取对应物业的用户升级单
    getallcarbeginner:async(ctx) => {
        const allbeginner = await beginnerDao.getAllUserCarBeginner();
        const alluserscarbeginner = allbeginner.filter(function(item){ //数组条件筛选
            return item.b_parking == ctx.state.user.u_name
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: alluserscarbeginner
        }
    },

    //物业审核用户升级单
    postbeginnerinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const beginnerinfo = await beginnerDao.getCarUserInfo(msg);//获取用户升级单
        const userinfo = await userDao.getUserInfo(beginnerinfo.u_userId);//获取用户升级单下的用户信息
        console.log(userinfo)
        
        let beginnerInfo = { b_result: '成功' }
        let userInfo = { role: 3 }
        
        await beginnerDao.updateBeginnerUser(beginnerInfo,msg);

        let data = await userDao.updateOneUser(userInfo,msg);
        console.log(data);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '审核成功',
            }
        }
    },

    //物业取消审核用户升级单
    putbeginnerinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const beginnerinfo = await beginnerDao.getCarUserInfo(msg);//获取用户升级单
        const userinfo = await userDao.getUserInfo(beginnerinfo.u_userId);//获取用户升级单下的用户信息
        console.log(userinfo)
        
        let beginnerInfo = { b_result: '待审核' }
        let userInfo = { role: 4 }
        
        await beginnerDao.updateBeginnerUser(beginnerInfo,msg);

        let data = await userDao.updateOneUser(userInfo,msg);
        console.log(data);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '取消审核成功',
            }
        }
    },

    //删除用户升级单、管理员删除车位车主用户
    deletecaruser: async(ctx) => {
        const msg = ctx.params.id;

        const beginnerinfo = await beginnerDao.getCarUserInfo(msg);//获取用户升级单
        const userinfo = await userDao.getUserInfo(beginnerinfo.u_userId);//获取用户升级单下的用户信息
        //console.log(userinfo)
        let userInfo = { role: 4 }
        let data = await userDao.updateOneUser(userInfo,msg);

        const deletecaruser = await beginnerDao.delectUser(msg);
        console.log(deletecaruser);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //物业获取所属车位车主信息
    getsomecarinfo:async(ctx) => {
        const userscarinfo = await userDao.getAllUserCar();
        const someuserscarinfo = userscarinfo.filter(function(item){ //数组条件筛选
            return item.beginner.b_parking == ctx.state.user.u_name
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: someuserscarinfo
        }
    },

    //获取用户自身升级单
    getonebeginnerinfo:async(ctx) => {
        const onebeginnerinfo = await beginnerDao.getCarUserInfo(ctx.state.user.u_userId);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: onebeginnerinfo
        }
    },

    //普通用户升级为车位车主
    postbeginneruser:async(ctx) => {
        const data = ctx.req.body
        const image = ctx.req.file; //接收图片
        console.log(data);
        console.log(image);
        const msg = {};
        // 查询升级单是否已经存在过
        const beginneruser = await beginnerDao.getCarUserInfo(data.u_userId)
        if (beginneruser == null) {

            msg.b_name = data.b_name;
            msg.b_phone = data.b_phone;
            msg.b_parking = data.b_parking;
            msg.b_carname = data.b_carname;
            msg.b_photo = 'http://localhost:3000/' + image.filename;
            msg.b_time = moment().format('YYYY-MM-DD');
            msg.b_result = "待审核" ;
            msg.u_userId = data.u_userId;
        
            await beginnerDao.createBeginnerUser(msg)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '申请成功，请等待审核'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前账号已经发起申请过,请勿重复申请!'
                }
            }

        }
    },

    
}