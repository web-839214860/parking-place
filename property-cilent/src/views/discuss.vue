<template>
    <div class="allLayer">

        <el-table style="width: 100%; margin-top: 10px;" :data="getSearchInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" type="index" width="90" align="center"></el-table-column>

            <el-table-column label="用户昵称" prop="user.u_name" width="150" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top-start" >
                        <p>性别： {{scope.row.user.u_sex}} </p>
                        <p>登录账号： {{scope.row.user.u_userId}} </p>
                        <span slot="reference" style= "cursor:pointer">{{scope.row.user.u_name}}</span>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="评论内容" prop="d_discuss" width="260" align="center"></el-table-column>

            <el-table-column label="评论时间" prop="d_date" width="200" align="center"></el-table-column>

            <el-table-column label="评论车位" prop="c_name" width="140" align="center"></el-table-column>

            <el-table-column label="操作" prop="doit" width="285" align="center">
                <template slot-scope="scope"> 
                    <el-button size="small" type="danger" @click="open(scope.row.d_id)" ><i class="el-icon-delete"></i> 删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="getSearchInfo.length">
        </el-pagination>

    </div>
</template>

<script>
import { MessageBox } from 'element-ui'

    export default {
        inject:['reload'],//页面刷新
        data(){
            return{
                currentPage:1,//初始页
                pagesize:4,//每页的数据
                getSearchInfo:[]
            }
        },
        created(){
            this.handleUserList()
        },
        methods:{
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            handleSizeChange:function (size) {
                this.pagesize=size; //每页下拉显示数据
            },
            handleCurrentChange:function(currentPage){
                this.currentPage=currentPage; //点击第几页
            },
            handleUserList(){
                this.$api.discuss.getalldiscussproperty().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            deletediscuss(val){
                this.$api.discuss.deletediscuss(val).then(res =>{
                    if(res.code==1){
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                    
                })
            },
            open(val) {
                MessageBox.confirm('此操作将删除该条评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deletediscuss.bind(this)(val);
                }).catch(() => {});
            },
        }
        
    }
</script>

<style lang="scss" scoped>

</style>