<template>
    <div>

        <div class="avatar">
            <img style="width:3.6rem;height:3.6rem;margin: 0.8rem;border-radius: 50px 50px 50px 50px;" :src=u_image >
            <p>{{u_name}}</p>
        </div>

        <div class="my">
            <van-cell title="个人资料" is-link  url="#/carmyinfo" />
            <van-cell title="我的车位" is-link  url="#/carmycar" />
            <van-cell title="修改密码" is-link  url="#/carmypassword" />
        </div>

        <div class="button">
            <van-button type="info" size="large" @click="open()" >退出登录</van-button>
        </div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('user')

    export default {
        methods:{
            ...mapActions(
                ['LogOut']  // 语法糖,相当于this.$store.dispatch('modifyName'),提交这个方法
            ),
            open(){
                this.$dialog.alert({
                    title: "是否退出登录？", //标题
                    message: "退出登录后不改变用户的信息", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.LogOut.bind(this)();
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
        },
        computed:{
            ...mapState({
                u_name:state=>state.u_name,
                u_image:state=>state.u_image,
            })
        }   
    }
</script>

<style lang="scss" scoped>

</style>