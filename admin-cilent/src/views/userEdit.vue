<template>
    <div class="allLayer">

        <el-form :model="usereditForm" ref="usereditForm"  label-width="55px" class="allforms">

			<el-form-item label="账 号">
				<el-input v-model="usereditForm.u_userId" :disabled="true" ></el-input>
			</el-form-item>

            <el-form-item label="昵 称" prop="u_name">
				<el-input clearable type="text" v-model="usereditForm.u_name" ></el-input>
			</el-form-item>

            <el-form-item label="性 别" prop="u_sex">
                <el-select v-model="usereditForm.u_sex" style="width:295px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="身 份" prop="role">
                <el-select v-model="usereditForm.role" style="width:295px">
                    <el-option label="高级管理员" :value="1"></el-option>
                    <el-option label="普通用户" :value="4"></el-option>
                </el-select>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="useredit('usereditForm')" >修改</el-button>
                <el-button type="danger" class="login_button" @click="$refs['usereditForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                usereditForm:{}
            }
        },
        created() {
            this.getoneuserinfo(this.$route.params.id)
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            getoneuserinfo(u_userId){
                this.$api.user.getoneuserinfo(u_userId).then(res =>{
                    //console.log(res)
                    if(res.code==1){
                        this.usereditForm=res.data.oneuserinfo
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            useredit(usereditForm){
                this.$refs[usereditForm].validate((valid) => {
                    if (valid) {
                        let userinfo = this.usereditForm;
                        this.$api.user.putoneuserinfo(userinfo,this.$route.params.id).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                 this.showMessage('success',res.data.message)

                                if(this.usereditForm.role == 1){
                                    this.$router.push({ path: '/userAdmin' })
                                }else if(this.usereditForm.role == 4){
                                    this.$router.push({ path: '/userCommon' })
                                }

                            }else{
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            } 
        },
    }
</script>

<style>
</style>