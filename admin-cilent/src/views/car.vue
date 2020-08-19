<template>
    <div class="allLayer">

        <div>
            <el-input v-model="searchTableInfo" placeholder="请输入搜索内容" style="width:30%"></el-input>
        </div>

        <el-table style="width: 100%; margin-top: 10px;" :data="carList.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" type="index" width="60" align="center"></el-table-column>

            <el-table-column label="车位名称" prop="c_name" width="80" align="center"></el-table-column>

             <el-table-column label="可使用时间" prop="c_begintime, c_endtime" width="160" align="center">
                <template slot-scope="scope">
                    {{scope.row.c_begintime}}-{{scope.row.c_endtime}}
                </template>
            </el-table-column>

            <el-table-column label="所属物业" prop="property.user.u_name" width="100" align="center"></el-table-column>

            <el-table-column label="发起人" prop="beginner.b_name" width="100" align="center"></el-table-column>

            <el-table-column label="发布资格" prop="c_seniority" width="80" align="center">
                <template slot-scope="scope">                    
                    <p v-if="scope.row.c_seniority=='1'">是</p>
                    <p v-if="scope.row.c_seniority=='0'">否</p>              
                </template>
            </el-table-column>

            <el-table-column label="车位当前状态" prop="c_status" width="110" align="center"></el-table-column>
            
            <el-table-column label="车位总收益" prop="c_money" width="100" align="center"></el-table-column>

            <el-table-column label="操作" prop="doit" width="335" align="center">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" @click="postcars(scope.row.c_id)" :disabled="scope.row.c_seniority == 0 || scope.row.c_status == '发布成功' || scope.row.c_status == '使用中' || scope.row.c_status == '计费中'" ><i class="el-icon-check"></i> 发布</el-button>
                    <el-button size="small" type="primary" @click="putcars(scope.row.c_id)" :disabled="scope.row.c_seniority == 0 || scope.row.c_status == '待发布' || scope.row.c_status == '使用中' || scope.row.c_status == '计费中'" ><i class="el-icon-close"></i> 取消发布</el-button>
                    <el-button size="small" type="danger" @click="open(scope.row.c_id)" ><i class="el-icon-delete"></i> 删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="carList.length">
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
                searchTableInfo:"",
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
                this.$api.car.getallcarsinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            postcars(val){
                this.$api.car.postcarinfo(val).then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            putcars(val){
                this.$api.car.putcarinfo(val).then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            deletecar(val){
                this.$api.car.deletecar(val).then(res =>{
                    if(res.code==1){
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else if(res.code==-1){
                        this.$message.error(res.data.message)
                    }else{
                        this.$message.error("未知错误")
                    }
                    
                })
            },
            open(val) {
                MessageBox.confirm('此操作将删除该车位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deletecar.bind(this)(val);
                }).catch(() => {});
            },
        },
        computed: {  //参考：https://blog.csdn.net/reality_fei/article/details/105560589
            // 根据计算属性模糊搜索
            carList () {
                const searchTableInfo = this.searchTableInfo
                if (searchTableInfo) {
                // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                // 注意： filter() 不会对空数组进行检测。filter() 不会改变原始数组。
                    return this.getSearchInfo.filter(data => {
                    //console.log("success"+data)
                    // some() 方法（用于检测数组中的元素是否满足指定条件） 会依次执行数组的每个元素：
                    // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                    // 如果没有满足条件的元素，则返回false。
                    // 注意： some() 不会对空数组进行检测。some() 不会改变原始数组。
                        return Object.keys(data).some(key => {
                        // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                        // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
                        })
                    })
                }
                return this.getSearchInfo
            }
        },

    }
</script>

<style>

</style>