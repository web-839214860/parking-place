<template>
    <div>

        <van-nav-bar title="预订结果" left-text="返回" left-arrow @click-left="onClickLeft"/>

        <div class="success">

            <img style="width:3rem; height:3rem;" src="../../public/images/success.png">
            
            <div class="hands">订单预约成功</div>
            <div class="success_div">您可以在 订单查询 菜单查看订单详情内容</div>
            
        </div>

        <div class="button">
            <van-button round style="margin-bottom: 0.55rem" type="info" size="large" @click="onClickone()">查看订单</van-button>
            <van-button round style="margin-bottom: 0.55rem" plain type="info" size="large" @click="onClicktwo()">返回首页</van-button>
        </div>

    </div>
</template>

<script>
import { getLocalStorage } from '@/utils/localStorage'

    export default {
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            onClickone(){
                if(getLocalStorage('Role') == 3){
                    this.$router.push({ path: '/carresult' })
                } else if(getLocalStorage('Role') == 4){
                    this.$router.push({ path: '/result' })
                }
            },
            onClicktwo(){
                if(getLocalStorage('Role') == 3){
                    this.$router.push({ path: '/master' })
                } else if(getLocalStorage('Role') == 4){
                    this.$router.push({ path: '/' })
                }
            },
        }
        
    }
</script>

<style>
.success{
    text-align: center;
    margin-top: 3.5rem;
}
.hands{
    font-weight:bold;
    font-size: 0.9rem;
    margin-top: 0.7rem;  
    color: rgb(80, 80, 80)
}
.success_div{
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: rgb(126, 124, 124);
    margin-bottom: 5rem;
}
</style>