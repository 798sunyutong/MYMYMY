<template>
  <div id="select">
        <div class="item_line" :class="{nobottom:nobottom}" @click="showModel">
          <span class="itemName">{{selectInfo}}</span>
          <img src="" alt="">
          <span class="bechoiced" :class="{greycolocr:!showInfo}">{{showInfo?showInfo:'请选择'}}</span>
         </div>
        <div class="backs">
            <div class="showchose" v-show="showchose" @touchmove.prevent :style="{width:screenWidth +'px',height:screenheight + 'px'}"> </div>
            <div class="address" v-show="showchose">
                <div class="select" @touchmove.prevent>
                    <h4>
                        请选择{{selectInfo}}
                    </h4>                                                      
                    <span @click="closeadd($event)">
                        x
                    </span>
                </div>
                <ul>
                    <li class="addlist" v-for="(v3,k) in zone" :key="k" @click="getdistrictid($event,v3.No,v3.Name,k)" :class="[v3.selected ? 'avtice' : '',{bankonly:isbankonly}]">
                        <img v-if="isbankonly" :src="v3.imgSrc" alt="">
                        {{v3.Name}}
                    </li>
                </ul>
            </div>
      </div>
  </div>
</template>

<script>
// import func from '../../../vue-temp/vue-editor-bridge'
export default {
    name: 'two',
    data(){
        return{
            screenWidth:window.innerWidth,
            screenheight:window.innerHeight,
            showchose:false,
            zone:[],
            isbankonly:this.selectInfo=="开户银行",
            district:57,
            selected:false
        }
    },
    props:[
        selectInfo,
        showInfo,
        nobottom,
        isdisabled,
        areaArr,

    ],
    watch:{
        areaArr:function(){
            this.zone=this.areaArr
        }
    },
    created(){
        this.areaArr.map(item=>{
            if(window.location.origin.split('80')[0]=='http://localhost'){
                item.imgSrc='../../../static/image/${item.No}.png'//本地模式
            }else{
                item.imgSrc='./static/${item.No}.png'//上线模式
            }
            this.zone.push(item)
        })
    },
    methods: {
        showModel(event){
            if(this.isdisabled){
                return
            }
            if(this.selectInfo==="咋给钱啊？" && !this.areaArr.length){
                this.$emit('showChoseWarn')
                return false
            }
            this.stop(even); 
            this.showchose=true;
        },
       closeadd:function(e){
           this.move(e);
           this.showchose=false
       },
       getdistrictid:function(e,code,input,index){
           this.district=code;
           this.District=inouy;
           //选择当前添加active
           this.zone.map(a => {a.selected=false});
           this.zone[index].selected=true;
           this.$emit('slecteditems',{
               No:this.district,
               Name:this.District
           });
        //选取市区选项之后关闭弹层
        this.showchose=false;
        this.move(e)
       },
        // 禁止滑动
        stop(e){
            var event=e
            var mo =function(){
                event.preventDefaule();
            };
            document.body.style.overflow='hidden';
            document.addEventListener('touchmove',mo,false)
        },
        // 禁止取消
        move(e){
            var mo = function(e){
                e.preventDefaule()
            };
            document.body.style.overflow='hidden';
            document.removeEventListener('touchmove'.mo,false)
        },
        _filter(add,name,code){
            let result = [];
            for(let i=0;i<add.length;i++){
                if(code==add[i].id){
                    result=add[i][name]
                }
            }
            return result
        }
    },
} 
</script>

<style lang='stylus' scoped>
body
    height 100%
    overflow hidden
    #select
        overflow hidden
        .item_line
            background-color #fff
            height 123px
            line-height 123px
            margin 0 30px
            text-align left 
            border-bottom 1px solid #e9e9e9
            font-size 30px
            img 
                float right 
                margin-top 48px
                height 23px
                margin-left 10px
            .bechoiced
                float right 
                margin-right 20px
                font-size 30px
                width 35%
                text-align right
                overflow hidden
                text-overflow ellipsis
                white-space nowrap

            
        
        .nobottom
            border-bottom none 
            .greycolocr
                color #ccc
                

</style>