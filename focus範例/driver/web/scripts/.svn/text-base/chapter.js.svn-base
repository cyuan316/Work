/**
 * @author zz_xx
 * ps: 章节练习
 * date: 2012-3-6
 */
var data = [{
		"title" : '1、道路交通安全法律、法规和规章',"id" : 0,"start" : 1,"end" : 186},{
		"title" : '2、交通信号及其含义',"id" : 1,"start" : 186,"end" : 344},{
		"title" : '3、安全行车、文明驾驶知识',"id" : 2,"start" : 344,"end" : 503},{
		"title" : '4、高速公路、山区道路、桥梁、隧道、夜间、恶劣气象和复杂条件下驾驶知识',"id" : 3,"start" : 503,"end" : 581},{
		"title" : '5、出现爆胎、转向失控、制动失灵等紧急情况时临危处置知识',"id" : 4,"start" : 581,"end" : 664},{
		"title" : '6、机动车总体构造和主要安全装置常识，日常检查和维护基本知识',"id" : 5,"start" : 664,"end" : 702},{
		"title" : '7、发生交通事故后的自救、急救等基本知识，以及常见危险化学品等知识',"id" : 6,"start" : 702,"end" : 726
}];


var chapter = new Mstar.BaseList({
	_mainDom: "#chapter",
	_focusClass: "current",
	_showLi: '<li><div class="f_left tm">{title}</div><div class="f_right btn3"><span>顺序练习</span><span>随机练习</span></div></li>',
	_ctrling: true,
	_length: 7,
	_cols: 1,
	_rows: 7, 
	_no: 0,//当前选中的第几个按钮
	
	getItems: function(p,scb) {
		this._items = data;
	    scb && scb();
	},
	
	show: function(){
		$("#main1").hide();
		$("#main2").hide();
		$("#main3").show();
	},
	
	hide: function(){
		this._index = 0;
		this._no = 0;
		$("#main3").hide();
		if (this._parentNode) {
			Mstar.Util.Key.change(this._parentNode);
		} else {
			Mstar.Util.Key.unbind(this);
		}
	},
	
	init: function(){
		$("#Tip").find(".arrow").hide();
		this.onInit && this.onInit();
        this.checkCurrPage && this.checkCurrPage();
        
        this.addClick();
        
        $("#main1").hide();
		$("#main2").hide();
		$("#main3").show();
        return true;
	},
	
	addClick: function(){
		var self = this;
	    $("#chapter li").bind("mouseover", function(e) {
			var ele = e.currentTarget;
			self._index= $(ele).index();
	    });
	    $("#chapter li span").bind("mouseover", function(e) {
			var ele = e.currentTarget;
			self._no = $(ele).index();
			self._drawFocus();
	    });
		$("#chapter li span").bind("click", function(e) {
			self.enterEVT();
	    });
	},
	
	_drawFocus: function() {
            var items;
            if (this._mainDom && (items = this._mainDom.find("li")).length) {
				var i = this.i2pi().i;
                items.find(".btn3 span").filter("."+this._focusClass).removeClass(this._focusClass);
                items.eq(i).find(".btn3 span").eq(this._no).addClass(this._focusClass);
            }
    },
    
    rightEVT: function(){
    	if(this._no == 1){
    		this._no = 0;
    	}else{
    		this._no = 1;
    	}
    	this._drawFocus();
    },
    
    leftEVT: function(){
    	if(this._no == 0){
    		this._no = 1;
    	}else{
    		this._no = 0;
    	}
    	this._drawFocus();
    },
    
    enterEVT: function(){
    	$("#main3").hide();
    	//进入试题界面
    	if(this._no == 0){
    		//顺序练习
    		test._parentNode = this;
        	test.init(this._items[this._index]['end'],this._items[this._index]['start']);
    	}else{
    		//随机练习
    		ranDomTest._parentNode = this;
        	ranDomTest.init(this._items[this._index]['end'],this._items[this._index]['start']);
    	}
    },
    
    exitEVT: function(){
    	this.hide();
    	this._parentNode.show();
    }

});