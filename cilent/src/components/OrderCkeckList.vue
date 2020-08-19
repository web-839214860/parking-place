<template>
    <div>
        <div v-if="info">

            <van-cell-group>
                <van-cell title="姓名" ><div class="cell">{{getSearchInfo.o_name}}</div></van-cell>
                <van-cell title="联系电话" ><div class="cell">{{getSearchInfo.o_phone}}</div></van-cell>
                <van-cell title="停车车牌" ><div class="cell">{{getSearchInfo.o_card}}</div></van-cell>
                <van-cell title="下单时间" ><div class="cell">{{getSearchInfo.o_time}}</div></van-cell>
                <van-cell title="选择车位" ><div class="cell">{{getSearchInfo.property.user.u_name}} {{getSearchInfo.c_name}}</div></van-cell>
            </van-cell-group>

            <div class="button">
                <van-button type="danger" size="large" @click="open(getSearchInfo.o_id)" >取消预订</van-button>
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
                getSearchInfo:{}
            }
        },
        created(){
            this.handleUserList()
        },
        methods: {
            handleUserList(){
                this.$api.order.getallordercheckclient().then(res =>{
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
            deleteorder(val){
                this.$api.order.deleteorderinfo(val).then(res =>{
                    if(res.code==1){
                        this.$toast.success("订单取消成功")
                        this.info=false
                        this.noinfo=true
                    }else{
                        this.$toast.fail("未知错误")
                    }
                    
                })
            },
            open(val){
                this.$dialog.alert({
                    title: "是否取消预订？", //标题
                    message: "取消预订后需要重新发起预订申请", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.deleteorder.bind(this)(val);
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
        },
    }
</script>

<style>
.tab-empty{
    font-size: 0.8rem;
    color: rgb(126, 124, 124);
    letter-spacing:3px;
}
</style>