<template>
  <div>
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
      // spacedel(){
      //   var str=" sdfa ere trter   erte "
      //   var str1
      //   function del(str) {
      //     if(typeof str==='string'){
      //       return str1=str.split(" ").join('')
      //     }
      //   }
      //   del(str)
      //   console.log(str1,'999999999')
      // }
       spacedel(){
        var str=" sdfa ere trter   erte "
        var str1
        function del(str) {
          if(typeof str==='string'){
            return str1=str.split(" ").join('')
          }
        }
        del(str)
        console.log(str1,'999999999')
      }
    },

}
</script>

<style>
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
</style>

