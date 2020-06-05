<template>
  <div id="YYRS">
      <!-- 投保信息 -->
      <!-- 保险责任 -->
        <div class="item_line selinfo" @click="responsePickerShow = !responsePickerShow">
            <sapn class="itemName red_words">保险责任 </sapn>
            <img src="" v-if="!responsePickerShow" @click="responsePickerShow = !responsePickerShow" alt="">
            <img src="" v-else @click="responsePickerShow=!responsePickerShow" alt="">
            <span class="bechoiced" :class="{greycolor:!response.rename}">{{responseColumns[0].rename}}</span>
        </div>
        <div class="repons_cover" v-show="responsePickerShow">
            <ul class="pret_person">
                <li class="pre_list" v-for="(item,index) in responseColumns" :key="index" :class="{'red_bg':item.show===true}">{{item_rename}}</li>
            </ul> 
        </div>
        <div class="buy_info">
            <!-- 咋给钱 -->
            <Two :areaArr='payColumns' selectInfo="咋给钱"  :showInfo='payChose.Name' @slecteditems='getPayChose' />
            <!-- 多长时间交一次 -->
            <div v-if="payChose.No != '1'&& payChose.No">
                <Two :areaArr='payTypeColms' selectInfo="多长时间交一次钱" :showInfo='payType.Name' @slecteditems='getPayType'/>
            </div>
            
        </div>
  </div>
</template>

<script>
import Two from '../Two'
export default {

}
</script>

<style>

</style>