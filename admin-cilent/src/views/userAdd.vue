<template>
    <div class="allLayer">

        <el-form :model="useraddForm" :rules="rules" ref="useraddForm"  label-width="55px" class="allforms">

			<el-form-item label="账 号" prop="u_userId">
				<el-input clearable type="text" placeholder="请设置登录账号" v-model="useraddForm.u_userId" ></el-input>
			</el-form-item>

            <el-form-item label="密 码" prop="u_password">
                <el-input show-password type="password" placeholder="请设置登录密码" v-model="useraddForm.u_password" ></el-input>
            </el-form-item>

            <el-form-item label="身 份" prop="role">
                <el-select v-model="useraddForm.role" placeholder="请选择用户身份" style="width:295px">
                    <el-option label="高级管理员" value="1"></el-option>
                    <el-option label="普通用户" value="4"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="昵 称" prop="u_name">
				<el-input clearable type="text" placeholder="请填写昵称" v-model="useraddForm.u_name" ></el-input>
			</el-form-item>

            <el-form-item label="性 别" prop="u_sex">
                <el-select v-model="useraddForm.u_sex" placeholder="请选择用户性别" style="width:295px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="头 像">
                <el-upload ref="upload" action="" :auto-upload="false" list-type="text">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="useradd('useraddForm')" >添加</el-button>
                <el-button type="danger" class="login_button" @click="$refs['useraddForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                useraddForm:{
                    u_userId: '',
                    u_password: '',
                    role: '',
                    u_name: '',
                    u_sex: '',      
                },
                rules: {
                    u_userId: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 4, max: 10, message: '长度在 4 到 10 位数字或字母', trigger: 'blur' }
                    ],
                    u_password: [
                        { required: true, message: '请设置密码', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请选择身份', trigger: 'blur' }
                    ],
                    u_name: [
                        { required: true, message: '请填写昵称', trigger: 'blur' }
                    ],
                    u_sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
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
            useradd(useraddForm){
                this.$refs[useraddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.uploadFiles[0]  //上传图片
                        
                        if(file==null){
                            this.showMessage('info',"请添加图片")
                        }else{
                            formData.append('u_userId', this.useraddForm.u_userId);
                            formData.append('u_password', this.useraddForm.u_password);
                            formData.append('role', this.useraddForm.role);
                            formData.append('u_name', this.useraddForm.u_name);
                            formData.append('u_sex', this.useraddForm.u_sex);
                            formData.append('u_image', file.raw);
                            //let useraddinfo = this.useraddForm;
                            this.$api.user.postoneuser(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.showMessage('success',res.data.message)

                                    if(this.useraddForm.role == 1){
                                        this.$router.push({ path: '/userAdmin' })
                                    }else if(this.useraddForm.role == 4){
                                        this.$router.push({ path: '/userCommon' })
                                    }

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
</style>