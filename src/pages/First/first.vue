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
	background yellow
	width 100%
	height 100%
	.header
		height 50px
		font-size 20px
		.title-bottom
			font-size 14px
	.lists
		background pink
		.list
			list-style-type none
			height 30px
			line-height 30px
			.list-item
				height 28px
				line-height 30px
				float right
				background inherit
				border 1px
				text-align right 
				margin-right 1px
				font-size 16px
				border-bottom 1px solie pink
</style>
