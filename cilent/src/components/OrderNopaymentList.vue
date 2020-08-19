<template>
    <div>
        
        <div v-if="info">

            <van-collapse v-model="activeNames">
                <van-collapse-item title="车主信息" name="1">
                    <template #value>
                        <div class="cell">{{getSearchInfo.o_name}}</div>
                    </template>
                    <div class="cell">停车车牌：{{getSearchInfo.o_card}}</div>
                    <div class="cell">下单时间：{{getSearchInfo.o_time}}</div>
                </van-collapse-item>

                <van-collapse-item title="预定车位" name="2">
                    <template #value>
                        <div class="cell">{{getSearchInfo.property.user.u_name}} {{getSearchInfo.c_name}}</div>
                    </template>
                    <div class="cell">可使用时间：{{getSearchInfo.car.c_begintime}} - {{getSearchInfo.car.c_endtime}}</div>
                    <div class="cell">物业电话：{{getSearchInfo.property.p_phone}}</div>
                    <div class="cell">车位地址：{{getSearchInfo.property.p_address}}</div>
                </van-collapse-item>
            </van-collapse>

            <van-cell-group>
                <van-cell title="开始停车时间" >
                    <div class="cell" v-if="getSearchInfo.o_begintime=='Invalid date'">暂未计时</div>
                    <div class="cell" v-if="getSearchInfo.o_begintime!=='Invalid date'">{{getSearchInfo.o_begintime}}</div>
                </van-cell>
                <van-cell title="结束停车时间" >
                    <div class="cell" v-if="getSearchInfo.o_endtime=='Invalid date'">暂未计时</div>
                    <div class="cell" v-if="getSearchInfo.o_endtime!=='Invalid date'">{{getSearchInfo.o_endtime}}</div>
                </van-cell>                
                <van-cell title="是否超时" >
                    <div class="cell" v-if="getSearchInfo.o_over==null">暂未计费</div>
                    <div class="cell" v-if="getSearchInfo.o_over==0">否</div>
                    <div class="cell" v-if="getSearchInfo.o_over==1">是</div> 
                </van-cell>
                <van-cell title="需缴费用" >
                    <div class="cell" v-if="getSearchInfo.o_money==null">暂未计费</div> 
                    <div class="cell" v-if="getSearchInfo.o_money!==null">￥ {{getSearchInfo.o_money}} 元</div>
                </van-cell>
            </van-cell-group>
            
            <div class="button">
                <van-button v-if="getSearchInfo.o_over!==null" type="info" size="large" @click="open(getSearchInfo.o_id)" >确认支付</van-button>
            </div>

        </div>

        <div class="tab-empty" v-if="noinfo">
            <van-empty>当前状态下暂无订单</van-empty>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                info: false,
                noinfo: false,
                activeNames: ['0'],
                getSearchInfo:{}
            }
        },
        created(){
            this.handleUserList()
        },
        methods: {
            handleUserList(){
                this.$api.order.getallorderNopaymentclient().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data[res.data.length-1];
                        if(res.data.length <= 0) {
                            this.noinfo = true
                        } else {
                            this.info = true
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            money(val){
                this.$api.order.putmoney(val).then(res =>{
                    if(res.code==1){
                        this.$toast.success(res.data.message)
                        this.info=false
                        this.noinfo=true
                    }else{
                        this.$toast.fail("未知错误")
                    }
                    
                })
            },
            open(val){
                this.$dialog.alert({
                    title: "是否支付该订单？", //标题
                    message: "需要支付￥" + this.getSearchInfo.o_money + " 元", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.money.bind(this)(val);
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
        },
    }
</script>

<style>

</style>