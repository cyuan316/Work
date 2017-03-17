/**
 * @author apple
 * date: 2012-3-6
 * ps:主界面控制
 */

var menu = new Mstar.BaseList({
	_mainDom: "#menu_btn",
	_focusClass: "current",
	_ctrling: true,
	_length:5,
	_rows:5,
	_cols:1,
	
	getItems: function(p,scb) {
	    scb && scb();
	},
	
	_drawData: function() { 
		if (this._ctrling) {
			Mstar.Util.Key.change(this);
			//绘制焦点
			this._drawFocus();
		}
		
		var self = this;
		$("#menu_btn li").bind("mouseover", function(e) {
			var ele = e.currentTarget;
			self._index = $(ele).index();
			self._drawFocus();
	    });
		$("#menu_btn li").bind("click", function(e) {
			self.enterEVT();
	    });
	},
	
	show: function(){
		$("#main2").hide();
		$("#main3").hide();
		$("#main1").show();
		$("#Tip").find(".arrow").hide();
	},
	
	onEnter: function(i) {
        switch(i){
        	case 0://章节
        	     chapter._parentNode = this;
        	     chapter.init();
        	     break;
        	case 1://顺序
        	     test._parentNode = this;
        	     test.init();
        	     break;
        	case 2://随机
        	     ranDomTest._parentNode = this;
        	     ranDomTest.init(715,1);
        	     break;
        	case 3://错题
        	     if(numBer.error.length){
			        error._parentNode = this;
		            error.init();
		         }else{
		            $("#Tip").hide();
		         	$("#tipsAlert").show();
		         	setTimeout(function(){$("#tipsAlert").hide();$("#Tip").show();},1000);
		         }
        	     break;
        	case 4://模拟
        	     exam._parentNode = this;
        	     exam.init();
        	     break;
        }
    }
});