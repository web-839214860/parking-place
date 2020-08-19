<template>
    <div>

        <div>
            <el-input v-model="searchTableInfo" placeholder="请输入搜索内容" style="width:30%"></el-input>
        </div>

        <el-table border style="width: 100%; margin-top: 10px;" :data="orderNopaymentList.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" type="index" width="70" align="center"></el-table-column>

            <el-table-column label="预订人" prop="o_name" width="120" align="center"> 
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top-start" >
                        <p>登录账号： {{scope.row.u_userId}} </p>
                        <p>联系方式： {{scope.row.o_phone}} </p>
                        <p>下单时间： {{scope.row.o_time}} </p>
                        <span slot="reference" style= "cursor:pointer">{{scope.row.o_name}}</span>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="车牌号" prop="o_card" width="120" align="center"></el-table-column>

            <el-table-column label="开始停车时间" prop="o_begintime" width="175" align="center">
                <template slot-scope="scope">                    
                    <p v-if="scope.row.o_begintime=='Invalid date'">暂未计时</p>
                    <p v-if="scope.row.o_begintime!=='Invalid date'">{{scope.row.o_begintime}}</p>             
                </template>
            </el-table-column>

            <el-table-column label="结束停车时间" prop="o_endtime" width="175" align="center">
                <template slot-scope="scope">                    
                    <p v-if="scope.row.o_endtime=='Invalid date'">暂未计时</p>
                    <p v-if="scope.row.o_endtime!=='Invalid date'">{{scope.row.o_endtime}}</p>       
                </template>
            </el-table-column>

            <el-table-column label="是否超时" prop="o_over" width="105" align="center">
                <template slot-scope="scope">                    
                    <p v-if="scope.row.o_over==0">否</p>
                    <p v-if="scope.row.o_over==1">是</p>             
                </template>
            </el-table-column>

            <el-table-column label="收费" prop="o_money" width="100" align="center"></el-table-column>

            <el-table-column label="预订车位" prop="c_name" width="120" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top-start" >
                        <p>车位状态： {{scope.row.car.c_status}} </p>
                        <p>总收益： {{scope.row.car.c_money}} </p>
                        <p>可使用时间： {{scope.row.car.c_begintime}} - {{scope.row.car.c_endtime}} </p>
                        <span slot="reference" style= "cursor:pointer">{{scope.row.c_name}}</span>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="车位所属物业" prop="property.user.u_name" width="140" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top-start" >
                        <p>负责人： {{scope.row.property.p_name}} </p>
                        <p>性别： {{scope.row.property.user.u_sex}} </p>
                        <p>位置： {{scope.row.property.p_address}} </p>
                        <p>联系电话： {{scope.row.property.p_phone}} </p>
                        <span slot="reference" style= "cursor:pointer">{{scope.row.property.user.u_name}}</span>
                    </el-popover>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="orderNopaymentList.length">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage:1,//初始页
                pagesize:4,//每页的数据
                searchTableInfo:"",
                getSearchInfo:[]
            };
        },
        created(){
            this.handleUserList()
        },
        methods: {
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
                this.$api.order.getallorderNopaymentadmin().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
        },
        computed: {  //参考：https://blog.csdn.net/reality_fei/article/details/105560589
            // 根据计算属性模糊搜索
            orderNopaymentList () {
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

<style lang="scss" scoped>

</style>