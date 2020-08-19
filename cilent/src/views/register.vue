<template>
    <div>

        <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft"/>

        <div class="registerfirst">
            <div>请完善您的信息</div>
            <div>信息填写完成后您将成为我们的用户</div>
        </div>

        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="79px" class="form">

			<el-form-item label="登录账号" prop="u_userId">
				<el-input clearable type="text" placeholder="请设置账号" v-model="registerForm.u_userId" ></el-input>
			</el-form-item>

            <el-form-item label="设置昵称" prop="u_name">
				<el-input clearable type="text" placeholder="请填写昵称" v-model="registerForm.u_name" ></el-input>
			</el-form-item>

            <el-form-item label="选择性别" prop="u_sex">
                <el-select v-model="registerForm.u_sex" placeholder="请填写性别" style="width:270px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="登录密码" prop="u_password">
                <el-input show-password type="password" placeholder="请设置密码" v-model="registerForm.u_password" ></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="u_passwordcheck">
                <el-input show-password type="password" placeholder="请确认密码" v-model="registerForm.u_passwordcheck" ></el-input>
            </el-form-item>

            <el-form-item label="上传头像" class="picture">
                <van-uploader ref="upload" v-model="fileList" multiple />
            </el-form-item>

        </el-form>

        <div class="check">
            <van-checkbox v-model="checked" icon-size="17px"></van-checkbox>
            <div class="agree">
                我已阅读并同意<router-link to="/userrules">《用户条例》</router-link>
            </div>
        </div>
            
        <div class="button">
            <van-button type="info" size="large" @click="register('registerForm')" >马上注册</van-button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            let validate = (rule, value, callback) => {
                if (value !== this.registerForm.u_password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
            }
            return {
                checked: false, 
                fileList: [],         
                registerForm:{
                    u_userId: '',
                    u_name: '',
                    u_sex: '',
                    u_password: '',
                    u_passwordcheck: '', 
                },
                rules: {
                    u_userId: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 4, max: 10, message: '长度在 4 到 10 位数字或字母', trigger: 'blur' }
                    ],
                    u_name: [
                        { required: true, message: '请填写昵称', trigger: 'blur' }
                    ],
                    u_sex: [
                        { required: true, message: '请填写性别', trigger: 'blur' }
                    ],
                    u_password: [
                        { required: true, message: '请填写密码', trigger: 'blur' }
                    ],
                    u_passwordcheck: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { validator: validate, trigger: 'blur' }
                    ],
				}
                  
            }
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            register(registerForm){
                this.$refs[registerForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.value[0]
                        if(file==null){
                            this.$toast.fail("请添加头像") 
                        }else{
                            if(this.checked == false){
                                this.$toast.fail("请先同意《用户条例》")
                            } else {
                                formData.append('u_userId', this.registerForm.u_userId);
                                formData.append('u_name', this.registerForm.u_name);
                                formData.append('u_sex', this.registerForm.u_sex);
                                formData.append('u_password', this.registerForm.u_password);
                                formData.append('u_image', file.file);
                                this.$api.user.postuser(formData).then(res => {
                                    //console.log(res)
                                    if(res.code ==1){
                                        this.$toast.success(res.data.message)
                                        this.$router.push({ path: '/login' })
                                    }else if(res.code ==-1){                              
                                        this.$toast.fail(res.data.message)                               
                                    }else{
                                        this.$toast.fail("未知错误")
                                    }
                                })
                            }
                                
                        }   
                    }
                });  
            },
    
        },
    }
</script>

<style>
.registerfirst{
    text-align: center;
}
.registerfirst div:first-child {
    font-size: 1.15rem;
    font-weight: bold;
    letter-spacing:0.15rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}
.registerfirst div:last-child {
    color: rgb(129, 127, 127);
    font-size: 0.7rem;
    margin-bottom: 1rem;
}
.check{
    margin-left: 0.8rem;
}
.agree{
    font-size: 0.7rem;
    position: absolute;
    margin-top: -19px;
    margin-left: 1.5rem;
}
.picture label  {
    line-height: 88px; 
}
</style>