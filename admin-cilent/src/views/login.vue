<template>
    <div class="login">

		<div class="form">

			<div class="title">
				<h3>共享车位 后台管理系统</h3>
			</div>

                <el-form :model="loginForm" :rules="rules" ref="loginForm">

					<el-form-item prop="u_userId">
						<el-input clearable type="text" prefix-icon="el-icon-user" placeholder="用户名" v-model="loginForm.u_userId"></el-input>
					</el-form-item>

					<el-form-item prop="u_password"> 
						<el-input show-password type="password" prefix-icon="el-icon-lock" placeholder="密码" v-model="loginForm.u_password"></el-input>
					</el-form-item>

                    <el-form-item prop="code">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="loginForm.code" placeholder="请输入验证码" ></el-input>
                            </el-col>
                            <el-col :span="10">
                                <div class="login-code" @click="refreshCode">
                                    <!--验证码组件-->
                                    <s-identify :identifyCode="identifyCode"></s-identify>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>

					<el-form-item>
                        <el-button type="primary" class="login_button" @click="login('loginForm')">登录</el-button>
                    </el-form-item>

				</el-form>
        </div>

    </div>
</template>

<script>
import {setLocalStorage} from '@/utils/localStorage'
import SIdentify from '../components/sidentify.vue'

export default {
    components: { SIdentify },
	data() {
        const validateCode = (rule, value, callback) => {
            if (this.identifyCode !== value) {
                this.refreshCode()
                callback(new Error('验证码错误'))
            } else {
                callback()
            }
        }
        return {
            loginForm:{
                u_userId: '',
                u_password: '',
                code: ''
            },
            identifyCodes: '1234567890',
            identifyCode: '',
            rules: {
				u_userId: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
				u_password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator: validateCode, trigger: 'blur' }
                ]
			}
        }
	},
    created() {
        this.refreshCode()
    },
	methods: {
		showMessage(type,message){
            this.$message({
                type: type,
                message: message
            });
        },
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ]
            }
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        login(loginForm){
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    let logininfo = this.loginForm;
                    this.$api.user.postlogin(logininfo).then(res => {
                        //console.log(res)
                        if(res.code ==1){
                            setLocalStorage("Token",res.data.token)
                            this.showMessage('success',res.data.message)
                            this.$router.push({ path: '/' })
                        }else if(res.code ==-1){                            
                            this.showMessage('info',res.data.message)                               
                        }else if(res.code ==0){
                            this.showMessage('info',res.data.message)
                        }else if(res.code ==2){
                            this.showMessage('warning',"当前账号没有权限，请更换账号登录")
                        }else if(res.code ==3){
                            this.showMessage('warning',"当前账号没有权限，请更换账号登录")
                        }else if(res.code ==4){
                            this.showMessage('warning',"当前账号没有权限，请更换账号登录")
                        }else{
                            this.$message.error("未知错误")
                        }
                    })
                }
            });
        }
	}
}

</script>

<style>

.login{
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #2d3a4b;
}
.form{
	position: absolute;
	top: 50%;
    left: 50%;
	transform: translate(-50%,-50%);
	background: #fff;
	width:370px;
	border-radius: 5px;
	padding: 25px;
	text-align: center;
}
.title{
	color: #2d3a4b;
	margin-bottom: 30px;
}
.login_button{
	width:100%;
	margin-top: 5px;
}

</style>