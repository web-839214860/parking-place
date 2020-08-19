<template>
    <div>

        <van-nav-bar title="修改使用时间" left-text="返回" left-arrow @click-left="onClickLeft">
            <template>  
                <div slot="right">
                    <van-button type="info" size="small" @click="carinfoedit('carForm')" :disabled="(begintime == carForm.c_begintime || begintime == '') && (endtime == carForm.c_endtime || endtime == '')">保存</van-button>
                </div>
            </template>
        </van-nav-bar>

        <el-form :model="carForm" :rules="rules" ref="carForm" label-width="107px" class="form">
            
            <el-form-item label="开始使用时间" prop="c_begintime">
                <el-time-picker v-model="carForm.c_begintime" placeholder="设置开始时间"
                    :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                    }"
                    value-format="HH:mm:ss" format="HH:mm:ss">
                </el-time-picker>
            </el-form-item>
                    
            <el-form-item label="结束使用时间" prop="c_endtime">
                <el-time-picker v-model="carForm.c_endtime" placeholder="设置结束时间"
                    :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                    }"
                    value-format="HH:mm:ss" format="HH:mm:ss">
                </el-time-picker>
            </el-form-item>
            
        </el-form>
        
    </div>
</template>


<script>
    export default {
        data() {
            let validateTime = (rule, value, callback) => {
                if (value <= this.carForm.c_begintime) {
                    callback(new Error('结束使用时间应该大于开始使用时间'))
                } else {
                        callback()
                }
            }
            return {
                begintime:'',
                endtime:'',
                carForm:{},
                rules: {
                    c_begintime: [
                        { required: true, message: '请设置可使用开始时间', trigger: 'blur' }
                    ],
                    c_endtime: [
                        { required: true, message: '请设置可使用结束时间', trigger: 'blur' },
                        { validator: validateTime, trigger: 'blur' }
                    ]
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
                        this.carForm = res.data
                        this.begintime = res.data.c_begintime
                        this.endtime = res.data.c_endtime
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            carinfoedit(carForm){
                this.$refs[carForm].validate((valid) => {
                    if (valid) {
                        let carinfo = this.carForm;
                        this.$api.car.putcaruserinfo(carinfo,this.$route.params.id).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.$toast.success(res.data.message)
                                this.$router.push({ path: '/carmycarinfo/' + this.carForm.c_id })
                            }else if(res.code == -1){
                                this.$toast.fail(res.data.message)
                            } else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>