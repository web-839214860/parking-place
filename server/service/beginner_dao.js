const { user, beginner } = require('../modules/index')

beginner.sync({ force: false });

class beginnerDao {
    
    //获取某个车位车主的全部信息、获取升级单
    static async getCarUserInfo(u_userId) {
        return await beginner.findOne({
            where: {
                u_userId
            },
            include:[{
                model: user
            }],
        })
    }

    //物业获取对应物业的用户升级单
    static async getAllUserCarBeginner() {
        return await beginner.findAll({
            //raw: true    返回所有数据
            where: {
                
            },
            include:[{
                model: user
            }],
        })
    }

    //物业审核、取消审核升级单
    static async updateBeginnerUser(msg, id) {
        return await beginner.update({
            b_name: msg.b_name,
            b_phone: msg.b_phone,
            b_parking: msg.b_parking,
            b_carname: msg.b_carname,
            b_photo: msg.b_photo,
            b_time: msg.b_time,
            b_result: msg.b_result,
            u_userId: msg.u_userId,
        }, {
            where: {
                u_userId: id
            }
        })
    }

    //删除车位车主
    static async delectUser(msg) {
        return await beginner.destroy({
            where: {
                u_userId: msg
            }
        })
    }


    //升级车位车主
    static async createBeginnerUser(msg) {  
        return await beginner.findOrCreate({  //先查找，如果不存在则创建用户并保存到数据库中
            where: {
                u_userId: msg.u_userId
            },
            defaults: {
                b_name: msg.b_name,
                b_phone: msg.b_phone,
                b_parking: msg.b_parking,
                b_carname: msg.b_carname,
                b_photo: msg.b_photo,
                b_time: msg.b_time,
                b_result: msg.b_result,
                u_userId: msg.u_userId,
            },
            raw: true
        })
    }
         
}
    
module.exports = beginnerDao