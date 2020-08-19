<template>
    <div>

        <!-- 发布评论 -->
        <el-form :model="discussForm" :rules="rules" ref="discussForm" class="form" style="margin-top: 12px">
            <van-row>
                <van-col span="20">
                    <el-form-item prop="d_discuss" style="width:268px">
                        <el-input clearable type="textarea" :rows="2" placeholder="请发布评论..." v-model="discussForm.d_discuss" ></el-input>
                    </el-form-item>
                </van-col>
                <van-col span="4"><van-button type="info" size="small" style="margin-top: 22px" @click="discussadd('discussForm')">发布</van-button></van-col>
            </van-row>
        </el-form>

        <!-- 评论内容 -->
        <div class="comment_wrap" v-if="discuss">
            <div class="comment_title">评论详情 （共 {{getSearchInfo.length}} 条）</div>
            <div>
                <div class="comment_item" v-for="(discuss,index) in getSearchInfo" :key="index">
                    <!-- 左侧 -->
                    <div class="comment_user">
                        <img :src="discuss.user.u_image"/>
                    </div>
                    <!-- 右侧 -->
                    <div class="comment_info">
                        <div class="comment_detail">
                            <div class="author">{{discuss.user.u_name}}</div>
                            <div class="date">{{discuss.d_date}}</div>
                        </div>
                        <div class="comment_detail_delete">
                            <div class="commentInfo">{{discuss.d_discuss}}</div>
                            <div class="delete">
                                <div v-if="discuss.u_userId == Id"  @click="deletediscuss(discuss.d_id)">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="nodiscuss" >
            <van-empty description="暂无评论" />
        </div>

    </div>
</template>

<script>
    export default {
        props:["carForm"],
        data() {
            return {
                Id: this.$store.state.user.u_userId,
                discuss: false,
                nodiscuss: false,
                discussForm:{
                    d_discuss: '',
                    c_name: this.carForm.c_name,
                    u_userId: this.$store.state.user.u_userId,
                    p_userId: this.carForm.p_userId
                },
                getSearchInfo: [],
                rules: {
                    d_discuss: [
                        { required: true, message: '请先输入评论内容', trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
            this.getdiscuss()
        },
        methods: {
            getdiscuss(){
                this.$api.discuss.getalldiscussadmin().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        const that = this
                        const alldiscuss = res.data.filter(function(item){ //数组条件筛选
                            return item.c_name == that.carForm.c_name
                        })
                        this.getSearchInfo=alldiscuss;
                        if(this.getSearchInfo.length <= 0){
                            this.nodiscuss=true
                        } else {
                            this.discuss=true
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            deletediscuss(val){
                this.$api.discuss.deletediscuss(val).then(res =>{
                    if(res.code==1){
                        this.getdiscuss()
                        this.$toast.success(res.data.message)
                        if(this.getSearchInfo.length-1 <= 0){
                            this.nodiscuss=true
                            this.discuss=false
                        } else {
                            this.discuss=true
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                    
                })
            },
            discussadd(discussForm){
                this.$refs[discussForm].validate((valid) => {
                    if (valid) {
                        let discussinfo = this.discussForm;
                        this.$api.discuss.postdiscuss(discussinfo).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.getdiscuss()
                                this.$toast.success(res.data.message)
                                this.discussForm.d_discuss = ''
                                this.nodiscuss = false
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            }
        },
        
    }
</script>

<style>
.comment_wrap {
    margin: 0 11px;
}
.comment_title {
    font-size: 14px;
    color: rgb(54, 54, 54);
    text-align: center;
    margin-bottom: 16px;
}
.comment_item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
}
.comment_user {
    display: flex;
    flex: 1;
    width: 42.88px;
    height: 46px;
}
.comment_user img {
    width: 75%;
    height: 75%;    
}
.comment_info {
    display: flex;
    flex: 7;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
}
.comment_detail {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
}
.comment_detail .author {
    font-size: 14px;
    color: #9E9E9E;
}
.comment_detail .date {
    font-size: 13px;
    color: #9E9E9E;
}
.comment_detail_delete {
    display: flex;
    justify-content: space-between;
}
.comment_detail_delete .commentInfo {
    font-size: 14px;
    color: #323233;
    flex: 7;
}
.comment_detail_delete .delete {
    font-size: 14px;
    color: #4F6B8C;
    text-decoration: underline;
    text-align: right;
    flex: 1;
}
</style>