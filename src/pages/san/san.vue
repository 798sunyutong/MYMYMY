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
            <!-- 保险期间 -->
            <div class="item_line">
                <span class="itemName">保险期间</span>
                <span class="bkline">至被保险人年满23周岁时所在保单年度结束时止</span>
            </div>
            <!-- 万能可选基本保额 -->
            <div class="item_line">
                <div class="little_up">
                    <label for="">
                         基本保额
                         <span class="amountNotice">{{selNotice}}</span>
                         <span class="yuan">元</span>
                         <input type="tel" v-model="sel_amount" maxlength="13" onkeypress="if(event.keyCode<48 || event.keyCode>57)event.returnValue=false" id="input_3" class="itemamount" placeholder="请输入" pattern="^[1-9]\d*$" @blur="checkSelAmount">
                    </label>
                </div>
                <span class="little_down">（一万元起，以一万元整数倍递增）</span>
            </div>
            <!-- 保单类型 -->
            <Two :areaArr='ifPaperColms' selectInfo="保单类型" :showInfo='ifPaper.Name' @seleteditems='getifPaper' />
            <!-- 告知函 -->
            <div class="item_line lastitem">
                <span class="itemName" @click="showLetter">
                    电子信函
                    <img class="question" src=" "/>
                </span>
                <span class="onechoiced" @click="letterNotice">
                    <wv_switch v-model="Eletter" :is_in_cell="false"></wv_switch>
                </span>
            </div>   
        </div>
         <Alert :notice2="notice2" v-if="showNotice" @noticeFlag="noticeFlag" />
        <UserFormTp :ageArr='ageArr' :infoObj='infoObj' />
        <div class="loading_div" v-if="loadingFlag">
            <loading/>
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