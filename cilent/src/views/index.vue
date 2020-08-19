<template>
    <div>
        
        <van-nav-bar title="找寻车位"/>

        <van-search v-model="searchCarInfo" placeholder="请输入搜索关键词" />

        <div class="sorttime">
            <van-row>
                <van-col span="8"><div @click="sort()"><van-icon name="exchange" /> 恢复默认</div></van-col>
                <van-col span="8"><div @click="upsort('time')"><van-icon name="arrow-up" /> 时间升序</div></van-col>
                <van-col span="8"><div @click="downsort('time')"><van-icon name="arrow-down" /> 时间降序</div></van-col>
            </van-row>
        </div>

        <div id="car_list">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">

                <div v-for="(car,index) in carList" :key="index" class="item_car" @click="carinfo(car.c_id)">
                    <!-- 图片 -->
                    <div class="car_img_wrap">
                        <img :src="car.c_image"/>
                    </div>

                    <!-- 信息 -->
                    <div class="car_info">

                        <div class="car_title">{{car.property.user.u_name}} {{car.c_name}}</div>

                        <div class="car_detail" style="font-size: 0.7rem">
                            <div style="margin-bottom: 0.25rem"><van-icon name="clock-o" /> 可用时长：{{car.time}} 分钟</div>
                            <div style="margin-bottom: 0.15rem"><van-icon name="award-o" /> 使用时间：{{car.c_begintime}} - {{car.c_endtime}}</div>
                            <div><van-icon name="location-o" /> {{car.property.p_address}}</div>
                        </div>

                    </div>
                    
                </div>

            </van-pull-refresh>
        </div>

    </div>
</template>

<script>
import { getLocalStorage } from '@/utils/localStorage'

    export default {
        data(){
            return{
                getSearchInfo: [],
                searchCarInfo: "",
                isRefresh:false, 
                sortType: ''
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('car_list').style.height=winHeight-46-54-28-50-10 +'px'
        },
        created(){
            this.handleCarList();
        },
        methods: {
            handleCarList(){
                this.$api.car.getallcarsinfocilent().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                        for(let i = 0; i < res.data.length; i++){
                            const data1 = this.$moment(this.getSearchInfo[i].c_begintime, 'HH:mm:ss')
                            const data2 = this.$moment(this.getSearchInfo[i].c_endtime, 'HH:mm:ss')
                            const data3 = data2.diff(data1, 'minute')
                            //console.log(data3)
                            this.getSearchInfo[i].time = data3;
                        }  
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            sort() {
                this.handleCarList();
            },
            upsort(type) {
                this.sortType = type;
                this.getSearchInfo.sort(this.upcompare(type));
            },
            downsort(type) {
                this.sortType = type;
                this.getSearchInfo.sort(this.downcompare(type));
            },
            upcompare(attr) {
                return function(a,b) {
                    var val1 = a[attr];
                    var val2 = b[attr];
                    return val1 - val2;
                }
            },
            downcompare(attr) {
                return function(a,b) {
                    var val1 = a[attr];
                    var val2 = b[attr];
                    return val2 - val1;
                }
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    //this.getSearchInfo=[];
                    this.handleCarList();
                }, 500);
            },
            carinfo(val){
                if(getLocalStorage('Role') == 3){
                    this.$router.push('/carindexinfo/' + val)
                } else if(getLocalStorage('Role') == 4){
                    this.$router.push('/indexinfo/' + val)
                }
            },
        },
        computed: {
            // 根据计算属性模糊搜索
            carList () {
                const searchCarInfo = this.searchCarInfo
                if (searchCarInfo) {
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
                            return String(data[key]).toLowerCase().indexOf(searchCarInfo) > -1
                        })
                    })
                }
                return this.getSearchInfo
            }
        }    
    }
</script>

<style>
.sorttime{
    height: 28px;
    text-align: center;
    font-size: 0.76rem;
    color: rgb(54, 54, 54)
}
.item_car {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
</style>