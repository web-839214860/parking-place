import router from './router'
import store from './store'
import { getLocalStorage } from '@/utils/localStorage' // 验权(从localstorage中获取)
import api from './api/apiList'

const whiteList = ['/login','/register','/userrules']
router.beforeEach((to, from, next) => {
    // 点击登录时，拿到了token并存入了localstorage,保证页面刷新时,始终可以拿到token
    if (getLocalStorage('Token') && getLocalStorage('Role') == 4) {
        if(to.path === '/login' || to.path === '/register' || to.path === '/userrules' || to.meta.roles === 3) {
            next({ path: '/' } )  
        } else {
            api.order.putordersystem().then(/*res =>{
                if(res.code==1){
                    console.log(res.data)
                }else if(res.code==0){
                    console.log(res.data)
                }else if(res.code==-1){
                    console.log(res.data)
                }
            }*/)
            api.user.userinfo().then(res =>{
                let user = ""; 
                //console.log(res.data)
                if(res.data.user.user == null){
                    user = res.data.user
                } else {
                    user = res.data.user.user
                }
                //同步存值 存在mutations中
                store.commit("user/SET_U_UESRID",user.u_userId);  //this.$store.commit('mutations 方法名'，值)
                store.commit("user/SET_U_NAME",user.u_name);
                store.commit("user/SET_U_SEX",user.u_sex);
                store.commit("user/SET_U_IMAGE",user.u_image);
                next()
            }).catch((err)=>{
                console.log(err)
                store.dispatch('user/LogOut').then(() => {  //异步存值 this.$store.disPatch('action 方法名'，值)
                next({ path: '/' })
                })
            })
        } 
    } else if (getLocalStorage('Token') && getLocalStorage('Role') == 3){
        if(to.path === '/login' || to.path === '/register' || to.path === '/userrules' || to.meta.roles == 4) {
            next({ path: '/master' } )  
        } else {
            api.order.putordersystem().then(/*res =>{
                if(res.code==1){
                    console.log(res.data)
                }else if(res.code==0){
                    console.log(res.data)
                }else if(res.code==-1){
                    console.log(res.data)
                }
            }*/)
            api.user.userinfo().then(res =>{
                let user = res.data.user.user;  //同步存值 存在mutations中
                //console.log(res.data)
                store.commit("user/SET_U_UESRID",user.u_userId);  //this.$store.commit('mutations 方法名'，值)
                store.commit("user/SET_U_NAME",user.u_name);
                store.commit("user/SET_U_SEX",user.u_sex);
                store.commit("user/SET_U_IMAGE",user.u_image);
                store.commit("user/SET_B_NAME",res.data.user.b_name);
                store.commit("user/SET_B_PARKING",res.data.user.b_parking);
                store.commit("user/SET_B_TIME",res.data.user.b_time);
                next()
            }).catch((err)=>{
                console.log(err)
                store.dispatch('user/LogOut').then(() => {  //异步存值 this.$store.disPatch('action 方法名'，值)
                next({ path: '/master' })
                })
            })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach(() => {

})