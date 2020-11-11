<template>

    <div id="XYKSC">
         <!-- 弹层组件 -->
        <div class="yinying" v-show="jiaofeifangshi">
            <div class="title">
                <div class="title-fangshi">
                    <span>请选择交费方式</span>
                </div>
                <div class="guanbi">
                    <span @click="close()">X</span>
                </div>
            </div>
            <div class="lists">
                <ul>
                    <li class="list" v-for="(item,index) in fangshi" :key='index'>{{item.nian}}</li>
                </ul>
            </div>
            
        </div>
        <!-- 主体内容 -->
        <div class="Insurance-duty">
            <span class="duty">保险责任</span>
            <span class="both">两全</span>
        </div>
        <div class="choice">
            <span class="choiceduty">可选保险责任</span>
            <span class="moreduty" @click="xuanze()">请选择></span> 
        </div>
        <div class="butten" v-show="baoxianshow">
            <ul>
                <li class="yw" v-for="(item,index) in xuanzes" :key='index' >{{item.name}}</li>
            </ul>
        </div>
        <div class="fangshi">
            <span>交费方式</span>
            <span class="moreduty" @click="jiaofei()">请选择></span> 
        </div>
        <!-- 封装小的方法，并调用 -->
        <button @click="times()">CDDDDD</button>
    </div>
</template>

<script>


export default {
 name:'kangshun',
    data(){
       return{
            baoxianshow:false,
            jiaofeifangshi:false,
            xuanzes:[
                {
                    name:'意外',
                    nember:'01'
                },{
                    name:'住院津贴',
                    nember:'02'
                },{
                    name:'意外医疗',
                    nember:'03'
                }
            ],
            fangshi:[
                {
                    nian:'趸交',
                    nm:'01'
                },{
                    nian:'5年交',
                    nm:'05'
                },{
                    nian:'15年交',
                    nm:'015'
                },{
                    nian:'20年',
                    nm:'020'
                }
            ],

       }
    },
    methods: {
        xuanze(){
            this.baoxianshow=!this.baoxianshow
        },
        jiaofei(){
            this.jiaofeifangshi=true
        },
        close(){
            this.jiaofeifangshi=false
        },
        time(num1,num2){
            if(num1<7){
                 console.log(num2,'7777777')
                 return num2=num1
            }else if (num1>7){
                console.log(num2,'88888888')
                return num2=num1
            }
        },
        times(){
            this.stringing=this.time(6,this.stringing)
            console.log(this.stringing,'------------')
        }
    },

        
}
</script>

<style lang="stylus" scoped>
#XYKSC{
    .butten{
        .yw{
            border 1px solid red
            width 90px
            display inline-block
            text-align center
            padding 10px
            margin 10px
        }
    }
    .yinying{
        background transparent 
        width 100%
        height 100%
        overflow hidden
        .title{
            width 100%
            .title-fangshi{
                display inline-block
                width 60%
            }
            .guanbi{
                text-align right 
                display inline-block
                width 30%
            }
        }
        .lists{
            .list{

            }

        }

    }

}
</style>
