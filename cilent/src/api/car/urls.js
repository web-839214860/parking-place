const baseUrl = '/api'

export default {

    postcar: baseUrl + '/postcar', //添加车位接口
    getallcarsCaruser: baseUrl + '/getallcarsCaruser', //车位车主获取个人所发布车位的信息接口
    postcarinfo: baseUrl + '/postcarinfo', //发布车位接口
    putcarinfo: baseUrl + '/putcarinfo', //取消发布车位接口
    deletecar: baseUrl + '/deletecar', //删除车位接口
    getonecarinfo: baseUrl + '/getonecarinfo', //车位车主获取“我的车位”的车位详情信息接口
    putcaruserinfo: baseUrl + '/putcaruserinfo', //车位车主修改车位信息接口
    getallcarsinfocilent: baseUrl + '/getallcarsinfocilent', //车位车主、普通用户 首页车位信息接口
}