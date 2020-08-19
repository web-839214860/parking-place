<template>
    <div>

        <van-nav-bar title="我的车位" left-text="返回" left-arrow @click-left="onClickLeft"/>
        
        <div id="car_list">
            <van-pull-refresh style="height:28.5rem" v-if="showcarinfo" v-model="isRefresh" @refresh="onRefresh">

                <div v-for="(car,index) in carsList" :key="index">
                    <van-swipe-cell>
                        <!-- 图片 -->
                        <div class="car_img_wrap" @click="carinfo(car.c_id)">
                            <img :src="car.c_image"/>
                        </div>

                        <!-- 信息 -->
                        <div class="car_info">
                            <div class="car_title">{{car.c_name}}</div>

                            <div class="car_detail">
                                <van-row class="car_firstinfo">
                                    <van-col span="9">资格：                
                                        <template v-if="car.c_seniority=='1'">是</template>
                                        <template v-if="car.c_seniority=='0'">否</template>              
                                    </van-col>
                                    <van-col span="15">总收益：￥{{car.c_money}} 元</van-col>
                                </van-row>

                                <van-row class="car_secondinfo">
                                    <van-col span="15">状态：{{car.c_status}}</van-col>
                                    <template v-if="car.c_status=='待发布'">
                                        <van-col span="9">
                                            <van-button type="info" size="small" :disabled="car.c_seniority == 0" @click="postcars(car.c_id)">发布车位</van-button>
                                        </van-col>
                                    </template>
                                    <template v-if="car.c_status=='发布成功'">
                                        <van-col span="9">
                                            <van-button color="#F56C6C" size="small" :disabled="car.c_seniority == 0" @click="putcars(car.c_id)">下架车位</van-button>
                                        </van-col>
                                    </template> 
                                </van-row>
                            </div>   

                        </div>

                        <template #right>
                            <van-button square text="删除" color="#F56C6C" style="height: 100%" @click="open(car.c_id)" />
                        </template>
    
                    </van-swipe-cell>
                </div>

            </van-pull-refresh>
        </div>

        <div class="nocarinfo"  v-if="nocarinfo" >
            <van-empty>您还未发布过车位</van-empty>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                carsList: [],
                isRefresh:false,
                showcarinfo:false,
                nocarinfo:false
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('car_list').style.height=winHeight-46-50 +'px'
        },
        created(){
            this.carList()
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            carList(){ 
                this.$api.car.getallcarsCaruser().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.carsList = res.data;

                        if(res.data.length <= 0){
                            this.nocarinfo = true; 
                        } else {
                            this.showcarinfo = true;
                        }

                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            postcars(val){
                this.$api.car.postcarinfo(val).then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.$toast.success(res.data.message)
                        this.carList()  //刷新列表
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            putcars(val){
                this.$api.car.putcarinfo(val).then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.$toast.success(res.data.message)
                        this.carList() //刷新列表
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            deletecar(val){
                this.$api.car.deletecar(val).then(res =>{
                    if(res.code==1){
                        this.$toast.success(res.data.message)
                        this.carList() //刷新列表
                    }else if(res.code==-1){
                        this.$toast.fail(res.data.message)
                    }else{
                        this.$toast.fail("未知错误")
                    }
                    
                })
            },
            open(val) {
                this.$dialog.alert({
                    title: "是否删除该车位？", //标题
                    message: "删除后需要重新发布该车位", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                }).then(() => {
                    this.$options.methods.deletecar.bind(this)(val);
                }).catch(() => {});
            },
            carinfo(val){
                this.$router.push('/carmycarinfo/'+val)
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    //this.carsList=[];
                    this.carList()
                }, 500);
            },
        },
        
    }
</script>

<style>
#car_list {
    margin-top:0.3rem;
    overflow: scroll;
}
.van-swipe-cell__wrapper{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
.car_img_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
}
.car_img_wrap img {
    width: 90%;
    height: 103%;
    border-radius: 6px;
} 
.car_info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 56%;
} 
.car_title {
    font-weight: bold;
    font-size: 0.8rem;
    color: #0f0f0f;
}
.car_detail {
    font-size: 0.75rem;
    color: #666;
}
.car_firstinfo{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; 
    margin-bottom: 0.15rem; 
}
.car_secondinfo{
    line-height: 30px;
}
.nocarinfo{
    font-size: 0.8rem;
    color: rgb(126, 124, 124);
    letter-spacing:3px;
    position: absolute;
	top: 40%;
    left: 50%;
	transform: translate(-50%,-50%);
} 
</style>