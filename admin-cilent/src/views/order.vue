<template>
    <div class="allLayer">

        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="待分配订单" name="first">
                <OrderCkeckList v-if="tabRefresh.first"></OrderCkeckList>
            </el-tab-pane>

            <el-tab-pane label="待支付订单" name="second">
                <OrderNopaymentList v-if="tabRefresh.second"></OrderNopaymentList>
            </el-tab-pane>

            <el-tab-pane label="支付完成订单" name="third">
                <OrderSuccessList v-if="tabRefresh.third"></OrderSuccessList>
            </el-tab-pane>

            <el-tab-pane label="超时订单" name="fourth">
                <OrderOverList v-if="tabRefresh.fourth"></OrderOverList>
            </el-tab-pane>

            <el-tab-pane label="失效订单" name="fifth">
                <OrderLoseList v-if="tabRefresh.fifth"></OrderLoseList>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import OrderCkeckList from '../components/OrderCkeckList.vue'
import OrderNopaymentList from '../components/OrderNopaymentList.vue'
import OrderSuccessList from '../components/OrderSuccessList.vue'
import OrderOverList from '../components/OrderOverList.vue'
import OrderLoseList from '../components/OrderLoseList.vue'

    export default {
        name: 'Main',
        components: {
            OrderCkeckList,
            OrderNopaymentList,
            OrderSuccessList,
            OrderOverList,
            OrderLoseList
        },
        data() {
            return {
                activeName: 'first',
                tabRefresh: {
                    first: true,
                    second: false,
                    third: false,
                    fourth: false,
                    fifth: false
                }
            };
        },
        methods: {
            handleTabClick: function(){
                switch (this.activeName) {
                    case 'first':
                        this.switchTab('first')
                        break;
                    case 'second':
                        this.switchTab('second')
                        break;
                    case 'third':
                        this.switchTab('third')
                        break;
                    case 'fourth':
                        this.switchTab('fourth')
                        break;
                    case 'fifth':
                        this.switchTab('fifth')
                        break;
                    default:
                        console.log('选择出错');

                }
            },
            switchTab: function(tab) {
                for (let [key] of Object.entries(this.tabRefresh)) {        
                    if (key == tab) {
                        this.tabRefresh[key] = true
                    } else {
                        this.tabRefresh[key] = false
                    }
                }
            }
        },
        
    }
</script>

<style>
.allLayer{
    margin-top: -560px;
    margin-left: 240px
}
</style>