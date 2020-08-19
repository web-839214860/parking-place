import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Main from '@/views/main'
import NotFound from '../views/404'

import Order from '@/views/order'
import OrderCheck from '@/views/orderCheck'

import UserCar from '@/views/userCar'
import UserBeginner from '@/views/userBeginner'

import CarInfo from '@/views/carInfo'
import CarCheck from '@/views/carCheck'
import CarAdd from '@/views/carAdd'

import Discuss from '@/views/discuss'

import Password from '@/views/password'

Vue.use(VueRouter)

const routes = [
    {path:'/login',name:'Login',component:Login},
    {path: '*',name:'NotFound',component:NotFound},

    {path:'/',component:Main,
        children:[
            
            {path:'/',name:'Order',component:Order},
            {path:'/order',name:'OrderCheck',component:OrderCheck},

            {path:'/userCar',name:'UserCar',component:UserCar},
            {path:'/userBeginner',name:'UserBeginner',component:UserBeginner},

            {path:'/carInfo',name:'CarInfo',component:CarInfo},
            {path:'/carCheck',name:'CarCheck',component:CarCheck},
            {path:'/carAdd',name:'CarAdd',component:CarAdd},

            {path:'/discuss',name:'Discuss',component:Discuss},

            {path:'/password',name:'Password',component:Password},
            
        ]
    },

]

const router = new VueRouter({
    //mode: 'history',
    routes
  })
  
  export default router