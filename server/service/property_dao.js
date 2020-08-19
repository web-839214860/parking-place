const { user, property } = require('../modules/index')

property.sync({ force: false });

class propertyDao {

    //获取某个物业用户的全部信息
    static async getUserInfo(u_userId) {
        return await property.findOne({
            where: {
                u_userId
            },
            include:[{
                model: user
            }],
        })
    }

    //创建物业用户
    static async createUser(msg) {  
        return await property.findOrCreate({  //先查找，如果不存在则创建用户并保存到数据库中
            where: {
                u_userId: msg.u_userId
            },
            defaults: {
                p_name: msg.p_name,
                p_phone: msg.p_phone,
                p_address: msg.p_address,
                p_time: msg.p_time,
                u_userId: msg.u_userId,
            },
            raw: true
        })
    }

    //删除物业用户
    static async delectUser(msg) {
        return await property.destroy({
            where: {
                u_userId: msg
            }
        })
    }

    //编辑物业用户
    static async updateOneUser(msg, id) {
        return await property.update({
            p_name: msg.p_name,
            p_phone: msg.p_phone,
            p_address: msg.p_address,
            p_time: msg.p_time,
            u_userId: msg.u_userId,
        }, {
            where: {
                u_userId: id
            }
        })
    }

}

module.exports = propertyDao