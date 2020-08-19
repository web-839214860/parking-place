<template>
    <div>

        <van-row class="car_firstinfo">
            <van-col span="6">              
                <van-sidebar v-model="activeKey" @change="onChange">
                    <van-sidebar-item title="正常订单" />
                    <van-sidebar-item title="超时订单" />
                </van-sidebar>
            </van-col>

            <van-col span="18">
                <div v-if="normal">

                    <div id="car_list">
                        <div v-if="info">
                            <div v-for="(order,index) in getNormal" :key="index" class="item_car" style="margin-top: 0.5rem" @click="orderinfo(order.o_id)">
                                <!-- 图片 -->
                                <div class="car_img_wrap">
                                    <img :src="order.car.c_image"/>
                                </div>

                                <!-- 信息 -->
                                <div class="car_info" style="text-align: center">
                                    <div class="car_title">{{order.property.user.u_name}} {{order.c_name}}</div>
                                    <div class="car_detail">{{order.o_time}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-empty" v-if="noinfo">
                            <van-empty>当前状态下暂无订单</van-empty>
                        </div>
                    </div>

                </div>

                <div v-if="overtime" >

                    <div id="car_list">
                        <div v-if="infos">
                            <div v-for="(order,index) in getOvertime" :key="index" class="item_car" style="margin-top: 0.5rem" @click="orderinfo(order.o_id)" >
                                <!-- 图片 -->
                                <div class="car_img_wrap">
                                    <img :src="order.car.c_image"/>
                                </div>

                                <!-- 信息 -->
                                <div class="car_info" style="text-align: center">
                                    <div class="car_title">{{order.property.user.u_name}} {{order.c_name}}</div>
                                    <div class="car_detail">{{order.o_time}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-empty" v-if="noinfos">
                            <van-empty>当前状态下暂无订单</van-empty>
                        </div>
                    </div>

                </div>
            </van-col>

        </van-row>

    </div>
</template>

<script>
import { getLocalStorage } from '@/utils/localStorage'

    export default {
        data() {
            return {
                activeKey: 0,
                normal:true,
                overtime:false,
                getNormal:[],
                getOvertime:[],
                info: false,
                noinfo: false,
                infos: false,
                noinfos: false,
            };
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('car_list').style.height=winHeight-46-50-44 +'px'
        },
        created(){
            this.handleUserList()
        },
        methods: {
            onChange(index) {
                if(index == 0){
                    this.normal = true
                    this.overtime = false
                }else{
                    this.normal = false
                    this.overtime = true
                }
            },
            handleUserList(){
                this.$api.order.getallorderSuccessclient().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        const normalList = res.data.filter(function(item){ //数组条件筛选
                            return item.o_over == 0
                        })
                        this.getNormal=normalList;
                        if(normalList.length <= 0) {
                            this.noinfo = true
                        } else {
                            this.info = true
                        }

                        const overtimeList = res.data.filter(function(item){ //数组条件筛选
                            return item.o_over == 1
                        })
                        this.getOvertime=overtimeList;
                        if(overtimeList.length <= 0) {
                            this.noinfos = true
                        } else {
                            this.infos = true
                        }

                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            orderinfo(val){
                if(getLocalStorage('Role') == 3){
                    this.$router.push('/carresultsuccess/' + val)
                } else if(getLocalStorage('Role') == 4){
                    this.$router.push('/resultsuccess/' + val)
                }
            },
        },
        
    }
</script>

<style lang="scss" scoped>

</style>