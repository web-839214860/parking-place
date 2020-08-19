<template>
    <div class="allLayer">

        <el-form :model="propertyeditForm" ref="propertyeditForm"  label-width="81px" class="allforms">

            <el-form-item label="物 业 名 称" prop="user.u_name">
				<el-input clearable type="text" v-model="propertyeditForm.user.u_name"  :disabled="true" ></el-input>
			</el-form-item>

            <el-form-item label="物 业 地 址" prop="p_address">
				<el-input clearable type="textarea" autosize v-model="propertyeditForm.p_address" ></el-input>
			</el-form-item>

            <el-form-item label="负 责 人" prop="p_name">
				<el-input clearable type="text" v-model="propertyeditForm.p_name" ></el-input>
			</el-form-item>

            <el-form-item label="性 别" prop="user.u_sex">
                <el-select v-model="propertyeditForm.user.u_sex" style="width:270px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="联 系 电 话" prop="p_phone">
				<el-input clearable type="text" v-model="propertyeditForm.p_phone" ></el-input>
			</el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="propertyedit('propertyeditForm')" >修改</el-button>
                <el-button type="danger" class="login_button" @click="$refs['propertyeditForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                propertyeditForm:{
                    user: ''
                }
            }
        },
        created() {
            this.getonepropertyinfo(this.$route.params.id)
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            getonepropertyinfo(u_userId){
                this.$api.property.getonepropertyinfo(u_userId).then(res =>{
                    //console.log(res)
                    if(res.code==1){
                        this.propertyeditForm=res.data.onepropertyinfo
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            propertyedit(propertyeditForm){
                this.$refs[propertyeditForm].validate((valid) => {
                    if (valid) {
                        let userinfo = this.propertyeditForm;
                        this.$api.property.putonepropertyinfo(userinfo,this.$route.params.id).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                 this.showMessage('success',res.data.message)
                                 this.$router.push({ path: '/propertyInfo' })
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

</style>