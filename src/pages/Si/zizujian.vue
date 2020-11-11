<template>
  <div>
      <div>我是子组件</div>
      <!-- 组件间传参巩固操作  ----子组件 -->
      <div>{{num1}}</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
           
        }
    },
    props:['num1'],
}
</script>

<style>

</style>