import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Main from '@/views/main'
import NotFound from '../views/404'

import Order from '@/views/order'

import PropertyInfo from '@/views/propertyInfo'
import PropertyAdd from '@/views/propertyAdd'
import PropertyEdit from '@/views/propertyEdit'

import UserCommon from '@/views/userCommon'
import UserCar from '@/views/userCar'
import UserAdmin from '@/views/userAdmin'
import UserAdd from '@/views/userAdd'
import UserEdit from '@/views/userEdit'

import Car from '@/views/car'

import Discuss from '@/views/discuss'

import Password from '@/views/password'

Vue.use(VueRouter)

const routes = [
    {path:'/login',name:'Login',component:Login},
    {path: '*',name:'NotFound',component:NotFound},

    {path:'/',component:Main,
        children:[
            
            {path:'/',name:'Order',component:Order},

            {path:'/propertyInfo',name:'PropertyInfo',component:PropertyInfo},
            {path:'/propertyAdd',name:'PropertyAdd',component:PropertyAdd},
            {path:'/propertyEdit/:id',name:'PropertyEdit',component:PropertyEdit},

            {path:'/userCommon',name:'UserCommon',component:UserCommon},
            {path:'/userCar',name:'UserCar',component:UserCar},
            {path:'/userAdmin',name:'UserAdmin',component:UserAdmin},
            {path:'/userAdd',name:'UserAdd',component:UserAdd},
            {path:'/userEdit/:id',name:'UserEdit',component:UserEdit},

            {path:'/car',name:'Car',component:Car},

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