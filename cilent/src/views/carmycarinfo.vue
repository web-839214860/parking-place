<template>
    <div>

        <van-nav-bar :title="carForm.c_name" left-text="返回" left-arrow @click-left="onClickLeft"/>

        <van-cell-group>

            <van-cell title="所属物业" ><div class="cell">{{carForm.property.user.u_name}}</div></van-cell>
            <van-cell title="物业电话" ><div class="cell">{{carForm.property.p_phone}}</div></van-cell>
            <van-cell title="车位地址" ><div class="cell">{{carForm.property.p_address}}</div></van-cell>
            <van-cell title="可用时间" is-link ><div class="cell" @click="onClick(carForm.c_id)">{{carForm.c_begintime}} - {{carForm.c_endtime}}</div></van-cell>
            <van-cell title="当前状态" ><div class="cell">{{carForm.c_status}}</div></van-cell>
            <van-cell title="发布资格" >
                <div class="cell">
                    <template v-if="carForm.c_seniority=='1'">是</template>
                    <template v-if="carForm.c_seniority=='0'">否</template>  
                </div>
            </van-cell>
            <van-cell title="车位收益" ><div class="cell">￥{{carForm.c_money}} 元</div></van-cell>
        
        </van-cell-group>       

    </div>
</template>

<script>
    export default {
        data() {
            return {
                carForm:{
                    property:{
                        user:{}
                    } 
                }
            }
        },
        created() {
            this.getonecar(this.$route.params.id)
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            onClick(val){
                this.$router.push('/carmycarinfoedit/'+val)
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
        }
    }
</script>

<style lang="scss" scoped>

</style>