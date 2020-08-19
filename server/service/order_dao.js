const { car, user, property, order } = require('../modules/index')

order.sync({ force: false });

class orderDao {

    //获取所有订单的所有信息
    static async getAllOrder() {
        return await order.findAll({
            'order' :[
                ['o_time' , 'DESC'] //根据数据库的字段 o_time 降序排列 相当于数据库的 order by
            ],
            //raw: true    返回所有数据
            where: {
                
            },
            include:[{
                model: car
            },{
                model: property,
                include:[
                    {
                        model: user
                    }
                ]
            }],
        })
    }

    //获取某张预订表的所有信息 (根据o_id查询)
    static async getOrderInfo(o_id) {
        return await order.findOne({
            where: {
                o_id
            },
            include:[{
                model: car
            },{
                model: property,
                include:[
                    {
                        model: user
                    }
                ]
            }],
        })
    }

    //获取预约单（用于查询该账号申请的预约单）
    static async getAllOrderInfo(id) {
        return await order.findAll({
            include:[{
                model: car
            },{
                model: property,
                include:[
                    {
                        model: user
                    }
                ]
            }],
            where: {
                u_userId: id
            },
        })
    }

    //修改预订表的信息
    static async updateOrder(msg, id) {
        return await order.update({
            o_name: msg.o_name,
            o_phone: msg.o_phone,
            o_card: msg.o_card,
            o_time: msg.o_time,
            o_result: msg.o_result,
            o_begintime: msg.o_begintime,
            o_endtime: msg.o_endtime,
            o_over: msg.o_over,
            o_money: msg.o_money,
            c_name: msg.c_name,
            u_userId: msg.u_userId,
            p_userId: msg.p_userId,
        }, {
            where: {
                o_id: id
            }
        })
    }

    //删除预订表的信息
    static async delectOrder(msg) {
        return await order.destroy({
            where: {
                o_id: msg
            }
        })
    }

    //添加预订表的信息（车位预订）
    static async createOrder(msg) {  
        return await order.findOrCreate({  //先查找，如果不存在则创建用户并保存到数据库中
            where: {
                u_userId: ''
            },
            defaults: {
                o_name: msg.o_name,
                o_phone: msg.o_phone,
                o_card: msg.o_card,
                o_time: msg.o_time,
                o_result: msg.o_result,
                o_begintime: msg.o_begintime,
                o_endtime: msg.o_endtime,
                o_over: msg.o_over,
                o_money: msg.o_money,
                c_name: msg.c_name,
                u_userId: msg.u_userId,
                p_userId: msg.p_userId,
            },
            raw: true
        })
    }

    
}
    
module.exports = orderDao