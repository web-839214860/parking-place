<template>
    <div>

        <van-nav-bar title="车位预订" left-text="返回" left-arrow @click-left="onClickLeft"/>

        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="volume-o" mode="closeable">
            请注意仔细查看车位的可使用时间！停车时间超过可使用时间，将做超时罚款处理，具体罚款金额和车位的收费情况请前往车位详情页面查看
        </van-notice-bar>

        <el-form :model="orderForm" :rules="rules" ref="orderForm"  label-width="79px" class="form" style="margin-top: 0.6rem">

			<el-form-item label="真实姓名" prop="o_name">
				<el-input clearable type="text" placeholder="请填写真实姓名" v-model="orderForm.o_name" ></el-input>
			</el-form-item>

            <el-form-item label="联系方式" prop="o_phone">
                <el-input clearable type="text" placeholder="请填写联系方式" v-model="orderForm.o_phone" ></el-input>
            </el-form-item>

            <el-form-item label="车牌号码" prop="o_card">
                <el-input clearable type="text" placeholder="粤A SB250" v-model="orderForm.o_card" ></el-input>
            </el-form-item>

        </el-form>

        <div class="button">
            <van-button type="info" size="large" @click="order('orderForm')" >确定预订</van-button>
        </div>

    </div>
</template>

<script>
import { getLocalStorage } from '@/utils/localStorage'

    export default {
        data() {
            return {
                carForm:{},
                orderForm:{
                    o_name: '',
                    o_phone: '',
                    o_card: '',
                    c_name: '',
                    u_userId: this.$store.state.user.u_userId,
                    p_userId: ''
                },
                rules: {
                    o_name: [
                        { required: true, message: '请填写真实姓名', trigger: 'blur' }
                    ],
                    o_phone: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' }
                    ],
                    o_card: [
                        { required: true, message: '请填写所停车辆的车牌号', trigger: 'blur' }
                    ],
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
            getonecar(c_id){
                this.$api.car.getonecarinfo(c_id).then(res =>{
                    //console.log(res.data)
                    if(res.code==1){
                        this.carForm=res.data
                        this.orderForm.c_name=this.carForm.c_name
                        this.orderForm.p_userId=this.carForm.p_userId
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            order(orderForm){
                this.$refs[orderForm].validate((valid) => {
                    if (valid) {
                        let orderinfo = this.orderForm;
                        this.$api.order.postorder(orderinfo).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                //this.$toast.success(res.data.message)
                                if(getLocalStorage('Role') == 3){
                                    this.$router.push({ path: '/carindexordersuccess' })
                                } else if(getLocalStorage('Role') == 4){
                                    this.$router.push({ path: '/indexordersuccess' })
                                }

                            }else if(res.code ==0){                              
                                this.$toast.fail(res.data.message)                               
                            }else if(res.code ==-1){                              
                                this.$toast.fail(res.data.message)                               
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            }
            
        } 
    }
</script>

<style lang="scss" scoped>

</style>