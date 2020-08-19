const config=require('../config/mysql_sequelize');
const Sequelize = config.sequelize

//导入模型统一管理
const user = Sequelize.import(__dirname + '/user.js')
const property = Sequelize.import(__dirname+'/property.js')
const beginner = Sequelize.import(__dirname+'/beginner.js')
const car = Sequelize.import(__dirname+'/car.js')
const order = Sequelize.import(__dirname+'/order.js')
const discuss = Sequelize.import(__dirname+'/discuss.js')


property.hasOne(user,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
user.belongsTo(property, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

beginner.hasOne(user,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
user.belongsTo(beginner, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

car.hasOne(beginner,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
beginner.belongsTo(car, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

car.hasOne(property,{
    foreignKey: 'u_userId',
    sourceKey: 'p_userId'
})
property.belongsTo(car, {
    foreignKey: 'u_userId',
    targetKey: 'p_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

order.hasOne(car,{
    foreignKey: 'c_name',
    sourceKey: 'c_name'
})
car.belongsTo(order, {
    foreignKey: 'c_name',
    targetKey: 'c_name'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

order.hasOne(property,{
    foreignKey: 'u_userId',
    sourceKey: 'p_userId'
})
property.belongsTo(order, {
    foreignKey: 'u_userId',
    targetKey: 'p_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

discuss.hasOne(user,{
    foreignKey: 'u_userId',
    sourceKey: 'u_userId'
})
user.belongsTo(discuss, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

discuss.hasOne(property,{
    foreignKey: 'u_userId',
    sourceKey: 'p_userId'
})
property.belongsTo(discuss, {
    foreignKey: 'u_userId',
    targetKey: 'p_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})


module.exports={ user, property, beginner, car, order, discuss }