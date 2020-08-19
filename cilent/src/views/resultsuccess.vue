<template>
    <div>

        <van-nav-bar title="支付完成订单" left-text="返回" left-arrow @click-left="onClickLeft"/>

        <van-collapse v-model="activeNames">
            <van-collapse-item title="车主信息" name="1">
                <template #value>
                    <div class="cell">{{orderlist.o_name}}</div>
                </template>
                <div class="cell">停车车牌：{{orderlist.o_card}}</div>
                <div class="cell">下单时间：{{orderlist.o_time}}</div>
            </van-collapse-item>

            <van-collapse-item title="预订车位" name="2">
                <template #value>
                    <div class="cell">{{orderlist.property.user.u_name}} {{orderlist.c_name}}</div>
                </template>
                <div class="cell">可使用时间：{{orderlist.car.c_begintime}} - {{orderlist.car.c_endtime}}</div>
                <div class="cell">联系电话：{{orderlist.property.p_phone}}</div>
                <div class="cell">车位地址：{{orderlist.property.p_address}}</div>
            </van-collapse-item>
        </van-collapse>

        <van-cell-group>
            <van-cell title="开始停车时间" >
                <div class="cell">{{orderlist.o_begintime}}</div>
            </van-cell>
            <van-cell title="结束停车时间" >
                <div class="cell">{{orderlist.o_endtime}}</div>
            </van-cell>                
            <van-cell title="超时停车" >
                <div class="cell" v-if="orderlist.o_over==0">否</div>
                <div class="cell" v-if="orderlist.o_over==1">是</div> 
            </van-cell>
            <van-cell title="缴纳费用" >
                <div class="cell">￥ {{orderlist.o_money}} 元</div>
            </van-cell>
        </van-cell-group>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeNames: ['0'],
                orderlist:{
                    car:{},
                    property:{
                        user:{}
                    } 
                }
            };
        },
        created() {
            this.getoneorder(this.$route.params.id)
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getoneorder(o_id){
                this.$api.order.getoneorderSuccessclient(o_id).then(res =>{
                    //console.log(res.data)
                    if(res.code==1){
                        this.orderlist=res.data
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
        },
        
    }
</script>

<style lang="scss" scoped>

</style>