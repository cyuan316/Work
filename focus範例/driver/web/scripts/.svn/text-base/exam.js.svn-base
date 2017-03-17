/**
 * @author zz_xx
 * ps:模拟测试
 * date:2012-3-15
 */

var exam = new Mstar.BaseList({
	_mainDom: "#test",
	_focusClass: "sel",
	_ctrling: true,
	_length:4,
	_rows:4,
	_cols:1,
	
	show: function(){
		$("#main1").hide();
		$("#main2").show();
		$("#main3").hide();
	},
	
	hide: function(){
		numBer.hide();
		time.hide();
		this._index = 0;
		$("#main2").hide();
		$("#test_btn").find(".blue").hide();
	},
	
	getItems: function(p,scb){
		if(!numBer._list[numBer.index]){
			numBer.ranDom(714,0);
		}
		exam._items = testData[numBer._list[numBer.index]];
		scb && scb();
	},
	
	init: function(){
		$("#Tip").find(".arrow").show();
		this.onInit && this.onInit();
        this.checkCurrPage && this.checkCurrPage();
        
        $("#main1").hide();
		$("#main2").show();
		$("#main3").hide();
 
        $("#titleName").text("模拟考试");
		$("#titleNum").show();
		$("#test_btn").show();
		time.init();
        return true;
	},
	
	_drawData: function() { 
		var se = this.pinfo(); //获得i所在页的起始和结束编号
        var c = $("#test").find("li"); //获得列表的容器，$对象
        var data = this._items; //数据
        c.empty();
        var drawContent = "";
        
        drawContent += '<div>'+(numBer.index+1)+'、'+data['question']+'</div>';
        drawContent += '<div class="Select"><span>A '+data['a']+'</span><span>B '+data['b']+'</span>';
        if(data['c']){
        	drawContent += '<span>C '+data['c']+'</span><span>D '+data['d']+'</span>';
        }
        drawContent += '</div><div class="img"><img src="'+data['imageurl']+'"></div><div class="clear"></div>';
        drawContent += '<div id="answer"></div>';
       
        c.html(drawContent);
        //写入页码
        $("#page").text('第'+(numBer.index+1)+'题/100题');
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
		
		if(numBer.index == 0){
			$("#upOne").hide();
			$("#nextOne").show();
		}else if(numBer.index == 99){
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
		//如果在模拟测试的情况下~确定本题，跳到下一题
		if(numBer.result[numBer.index]){
			numBer.result[numBer.index] = this._index+1;
		}else{
			numBer.result.push(this._index+1);
		}
		
		if(numBer.index == 99){
			//满了100题,中止考试，提交答案
			$("#test_btn").find(".blue").show();
			return;	
		}
		numBer.index ++;
		this._index = 0;	
		exam.getItems(null,function(){exam._drawData();});
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
		numBer.index = 0;
		this._index = 0;
		numBer.result = [];
		time.hide();
		time.init();
		exam.getItems(null,function(){exam._drawData();});
	},
	
	blueEVT: function(){
		//提交试题
		if(numBer.result.length == 100){
			tips.fatherNode = this;
		    tips.showScore();
		}
	},
	
	exitEVT: function(){
		//返回到上一界面
		this.hide();
		this._parentNode.init();
		this._parentNode.show();
	},
	
	leftEVT: function(){
		//上一题
		if(numBer.index == 0){
			return;
		}
		if(numBer.result[numBer.index]){
			numBer.result[numBer.index] = this._index+1;
		}else{
			numBer.result.push(this._index+1);
		}
		
		numBer.index -= 1;
		this._index = 0;
		exam._items = testData[numBer._list[numBer.index]];
		exam._drawData();
	},
	
	rightEVT: function(){
		//下一题
		if(numBer.index == 99){
			return;
		}
			
		if(numBer.result[numBer.index]){
			numBer.result[numBer.index] = this._index+1;
		}else{
			numBer.result.push(this._index+1);
		}	
			
		numBer.index += 1;
		this._index = 0;
		exam.getItems(null,function(){exam._drawData();}); 
	}
});