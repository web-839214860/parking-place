<template>
    <div>
        
        <van-nav-bar title="订单查询"/>

        <van-tabs v-model="activeName" animated  @click="handleTabClick">
            <van-tab title="待分配" name="first">
                <OrderCkeckList v-if="tabRefresh.first"></OrderCkeckList>
            </van-tab>

            <van-tab title="待支付" name="second">
                <OrderNopaymentList v-if="tabRefresh.second"></OrderNopaymentList>
            </van-tab>

            <van-tab title="支付完成" name="third">
                <OrderSuccessList v-if="tabRefresh.third"></OrderSuccessList>
            </van-tab>

            <van-tab title="失效订单" name="fourth">
                <OrderLoseList v-if="tabRefresh.fourth"></OrderLoseList>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
import OrderCkeckList from '../components/OrderCkeckList.vue'
import OrderNopaymentList from '../components/OrderNopaymentList.vue'
import OrderSuccessList from '../components/OrderSuccessList.vue'
import OrderLoseList from '../components/OrderLoseList.vue'

    export default {
        name: 'Main',
        components: {
            OrderCkeckList,
            OrderNopaymentList,
            OrderSuccessList,
            OrderLoseList
        },
        data() {
            return {
                activeName: 'first',
                tabRefresh: {
                    first: true,
                    second: false,
                    third: false,
                    fourth: false
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
.van-tabs__line{
    background: #1989FA
}
</style>