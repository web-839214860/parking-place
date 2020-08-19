<template>
    <div>

        <van-nav-bar left-text="返回" title="用户升级" left-arrow @click-left="onClickLeft"/>

        <div v-if="showmyupgradeinfo">

            <el-form :model="beginnerForm" :rules="rules" ref="beginnerForm" label-width="79px" class="form">

                <el-form-item label="真实姓名" prop="b_name">
                    <el-input clearable type="text" placeholder="请填写真实姓名" v-model="beginnerForm.b_name" ></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="b_phone">
                    <el-input clearable type="text" placeholder="请填写联系方式" v-model="beginnerForm.b_phone" ></el-input>
                </el-form-item>

                <el-form-item label="所属物业" prop="b_parking">
                    <el-select v-model="beginnerForm.b_parking" placeholder="请选择所属物业" style="width:270px">
                        <el-option v-for="item in propertyInfo" :key="item.u_name" :value="item.u_name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="车位名称" prop="b_carname">
                    <el-input clearable type="text" placeholder="请填写车位全称" v-model="beginnerForm.b_carname" ></el-input>
                </el-form-item>

                <el-form-item label="上传凭证">
                    <van-uploader ref="upload" v-model="fileList" multiple />
                </el-form-item>

            </el-form>

            <div class="button">
                <van-button type="info" size="large" @click="beginneruser('beginnerForm')" >确认升级</van-button>
            </div>

        </div>


        <div v-if="nomyupgradeinfo" class="nomyupgradeinfo">

            <img style="width:3.2rem; height:3.2rem;" src="../../public/images/tip.png">
            
            <div class="tip_div">您于 {{beginnerInfo.b_time}} 提交的申请正在审核中</div>
            <div class="tip_div" style="margin-top: 0.5rem;">请您耐心等待</div>

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                propertyInfo:[],
                beginnerInfo:[],
                fileList: [],
                showmyupgradeinfo:false,
                nomyupgradeinfo:false,
                beginnerForm:{
                    b_name: '',
                    b_phone: '',
                    b_parking: '',
                    b_carname: '',
                    u_userId: this.$store.state.user.u_userId,
                },
                rules: {
                    b_name: [
                        { required: true, message: '请填写真实姓名', trigger: 'blur' }
                    ],
                    b_phone: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' }
                    ],
                    b_parking: [
                        { required: true, message: '请选择所属物业', trigger: 'blur' }
                    ],
                    b_carname: [
                        { required: true, message: '请填写车位全称', trigger: 'blur' }
                    ],
				}
            }
        },
        created(){
            this.propertyUserList()
            this.beginnerInfoList()
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            propertyUserList(){
                this.$api.beginner.getallpropertyinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.propertyInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            beginnerInfoList(){
                this.$api.beginner.getonebeginnerinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data.b_time)
                        this.beginnerInfo=res.data

                        if(res.data == null){
                            this.showmyupgradeinfo =true
                        }else{
                            this.nomyupgradeinfo = true
                        }

                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            beginneruser(beginnerForm){
                this.$refs[beginnerForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.value[0]
                        if(file==null){
                            this.$toast.fail("请上传车位凭证") 
                        }else{ 
                            formData.append('b_name', this.beginnerForm.b_name);
                            formData.append('b_phone', this.beginnerForm.b_phone);
                            formData.append('b_parking', this.beginnerForm.b_parking);
                            formData.append('b_carname', this.beginnerForm.b_carname);
                            formData.append('u_userId', this.beginnerForm.u_userId);
                            formData.append('b_photo', file.file);
                            this.$api.beginner.postbeginneruser(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.$toast.success(res.data.message)
                                    this.$router.push({ path: '/my' })
                                }else if(res.code ==-1){                              
                                    this.$toast.fail(res.data.message)                               
                                }else{
                                    this.$toast.fail("未知错误")
                                }
                            })        
                        }   
                    }
                });  
            },
        }    
    }
</script>

<style>
.nomyupgradeinfo{
    text-align: center;
    margin-top: 0.9rem;
}
.tip_div{
    margin-top: 1.1rem;
    font-size: 0.8rem;
    color: rgb(70, 70, 70)
}
</style>