<template>
    <div>

        <div class="image">
            <img style="width:17rem;height:9.6rem" src="../../public/images/logo.png">
        </div>

        <el-form :model="loginForm" :rules="rules" ref="loginForm"  label-width="55px" class="form">

			<el-form-item label="账 号" prop="u_userId">
				<el-input clearable type="text" placeholder="请输入账号" v-model="loginForm.u_userId" ></el-input>
			</el-form-item>

            <el-form-item label="密 码" prop="u_password">
                <el-input show-password type="password" placeholder="请输入密码" v-model="loginForm.u_password" ></el-input>
            </el-form-item>

        </el-form>

        <div class="tip"><router-link to="/register">新用户请点击前往注册</router-link></div>

        <div class="button">
            <van-button type="info" size="large" @click="login('loginForm')">登录</van-button>
        </div>

        <div class="bgimage">
            <img style="width:16rem;height:11rem" src="../../public/images/bg.jpg">
        </div>

    </div>
</template>

<script>
import {setLocalStorage} from '@/utils/localStorage'

    export default {
        data() {
            return {
                loginForm:{
                    u_userId: '',
                    u_password: '',
                },
                rules: {
					u_userId: [
                        { required: true, message: '请输入注册过的账号', trigger: 'blur' },
                    ],
					u_password: [
						{ required: true, message: '请输入正确密码', trigger: 'blur' }
					],
				}
            }
        },
        methods: {
            login(loginForm){
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        let logininfo = this.loginForm;
                        this.$api.user.postlogin(logininfo).then(res => {
                            //console.log(res)
                            if(res.code ==4){
                                setLocalStorage("Token",res.data.token)
                                setLocalStorage("Role",res.data.role)
                                this.$toast.success(res.data.message)
                                this.$router.push({ path: '/' })
                            }else if(res.code ==-1){                              
                                this.$toast.fail(res.data.message)                               
                            }else if(res.code ==0){
                                this.$toast.fail(res.data.message)
                            }else if(res.code ==1){
                                this.$toast.fail("当前账号没有权限，请更换账号登录")
                            }else if(res.code ==2){
                                this.$toast.fail("当前账号没有权限，请更换账号登录")
                            }else if(res.code ==3){
                                setLocalStorage("Token",res.data.token)
                                setLocalStorage("Role",res.data.role)
                                this.$toast.success(res.data.message)
                                this.$router.push({ path: '/master' })
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

<style>
.image{
    margin-top: 1.2rem;
    text-align: center;
}
.form{
    margin-left:0.8rem;
    margin-right:0.8rem;
}
.el-input__inner{
    border: none;   
}
.el-form-item{
    border-bottom: 1px solid #DCDFE6;
}
.tip{
    font-size: 0.7rem;
    margin-top: 1.5rem;
    margin-left:0.8rem;
    color: rgb(129, 127, 127);
}
a{
    color: rgb(129, 127, 127);
}
.button{
    margin: 0.8rem;
    margin-top: 1.4rem;
}
.bgimage{
    text-align: center;  
}
</style>