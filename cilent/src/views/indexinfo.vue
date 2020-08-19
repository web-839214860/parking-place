<template>
    <div>
        
        <van-nav-bar title="车位详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
        
        <div id="scrolls">
        
            <div><img :src="carForm.c_image" width="100%" height="100%"/></div>

            <van-row>
                <van-col span="19">
                    <div style="height: 3.3rem;">
                        <div class="name">{{carForm.property.user.u_name}} {{carForm.c_name}}</div>
                        <div class="address"><van-icon name="location-o" /> {{carForm.property.p_address}}</div>
                    </div>
                </van-col>
                <van-col span="5">
                    <div style="margin-top: 17px">
                        <van-button type="info" round size="small" @click="orderinfo(carForm.c_id)">前往预订</van-button>
                    </div>
                </van-col>
            </van-row>

            <div style="margin-top: 7px">
                <van-tabs v-model="active" animated swipeable sticky>
                    <van-tab title="详情">
                        <van-cell title="可用时间" ><div class="cell">{{carForm.c_begintime}} - {{carForm.c_endtime}}</div></van-cell> 
                        <van-cell title="联系电话" ><div class="cell">{{carForm.property.p_phone}}</div></van-cell>
                        <van-cell title="详细价格" ><div class="cell">￥ 0.002元 / 秒</div></van-cell>
                        <van-cell title="超期加收￥100元" />
                    </van-tab>

                    <van-tab title="评论">
                        <Comment :carForm="carForm"></Comment>
                    </van-tab>
                </van-tabs>
            </div>

        </div>

    </div>
</template>

<script>
import Comment from '../components/comment.vue'
import { getLocalStorage } from '@/utils/localStorage'

    export default {
        name: 'Main',
        components: {
            Comment
        },
        data() {
            return {
                active: 0,
                carForm:{
                    property:{
                        user:{}
                    } 
                }
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('scrolls').style.height=winHeight-46-50 +'px'
        },
        created() {
            this.getonecar(this.$route.params.id)
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getonecar(c_id){
                this.$api.car.getonecarinfo(c_id).then(res =>{
                    //console.log(res.data)
                    if(res.code==1){
                        this.carForm=res.data
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            orderinfo(val){
                if(getLocalStorage('Role') == 3){
                    this.$router.push('/carindexorder/' + val)
                } else if(getLocalStorage('Role') == 4){
                    this.$router.push('/indexorder/' + val)
                }
            },
        }      
    }
</script>

<style>
.name{
    font-size: 0.95rem;
    font-weight: bold;
    margin-left: 11px;
}
.address{
    font-size: 0.8rem;
    color: rgb(54, 54, 54);
    margin-top: 13px;
    margin-left: 5px;
}
#scrolls {
    overflow: scroll;  
}
</style>