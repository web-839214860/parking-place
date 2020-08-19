module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'car',
        {
            c_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            c_name:{
                type: DataTypes.STRING,
                field: 'c_name'
            },
            c_begintime: {
                type: DataTypes.TIME,
                field: 'c_begintime',
            },
            c_endtime: {
                type: DataTypes.TIME,
                field: 'c_endtime',
            },
            c_image:{
                type: DataTypes.STRING,
                field:'c_image'
            },
            c_money:{
                type: DataTypes.STRING,
                field:'c_money'
            },
            c_seniority:{
                type: DataTypes.INTEGER,
                field: 'c_seniority'
            },
            c_status:{
                type: DataTypes.STRING,
                field:'c_status'
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

