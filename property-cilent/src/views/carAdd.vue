<template>
    <div class="allLayer">

       <el-form :model="caraddForm" :rules="rules" ref="caraddForm" label-width="91px" class="caraddForm">

			<el-form-item label="车 位 名 称" prop="c_name">
				<el-input clearable type="text" placeholder="请输入车位名称" v-model="caraddForm.c_name" ></el-input>
			</el-form-item>

            <div class="flex">
                <el-form-item label="使 用 时 间" prop="c_begintime">
                    <el-time-picker v-model="caraddForm.c_begintime" placeholder="开始时间"
                        :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                        }"
                        value-format="HH:mm:ss" format="HH:mm:ss" style="width:140px">
                    </el-time-picker>
                </el-form-item>

                <div style="margin:6px 8px 0px 8px"> - </div>
                    
                <el-form-item  prop="c_endtime" label-width="0px" >
                    <el-time-picker v-model="caraddForm.c_endtime" placeholder="结束时间"
                        :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                        }"
                        value-format="HH:mm:ss" format="HH:mm:ss" style="width:140px">
                    </el-time-picker>
                </el-form-item>
            </div>

            <el-form-item label="车 位 图 片" class="picture" >
                <el-upload ref="upload" action="" :auto-upload="false" list-type="picture-card">
                    <i class="el-icon-camera-solid"></i>
                </el-upload>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="caradd('caraddForm')" >添加</el-button>
                <el-button type="danger" class="login_button" @click="$refs['caraddForm'].resetFields()">重置</el-button>
            </div>

        </el-form>
        
    </div>
</template>

<script>
    export default {
        data() {
            let validateTime = (rule, value, callback) => {
                if (value <= this.caraddForm.c_begintime) {
                    callback(new Error('时间区间设置有误'))
                } else {
                        callback()
                }
            }
            return {
                caraddForm:{
                    c_name: '',
                    c_begintime: '',
                    c_endtime: '',
                    c_seniority: 1,
                    u_userId: this.$store.state.user.u_userId,
                    p_userId: this.$store.state.user.u_userId,
               
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
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            caradd(caraddForm){
                this.$refs[caraddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.uploadFiles[0]  //上传图片
                        
                        if(file==null){
                            this.showMessage('info',"请添加车位图片")
                        }else{
                            formData.append('c_name', this.caraddForm.c_name);
                            formData.append('c_begintime', this.caraddForm.c_begintime);
                            formData.append('c_endtime', this.caraddForm.c_endtime);
                            formData.append('c_seniority', this.caraddForm.c_seniority);
                            formData.append('u_userId', this.caraddForm.u_userId);
                            formData.append('p_userId', this.caraddForm.p_userId);
                            formData.append('c_image', file.raw);
                            //let caraddinfo = this.caraddForm;
                            this.$api.car.postcar(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.showMessage('success',res.data.message)
                                    this.$router.push({ path: '/carInfo' })
                                }else if(res.code ==0){                              
                                    this.$message.error(res.data.message)                             
                                }else if(res.code ==-1){                              
                                    this.$message.error(res.data.message)                               
                                }else{
                                    this.$message.error("未知错误")
                                }
                            })
                        }
                    }
                });
            }
        },
        
    }
</script>

<style>
.caraddForm{
	position: absolute;
	top: 50%;
    left: 55%;
	transform: translate(-50%,-50%);
	width:395px;
}
.picture label  {
    line-height: 148px; 
}
</style>