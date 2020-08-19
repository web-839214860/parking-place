// const db = require('../config/mysql_sequelize')
// const Sequelize = db.sequelize
// const user = Sequelize.import('../modules/user.js')

const { user, property, beginner } = require('../modules/index')

user.sync({ force: false }); 

class userDao {

    //获取某个用户的全部信息
    static async getUserInfo(u_userId) {
        return await user.findOne({
            where: {
                u_userId
            }
        })
    }

    //管理员获取所有高级管理员
    static async getAllUserAdmin() {
        return await user.findAll({
            //raw: true    返回所有数据
            where: {
                role:1
            }
        })
    }

    //管理员获取所有物业用户信息
    static async getAllUserProperty(){
        return await user.findAll({
            'order' :[
                ['property' , 'p_time' , 'DESC'] //根据数据库的字段 p_time 降序排列 相当于数据库的 order by
            ],
            include:[{
                model: property
            }],
            where: {
                role:2
            }
        })
    }

    //管理员获取所有车位车主的信息
    static async getAllUserCar(){
        return await user.findAll({
            'order' :[
                ['beginner' , 'b_parking' , 'ASC'] //根据数据库的字段 b_parking 升序排列 相当于数据库的 order by
            ],
            include:[{
                model: beginner
            }],
            where: {
                role:3
            }
        })
    }

    //管理员获取所有普通用户
    static async getAllUserCommon() {
        return await user.findAll({
            //raw: true    返回所有数据
            where: {
                role:4
            }
        })
    }

    //修改用户密码
    static async updateUser(msg, id){
        return await user.update({
            u_password: msg.u_password,
            u_name: msg.u_name,  
            role:msg.role,
            solt:msg.solt,            
        },{
           where:{
               u_userId:id
           }
        })
    }

    //创建用户
    static async createUser(msg) {  
        return await user.findOrCreate({  //先查找，如果不存在则创建用户并保存到数据库中
            where: {
                u_userId: msg.u_userId
            },
            defaults: {
                u_userId: msg.u_userId,
                u_password: msg.u_password,
                u_name: msg.u_name,
                u_sex: msg.u_sex,
                u_image: msg.u_image,
                role: msg.role,
                solt: msg.solt,
            },
            raw: true
        })
    }

    //删除用户
    static async delectUser(msg) {
        return await user.destroy({
            where: {
                u_userId: msg
            }
        })
    }

    //编辑用户
    static async updateOneUser(msg, id) {
        return await user.update({
            u_userId: msg.u_userId,
            u_password: msg.u_password,
            u_name: msg.u_name,
            u_sex: msg.u_sex,
            u_image: msg.u_image,
            role: msg.role,
            solt: msg.solt,
        }, {
            where: {
                u_userId: id
            }
        })
    }
    
}

module.exports = userDao
