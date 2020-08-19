<template>
    <div>

        <div id="car_list">
            <div v-if="info">

                <div v-for="(order,index) in getSearchInfo" :key="index" class="item_car" >
                    <!-- 图片 -->
                    <div class="car_img_wrap">
                        <img :src="order.car.c_image"/>
                    </div>

                    <!-- 信息 -->
                    <div class="car_info">
                        <div class="car_title">{{order.property.user.u_name}} {{order.c_name}}</div>
                        <div class="car_detail" style="font-size: 0.7rem">
                            <div style="margin-bottom: 0.4rem"><van-icon name="award-o" /> 下单时间：{{order.o_time}}</div>
                            <div><van-icon name="location-o" /> {{order.property.p_address}}</div>
                        </div>
                    </div>
                </div>

            </div>
        
            <div class="tab-empty" v-if="noinfo">
                <van-empty>当前状态下暂无订单</van-empty>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                info: false,
                noinfo: false,
                getSearchInfo:[]
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('car_list').style.height=winHeight-46-44-50-10 +'px'
        },
        created(){
            this.handleUserList()
        },
        methods: {
            handleUserList(){
                this.$api.order.getallorderLoseclient().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
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
        }
        
    };
</script>

<style>

</style>