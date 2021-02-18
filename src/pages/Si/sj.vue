<template>
 <div>
      <div v-for="(item,index) in pers" :key="index" @click="hh()">
        {{item.total}}
    </div>
 </div>
</template>

<script>
export default {
    data(){
        return{
            //假装是后台返回来的数据长这样
            // pers:[
            //     {
            //         num="1",
            //         total='6798.87'
            //     },
            //     {
            //         num="2",
            //         total='6228.87'
            //     },
            // ]


            //本地定义的也是相同的名字
            pers:[
                {
                    // num="1",
                    // total='6798.87'
                }
            ],
        }
    },
    
    methods: {
        //发请求获取数据
        hh(){
            this.$ajax({
                //参数，接口
            })
            .then(res=>{
                if(res.data){
                    let data=res.data
                    if(data.pers){
                        // this.pers=data.pers //把后台返回来的值赋值给本地
                        for(var i = 0; i < res.data.personRank.length; i++){
                            this.personRank.push({
                                total:Math.floor(res.data.personRank[i].totalSaes*100/10000)/100,
                                rank:res.data.personRank[i].rank,
                                num:res.data.personRank[i].num
                            })
                        }
                    }

                }

            })
            .catch(err=>{

            })
        }
        

    },
}
</script>

<style>

</style>