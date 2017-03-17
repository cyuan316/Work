/**
 * @author zz_xx
 * ps:提示，本题解释
 * date:2012-3-15
 */

var tips = {
	mainDom: $("#lightbox"),
	fatherNode: null,
	index: 0,
	focusClass: 'current',
	
	init: function(data){
		$("#scoreTip").hide();
		this.drawData(data);
		this.show();
		Mstar.Util.Key.change(this);
	},
	
	show: function(){
		this.mainDom.show();
	},
	
	showScore: function(){
		//得分显示
		if(numBer.score() > 90){
			$("#scoreTip").text("您的得分为"+numBer.score()+"，亲~你好棒！");
		}else if(numBer.score() > 60){
			$("#scoreTip").text("您的得分为"+numBer.score()+"，亲~你需要加油哦！");
		}else if(numBer.score() > 10){
			$("#scoreTip").text("您的得分为"+numBer.score()+"，亲~你~~哎……");
		}else{
			$("#scoreTip").text("您的得分为"+numBer.score()+"，亲~你~~已经无敌了……");
		}
		$(".btn2_ul").html('<li>退出</li><li>错题回看</li><li>重新开始</li>');
		
		var self = this;
		$(".btn2_ul li").bind("mouseover", function(e) {
			var ele = e.currentTarget;
			self._index = $(ele).index();
			self._drawFocus();
	    });
		$(".btn2_ul li").bind("click", function(e) {
			self.enterEVT();
	    });
	    
		$("#scoreTip").show();
		this.mainDom.show();
		this.drawFocus();
		Mstar.Util.Key.change(this);
	},
	
	drawData: function(data){
		//填充数据
		this.mainDom.find(".topTipsText").html('<h3>题目：'+data['question']+'</h3>网友参考解释（不可全信哦亲~具体请参见答案）：'+data['bestanswer']);
		$(".btn2_ul").html('<li>退出</li>');
		var self = this;
		$(".btn2_ul li").bind("click", function(e) {
			self.enterEVT();
	    });
		this.drawFocus();
	},
	
	drawFocus: function(){
		//焦点
		$(".btn2_ul").find('li').removeClass();
		$(".btn2_ul").find("li").eq(this.index).addClass("current");
	},
	
	hide: function(){
		this.mainDom.hide();
		if(this.fatherNode){
			Mstar.Util.Key.change(this.fatherNode);
		}
		this.fatherNode = null;
		this.index = 0;
		$("#scoreTip").hide();
	},
	
	keyPress: function(e){
		switch(e){
			case keyCodeArr.left:
			     this.index = this.index == 0? ($(".btn2_ul").find("li").size() - 1):(this.index - 1);
			     this.drawFocus();
			     break;
			case keyCodeArr.right:
			     this.index = this.index == ($(".btn2_ul").find("li").size() - 1)? 0:(this.index + 1);
			     this.drawFocus();
			     break;
			case keyCodeArr.exit:
			     this.hide();
			     break;
		    case keyCodeArr.enter:
		         this.enterEVT();
			     break;
		}
	},
	
	enterEVT: function(){
		if(this.index == 0){
		   if(this.fatherNode == exam){
		         this.hide();
		         exam.exitEVT();
		   }else{
		         this.hide();
		   }
		}else if(this.index == 1){
		   //错题回顾
		   this.hide();
		   exam.hide();
		   error._parentNode = this;
		   error.init();
		}else{
		   //重新开始
		   this.hide();
		   exam.redEVT();
		}
	}
	
};
