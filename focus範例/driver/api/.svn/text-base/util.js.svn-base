(function(){
	var isOWB = /.*HBBTV.*/i.test(navigator.userAgent) ? true : false;
    var isChrome = /.*chrome.*/i.test(navigator.userAgent) ? true : false;
    var isIE = /.*MSIE.*/i.test(navigator.userAgent) ? true : false;
	
	/**
	 * @class Mstar.Util
	 * 工具类.提供打印,字符转换,加密算法等方法
	 * @singleton
	 * @author allen sun
	 * @version 1.0.1
	 */
	Mstar.Util = {
		/**
         * 判定运行环境是否为owb
         * @public
<pre><code>
if(common.isOWB){
	alert("现在运行在OWB上");
}
</code></pre>
         */
        isOWB: isOWB,
		
        /**
         * 判定运行环境是否为Chrome
         * @public
<pre><code>
if(common.isChrome){
	alert("现在运行在Chrome上");
}
</code></pre>
         */
        isChrome: isChrome,
		
        /**
         * 判定运行环境是否为IE
         * @public
<pre><code>
if(common.isChrome){
	alert("现在运行在IE上");
}
</code></pre>
         */
        isIE: isIE,
		
		/**
         * 默认键码组
         * @public
         */
		defaultKeyCodeArr: {
            //PC
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40,
            'enter': 13,
            'num0': 48,
            'num1': 49,
            'num2': 50,
            'num3': 51,
            'num4': 52,
            'num5': 53,
            'num6': 54,
            'num7': 55,
            'num8': 56,
            'num9': 57,
            'exit': 27,
            'fastplay': 101,
            'fastback': 98,
            'menu': 109,
            'pageUp': 33,
            'pageDn': 34,
            'volUp': 187,
            'volDn': 189,
            'play': 80,
            'pause': 32,
            'stop': 83,
            'playNext': 190,
            'playPrev': 188,
            'mute': 77,
            'red': 82,
            'green': 71,
            'yellow': 89,
            'blue': 66
        },
		
        /**
         * 按键码数组,自动适应owb
         * @public
         */
        OWBkeyCodeArr: {'exit': 74,'fastplay': 69,'fastback': 66,'menu': 77,'volUp': 107,'volDn': 109,'play': 76,'pause': 19,'stop': 79,'playNext': 78,'playPrev': 86,'mute': 85,'red': 112,'green': 113,'yellow': 114,'blue': 115},
		
        /**
         * 是否允许common.log打印
         * @public
<pre><code>
//关闭通过common.log打印的数据
common.logable = false
</code></pre>
         */
        logable: true,
		
        /**
         * 通用打印。<br/>
         * 可以打印object, number, string, boolean, function, null类型的数据。<br/>
         * 在OWB中会自动以alert()方法输出，object会转换成字符串，无法打印循环引用的object。<br/>
         * 在chrome中会以console.log方法输出。<br/>
<pre><code>
common.log({
	a: {
		b: 1,
		c: 2
	}
}, "string", 314, true, function(){
}, null);
</code></pre>
         * @public
         * @function
         * @param {Object/Number/String/Boolean/Function/Null} data1[,data2,...,datan] 需要打印的内容
         */
        log: function(){
            if (!this.logable) {
                return false;
            }
            var args = arguments;
            if (Mstar.Util.isOWB) {
                for (var i = 0; i < arguments.length; i++) {
                    var item = args[i];
                    if (typeof(item) == "object") {
                        try {
                            args[i] = JSON.stringify(item, null, " ");
                        } 
                        catch (e) {
                            args[i] = "包含循环引用的对象无法打印";
                        }
                    }
                }
                var args = [].join.call(args, "\n");
                alert(args);
            }
            else {
                console.log.apply(console, args);
            }
            return true;
        },
		
		/**
		 * MD5加密
		 * @public
		 * @function
		 * @param {String} 需要加密的原字符串
		 * @return {String} 加密后的md5值
		 */
		MD5: function(sMessage) {
		    function RotateLeft(lValue, iShiftBits) {
		        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		    }
		    function AddUnsigned(lX, lY) {
		        var lX4, lY4, lX8, lY8, lResult;
		        lX8 = (lX & 0x80000000);
		        lY8 = (lY & 0x80000000);
		        lX4 = (lX & 0x40000000);
		        lY4 = (lY & 0x40000000);
		        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		        if (lX4 & lY4)             
		            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		        if (lX4 | lY4) {
		            if (lResult & 0x40000000) 
		                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
		            else 
		                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		        } else 
		            return (lResult ^ lX8 ^ lY8);
		    }
		    function F(x, y, z) {
		        return (x & y) | ((~ x) & z);
		    }
		    function G(x, y, z) {
		        return (x & z) | (y & (~ z));
		    }
		    function H(x, y, z) {
		        return (x ^ y ^ z);
		    }
		    function I(x, y, z) {
		        return (y ^ (x | (~ z)));
		    }
		    function FF(a, b, c, d, x, s, ac) {
		        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		        return AddUnsigned(RotateLeft(a, s), b);
		    }
		    function GG(a, b, c, d, x, s, ac) {
		        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		        return AddUnsigned(RotateLeft(a, s), b);
		    }
		    function HH(a, b, c, d, x, s, ac) {
		        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		        return AddUnsigned(RotateLeft(a, s), b);
		    }
		    function II(a, b, c, d, x, s, ac) {
		        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		        return AddUnsigned(RotateLeft(a, s), b);
		    }
		    function ConvertToWordArray(sMessage) {
		        var lWordCount;
		        var lMessageLength = sMessage.length;
		        var lNumberOfWords_temp1 = lMessageLength + 8;
		        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
		        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
		        var lWordArray = Array(lNumberOfWords - 1);
		        var lBytePosition = 0;
		        var lByteCount = 0;
		        while (lByteCount < lMessageLength) {
		            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		            lBytePosition = (lByteCount % 4) * 8;
		            lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));
		            lByteCount++;
		        }
		        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		        lBytePosition = (lByteCount % 4) * 8;
		        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		        return lWordArray;
		    }
		    function WordToHex(lValue) {
		        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
		        for (lCount = 0; lCount <= 3; lCount++) {
		            lByte = (lValue >>> (lCount * 8)) & 255;
		            WordToHexValue_temp = "0" + lByte.toString(16);
		            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
		        }
		        return WordToHexValue;
		    }
		    var x = Array();
		    var k, AA, BB, CC, DD, a, b, c, d
		    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
		    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
		    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
		    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
		    // Steps 1 and 2. Append padding bits and length and convert to words
		    x = ConvertToWordArray(sMessage);
		    // Step 3. Initialise
		    a = 0x67452301;
		    b = 0xEFCDAB89;
		    c = 0x98BADCFE;
		    d = 0x10325476;
		    // Step 4. Process the message in 16-word blocks
		    for (k = 0; k < x.length; k += 16) {
		        AA = a;
		        BB = b;
		        CC = c;
		        DD = d;
		        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
		        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
		        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
		        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
		        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
		        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
		        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
		        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
		        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
		        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
		        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
		        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
		        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
		        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
		        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
		        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
		        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
		        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
		        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
		        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
		        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
		        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
		        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
		        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
		        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
		        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
		        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
		        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
		        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
		        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
		        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
		        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
		        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
		        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
		        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
		        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
		        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
		        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
		        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
		        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
		        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
		        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
		        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
		        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
		        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
		        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
		        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
		        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
		        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
		        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
		        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
		        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
		        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
		        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
		        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
		        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
		        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
		        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
		        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
		        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
		        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
		        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
		        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
		        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
		        a = AddUnsigned(a, AA);
		        b = AddUnsigned(b, BB);
		        c = AddUnsigned(c, CC);
		        d = AddUnsigned(d, DD);
		    }
		    // Step 5. Output the 128 bit digest
		    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
		    return temp.toLowerCase();
		},

		/**
		 * 将{data}形式转换成string
<pre><code>
var str = '&ltli&gt&ltspan&gt{name}&ltspan&gt&lt/li&gt'
var data = {name:"allen"}
Mstar.Util.transData(s,data);

result: &ltli&gt&ltspan&gtallen&ltspan&gt&lt/li&gt
</code></pre>
		 * @public
		 * @function
		 * @param {Object} f	包含{}源格式
		 * @param {Object} ds	数据源
		 * @return {String} 转换后的字符串
		 */
		transData: function(f,ds){
			var reg = /\{(.*?)\}/g;
			var regs = f.match(reg);
			for(var j = 0 , rlen = regs.length; j < rlen; j++){
				var oriStr = regs[j];
				//console.log(oriStr);
				var tmpStr = oriStr.substring(1,regs[j].length - 1);
				f = f.replace(oriStr,Mstar.Util.parseStr(tmpStr,ds));
			}
			return f;
		},
		
		/**
		 * 解析aaa.bbb格式的字符串,返回对象中的值
<pre><code>
var s = "person.name";
var data = {
	person: {name: "allen"}
}

Mstar.Util.parseStr(s,data);

result: "allen"
</code></pre>
		 * @public
		 * @function
		 * @param {Object} soc	源格式
		 * @param {Object} da	数据源
		 * @return {String}	解析后的字符串
		 */
		parseStr: function(soc,da){
			var attrs = soc.split(".");
			var tmpDs = da;
			for(var k = 0 , alen = attrs.length; k < alen; k ++){
				tmpDs = tmpDs[attrs[k]];
			}
			return tmpDs;
		},

		/**
         * @class Mstar.util.Ptest
         * 性能测试类<br/>
         * 1.如果在页面开头定义了全局的startTime变量(格式如下)，则会自动将其作为开始时间，如果无则自动获取当前时间作为开始时间。<br/>
         * 2.可以建立多个独立的报表，分别计算
 <pre><code>
  //页面开头...
  window.startTime = {
	  t: new Date(),
	  n: "页面开始!"
  }
  //加载common.js...
  
  common.ptest.setPoint("开始加载")
  //....code....
  common.ptest.setPoint("模块A 开始")
  //....模块a...
  common.ptest.setPoint("模块A 结束")
  common.ptest.printList()
 </code>
控制台会打印如下信息：
  | 表：defaultList
  | 时间               间隔     累计    信息
---------------------------------------------------
0 | 1296289696.371      0       0       页面开始!:
1 | 1296289696.383      12      12      开始加载:
2 | 1296289696.454      71      83      模块A 开始:
3 | 1296289696.465      11      94      模块A 结束:
---------------------------------------------------
 </pre>
         * @singleton
		 * @author allen sun
		 * @version 1.0.1
         */
        Ptest: {
            lists: {
                defaultList: window.startTime ? [window.startTime] : [{
                    t: new Date(),
                    n: "页面开始!"
                }]
            },
			
            /**
             * 在制定列表设置一个记录点,记录程序执行到此点的系统时间和说明
<pre><code>
common.ptest.setPoint("模块A 结束")
common.ptest.setPoint("模块C 开始","list2")
</code></pre>
             * @public
             * @function
             * @param {String} msg 此条时间记录的说明
             * @param {String} ln 列表名，此字符串必须遵循变量命名规则；如果不指定则加入默认列表；如果列表不存在则新建列表；
             * @return {Boolean} 操作是否成功
             */
            setPoint: function(msg, ln){
                ln = ln || "defaultList";
                var list = this.lists[ln] || (this.lists[ln] = []);
                list.push({
                    n: msg,
                    t: new Date()
                })
                return true;
            },
			
            /**
             * 打印记录表,打印并返回指定列表的报表字符串
<pre><code>
common.ptest.printList()
common.ptest.printList("list2")
</code></pre>
             * @public
             * @function
             * @param {String} ln 列表名，此字符串必须遵循变量命名规则；如果不指定则打印默认列表；
             * @param {Boolean} nolog 如果为真，则不打印只返回
             * @return {String} 操作成功则返回报表字符串，可以直接打印；操作失败则返回false
             */
            printList: function(ln, nolog){
                ln = ln || "defaultList";
                var list = this.lists[ln];
                if (!list) {
                    return false;
                }
                var l, total = 0, r = "  | 表：" + ln + "\n  | 时间(s)\t\t间隔(ms)\t累计(ms)\t信息\n---------------------------------------------------\n";
                for (var i = 0; i < list.length; i++) {
                    var t = list[i];
                    var dur = l ? t.t - l : 0;
                    total += dur;
                    r = r + i + " | " + t.t / 1000 + "\t" + dur + "\t" + total + "\t" + t.n + ":\n";
                    l = t.t;
                }
                r = r + "---------------------------------------------------";
                nolog || Mstar.Util.log(r);
                return r;
            },
			
            /**
             * 清空记录表,清空制定的记录表
<pre><code>
common.ptest.clearList()
common.ptest.clearList("list2")
</code></pre>
             * @public
             * @function
             * @param {string} ln 列表名，此字符串必须遵循变量命名规则；如果不指定则清空默认列表；
             * @return {boolean} 操作成功则返回true
             */
            clearList: function(ln){
                ln = ln || "defaultList";
                this.lists[ln] && (this.lists[ln] = [])
                return true;
            }
        },
		
        /**
         * 通用键盘控制管理。
         * @class Mstar.util.Key
<pre><code>
//注意：被绑定的obj下必须有obj.keyPress(key)函数来响应按键。
//如果obj.keyPress类型不为"function"，则绑定失败。

$(function(){
	common.key.init(); //启用键盘控制
	common.key.change(menu);  //键盘控制权转交给menu
})
</code></pre>
		 * @singleton
		 * @author allen sun
		 * @version 1.0.1
         */
        Key: {
            //当前响应按键的对象列表
            objs: [],
            /**
			 * 查询元素在数组中的位置
			 * @private
			 */
            inArray: function(elem, array){
                if (array.indexOf) {
                    return array.indexOf(elem);
                }
                
                for (var i = 0, length = array.length; i < length; i++) {
                    if (array[i] === elem) {
                        return i;
                    }
                }
                
                return -1;
            },
			
            /**
			 * keyDown响应函数
			 * @private
			 */
            keyFunc: function(e){
                try{
                    Mstar.Util.log("keypress: " + e.keyCode);
                    var self = Mstar.Util.Key;
                    var tempArr = self.objs.concat();
                    for (var i = 0; i < tempArr.length; i++) {
                        var obj = tempArr[i];
                        obj.keyPress && obj.keyPress(e.keyCode);
                    }
                    //过滤以下按键浏览器默认行为,例如切换焦点,发送表单等。
                    switch (e.keyCode) {
                        case keyCodeArr.up:
                        case keyCodeArr.down:
                        case keyCodeArr.left:
                        case keyCodeArr.right:
                        case keyCodeArr.enter:
                            e.returnValue = false;
                            return false;
                            break;
                    }
                }catch(e){
                    window.console ? window.console.log(e.message) : alert(e.message);
                }
            },
			
            /**
			 * 键盘控制初始化<br/>
			 * 如果需要使用本键盘控制功能，则在本对象定义后一次性调用此方法。
<pre><code>
$(function(){
	common.key.init();
})
</code></pre>
			 * @public
			 * @function
			 * @param {object} 不同平台新的keyCode
			 * @return {boolean} 操作是否成功
			 */
            init: function(keyCodes){
				if (keyCodes) {
					window.keyCodeArr = $.extend({}, Mstar.Util.defaultKeyCodeArr, keyCodes);
				} else {
					if (window.globalKeyArr) {
						window.keyCodeArr = window.globalKeyArr;
					} else {
						window.keyCodeArr = isOWB ? $.extend({}, Mstar.Util.defaultKeyCodeArr, Mstar.Util.OWBkeyCodeArr) : Mstar.Util.defaultKeyCodeArr;
					}
				}
                window.addEventListener("keydown", this.keyFunc, false);
                return true;
            },
			
            /**
			 * 结束键盘控制。<br/>
			 * 执行后将结束使用此功能。（不影响其他用户绑定的keydown响应函数）
<pre><code>
$(function(){
	common.key.end();
})
</code></pre>
			 * @public
			 * @function
			 * @return {boolean} 操作是否成功
			 */
            end: function(){
                //$(window).unbind("keydown", this.keyFunc);
                window.removeEventListener("keydown", this.keyFunc, false);
                return true;
            },
			
            /**
			 * 改变键盘响应对象。将键盘控制权完全交给obj，obj将是唯一响应按键的对象。
<pre><code>
menu = {
	keyPress: function(key){
	...
	}
}
common.key.change(menu);
</code></pre>
			 * @public
			 * @param {object} obj 目标对象，该对象下必须包含keyPress键盘响应函数，否则绑定失败。
			 * @return {boolean} 操作是否成功
			 */
            change: function(obj){
                return this.unbind() && this.bind(obj);
            },
			
            /**
			 * 绑定键盘响应对象。添加obj对象按键绑定，可以同时绑定多个。
<pre><code>
menu = {
	keyPress: function(key){
	...
	}
}
common.key.bind(menu);
</code></pre>
			 * @public
			 * @param {object} obj 目标对象，该对象下必须包含keyPress键盘响应函数，否则绑定失败。
			 * @return {boolean} 操作是否成功
			 */
            bind: function(obj){
                if (!obj || !obj.keyPress || typeof(obj.keyPress) != "function" || this.inArray(obj, this.objs) != -1) {
                    return false;
                }
                this.objs.push(obj);
				obj.onKeyEventBinded && obj.onKeyEventBinded();
                return true;
            },
			
            /**
			 * 解除绑定键盘响应对象.解除obj对象按键绑定，解除其中一个。
<pre><code>
menu = {
	keyPress: function(key){
	...
	}
}
common.key.bind(menu);
</code></pre>
			 * @public
			 * @param {object} obj 目标对象，必须为已绑定的对象，否则解除失败
			 * @return {boolean} 操作是否成功
			 */
            unbind: function(obj){
                //无参则取消绑定所有
                if (obj == null) {
					for (var i = 0, len = this.objs.length; i < len; i ++){
						this.objs && this.objs[i] && this.objs[i].onKeyEventUnbinded && this.objs[i].onKeyEventUnbinded();
					}
                    this.objs = [];
                    return true;
                }
                //有参则取消绑定指定obj
                var i = this.inArray(obj, this.objs);
                if (i == -1) {
                    return false;
                }
                this.objs.splice(i, 1);
				obj.onKeyEventUnbinded && obj.onKeyEventUnbinded();
                return true;
            },
			
			/**
			 * 返回当前接受键盘事件的对象。
			 * @public
			 * @function
			 * @return {object} 当前接受键盘事件的对象
			 */
			currentObj: function(){
				return this.objs[this.objs.length - 1];
			},
			
			/**
             * JS返回退出
             * @public
             * @function
             * @param {boolean} isAndroid 目标对象，必须为已绑定的对象，否则解除失败
             * @return {void}
             */
			jsExit: function(){
			    try{
			        window.ExitPlug4Wgt.exit();
			    }catch(e){
			        Mstar.Util.log(e.message);
			        Mstar.Util.log("the exit plugs can not found....");
			    }
			}
        },
		
        /**
         * 秘籍控制。监听按键，当有指定序列的按键被按下时，触发回调。
         * @class Mstar.util.Cheats
<pre><code>
$(function(){
	common.cheats.code = [49, 50, 51]; //秘籍序列
	common.cheats.open(function(){	 //开启键盘监听
		...秘籍激活后做的事情
	})
})
</code></pre>
		 * @singleton
		 * @author allen sun
		 * @version 1.0.1
         */
        Cheats: {
            /**
			 * 密码列表，其值必须为键码构成的数组，如果格式非法，则无法正常触发。
			 * @public
<pre><code>
common.cheats.code = [49, 50, 51]
common.cheats.code = []
</code></pre>
			 */
            code: [],
            /**
			 * 最近按键列表，用于比较
			 * @private
			 */
            res: [],
            /**
			 * 打开秘籍功能。绑定键盘响应事件，并传入回调。
<pre><code>
common.cheats.code = [49, 50, 51]
common.cheats.open(function(){	 //开启键盘监听
	alert("秘籍被打开")
})
</code></pre>
			 * @public
			 * @param {function} callback 当秘籍被正确输入时被触发的回调函数
			 * @return {boolean} 操作是否成功
			 */
            open: function(callback){
                if (this.func) {
                    return false;
                }
                if (callback && typeof callback == "function") {
                    this.callback = callback;
                }
                var self = this;
                this.fun = function(e){
                    self.tryonce(e.keyCode);
                }
                $(document).keydown(this.fun)
                return true;
            },
            /**
			 * 关闭秘籍功能。取消绑定键盘响应事件，清空回调。
<pre><code>
Mstar.Util.cheats.close()
</code></pre>
			 * @public
			 * @return {boolean} 操作是否成功
			 */
            close: function(){
                $(document).unbind("keydown", this.fun);
                this.fun = this.callback = null;
                this.res = [];
                return true;
            },
            /**
			 * 记录一次按键
			 * @private
			 */
            tryonce: function(val){
                if (!this.code || !this.code.length) {
                    return false;
                }
                var res = this.res, code = this.code;
                var l = res.push(val);
                l > code.length && res.shift();
                for (var i = 0; i < code.length; i++) {
                    if (code[i] != res[i]) {
                        return false;
                    }
                }
                this.callback && this.callback();
                this.res = [];
                return true;
            }
        },
		
		/**
		 * 国际化类
		 * @class Mstar.util.International
		 * @singleton
		 * @author allen sun
		 * @version 1.0.1
		 */
		International: {
			//选中语言的下标
			_selIdx: -1,
			
			/**
			 * 返回选中语言的下标
			 * @public
			 * @function
			 * @return {int} 下标
			 */
			getSelectedIndex: function(){
				return this._selIdx;
			},
			
			/**
			 * 将dom中的文本转换成本地文字
			 * @public
			 * @function
			 * @param {object}	obj	script标签的onload事件
			 * @return {void}
			 */
			domText2Local: function(obj){
				try {
					if (obj.readyState == 'loaded' || obj.readyState == 'complete') {
						var ts = $("[title]");
						for (var i = 0, len = ts.length; i < len; i++) {
							var tmpEl = $(ts[i]);
							tmpEl.text(Mstar.Util.parseStr(tmpEl.attr("title"), resource));
						}
					}
				}catch(e){
					Mstar.Util.log("domText2Local "+e.message);
				}
			},
			
			/**
			 * 根据cookie里的值选择国际化文件
			 * @public
			 * @function
			 * @param {string} path 文件路径
			 * @return {void}
			 */
			chooseLocalResource: function(path){
				try {
					var lang = Mstar.Util.Cookie.readCookie("$#@!lang$#@");
					this._selIdx = Mstar.Util.Cookie.readCookie("$#@!langidx$#@");
					if (lang) {
						//这里使用onreadystatechange事件,只支持IE9/FF/safari,chrome/IE6支持onload
						document.writeln('<script language="javascript" src="' + path + lang + '.js" onload="Mstar.Util.International.domText2Local(this);" onerror="Mstar.Util.International._error();"></script>');
					} else {
					//document.writeln('<script language="javascript" src="en-us.js"></script>');
					}
				}catch(e){
					Mstar.Util.log("chooseLocalResource "+e.message);
				}
			},
			
			/**
			 * 根据将选择的语言保存在cookie里
<pre><code>
var obj = {
	value: o.options[o.selectedIndex].value,
	slctIdx: o.selectedIndex
}
Mstar.Util.International.saveAndRefresh(obj);
</code></pre>
			 * @public
			 * @function
			 * @param {object} o 文件路径{value:"zh-cn",selectedIndex: 1}
			 * @return {void}
			 */
			saveAndRefresh: function(o){
				Mstar.Util.Cookie.createCookie("$#@!lang$#@",o.value);
				Mstar.Util.Cookie.createCookie("$#@!langidx$#@",o.slctIdx);
				location.search = "";
			},
			
			/**
			 * 国际化文件加载出错
			 * @private
			 * @function
			 * @return {void}
			 */
			_error: function(){
				Mstar.Util.log("can not found resource file");
			}
		},
		
		/**
		 * cookie操作类
		 * @class Mstar.util.Cookie
		 * @singleton
		 * @author allen sun
		 * @version 1.0.1
		 */
		Cookie: {
			/**
			 * 读取cookie
			 * @public
			 * @function
			 * @param {Object} name	要读取cookie的key
			 * @return {string} cookie的值
			 */
			readCookie: function(name){
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++){
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			},
			
			/**
			 * 抹去cookie的值
			 * @public
			 * @function
			 * @param {Object} name 要抹去cookie的key
			 * @return {void}
			 */
			eraseCookie: function (name){
				this.createCookie(name,"",-1);
			},
			
			/**
			 * 创建cookie
			 * @public
			 * @function
			 * @param {Object} name		cookie的key
			 * @param {Object} value	cookie的值
			 * @param {Object} days		有效期
			 * @return {void}
			 */
			createCookie: function (name,value,days){
				if($.isArray(value)){
					value = value.join(",");
				} else if(typeof(value) == "object"){
					try{
						value = JSON.stringify(value);
					}catch(e){}
				}
				// alert(value);
				var expires = "";
			    !days && (days = 999);
				if (days) {
					var date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					var expires = "; expires=" + date.toGMTString();
				}
				document.cookie = name+"="+value+expires+"";
			}
		}
    }
    //兼容全局keyCodeArr
    window.keyCodeArr = Mstar.Util.keyCodeArr;
})();
//Mstar.Util.International.chooseLocalResource();
