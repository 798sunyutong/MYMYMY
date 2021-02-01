<template>
  <div class="day">
      <div id="hd">
        每日一练
      </div>
      <!-- 圣杯布局 -->
      <div id="bd">
        <div id="middle">
          圣杯布局middle
        </div>
        <div id="left">
          left
        </div>
        <div id="right">
          right
        </div>
      </div>
      <!-- 双飞翼布局 -->
      <div class="middles">
        <div class="content">双飞翼布局</div>
      </div>
      <div class="lefts">左</div>
      <div class="rights">右</div>
      <div>
       <button @click="jsdigui()"> 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值</button>
      </div>
      <button @click="spacedel()">写一个方法去掉字符串中的空格</button>
      <button @click="laststringdel()">去除字符串中最后一个指定的字符</button>
      <button @click="changename()">写一个方法把下划线命名转成大驼峰命名</button>
      <button @click="changeMaxMin()">写一个把字符串大小写切换的方法</button>
      <button @click="deltabANDline()">写一个去除制表符和换行符的方法</button>
      <div class="San">
        <span>用css创建一个三角形，并简述原理</span>
        <span>原理</span>
        <div class="SJX"></div>
      </div>
      <label>看看有啥意思</label>
      <button @click="statistics()">统计某一字符或字符串在另一个字符串中出现的次数</button>
      <button @click="strencrypt()">写一个加*字符串的方法</button>
      <button @click="encryptCode()">写一个加密字符串的方法(可以编解码传给后台的那种)</button>
      <button @click="stypeof()">写一个判断数据类型的方法</button>
      <button @click="Mainfunction(callback)">简要描述下什么是回调函数并写一个例子出来</button>
  </div>
</template>

