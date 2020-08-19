import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Register from '@/views/register'
import UserRules from '@/views/userRules'

import Main from '@/views/main'
import CarMain from '@/views/carmain'

import Index from '@/views/index'
import IndexInfo from '@/views/indexinfo'
import IndexOrder from '@/views/indexorder'
import IndexOrderSuccess from '@/views/indexordersuccess'

import Result from '@/views/result'
import ResultSuccess from '@/views/resultsuccess'

import My from '@/views/my'
import MyInfo from '@/views/myinfo'
import MyPassword from '@/views/mypassword'
import MyUpGrade from '@/views/myupgrade'
import MyUpGradeInfo from '@/views/myupgradeinfo'

import CarAdd from '@/views/caradd'

import CarMy from '@/views/carmy'
import CarMyInfo from '@/views/carmyinfo'
import CarMyCar from '@/views/carmycar'
import CarMyCarInfo from '@/views/carmycarinfo'
import CarMyCarInfoEdit from '@/views/carmycarinfoedit'

Vue.use(VueRouter)


const routes = [

    {path:'/login',name:'Login',component:Login},
    {path:'/register',name:'Register',component:Register},
    {path:'/userrules',name:'UserRules',component:UserRules},

    {path:'/', component:Main, meta: {requireAuth: true, roles: 4},
        children: [

            {path:'/',name:'Index',component:Index, meta: {requireAuth: true, roles: 4} },
            {path:'/indexinfo/:id',name:'IndexInfo',component:IndexInfo, meta: {requireAuth: true, roles: 4} },
            {path:'/indexorder/:id',name:'IndexOrder',component:IndexOrder, meta: {requireAuth: true, roles: 4} },
            {path:'/indexordersuccess',name:'IndexOrderSuccess',component:IndexOrderSuccess, meta: {requireAuth: true, roles: 4} },

            {path:'/result',name:'Result',component:Result, meta: {requireAuth: true, roles: 4} },
            {path:'/resultsuccess/:id',name:'ResultSuccess',component:ResultSuccess, meta: {requireAuth: true, roles: 4} },

            {path:'/my',name:'My',component:My, meta: {requireAuth: true, roles: 4} },
            {path:'/myinfo',name:'MyInfo',component:MyInfo, meta: {requireAuth: true, roles: 4} },
            {path:'/mypassword',name:'MyPassword',component:MyPassword, meta: {requireAuth: true, roles: 4} },
            {path:'/myupgrade',name:'MyUpGrade',component:MyUpGrade, meta: {requireAuth: true, roles: 4} },
            {path:'/myupgradeinfo',name:'MyUpGradeInfo',component:MyUpGradeInfo, meta: {requireAuth: true, roles: 4} },
      
        ]
    }, 

    {path:'/master', component:CarMain,meta: {requireAuth: true, roles: 3},
        children: [

            {path:'/master',name:'Master',component:Index, meta: {requireAuth: true, roles: 3} },
            {path:'/carindexinfo/:id',name:'CarIndexInfo',component:IndexInfo, meta: {requireAuth: true, roles: 3} },
            {path:'/carindexorder/:id',name:'CarIndexOrder',component:IndexOrder, meta: {requireAuth: true, roles: 3} },
            {path:'/carindexordersuccess',name:'CarIndexOrderSuccess',component:IndexOrderSuccess, meta: {requireAuth: true, roles: 3} },

            {path:'/carresult',name:'CarResult',component:Result, meta: {requireAuth: true, roles: 3} },
            {path:'/carresultsuccess/:id',name:'CarResultSuccess',component:ResultSuccess, meta: {requireAuth: true, roles: 3} },

            {path:'/caradd',name:'CarAdd',component:CarAdd, meta: {requireAuth: true, roles: 3} },

            {path:'/carmy',name:'CarMy',component:CarMy, meta: {requireAuth: true, roles: 3} },
            {path:'/carmyinfo',name:'CarMyInfo',component:CarMyInfo, meta: {requireAuth: true, roles: 3} },
            {path:'/carmycar',name:'CarMyCar',component:CarMyCar, meta: {requireAuth: true, roles: 3} },
            {path:'/carmycarinfo/:id',name:'CarMyCarInfo',component:CarMyCarInfo, meta: {requireAuth: true, roles: 3} },
            {path:'/carmycarinfoedit/:id',name:'CarMyCarInfoEdit',component:CarMyCarInfoEdit, meta: {requireAuth: true, roles: 3} },
            {path:'/carmypassword',name:'CarMyPassword',component:MyPassword, meta: {requireAuth: true, roles: 3} },
            
        ]
    },

]

const router = new VueRouter({
    //mode: 'history',
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router