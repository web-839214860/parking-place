const baseUrl = '/api'
export default {
    
    postlogin: baseUrl + '/postlogin', //登录接口
    userinfo: baseUrl + '/userinfo', //用户信息接口
    getalladmininfo: baseUrl + '/getalladmininfo',//管理员获取所有高级管理员信息接口
    getallpropertyinfo: baseUrl + '/getallpropertyinfo',//管理员获取所有物业用户信息接口
    getallcarinfo: baseUrl + '/getallcarinfo',//管理员获取所有车位车主信息接口
    getallcommoninfo: baseUrl + '/getallcommoninfo',//管理员获取所有普通用户信息接口
    putpassword: baseUrl + '/putpassword',//修改密码接口
    postoneuser: baseUrl + '/postoneuser',//管理员添加用户接口
    deleteuser: baseUrl + '/deleteuser', //管理员删除用户接口
    getoneuserinfo: baseUrl + '/getoneuserinfo', //管理员获取需要编辑的用户的信息接口
    putoneuserinfo: baseUrl + '/putoneuserinfo', //管理员编辑用户接口
    
}

