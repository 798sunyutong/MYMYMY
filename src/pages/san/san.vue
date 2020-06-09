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
    name:'san',
        data() {
            return {
                insuracename:'生病了嘛？要不要去看医生' ,
                openid:'',
                postJson:{},
                response:{},
                he:'她',
                ageArr:[
                    '30天',
                    '50',
                    '55',
                    '45',
                    '50',
                    '55',
                    '45',
                    '50',
                    '55',
                    '44',
                    '48',
                    '53',
                    '41',
                    '45',
                    '49',
                    '38'
                ],
                payChose:{
                    No:23
                },//缴费方式
                yearChose:{
                    No:23
                },//保障期限，默认80
                yearAmount:'',//保额     
                wan_amount:'',//万能保费
                sel_amount:'',//万能可选基本保额
                amountPickerShow:false,
                amountNotice:'',
                wanNotice:'',//万能保费提示
                wanflag:'',
                selNotice:'',//万能可选基本保额提示
                age:0,//年纪
                selFlag:'',
                redPrices:9900,//试算保费
                protectDate:undefined,//被保人生日
                amountColumns:[
                    {
                        values:[]
                    }
                ],
                payType:{
                    //缴费频率年，月
                },
                payTypeColms:[
                    {
                        Name:'月交',
                        No:'12'
                    },
                    {
                        Name:'年交',
                        No:'01'
                    }
                ],
                ifPaper:{},
                ifPaperColms:[
                    {
                        Name:'电子保单',
                        N0:'E'
                    },
                    {
                        Name:'纸质保单',
                        No:'P'
                    }
                ],
                Eletter:true,
                firstPrices:0,
                everyPrices:0,
                responsePickerShow:true,
                manChose:true,
                manChoseHome:true,
                manChoseParent:false,
                payPickerShow:false,
                yearPickerShow:false,
                infoObj:{},
                getByUrl:{},
                paymodeCode:'00',
                //弹窗数据
                sohwPop:false,
                notice2:'',
                showNotice:false,
                loadingFalg:false,
                prenumPrice:'',
                closeflag:false,
                responseColunns:[
                    {
                        rename:'你家大宝贝',
                        renum:'B54_1',
                        show:true,
                        hide:true
                    }
                ]
            }
        },
    created(){
        document.querySelector('title').innerHTML='大宝贝';
        this.openid=getParameter('openid');
        this.getByUrl = JSON.parse(sessionStorage.getItem('getByUrl'))?JSON.parse(sessionStorage.getItem('getByUrl')):{};
        this.getList;
    },
    components:{
      Alert,
      loading,
      UserFormTp,
      FormSelect  
    },
    methods:{
        // 获取白名单，判断是否可月交
        getList(){
            this.loadingFlag=true
            this.$ajax({
                methods:'post',
                url:'',
                params:{
                    productCode:'B54',
                    agentCode:this.infoObj.agentCode
                }
            }).then(res=>{
                this.loadingFalg=false
                if(res.data.success=='true'){
                    if(res.data.data=='true'){
                        this.payTypeColms=[
                            {
                                Name:'月交',
                                No:'12'
                            },
                            {
                                Name:'年交',
                                No:'01'
                            }
                        ]}else{
                            this.payTypeColms=[
                                {
                                    Name:'年交',
                                    No:'01'   
                                }
                            ]
                        }
                }else{
                    this.payTypeColms=[
                        {
                            Name:'年交',
                            No:'01'   
                        }
                    ]
                }
            })
        },
        parentChose(){
            this.manChoseParent=!this.manChoseParent;
            if(this.manChoseParent){
                this.he='他'
            }else{
                this.he='她'
                }    
        },        
        openPicker(ref){
            this.$refs[ref].open();
        },
        confirmDate(picker){
            this.pickerValue=picker.getValues()
        },
        // 日期提交
        onConfirm(value){
            this.dataChangFlag=true;
            let message='';
            if(value!==null && typeof value==='object'){
                let year=value.getFullYear();
                let month=value.getMonth()+1;
                let date=value.getDate();
                let hour=value.getHours();
                let minute=value.getMinutes();
                message=`${year}-${month}-${date} ${hour}:${minute}`
            }else{
                message=value;
            }   
        },
        // 获取多长时间交一次
        getpayType(){
           this.payType=slecteditems;
           if(this.payChose.No && this.responsePickerShow.renum && this.yearAmount){
               this.checkresponsibility();
               this.goInsure();//提交
           }
           this.goInsure();
        },
        // 保单类型
        getifPaper(slecteditems){
            this.ifPaper=slecteditems;
            this.goInsure();
        },
        // 提交
        goInsure(){
            if(this.payChose.No=='1'){
                this.paymodeCode='00'
            }else{
                this.paymodeCode= this.payType.No
            }
            let eletter
            if(this.Eletter){
                eletter='1'
            }else{
               eletter='0 ' 
            }
        },
    },

}
</script>

<style>

</style>