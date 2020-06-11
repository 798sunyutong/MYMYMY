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
                <li class="pre_list" v-for="(item,index) in responseColumns" :key="index" :class="{'red_bg':item.show===true , 'itemHide':item.hide===true}">{{item.rename}}</li>
            </ul> 
        </div>
        <div class="buy_info">
            <!-- 咋给钱 -->
            <!-- <Two :areaArr='payColumns' selectInfo="咋给钱"  :showInfo='payChose.Name' @slecteditems='getPayChose' /> -->
           <div class="item_line">
               <span class="itemName">交费咋交</span>
               <span class="bechoiced">较至被保人年满23周岁</span>
           </div>
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
                responseColumns:[
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
        this.infoObj=Object.assign(this.infoObj,this.getByUrl);
        this.getList();//获取白名单方法
        this.productShow();//代理人是否支持此产品
        this.goInsure();//提交
        this.responseColumns.map((item)=>{
            item.show=true;
        })
        this.response=this.responseColumns[0];
        if(this.getByUrl.birth){
            this.demoDate=new Date(this.getByUrl.birth);
        }
        if(this.getByUrl.sex){
            if(this.getByUrl.sex=='F'){
                this.manChose=false;
            }else{
                this.manChose=true;
            }
        }
        if(this.infoObj.printStyle==false){
            this.ifPaperColms=[{Name:'纸质保单',No:'P'}]
        }
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
        // 保额
        checkSelAmount(){
            if(!this.sel_amount){
                this.$toast('请输入正确的基本保额')
                this.selNotice='请重新输入'
            }else if(this.sel_amount <10000 || this.sel%1000 !=0){
            this.$toast('最低1万元，以1万元整数倍递增')
            this.sel_amount='';
            this.selNotice='请重新输入';
            }else{
                this.selNotice='';
            }
            this.goInsure();
        },
        closeFlags(closeflag){
            this.closeflag=closeflags;
        },
        // 产品码JSON
        getProductCode(){
            let proDucCoddArr=[]
            if(this.responseColumns && this.responseColumns.length){
                this.responseColumns.forEach((item)=>{
                    proDucCoddArr.push(item.renum)
                })
                return proDucCoddArr
            }
        },
        // 进入时判断代理人可投保哪些险种类型
        productShow(){
            // json返回的产品码
            let producCodeArr=this.getProductCode()
            // 真正能显示的产品
            let canSealCode=[]
            this.loadingFlag=true;
            this.$ajax({
                methods:'post',
                url:'',
                params:{
                    productCode:'B54',
                    agentCode:this.infoObj.agentCode,
                }
            }).then(res=>{
                this.loadingFalg=false
                if(res.data.success=='true'){
                    // 取交集
                    for(let i=0;i<res.data.data.length;i++){
                        for(let j=0;j<producCodeArr.length;j++){
                            if(producCodeArr[j]===res.data.data[i]){
                                canSealCode.push(producCodeArr[j])
                            }
                        }
                    } 
                    for( let i=0;i<canSealCode.length;i++){
                        for(let j=0;j<this.responseColumns.length;j++){
                            if(this.responseColumns[j].renum===canSealCode[i]){
                                this.responseColumns[j].hide=false
                            }
                        }
                    }
                }else{
                    this.$toast(res.data.message)  ;
                    this.response={};
                    this.goInsure()  
                }
            })
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
            this.infoObj={
                openid:this.openid,
                yearAmount:this.yearAmount,
                insuracename:this.insuracename,
                yearChose:this.yearChose,
                payChose:this.payChose,
                manChose:this.manChose,
                manChoseHome:this.manChoseHome,
                age:this.age,
                response:this.response.renum,
                paymentMode:this.paymodeCode,
                coverageAmount:this.sel_amount,
                coverageCount:this.yearAmount,
                coveragePremium:this.wan_amount,
                planCode:'B54',
                ifPaper:this.ifPaper.No,
                Eletter:eletter,
            };
            this.infoObj=Object.assign(this.infoObj,this.getByUrl);
            this.checkInsureBrith()
        },
        // 选择被保人年龄后选择缴费方式等的校验
        checkInsureBrith(){
            if( sessionStorage.getItem('insuredBirth') &&
                sessionStorage.getItem('insured') &&
                sessionStorage.getItem('insured' != "01")){
                    if(this.infoObj.payChose&&this.infoObj.yearChose&&this.infoObj.response){
                        let insured_brith=new Date(sessionStorage.getItem('insuredBrith'));
                        if(ageNum(insured_brith)>18){
                            this.$toast('所选被保人，超出不年龄0——17岁限制')
                            return false
                        }
                    }
                }
        },
        noticeFlag(noticeFlag){
            this.showNotice=noticeFlag;
        },
        showLetter(){
            this.showNotice=true;
            this.notice2="电子信函是保单承保后为便于客户及时掌握保单得收益和状态变化，公司寄送的各类通知、最账单及报告、万能状态报告、投连状态报告、转账对账单等"
        },
        letterNotice(){
            if(this.Eletter){
                this.showNotice=true;
                this.notice2="若未勾选。客户将无法接收电子信函，请如实告知客户"
            }
            let _this=this
            setTimeout(()=>{
                _this.goInsure()
            },50)
        },
        filters:{
        },

    },

}
</script>

<style <style lang="stylus">
#YYRS
    background #f4f4f4    
    overflow hidden
    position relative
    .repons_cover
        background #f5f5f5
        overflow hidden
        .pret_person
            list-style none
            margin-bottom 15px
            border-bottom 1px solid #e9e9e9
            border-top 1px solid #e9e9e9
            overflow hidden 
            font-size 28px
            background #fff
            padding-top 30px
            padding-left 20px
            .pre_list
                padding 7px 28px
                height 75px
                line-height 64px
                margin-bottom 30px
                font-size 36px
                display inline-block
                margin-left 10px
                border 1px solid #ff5722
                border-radius 3px
                text-align center


</style>