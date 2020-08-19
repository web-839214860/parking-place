<template>
    <div>
        
        <van-nav-bar title="发布车位"/>

        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="volume-o" mode="closeable">
            欢迎使用本App发布车位，每个用户最多可发布5个车位
        </van-notice-bar>

        <el-form :model="caraddForm" :rules="rules" ref="caraddForm" label-width="79px" class="form" style="margin-top: 0.6rem;">

			<el-form-item label="车位名称" prop="c_name">
				<el-input clearable type="text" placeholder="请输入车位名称" v-model="caraddForm.c_name" ></el-input>
			</el-form-item>
            
            <el-form-item label="开始时间" prop="c_begintime">
                <el-time-picker v-model="caraddForm.c_begintime" placeholder="设置开始时间"
                    :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                    }"
                    value-format="HH:mm:ss" format="HH:mm:ss">
                </el-time-picker>
            </el-form-item>
                
            <el-form-item label="结束时间" prop="c_endtime">
                <el-time-picker v-model="caraddForm.c_endtime" placeholder="设置结束时间"
                    :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                    }"
                    value-format="HH:mm:ss" format="HH:mm:ss">
                </el-time-picker>
            </el-form-item>
            
            <el-form-item label="车位图片" class="picture">
                <van-uploader ref="upload" v-model="fileList" multiple />
            </el-form-item>

        </el-form>

        <div class="button">
            <van-button type="info" size="large" @click="caradd('caraddForm')" >确认添加</van-button>
        </div>

        <div class="image" style="margin-top: 1.6rem">
            <img style="width:14.2rem;height:8rem" src="../../public/images/logo.png">
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            let validateTime = (rule, value, callback) => {
                if (value <= this.caraddForm.c_begintime) {
                    callback(new Error('结束使用时间应该大于开始使用时间'))
                } else {
                        callback()
                }
            }
            return{
                fileList: [],
                propertyname: this.$store.state.user.b_parking,
                caraddForm:{
                    c_name: '',
                    c_begintime: '',
                    c_endtime: '',
                    c_seniority: 0,
                    u_userId: this.$store.state.user.u_userId,
                    p_userId: '',
                },
                rules: {
                    c_name: [
                        { required: true, message: '请输入车位名称', trigger: 'blur' }
                    ],
                    c_begintime: [
                        { required: true, message: '请设置可使用开始时间', trigger: 'blur' }
                    ],
                    c_endtime: [
                        { required: true, message: '请设置可使用结束时间', trigger: 'blur' },
                        { validator: validateTime, trigger: 'blur' }
                    ], 
				} 
            }
        },
        created(){
            this.propertyUserList()
        },
        methods: {
            propertyUserList(){  //获取物业对应的u_userId
                this.$api.beginner.getallpropertyinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        const _that = this
                        const propertyinfo = res.data.filter(function(item){ //数组条件筛选
                            return item.u_name == _that.propertyname
                        })
                        //console.log(propertyinfo[0].u_userId)
                        this.caraddForm.p_userId = propertyinfo[0].u_userId;
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            caradd(caraddForm){
                this.$refs[caraddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.value[0]  //上传图片
                        
                        if(file==null){
                            this.$toast.fail("请添加车位图片")
                        }else{
                            formData.append('c_name', this.caraddForm.c_name);
                            formData.append('c_begintime', this.caraddForm.c_begintime);
                            formData.append('c_endtime', this.caraddForm.c_endtime);
                            formData.append('c_seniority', this.caraddForm.c_seniority);
                            formData.append('u_userId', this.caraddForm.u_userId);
                            formData.append('p_userId', this.caraddForm.p_userId);
                            formData.append('c_image', file.file);
                            //let caraddinfo = this.caraddForm;
                            this.$api.car.postcar(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.$toast.success(res.data.message)
                                    this.$router.push({ path: '/carmycar' })
                                }else if(res.code ==0){                              
                                    this.$toast.fail(res.data.message)                              
                                }else if(res.code ==-1){                              
                                    this.$toast.fail(res.data.message)                              
                                }else{
                                    this.$toast.fail("未知错误")
                                }
                            })
                        }
                    }
                });
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>