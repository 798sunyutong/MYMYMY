<template>
    <div id="xy2d_introduce">
        <div class="introduce_cover">
            <!-- 产品介绍的图片容器 -->
            <slot></slot>
        </div>
        <div class="bottomBar">
            <button class="bottom_btn1" :style="{backgroundColor:btnColor.wtbtn }" @click="leadgoSelfWrite">网投出单</button>
            <button class="buttom_btn2" :style="{backgroundColor:btnColor.ytbtn}" @click="goInForm">易投出单</button>
        </div>
        <div class="loading-div" v-if="loadingFlag">
            <loading/>
        </div>
        <Alert></Alert> 
    </div>
</template>

<script>
export default {

} 
</script>

<style>

</style>