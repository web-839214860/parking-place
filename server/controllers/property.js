const propertyDao = require('../service/property_dao')
const userDao = require('../service/user_dao')
var moment = require('moment')

module.exports = {

    //管理员添加物业用户
    postonepropertyuser: async(ctx) => {
        const data = ctx.req.body
        const image = ctx.req.file; //接收图片
        console.log(data);
        console.log(image);
        const msg = {};
        // 查询用户账号是否已经存在过
        const user = await userDao.getUserInfo(data.u_userId)
        if (user == null) {
            msg.u_userId = data.u_userId;
            msg.u_password = "c33fd22a0283ec2cead634eeee6a3011";
            msg.u_name = data.u_name;
            msg.u_sex = data.u_sex;
            msg.u_image = 'http://localhost:3000/' + image.filename;
            msg.role = 2;
            msg.solt = "7df6f2d7-f76a-4b4a-95f0-37595dd5b596";
            await userDao.createUser(msg)
            
            msg.p_name = data.p_name;
            msg.p_phone = data.p_phone;
            msg.p_address = data.p_address;
            msg.p_time = moment().format('YYYY-MM-DD');
            msg.u_userId = data.u_userId;
            await propertyDao.createUser(msg)
            
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '添加成功'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '该账号已经存在,请勿重复添加!'
                }
            }

        }
    },

    //管理员删除物业用户
    deletepropertyuser: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const deleteproperty = await propertyDao.delectUser(msg);
        const deleteuser = await userDao.delectUser(msg);
        console.log(deleteproperty);
        console.log(deleteuser);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //管理员获取需要编辑的物业用户的信息
    getonepropertyinfo: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        let onepropertyinfo=await propertyDao.getUserInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '获取成功',
                onepropertyinfo: onepropertyinfo
            }
        }
    },

    //管理员编辑物业用户信息
    putonepropertyinfo: async(ctx) => {  
        const msg = ctx.params.id;
        //console.log(msg);
        const info=ctx.request.body;
        //console.log(info)
        let userInfo = {
            u_userId: info.u_userId, 
            u_name: info.user.u_name,
            p_address: info.p_address, 
            p_name: info.p_name,
            u_sex: info.user.u_sex,
            p_phone: info.p_phone 
        }
        //console.log(userInfo);
        let data = await userDao.updateOneUser(userInfo,msg);
        let data1 = await propertyDao.updateOneUser(userInfo,msg);
        //console.log(data);
        //console.log(data1);
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '修改成功',
                }
            }
    },

}