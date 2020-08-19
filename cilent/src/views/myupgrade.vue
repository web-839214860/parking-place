<template>
    <div>

        <van-nav-bar left-text="返回" title="注意事项" left-arrow @click-left="onClickLeft"/>

        <div id="rules">

            <div class="rulestitle">相关条例</div>
            <div class="rulesconnect">1.升级成为车位车主用户，需提供个人的真实信息，包括姓名、电话号码等。本平台承诺绝对不会泄露用户的相关信息。用户需要完全接受本协议项下的全部条款。</div>
            <div class="rulesconnect">2.用户升级申请填写成功后，需要等待1-2天的时间为所属物业公司进行审核，审核通过后方能成为车位车主发布车位信息</div>
            <div class="rulesconnect">3.用户升级成功后，可以将自己的车位在空闲的时段出租出去，最多可发布不超过5个车位，且必须符合所属物业公司的相关规定。用户首次发布车位信息时，需要等待1-2天的时间为所属物业公司进行审核，审核通过后方能发布车位信息到平台；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</div>
            <div class="rulesconnect">您在使用本平台提供的各项服务之前，应仔细阅读本服务协议。如您不同意本服务协议或随时对其的修改，您可以主动取消升级为车位车主；您一旦使用本服务，即视为您已了解并完全同意本服务协议各项内容，包括平台对服务协议随时所做的任何修改，并成为本平台的用户。</div>
        
            <div class="rulestitle">法律适用及管辖</div>
            <div class="rulesconnect">1.本用户条款适用中华人民共和国的法律。</div>
            <div class="rulesconnect">2.如本公司服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款法律效力不变。</div>
            <div class="rulesconnect">3.如出现纠纷，用户和本公司一致同意交由人民法院管辖。</div>
            <div class="rulesconnect">4.最终解释权由本软件公司所有。</div>

            <div class="upgradeagree">
                <van-checkbox v-model="checked" icon-size="17px">我已阅读并同意该条例</van-checkbox>
            </div>
            
            <div class="button">
                <van-button type="info" size="large" @click="onClickAgree()" >前往升级</van-button>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false, 
            }
        },    
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('rules').style.height=winHeight-46-50 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            onClickAgree(){
                if(this.checked == false){
                    this.$toast.fail("请先勾选阅读并同意条例")
                } else {
                    this.$router.push({ path: '/myupgradeinfo' })
                }
            }
        }        
    }
</script>

<style>
.upgradeagree{
    margin-left: 0.3rem;
    margin-top: 0.9rem;
    font-size: 0.8rem;
    font-weight: bold;
}
</style>