const { car, user, beginner, property } = require('../modules/index')

car.sync({ force: false });

class carDao {

    //管理员获取所有车位的所有信息
    static async getAllCar() {
        return await car.findAll({
            'order' :[
                ['c_name' , 'DESC'] //根据数据库的字段 c_name 降序排列 相当于数据库的 order by
            ],
            //raw: true    返回所有数据
            where: {
                
            },
            include:[{
                model: beginner
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

    //获取某个车位的所有信息 (根据c_id查询)
    static async getCarInfo(c_id) {
        return await car.findOne({
            where: {
                c_id
            },
            include:[{
                model: beginner
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

    //获取某个车位的所有信息 (用于添加车位时查询：根据c_name查询)
    static async getOneCarInfo(c_name) {
        return await car.findOne({
            where: {
                c_name
            },
            include:[{
                model: beginner
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
    
    //管理员发布、取消发布车位信息
    static async updateCar(msg, id) {
        return await car.update({
            c_name: msg.c_name,
            c_begintime: msg.c_begintime,
            c_endtime: msg.c_endtime,
            c_image: msg.c_image,
            c_money: msg.c_money,
            c_seniority: msg.c_seniority,
            c_status: msg.c_status,
            u_userId: msg.u_userId,
            p_userId: msg.p_userId,
        }, {
            where: {
                c_id: id
            }
        })
    }

    //删除车位
    static async delectCar(msg) {
        return await car.destroy({
            where: {
                c_id: msg
            }
        })
    }

    //添加车位
    static async createCar(msg) {  
        return await car.findOrCreate({  //先查找，如果不存在则创建用户并保存到数据库中
            where: {
                c_name: msg.c_name
            },
            defaults: {
                c_name: msg.c_name,
                c_begintime: msg.c_begintime,
                c_endtime: msg.c_endtime,
                c_image: msg.c_image,
                c_money: msg.c_money,
                c_seniority: msg.c_seniority,
                c_status: msg.c_status,
                u_userId: msg.u_userId,
                p_userId: msg.p_userId,
            },
            raw: true
        })
    }
    
}
    
module.exports = carDao