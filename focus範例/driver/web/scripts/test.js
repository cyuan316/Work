/**
 * @author zz_xx
 * ps:顺序界面
 * date:2012-3-7
 */

var test = new Mstar.BaseList({
	_mainDom: "#test",
	_focusClass: "sel",
	_ctrling: true,
	_pager:"#page",
	_length:4,
	_rows:4,
	_cols:1,
	_start:0,
	_end:714,
	
	show: function(){
		$("#main1").hide();
		$("#main2").show();
		$("#main3").hide();
	},
	
	hide: function(){
		numBer.hide();
		this._index = 0;
		$("#main2").hide();
	},
	
	getItems: function(p,scb){
		test._items = testData[numBer.index];
		scb && scb();
	},
	
	init: function(e,s){
		$("#Tip").find(".arrow").show();
		if(e){
			this._start = s - 1;
			this._end = e - 1;
		}
		numBer.index = this._start;
		this.onInit && this.onInit();
        this.checkCurrPage && this.checkCurrPage();
        
        $("#main1").hide();
		$("#main2").show();
		$("#main3").hide();
 
        $("#titleName").text("顺序练习");
		$("#titleNum").hide();
		$("#test_btn").hide();
        return true;
	},
	
	_drawData: function() { 
		var se = this.pinfo(); //获得i所在页的起始和结束编号
        var c = $("#test").find("li"); //获得列表的容器，$对象
        var data = this._items; //数据
        c.empty();
        var drawContent = "";
        
        drawContent += '<div>'+data['id']+'、'+data['question']+'</div>';
        drawContent += '<div class="Select"><span>A '+data['a']+'</span><span>B '+data['b']+'</span>';
        if(data['c']){
        	drawContent += '<span>C '+data['c']+'</span><span>D '+data['d']+'</span>';
        }
        drawContent += '</div><div class="img"><img src="'+data['imageurl']+'"></div><div class="clear"></div>';
        drawContent += '<div id="answer"></div>';
       
        c.html(drawContent);
        //写入页码
        $("#page").text('');
		//接受键盘控制,并绘制焦点
        if (this._ctrling) {
			Mstar.Util.Key.change(this);
			//绘制焦点
			this._drawFocus();
		}
		
		if(!data['c']){
			this._length = 2;
		}else{
			this._length = 4;
		}
		
		var self = this;
		$("#test .Select span").bind("mouseover", function(e){
			var ele = e.currentTarget;
			self._index = $(ele).index();
			self._drawFocus();
	    });
		$("#test .Select span").bind("click", function(e){
			self.enterEVT();
	    });
		
		if(numBer.index == 0||numBer.index == this._start){
			$("#upOne").hide();
			$("#nextOne").show();
		}else if(numBer.index == testData.length - 1||numBer.index == this._end){
			$("#nextOne").hide();
			$("#upOne").show();
		}else{
			$("#nextOne").show();
			$("#upOne").show();
		}
	},
	
	_drawFocus: function(){
		var c = $("#test").find(".Select span");
		c.removeClass();
		c.eq(this._index).addClass(this._focusClass);
	},
	
	enterEVT: function(){
		$("#answer").html('<div class="Detail" id="detail"><span>您的答案:'+this.changeAnswer(this._index+1+'')+'</span><span>正确答案:'+this.changeAnswer(testData[numBer.index]['ta'])+'</span> <span class="exp sel">本题解释</span></div>');
	    var self = this;
		$("#answer .exp").bind("click", function(e){
			self.yellowEVT();
	    });
	},
	
	leftEVT: function(){
		//上一题
		if(numBer.index == 0||numBer.index == this._start){
			return;
		}else{
			numBer.index -= 1;
		}
		this._index = 0;
		test.getItems(null,function(){test._drawData();});
	},
	
	rightEVT: function(){
		//下一题
		if(numBer.index == testData.length - 1||numBer.index == this._end){
			return;
		}else{
			numBer.index += 1;
		}
		test.getItems(null,function(){test._drawData();});
	},
	
	changeAnswer: function(n){
		//答案从数字编号转为具体选项
		switch(n){
			case '1':
			     return 'A';
			case '2':
			     return 'B';
			case '3':
			     return 'C';
			case '4':
			     return 'D';
		}
	},
	
	redEVT: function(){
		//重新出题
	},
	
	blueEVT: function(){
		//提交试题
	},
	
	yellowEVT: function(){
		//本题解释
		if(document.getElementById('detail')){
			tips.fatherNode = this;
		    tips.init(this._items);
		}
	},
	
	exitEVT: function(){
		//返回到上一界面
		this.hide();
		this._parentNode.init();
		this._parentNode.show();
	}
	
});