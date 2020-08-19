const discussDao = require('../service/discuss_dao')
var moment = require('moment')

module.exports = {

    //管理员获取所有评论
    getalldiscussadmin: async(ctx) => {
        const discussinfo = await discussDao.getAllDiscuss();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: discussinfo
        }
    },

    //物业获取对应的评论
    getalldiscussproperty: async(ctx) => {
        const discussinfo = await discussDao.getAllDiscuss();
        const alldiscuss = discussinfo.filter(function(item){ //数组条件筛选
            return item.p_userId == ctx.state.user.u_userId
        })

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: alldiscuss
        }
    },

    //删除评论
    deletediscuss: async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);

        const deletediscuss = await discussDao.delectDiscuss(msg);
        console.log(deletediscuss);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //发表评论
    postdiscuss: async(ctx) => {
        const data = ctx.request.body
        console.log(data);
        const msg = {};
        
        msg.d_discuss = data.d_discuss;
        msg.d_date = moment().format('YYYY-MM-DD HH:mm:ss');
        msg.c_name = data.c_name;
        msg.u_userId = data.u_userId;
        msg.p_userId = data.p_userId;

        const creatdiscussinfo = await discussDao.createDiscuss(msg)
        console.log(creatdiscussinfo)

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '发表评论成功'
            }
        }
    },

}