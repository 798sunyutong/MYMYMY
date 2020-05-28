<template >
<div id="box">
		<h1 v-if='flag'>我已经限制长度了,放弃吧</h1>
		<h1 v-if='flag'><button @click='shutDown'>关闭</button></h1>
		<input type="text" v-model='inputVal'>
		
		{{inputVal | toChies}}
		<!--过滤器-->
	</div>	
</template>
	<script>
	export default {
        components: {
            //Editor
        },
        data() {
            return {inputVal:''}
        },
        filters: { //局部过滤器
            toChies: function(amount) { //形参
                // 汉字的数字
                const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
                // 基本单位
                const cnIntRadice = ["", "拾", "佰", "仟"];
                // 对应整数部分扩展单位
                const cnIntUnits = ["", "万", "亿", "兆"];
                // 对应小数部分单位
                const cnDecUnits = ["角", "分"];
                // 整数金额时后面跟的字符
                const cnInteger = "整";
                // 整型完以后的单位
                const cnIntLast = "元";
                // 最大处理的数字
                const maxNum = 9999999999999999.99;
                // 金额整数部分
                let integerNum;
                // 金额小数部分
                let decimalNum;
                // 输出的中文金额字符串
                let chineseStr = "";
                // 分离金额后用的数组，预定义
                let parts;
                if (amount === "") {
                    return "";
                }
                if(isNaN(amount)){
                    return "不为数字"
                }
                amount = parseFloat(amount);
                if (amount >= maxNum) {
                    // 超出最大处理数字
                    return "";
                }
                if (amount === 0) {
                    chineseStr = cnNums[0] + cnIntLast + cnInteger;
                    return chineseStr;
                }
                // 转换为字符串
                amount = amount.toString();
                if (amount.indexOf(".") === -1) {
                    integerNum = amount;

                    decimalNum = "";
                } else {
                    parts = amount.split(".");
                    integerNum = parts[0];
                    decimalNum = parts[1].substr(0, 4);
                }
                // 获取整型部分转换
                if (parseInt(integerNum, 10) > 0) {
                    let zeroCount = 0;
                    const IntLen = integerNum.length;
                    for (let i = 0; i < IntLen; i++) {
                        const n = integerNum.substr(i, 1);
                        const p = IntLen - i - 1;
                        const q = p / 4;
                        const m = p % 4;
                        if (n === "0") {
                            zeroCount++;
                        } else {
                            if (zeroCount > 0) {
                                chineseStr += cnNums[0];
                            }
                            // 归零
                            zeroCount = 0;
                            //alert(cnNums[parseInt(n)])
                            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                        }
                        if (m === 0 && zeroCount < 4) {
                            chineseStr += cnIntUnits[q];
                        }
                    }
                    chineseStr += cnIntLast;
                }
                // 小数部分
                if (decimalNum !== "") {
                    var decLen = decimalNum.length;
                    if(decLen < 2){
                        for (let i = 0; i < decLen; i++) {
                            const n = decimalNum.substr(i, 1);
                            if (n !== "0") {
                                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                            }
                        }
                    }else{
                      decLen = 2;
                      for (let i = 0; i < 2; i++) {
                            const n = decimalNum.substr(i, 1);
                            if (n !== "0") {
                                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                            }
                        }
                    }
                }
                if (chineseStr === "") {
                    chineseStr += cnNums[0] + cnIntLast + cnInteger;
                } else if (decimalNum === "") {
                    chineseStr += cnInteger;
                }
                return chineseStr;
            }
        },
　　　//计算金额总和保留小数点两位
         computed: {
         　　addtotal() {
　　　　　　　　let total = 0;
　　　　　　　　let totalSmall = this.infoData.detail
　　　　　　　　totalSmall.map((item) => {
　　　　　　　　　　if (item.amount == '') {
　　　　　　　　　　　　item.amount = 0;
　　　　　　　　　　}
　　　　　　　　　　total += Number(item.amount)
　　　　　　　　})
　　　　　　　　return total.toFixed(2)//四舍五入保留两位
　　　　　　}
　　　　},
}    
	</script>