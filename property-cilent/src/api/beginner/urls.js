const baseUrl = '/api'
export default {
    
    getallcarbeginner: baseUrl + '/getallcarbeginner',//物业获取对应物业的用户升级单接口
    postbeginnerinfo: baseUrl + '/postbeginnerinfo',  //物业审核用户升级单接口
    putbeginnerinfo: baseUrl + '/putbeginnerinfo',  //物业取消审核用户升级单接口
    deletecaruser: baseUrl + '/deletecaruser', //物业删除对应物业的用户升级单接口
    
    getsomecarinfo:baseUrl + '/getsomecarinfo', //物业获取所属车位车主信息接口
}
