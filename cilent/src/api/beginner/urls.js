const baseUrl = '/api'
export default {

    getallpropertyinfo: baseUrl + '/getallpropertyinfo', //获取物业名称接口（用于下拉选择）
    getonebeginnerinfo: baseUrl + '/getonebeginnerinfo', //获取用户自身升级单接口（用于页面渲染、读取时间）
    postbeginneruser: baseUrl + '/postbeginneruser' , //普通用户升级为车位车主接口
}