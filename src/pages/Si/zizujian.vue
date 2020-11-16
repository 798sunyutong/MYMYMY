<template>
  <div>
      <div @click="gotu()">我是大儿子</div>
      <router-link to="/Si/zizujianer">我是二儿子</router-link>
      <!-- 组件间传参巩固操作  ----子组件 -->
      <div>{{num1}}</div>
      <div @click="time()">获取当前时间</div>
      <div>{{messg}}</div>

  </div>
</template>

<script>
export default {
    data(){
        return{
           messg:''
        }
    },
    props:['num1'],
    methods: {
        time(){
            let N=new Date().getFullYear()
            let Y=(new Date().getMonth()<10) ? '0'+Date().getMonth() : new Date().getMonth()+1
            let R=new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate()
            let s=new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours()
            let f=new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes()
            new Date().getSeconds
            this.messg=`${N}-${Y}-${R} ${s}:${f}`
        },
        gotu(){
            this.$router.push('/Si/erzi')
        },
    },
}
</script>

<style>

</style>