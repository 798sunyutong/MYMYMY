<template>
  <div id="seiect">
        <div class="item_line" :class="{nobottom:nobottom}" @click="showModel">
          <span class="itemName">{{selectInfo}}</span>
          <img src="" alt="">
          <span class="bachoiced" :class="{greycolocr:!showInfo}">{{showInfo?showInfo:'请选择'}}</span>
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
export default {
    data(){
        return{
            screenWidth:window.innerWidth,
            screenheight:window.innerHeight,
            showchose:false,
            zone:[],
            isbankonly:this.selectInfo=="开户银行"
        }
    },
    props:[
        selectInfo,
        showInfo,
        nobottom,
        isdisabled,
        areaArr
    ],
    watch:{
        areaArr:function(){
            this.zone=this.areaArr
        }
    },
    created(){
        this.areaArr.map(item=>{
            if(window.location.origin.split('80')[0]=='http://localhost'){
                item.imgSrc='../../../static/image/${item.No}.png'
            }else{
                item.imgSrc='./static/${item.No}.png'
            }
            this.zone.push(item)
        })
    },
    methods: {
        showModel(event){
            if(this.isdisabled){
                return
            }
            if(this.selectInfo==="交费方式" && !this.areaArr.length){
                this.$emit('showChoseWarn')
                return false
            }
            this.stop(even); 
            this.showchose=true;
        }
    },
}
</script>

<style>

</style>