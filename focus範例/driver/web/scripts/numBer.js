/**
 * @author zz_xx
 * ps:仅用于记录测试时各种数据
 */

var numBer = {
	index : 0,//第几题
	result : [],//答案保存
	_list : [],//保存题号
	error : [],//错误题号
	
	hide: function(){
		this.index = 0;
		this._test = false;
		this.result = [];
		this._list = [];
		this.err0r = [];
	},
	
	ranDom: function(count,begin){
		var tmp = Math.floor(Math.random()*(count-begin)) + begin;
		for(var i=0;i<this._list.length;i++){
			if(tmp == this._list[i]){
				numBer.ranDom(count,begin);
				return;
			}
		}
		console.log(tmp+"|"+count+"|"+begin);
		numBer._list[numBer.index] = tmp;
	},
	 
	score: function(){
		//得分
		var j = 0;
		for(var i=0;i<100;i++){
			if(numBer.result[i]){
				if(numBer.result[i] == testData[numBer._list[i]]['ta']){
					j++;
				}else{
					numBer.error.push(numBer._list[i]);
				}
			}
		}
		return j;
	}
};
