var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'order',
        {
            o_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            o_name:{
                type: DataTypes.STRING,
                field: 'o_name'
            },
            o_phone:{
                type: DataTypes.STRING,
                field: 'o_phone'
            },
            o_card:{
                type: DataTypes.STRING,
                field: 'o_card'
            },
            o_time: {
                type: DataTypes.DATE,
                field: 'o_time',
                get() {
                    return moment(this.getDataValue('o_time')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            o_result:{
                type: DataTypes.STRING,
                field: 'o_result'
            },
            o_begintime: {
                type: DataTypes.DATE,
                field: 'o_begintime',
                get() {
                    return moment(this.getDataValue('o_begintime')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            o_endtime: {
                type: DataTypes.DATE,
                field: 'o_endtime',
                get() {
                    return moment(this.getDataValue('o_endtime')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            o_over:{
                type: DataTypes.INTEGER,
                field:'o_over'
            },
            o_money:{
                type: DataTypes.STRING,
                field:'o_money'
            },
            c_name:{
                type: DataTypes.STRING,
                field:'c_name'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            }, 
            p_userId:{
                type: DataTypes.STRING,
                field: 'p_userId'
            },         
        }
    );
}

