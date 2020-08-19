const carDao = require('../service/car_dao')
var moment = require('moment')

module.exports = {

    //管理员获取所有车位的所有信息
    getallcarsinfo:async(ctx) => {
        const allcarinfo = await carDao.getAllCar();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allcarinfo
        }
    },

    //物业获取对应车位的信息（用于审核发布资格）
    getallcarsinfoproperty:async(ctx) => {
        const allcarinfo = await carDao.getAllCar();
        const allcarsinfo = allcarinfo.filter(function(item){ //数组条件筛选
            return item.p_userId == ctx.state.user.u_userId
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allcarsinfo
        }
    },

    //物业获取对应车位的信息（用于发布、取消发布）
    getallcarsproperty:async(ctx) => {
        const allcarinfo = await carDao.getAllCar();
        const allcarsinfo = allcarinfo.filter(function(item){ //数组条件筛选
            return ( item.p_userId == ctx.state.user.u_userId && item.c_seniority == 1 )
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allcarsinfo
        }
    },

    //车位车主获取个人所发布车位的信息
    getallcarsCaruser:async(ctx) => {
        const allcarinfo = await carDao.getAllCar();
        const allcarsinfo = allcarinfo.filter(function(item){ //数组条件筛选
            return item.u_userId == ctx.state.user.u_userId
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allcarsinfo
        }
    },

    //车位车主获取“我的车位”的车位详情信息
    getonecarinfo:async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const onecarinfo = await carDao.getCarInfo(msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: onecarinfo
        }
    },

    //车位车主、普通用户 首页车位信息
    getallcarsinfocilent:async(ctx) => {
        const allcarinfo = await carDao.getAllCar();
        const allcarsinfo = allcarinfo.filter(function(item){ //数组条件筛选
            return ( item.c_seniority == 1 &&  item.c_status == "发布成功" )
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allcarsinfo
        }
    },

    //管理员发布车位
    postcarinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const carinfo = await carDao.getCarInfo(msg);//获取某张车位表

        let carInfo = { c_status: '发布成功' }
        await carDao.updateCar(carInfo,msg);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '发布车位成功',
            }
        }
    },

    //管理员取消发布车位
    putcarinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const carinfo = await carDao.getCarInfo(msg);//获取某张车位表
        
        let carInfo = { c_status: '待发布' }
        await carDao.updateCar(carInfo,msg);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '取消发布车位成功',
            }
        }
    },

    //物业审核发布车位资格
    postseniorityproperty: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const carinfo = await carDao.getCarInfo(msg);//获取某张车位表

        let carInfo = { c_seniority: 1 }
        await carDao.updateCar(carInfo,msg);
            
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '发布资格审核成功',
            }
        }
        
    },

    //物业取消审核发布车位资格
    putseniorityproperty: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const carinfo = await carDao.getCarInfo(msg);//获取某张车位表

        if( carinfo.c_status == "待发布" || carinfo.c_status == "发布成功" ){
            let carInfo = { c_seniority: 0, c_status: '待发布' }
            await carDao.updateCar(carInfo,msg);
            
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '发布资格取消审核成功',
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前车位正在被使用，不允许该操作'
                }
            }
        } 
    },

    //车位车主修改车位信息
    putcaruserinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const data = ctx.request.body;
        const carinfo = await carDao.getCarInfo(msg);//获取某张车位表

        if( carinfo.c_status == "待发布" || carinfo.c_status == "发布成功" ){
            let carInfo = {
                c_name: data.c_name, 
                c_begintime: data.c_begintime, 
                c_endtime: data.c_endtime, 
                c_image: data.c_image, 
                c_money: data.c_money,
                c_seniority: data.c_seniority,
                c_status: data.c_status,
                u_userId: data.u_userId,
                p_userId: data.p_userId,
            }
            await carDao.updateCar(carInfo,msg);
            
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '修改成功',
                }
            } 
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前车位正在被使用，不允许该操作'
                }
            }
        } 
    },

    //管理员删除车位
    deletecar: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const carinfo = await carDao.getCarInfo(msg);//获取某张车位表
        if(carinfo.c_money == 0){
            
            if( carinfo.c_status == "待发布" || carinfo.c_status == "发布成功" ){
                const deletecar = await carDao.delectCar(msg);
                console.log(deletecar);
    
                ctx.status = 200;
                ctx.body = {
                    code: 1,
                    data: {
                        message: '删除车位成功'
                    }
                } 
            } else {
                ctx.status = 200;
                ctx.body = {
                    code: -1,
                    data: {
                        message: '当前车位正在被使用，不允许该操作'
                    }
                }
            }    
             
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前车位暂有收益未结算,不允许该操作'
                }
            }
        }    
    },

    //添加车位
    postcar: async(ctx) => {
        const data = ctx.req.body
        const image = ctx.req.file; //接收图片
        console.log(data);
        console.log(image);
        const allcarinfo = await carDao.getAllCar();
        const allcarsinfo = allcarinfo.filter(function(item){ //数组条件筛选
            return item.u_userId == ctx.state.user.u_userId
        })
        console.log(allcarsinfo.length);
        const msg = {};
        // 查询车位单是否已经存在过
        const carinfo = await carDao.getOneCarInfo(data.c_name)

        if(allcarsinfo.length < 5){

            if (carinfo == null) {
                msg.c_name = data.c_name;
                msg.c_begintime = data.c_begintime;
                msg.c_endtime = data.c_endtime;
                msg.c_image = 'http://localhost:3000/' + image.filename;
                msg.c_money = 0;
                msg.c_seniority = data.c_seniority;
                msg.c_status = "待发布" ;
                msg.u_userId = data.u_userId;
                msg.p_userId = data.p_userId;
                        
                await carDao.createCar(msg)
                
                ctx.status = 200;
                    ctx.body = {
                        code: 1,
                        data: {
                            message: '车位发布成功'
                        }
                    }
            } else {
                ctx.status = 200;
                    ctx.body = {
                        code: 0,
                        data: {
                             message: '当前车位已经发布过,请勿重复发布!'
                        }
                    }
                
            }

        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前账号发布车位数量已达到上限'
                }
            }
        }  
    },

}