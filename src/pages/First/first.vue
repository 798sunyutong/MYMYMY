<template>
     <div id="all">
        <div class="header">
            <div class="title-top">
                请完善个人信息
            </div>
            <div class="title-bottom">
                关于个人信息部分请完善填写
            </div>
        </div>
        <div class="lists">
			<div class="list">
				<span>姓名</span>
				<input placeholder="被保人姓名" type="text" class="list-item">
			</div>
			<div class="list">
				<span>身份证号码</span>
				<input placeholder="被保人身份证号码" type="text" class="list-item">
			</div>
			<div class="list">
				<span>身份证长期有效</span>
				<span class="list-item"><wv-icon type="success"></wv-icon><wv-icon type="circle"></wv-icon>否</span>
				<span class="list-item"><wv-icon type="suc cess"></wv-icon><wv-icon type="circle"></wv-icon>是</span>
			</div>
			<div class="list">
				<span>出生日期</span>
				<input placeholder="被保人出生日期" type="text" class="list-item">
			</div>
			<div class="list">
				<span>所在地区</span>	
				<img class="list-item" src="/static/image/箭头.png">
				<input placeholder="请选择" class="list-item" readonly="readonly">				
			</div>
			<div class="list">
				<span>详细地址</span>
				<input placeholder="被保人详细地址" type="text" class="list-item">
			</div>
			<div class="list">
				<span>电话号码</span>
				<input placeholder="被保人手机号码" type="text" class="list-item">
			</div>
			<div class="list">
				<span>电子邮箱</span>
				<input placeholder="被保人电子邮箱" type="text" class="list-item">
			</div>
			<div class="list">
				<span>职业</span>
				<img class="list-item" src="/static/image/箭头.png">
				<input placeholder="请选择" class="list-item" readonly="readonly">	
			</div>
			<div class="list">
				<span>身高（厘米）</span>
				<input placeholder="被保人身高" type="text" class="list-item">
			</div>
			<div class="list">
				<span>体重（公斤）</span>
				<input placeholder="被保人体重" type="text" class="list-item">
			</div>
			<div class="list">
				<span>有年收入</span>
				<span class="list-item"><wv-icon type="success"></wv-icon><wv-icon type="circle"></wv-icon>否</span>
				<span class="list-item"><wv-icon type="success"></wv-icon><wv-icon type="circle"></wv-icon>是</span>
			</div>
			<div class="list">
				<span>年收入（万）</span>
				<input placeholder="请输入" type="text" class="list-item">
			</div>
        </div>
    </div> 
</template>
<script> 
export default {
  name: 'first',
  data () {  
  }
   
}
</script>
<style lang="stylus" scoped>
#all
	padding 5px
	.header
		height 50px
		font-size 20px
		border-bottom 1px solid #D5D5D5
		padding-bottom 10px
		.title-bottom
			font-size 14px
	.lists
		.list
			list-style-type none
			height 30px
			line-height 30px
			border-bottom 1px solid #D5D5D5
			.list-item
				height 28px
				line-height 30px
				float right
				// background inherit
				border 1px
				text-align right 
				margin-right 1px
				font-size 16px
				outline none
</style>