<script>
export default {
    name:'Dailypractice',
    data() {
      return {
        
      }
    },
    methods: {
      //用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值<
      jsdigui(){
        // debugger
        //定义一个长度为5的随机数组
        var arr = new Array(5)
        //定义一个计数器
        var i=0
        //获取范围内的随机数
        var num=getrandoman()
        //调用函数
        randomarr(arr,num)
        //获取随机数
        function getrandoman() {
          //*30，是为了得到最大的数是30
          return Math.floor(Math.random()*30)+2
        }
        //处理规则的函数
        function randomarr(arr,num){
          if(arr.indexOf(num)<0){//判断当前随机数是不是重复存在于数组中
            arr[i]=num//如果没有，将变量放在数组中
            i++
          }else{
            num=getrandoman()//如果有，重新获取随机数
          }
          if(i==arr.length){//当获取到符合要求的数字达到数组的长度，就停止调用
            return
          }else{
            randomarr(arr,num)//否则继续调用
          }
        }
        console.log(i,arr)
      },
      //写一个方法去掉字符串中的空格
      spacedel(){
        var str=" sdfa ere trter   erte "
        var str1
        function del(str) {
          if(typeof str==='string'){
            return str1=str.split(" ").join('')
          }
        }
        del(str)
        console.log(str1,'写一个方法去掉字符串中的空格')
      },
      //去除字符串中最后一个指定的字符
       laststringdel(){
        var str="abcdefkkkkltlltl"
        if(typeof str==='string'){
          let del=str.lastIndexOf('t')//del返回的是字符'f',所在的下标
          let str1 = str.substring(0, del) + str.substring(del + 1, str.length)//substring() 方法用于提取字符串中介于两个指定下标之间的字符。
          console.log(del,str1,'去除字符串中最后一个指定的字符')
        }
      },
      //写一个方法把下划线命名转成大驼峰命名
      changename(name) {
        let arr = name.split("");//把一个字符串分割成字符串数组。
        arr.map((item,index)=>{
            if(item=='-'){
                arr.splice(index,1);//splice把index的字符去掉
                arr[index]=arr[index].toUpperCase()//把index的字符转成大写字母
            }
        })
        arr.join('')//把数组中的所有元素放入一个字符串
        console.log("%cparams","color:red",  arr.join(''))
      },
      //写一个把字符串大小写切换的方法
      changeMaxMin(){
        var str='324asshaASDKHKJhaihASHKHkuikjk4234'
        let Str=str.split('')
        for(var i=0;i<Str.length;i++){
          if(Str[i].toUpperCase()==Str[i]){
            Str[i]=Str[i].toLowerCase()
          }else if(Str[i].toLowerCase()==Str[i]){
            Str[i]=Str[i].toUpperCase()
          }else{
            Str[i]=Str[i]
          }
          Str.join('')
        }
        console.log("%cparams","color:red",Str.join(''))
      },
      //写一个去除制表符和换行符的方法
      deltabANDline(){
        var str='sdfa\tsef\ndfdsd\rfsadf'
        console.log(str)
        var Str
       Str=str.replace(/[\r\t\n]/g,"")
        console.log("%cparams","color:red",Str)
      },
      //统计某一字符或字符串在另一个字符串中出现的次数
      statistics(){
        let str='sdjsdjdjdjdjdjddddddjjsjjjdj'
        console.log(str.split('sdj'))
        let str1=(str.split('sdj')).length-1
        let str2='j'
        console.log("%cparams","color:red", str1)
      },
      //写一个加密字符串的方法
      strencrypt(){
        let str='sdkijkjm'
        let Str=str.split('')
        let tempy=[]
        for(let i=0;i<Str.length;i++){
          if(typeof Str[i]=='string'){
            tempy[i]='*'
          }
        }
        this.jm=tempy.join('') 
        console.log(str, this.jm)
      },
      //写一个加密字符串的方法(可以编解码传给后台的那种)
      encryptCode(){
        var str='woshixiaokeai90'
        var estr=''
        for(let i=0;i<str.length;i++){
          estr+=str.charCodeAt(i)
          estr+=','
        }
        console.log("%cparams","color:red", str,estr)
      },
      //写一个判断数据类型的方法
      stypeof(){
        var str1='wewewe'
        var num=12
        var arr=[2,4,6,8,1]
        //去掉[object]的正则，\w 单词字符(字母、数字、下划线)，+ 至少出现一次，[]	同样表示或者的意思[abc],匹配a, b ,c中任意一个
        // ()小括号表示匹配括号中全部字符
        // [标记一个中括号表达式的开始。要匹配 [，请使用 \[。
        // \转义字符 如上基本符号匹配都需要转义字符   如 \*  表示匹配*号
        let reg=/\[object (\w+)\]/
        //获取传入的[object ]类型
        let type=Object.prototype.toString.call(arr)
        //利用.match方法，查找字符中指定的值，用于匹配正则。
        let res=type.match(reg)
        //返回的是一个数组，第一个是整个字符串，第二个是匹配规则的的类型
        console.log(res && res[1].toLowerCase())
      },
      //简要描述下什么是回调函数并写一个例子出来
      Mainfunction(callback){
        callback()
        console.log('我是主函数')
      },
       //回调函数
      callback(){
        setTimeout("console.log('我是回调函数')", 300);
      },
    },
    mounted(){
      this.changename('-aa-bb-cc')
      //定义主函数，回调函数作为参数
      this.Mainfunction(this.callback)
    }
}
</script>

<style>
.day{
  padding: 50px 50px;
}
#hd{
		height: 50px;
		background: #666;
		text-align: center;
	}
#bd{
		 /*左右栏通过添加负的margin放到正确的位置了，此段代码是为了摆正中间栏的位置*/
		padding:0 80px 0 100px;
		height:100px;
	}
	#middle{
		float: left;
		width: 100%;
		height: 100px;
		background: blue;
	}
	#left{
		float: left;
		width: 100px;
		height: 100px;
		margin-left: -100%;
		background: #0c9;
		/*中间栏的位置摆正之后，左栏的位置也相应右移，通过相对定位的left恢复到正确位置*/
		position:relative;
		left:-100px;
	}
	#right{
		float: left;
		width: 80px;
		height: 100px;
		margin-left: -80px;
		background: #0c9;
		position: relative;
		right: -80px;
	}
  .middles{
    float: left;
    width: 100%;
    height: 200px;
    background-color: yellow;
  }
  .content{
    margin: 0 60px 0 120px;
    height: 100%;
  }
  .lefts{
    float: left;
    width: 120px;
    height: 200px;
    background-color: pink;
    margin-left: -100%;
  }
  .rights{
    float: left;
    width: 60px;
    height: 200px;
    background-color: pink;
    margin-left: -60px;
  }
  .San{
    width: 200px;
    height: 200px;
    background-color: gray;
    color: cornsilk;
  }
  .SJX{
    width: 0px;
    height: 0px;
    border-top: 100px solid blue;
    /* border-left: 100px solid pink;
    border-right: 100px solid yellow;
    border-bottom: 100px  solid red; */
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;

  }
</style>

