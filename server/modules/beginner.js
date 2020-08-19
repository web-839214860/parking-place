var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'beginner',
        {
            b_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            b_name:{
                type: DataTypes.STRING,
                field: 'b_name'
            },
            b_phone:{
                type: DataTypes.STRING,
                field: 'b_phone'
            },
            b_parking:{
                type: DataTypes.STRING,
                field:'b_parking'
            },
            b_carname:{
                type: DataTypes.STRING,
                field:'b_carname'
            },
            b_photo:{
                type: DataTypes.STRING,
                field:'b_photo'
            },
            b_time: {
                type: DataTypes.DATEONLY,
                field: 'b_time',
                get() {
                    return moment(this.getDataValue('b_time')).format('YYYY-MM-DD');
                }
            },
            b_result:{
                type: DataTypes.STRING,
                field:'b_result'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },          
        }
    );
}

