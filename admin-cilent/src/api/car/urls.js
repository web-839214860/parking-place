const baseUrl = '/api'

export default {

    getallcarsinfo: baseUrl + '/getallcarsinfo', //管理员获取所有车位的所有信息接口
    postcarinfo: baseUrl + '/postcarinfo', //管理员发布车位接口
    putcarinfo: baseUrl + '/putcarinfo', //管理员取消发布车位接口
    deletecar: baseUrl + '/deletecar', //管理员删除车位接口
}