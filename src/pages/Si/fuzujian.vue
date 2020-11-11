<template>
  <div>
      <div>我是父组件</div>
      <!-- 组件间传参巩固操作 ===父组件-->
      <zizujian num1='hellow'></zizujian>
      <!-- 递归实现0——100的和 -->
      <button @click="jisuan1()"> 递归累加器</button>
      <!-- 循环实现0——100的和  -->
      <button @click="jisuan()">循环累加器</button>
  </div>
</template>

<script>

import zizujian from './zizujian'
export default {
    name:'fuzujian',
    data(){
        return{
            
        }
    }, 
    components:{
        zizujian
    },
    methods: {
        jisuan(){
        // 循环实现0——100的和    
            var sum=0
            for(var i=0;i<101;i++){
                sum=sum+i
            }
            console.log(sum)
        },
        // 递归实现0——100的和
            jisuan2(n,m){
                var num=n+m
                m++
                if(m>101){
                    return num
                }else{
                    this.jisuan2(num,m)
                     console.log(num,m, '111111111111')
                }
            },
            jisuan1(){
                this.jisuan2(1,2);
            }
    }

}
</script>

<style>

</style>