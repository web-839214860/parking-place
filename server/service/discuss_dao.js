const { user, property, discuss } = require('../modules/index')

discuss.sync({ force: false });

class discussDao {

    //获取所有评论信息
    static async getAllDiscuss() {
        return await discuss.findAll({
            'order' :[
                ['d_date' , 'DESC'] //根据数据库的字段 d_date 降序排列 相当于数据库的 order by
            ],
            //raw: true    返回所有数据
            where: {
                
            },
            include:[{
                model: user
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

    //删除评论
    static async delectDiscuss(msg) {
        return await discuss.destroy({
            where: {
                d_id: msg
            }
        })
    }

    //发表评论
    static async createDiscuss(msg) {  
        return await discuss.create({

            d_discuss: msg.d_discuss,
            d_date: msg.d_date,
            c_name: msg.c_name,
            u_userId: msg.u_userId,
            p_userId: msg.p_userId
            
        })
    }
    
}
    
module.exports = discussDao