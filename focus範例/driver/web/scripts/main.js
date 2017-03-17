/**
 * @author zz_xx
 * date : 2012-3-6
 * ps:主入口JS
 */

$(function(){
	Mstar.Util.Key.init();
	
	Mstar.Util.log("***author 代码写到一半被自己不小心全部删掉的悲剧ZX*********");
	Mstar.Util.log("*****************date  2012-3-6**************************");
	Mstar.Util.log("****************qiyezx@gmail.com*************************");
	
	menu.init();
	
	addMouse();
});

function addMouse(){
	$("#nextOne").bind("click", function(e) {
		var a = {
			keyCode:keyCodeArr.right
		};
		Mstar.Util.Key.keyFunc(a);
	});
	$("#upOne").bind("click", function(e) {
		var a = {
			keyCode:keyCodeArr.left
		};
		Mstar.Util.Key.keyFunc(a);
	});
	$("#Tip .OK").bind("click", function(e) {
		var a = {
			keyCode:keyCodeArr.enter
		};
		Mstar.Util.Key.keyFunc(a);
	});
	$("#Tip .Return").bind("click", function(e) {
		var a = {
			keyCode:keyCodeArr.exit
		};
		Mstar.Util.Key.keyFunc(a);
	});
	$("#test_btn .blue").bind("click", function(e) {
		var a = {
			keyCode:keyCodeArr.blue
		};
		Mstar.Util.Key.keyFunc(a);
	});
	$("#test_btn .red").bind("click", function(e) {
		var a = {
			keyCode:keyCodeArr.red
		};
		Mstar.Util.Key.keyFunc(a);
	});
}
