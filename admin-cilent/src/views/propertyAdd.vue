<template>
    <div class="allLayer">

        <el-form :model="propertyaddForm" :rules="rules" ref="propertyaddForm" label-width="91px" class="propertyaddForm">

			<el-form-item label="设 置 账 号" prop="u_userId">
				<el-input clearable type="text" placeholder="请设置登录账号" v-model="propertyaddForm.u_userId" ></el-input>
			</el-form-item>

            <el-form-item label="物 业 名 称" prop="u_name">
				<el-input clearable type="text" placeholder="请填写物业名称" v-model="propertyaddForm.u_name" ></el-input>
			</el-form-item>

            <el-form-item label="物 业 地 址" prop="p_address">
				<el-input clearable type="textarea" autosize placeholder="请填写物业地址" v-model="propertyaddForm.p_address" ></el-input>
			</el-form-item>

            <el-form-item label="负 责 人" prop="p_name">
				<el-input clearable type="text" placeholder="请填写物业负责人" v-model="propertyaddForm.p_name" ></el-input>
			</el-form-item>

            <el-form-item label="性 别" prop="u_sex">
                <el-select v-model="propertyaddForm.u_sex" placeholder="请选择负责人性别" style="width:260px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="联 系 电 话" prop="p_phone">
				<el-input clearable type="text" placeholder="请填写物业负责人联系电话" v-model="propertyaddForm.p_phone" ></el-input>
			</el-form-item>

            <el-form-item label="添 加 头 像">
                <el-upload ref="upload" action="" :auto-upload="false" list-type="text">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="propertyadd('propertyaddForm')" >添加</el-button>
                <el-button type="danger" class="login_button" @click="$refs['propertyaddForm'].resetFields()">重置</el-button>
            </div>

        </el-form>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                propertyaddForm:{
                    u_userId: '',
                    u_name: '',
                    p_address: '',
                    p_name: '',
                    u_sex: '', 
                    p_phone: ''     
                },
                rules: {
                    u_userId: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 4, max: 10, message: '长度在 4 到 10 位数字或字母', trigger: 'blur' }
                    ],
                    u_name: [
                        { required: true, message: '请填写物业名称', trigger: 'blur' }
                    ],
                    p_address: [
                        { required: true, message: '请填写物业地址', trigger: 'blur' }
                    ],
                    p_name: [
                        { required: true, message: '请填写物业负责人', trigger: 'blur' }
                    ],
                    u_sex: [
                        { required: true, message: '请选择负责人性别', trigger: 'blur' }
                    ], 
                    p_phone: [
                        { required: true, message: '请填写物业负责人联系电话', trigger: 'blur' }
                    ]       
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
            propertyadd(propertyaddForm){
                this.$refs[propertyaddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.uploadFiles[0]  //上传图片
                        
                        if(file==null){
                            this.showMessage('info',"请添加图片")
                        }else{
                            formData.append('u_userId', this.propertyaddForm.u_userId);
                            formData.append('u_name', this.propertyaddForm.u_name);
                            formData.append('p_address', this.propertyaddForm.p_address);
                            formData.append('p_name', this.propertyaddForm.p_name);
                            formData.append('u_sex', this.propertyaddForm.u_sex);
                            formData.append('p_phone', this.propertyaddForm.p_phone);
                            formData.append('u_image', file.raw);
                            //let propertyaddinfo = this.propertyaddForm;
                            this.$api.property.postonepropertyuser(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.showMessage('success',res.data.message)
                                    this.$router.push({ path: '/propertyInfo' })
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
.propertyaddForm{
	position: absolute;
	top: 50%;
    left: 55%;
	transform: translate(-50%,-46%);
	width:350px;
}
</style>