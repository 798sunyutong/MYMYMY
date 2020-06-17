<template>
    <div>
        <commonIntroduce
        :produceName="produceName"
        :planCode="planCode"
        :goPath="goPath"
        :shareInfo="shareInfo"
        :btnColor="btnColor"
        >
            <div class="xy2d_banner">
                <img src="" alt="">
            </div>
        </commonIntroduce>
    </div>  
</template>

<script>
import commonIntroduce from '@components/commonIntroduce.vue'
export default {
    data(){
        return{
            produceName:"神奇大宝贝",//险种姓名
            planCode:"B54",//险种码
            goPath:'/ts_prpo/sqpp',//录单页面路径
            shareInfo:{
                shareTitle:"神奇大宝贝",//分享得title
                shareImg:'',//分享图片路径
                sampleIntroduce:'【重磅上市】多么完美可爱的商品啊，我是可爱本爱'
            },
            btnColor:{
                wtBth:'#bccef8',
                ytBth:'#8fb1fe'
            }
        }
    },
    components:{
        commonIntroduce
        }
}
</script>

<style>

</style>