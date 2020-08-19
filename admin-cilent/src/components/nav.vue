<template>
    <div class="nav">

        <el-row>
            <el-col :span="4">
                <el-menu :default-active="$route.path" :router="true" class="menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <h3 class="name">后 台 管 理 系 统</h3> 

                    <el-menu-item index="/">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-office-building"></i>
                            <span>物业管理</span>
                        </template>
                        <el-menu-item index="/propertyInfo">物业用户</el-menu-item>
                        <el-menu-item index="/propertyAdd">添加物业用户</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group title="用户">
                            <el-menu-item index="/userCommon">普通用户</el-menu-item>
                            <el-menu-item index="/userCar">车位车主</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="管理员">
                            <el-menu-item index="/userAdmin">高级管理员</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item index="/car">
                        <i class="el-icon-bicycle"></i>
                        <span slot="title">车位管理</span>
                    </el-menu-item>

                    <el-menu-item index="/discuss">
                        <i class="el-icon-s-comment"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>

                </el-menu>
            </el-col>

            <el-col :span="20">
                <div class="info">
                    <el-dropdown style="left: 83.8%">
                        <span class="el-dropdown-link">
                            <div class="top">
                                <img style="width:40px;height:40px;border-radius: 50px 50px 50px 50px;" :src=u_image >
                                <p style="margin-left: 6%">{{u_name}} 欢迎您！<i class="el-icon-arrow-down el-icon--right"></i></p>
                            </div>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="onClickPassword()" >修改密码</el-dropdown-item>
                            <el-dropdown-item divided @click.native="LogOut()" >退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('user')

    export default {
        methods: {
            onClickPassword(){
                this.$router.push({path:'/password'})
            },
            ...mapActions(
                ['LogOut']  // 语法糖,相当于this.$store.dispatch('modifyName'),提交这个方法
            )
        },
        computed:{
            ...mapState({
                u_name:state=>state.u_name,
                u_image:state=>state.u_image
            })
        }        
    }

</script>

<style>
.name{
    text-align: center;
    color: #fff;
}
.info{
    height: 55px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
}
.menu{
    height: 100%;
    background-color: #545c64;
}
.nav, .el-row, .el-col.el-col-4{
    height: 100%;
}
.el-dropdown-link{
    cursor: pointer;
    color: rgb(75, 75, 75);
}
.el-icon-arrow-down{
    font-size: 12px;
}
.top{
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 175px;
}
</style>