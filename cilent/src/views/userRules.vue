<template>
    <div>

        <van-nav-bar left-text="返回" title="用户条例" left-arrow @click-left="onClickLeft"/>

        <div id="rules">
            <div class="rulestitle">总则</div>
            <div class="rulesconnect">1.用户应当同意本协议的条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击"同意"按钮即表示用户与百度公司达成协议，完全接受本协议项下的全部条款。</div>
            <div class="rulesconnect">2.用户注册成功后，百度将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</div>
            <div class="rulesconnect">3.用户可以使用百度各个频道单项服务，当用户使用百度各单项服务时，用户的使用行为视为其对该单项服务的服务条款以及百度在该单项服务中发出的各类公告的同意。</div>
            <div class="rulesconnect">4.百度会员服务协议以及各个频道单项服务条款和公告可由百度公司随时更新，且无需另行通知。您在使用相关服务时,应关注并遵守其所适用的相关条款。</div>
            <div class="rulesconnect">您在使用百度提供的各项服务之前，应仔细阅读本服务协议。如您不同意本服务协议及/或随时对其的修改，您可以主动取消百度提供的服务；您一旦使用百度服务，即视为您已了解并完全同意本服务协议各项内容，包括百度对服务协议随时所做的任何修改，并成为百度用户。</div>
        
            <div class="rulestitle">知识产权</div>
            <div class="rulesconnect">本公司所提供的作品及资料，其著作权、商标专用权、商业秘密权及其它知识产权，均为本公司或授权本公司使用的合法权利人所有，除非事先经本公司或其权利人的书面授权，任何人皆不得擅自以任何形式使用，否则本公司可立即终止向该用户提供产品和服务，并依法追究其法律责任，赔偿本公司一切损失。</div>

            <div class="rulestitle">青少年用户特别提示</div>
            <div class="rulesconnect">青少年用户必须遵守全国青少年网络文明公约：</div>
            <div class="rulesconnect">要善于网上学习，不浏览不良信息；要诚实友好交流，不侮辱欺诈他人；要增强自护意识，不随意约会网友；要维护网络安全，不破坏网络秩序；要有益身心健康，不沉溺虚拟时空。</div>
        
            <div class="rulestitle">法律适用及管辖</div>
            <div class="rulesconnect">1.本用户条款适用中华人民共和国的法律。</div>
            <div class="rulesconnect">2.如本公司服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款法律效力不变。</div>
            <div class="rulesconnect">3.如出现纠纷，用户和本公司一致同意交由人民法院管辖。</div>

            <div class="rulesbottom">最终解释权由本软件公司所有</div>

        </div>

    </div>
</template>

<script>
    export default {
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('rules').style.height=winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
        }        
    }
</script>

<style>
#rules{
    overflow: scroll;
}
.rulestitle{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.2rem;
    font-weight: bold;
    font-size: 17px;
    color: rgb(33, 33, 189);
}
.rulesconnect{
    text-indent:30px;
    margin-left: 0.5rem;
    margin-bottom: 0.3rem;
    margin-right: 0.2rem;
    line-height: 25px;
    font-size: 14px;
    color: rgb(48, 48, 48);
}
.rulesbottom{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    color: rgb(48, 48, 48);
}
</style>