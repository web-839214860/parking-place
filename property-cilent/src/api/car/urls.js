const baseUrl = '/api'

export default {

    getallcarsinfoproperty: baseUrl + '/getallcarsinfoproperty', //物业获取对应车位的信息（用于审核发布资格）接口
    postseniorityproperty: baseUrl + '/postseniorityproperty', //物业审核发布车位资格接口
    putseniorityproperty: baseUrl + '/putseniorityproperty', //物业取消审核发布车位资格接口
    getallcarsproperty: baseUrl + '/getallcarsproperty', //物业获取对应车位的信息（用于发布、取消发布）接口
    postcarinfo: baseUrl + '/postcarinfo', //物业发布车位接口
    putcarinfo: baseUrl + '/putcarinfo', //物业取消发布车位接口
    deletecar: baseUrl + '/deletecar', //物业删除车位审核、删除车位接口
    postcar: baseUrl + '/postcar', //添加车位接口
}