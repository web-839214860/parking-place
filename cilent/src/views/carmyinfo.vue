<template>
    <div>

        <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft"/>
        
        <van-cell-group>
            <van-cell class="uesrImage" title="头像" ><div class="cell"><img style="width:2.4rem;height:2.4rem;" :src=u_image ></div></van-cell>
            <van-cell title="账号" ><div class="cell">{{u_userId}}</div></van-cell>
            <van-cell title="姓名" ><div class="cell">{{b_name}}</div></van-cell>
            <van-cell title="性别" ><div class="cell">{{u_sex}}</div></van-cell>
            <van-cell title="所属物业" ><div class="cell">{{b_parking}}</div></van-cell>
            <van-cell title="申请时间" ><div class="cell">{{b_time}}</div></van-cell>
        </van-cell-group>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')

    export default {
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
        },
        computed:{
            ...mapState({
                u_image:state=>state.u_image,
                u_userId:state=>state.u_userId,
                u_sex:state=>state.u_sex,
                b_name:state=>state.b_name,
                b_parking:state=>state.b_parking,
                b_time:state=>state.b_time,
            })
        }
    }
</script>

<style>

</style>