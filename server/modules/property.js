var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'property',
        {
            p_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            p_name:{
                type: DataTypes.STRING,
                field: 'p_name'
            },
            p_phone:{
                type: DataTypes.STRING,
                field: 'p_phone'
            },
            p_address:{
                type: DataTypes.STRING,
                field:'p_address'
            },
            p_time: {
                type: DataTypes.DATEONLY,
                field: 'p_time',
                get() {
                    return moment(this.getDataValue('p_time')).format('YYYY-MM-DD');
                }
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },          
        }
    );
}

