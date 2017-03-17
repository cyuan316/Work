/**
 * @author zz_xx
 * ps:倒计时js
 * date:2012-3-7
 */

var time = {
	iTime : 0,//45分钟,s单位
	iMinute : 0,//显示的分钟
	iSecond : 0,//显示的秒数
	remain : null,//定时器
	
	account : function(){
		if(this.iTime >= 0){
			this.iMinute = parseInt((this.iTime/60)%60);
	        this.iSecond = parseInt(this.iTime%60);
	        this.iMinute = this.iMinute > 9?this.iMinute : '0'+this.iMinute;
	        this.iSecond = this.iSecond > 9?this.iSecond : '0'+this.iSecond;
	        $("#time").text("剩余时间："+this.iMinute+":"+this.iSecond);
	        
	        if(!this.iTime){
				time.remain && clearTimeout(time.remain);//取消定时器
			}else{
				this.remain = setTimeout(function(){
					time.account();
				},1000);
			}
			this.iTime -= 1;
		}else{
			//倒计时结束提醒
			time.hide();
			exam.blueEVT();
		}
	},
	
    init : function(){
    	$("#time").show();
    	this.iTime = 2700;
    	this.account();
    },
    
    hide : function(){
    	$("#time").hide();
    	time.remain && clearTimeout(time.remain);//取消定时器
    }
};
