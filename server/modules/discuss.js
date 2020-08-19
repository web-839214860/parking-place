var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'discuss',
        {
            d_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            d_discuss:{
                type: DataTypes.STRING,
                field: 'd_discuss'
            },
            d_date: {
                type: DataTypes.DATE,
                field: 'd_date',
                get() {
                    return moment(this.getDataValue('d_date')).format('YYYY-MM-DD HH:mm:ss');
                }
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

