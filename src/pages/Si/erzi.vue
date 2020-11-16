<template>
  <div>
      <div>我是你儿子想要得到的大宝贝</div>
      <router-link to="/Si/fuzujian">我要回去</router-link>
      <button @click="dsq()">定时器问题</button>
  </div>
</template>

<script>

export default {
    name:'erzi',
    data() {
        return {
            
        }
    },
    methods: {
        dsq(){
            // 打印55555
                // for(var i=0;i<5;i++){
                //     setTimeout(() => {
                //         console.log(i)
                //     }, 1000);
                // }
            // 打印55555
                // for(var i=0;i<5;i++){
                //     setTimeout(() => {
                //         console.log(i)
                //     }, 1000,i);
                // }

            // 打印01234,let是块级作用域，var是全局变量
            // for(let i=0;i<5;i++){
            //     setTimeout(() => {
            //         console.log(i)
            //     }, 1000);
            // }
            // 打印01234，定时器放在自调用函数中，每次调用的时候会存储起来
            // for(var i=0;i<5;i++){
            //     (function fn(i){
            //         setTimeout(() => {
            //             console.log(i)
            //         }, 1000)
            //     })(i)
            // }
            // 打印01234,传入实参i，利用形参j来接收循环中每一次i的值
            for(var i=0;i<5;i++){
                setTimeout((j) => {
                    console.log(j)
                }, 1000,i)
            }
        },
    },

}
</script>

<style>

</style>