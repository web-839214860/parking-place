module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            u_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            },
            u_password:{
                type: DataTypes.STRING,
                field: 'u_password'
            },
            u_name:{
                type: DataTypes.STRING,
                field: 'u_name'
            },
            u_sex:{
                type: DataTypes.STRING,
                field: 'u_sex'
            },
            u_image:{
                type: DataTypes.STRING,
                field: 'u_image'
            },
            role:{
                type:DataTypes.INTEGER,
                field:'role'
            },
            solt:{
                type: DataTypes.STRING,
                field: 'solt'
            }, 
        }
    );
}

