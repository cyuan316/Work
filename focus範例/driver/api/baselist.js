(function() {
	/**
     * @class Mstar.BaseList
     * 列表组件的基类 <br/>
	 <pre><code>
var list = new Mstar.BaseList({
	_mainDom: "#list",
	_focusClass: "current",
	_showLi: "&ltli&gt&ltspan&gt{data}&lt/span&gt&ltspan&gt{aaa}&lt/span&gt&lt/li&gt",
	_pager: "#page",
	_bgLoading: '&ltdiv class="loading"&gtloading&lt/div&gt',
	_ctrling: true,

	getItems: function(p,scb) {
		var me = this;
		//从api.getList取50条数据，成功后填入data和length，并且回调
		api.getList({
			pageidx: 0,
			perpage: 50
		}, function(r) {
			if (r) {
				me._items = r.data;
				me._length = r.length;
				scb && scb();
			}
		}, function(){

		});
	}
});
	 </code></pre>
	 * @extends Mstar.Component
	 * @author allen sun
	 * @version 1.0.2
	 *
	 * @constructor BaseList
	 * @param {Object} options 创建component需要的参数.
     */

	  /**
	  *	@cfg {String} _rows <b>可选的</b>:列表有多少行.默认是3行
	  */
	  /**
	  *	@cfg {String} _cols <b>可选的</b>:列表有多少列.默认是3列
	  */
	  /**
	  *	@cfg {String} _length <b>可选的</b>:列表项目总个数,items.length
	  */
	  /**
	  *	@cfg {String} _showLi <b>可选的</b>:要显示的列表项.如果没有写这个配置,就需要重写_drawData方法,否则不能显示出数据
	  */
	  /**
	  *	@cfg {String} _focusClass <b>可选的</b>:列表焦点的样式
	  */
	  /**
	  *	@cfg {String} _pager <b>可选的</b>:分页插件,可以是string类型的<b>#pager</b>,也可以是jquery object.
	  */
	  /**
	  *	@cfg {String} _ctrling <b>可选的</b>:数据显示出来后,是否立即获得键盘控制
	  */
	  /**
	  *	@cfg {String} _panel <b>可选的</b>:装载这个list的面板,一般是个div.用于show或hide
	  */
	 
	 var tmpBaseList$ = {
        //列表横向最大条目数,rows
        _rows: 3,
        
        //列表纵向最大条目数,cols
        _cols: 3,
        
        //列表项目总长度,items.length
        _length: 9,
        
        //item下标
        _index: 0,
        
        //装载这个list的面板,一般是个div.用于show或hide
        _panel: null,
        
        _initComponent: function() {
            Mstar.BaseList.superclass._initComponent.call(this);
            
            //列表项
            this._items = [];
            
            //初始化分页显示组件
            if (this._pager && (typeof this._pager == "string")) {
                this._pager = $(this._pager);
            }
        },
        
        /**
         * 打开这个menu,使其受到键盘控制,会触发onInit事件。
         * @public
         * @function
         * @return {boolean} 是否打开成功
         */
        init: function() {
            this.onInit && this.onInit();
            this.checkCurrPage && this.checkCurrPage();
            return true;
        },
        
        /**
         * 关闭这个menu,使其不受键盘控制,会触发onDestroy事件
         * @public
         * @function
         * @return {boolean} 是否关闭成功
         */
        destroy: function() {
            //触发onDestroy
            this.onDestroy && this.onDestroy();
            return true;
        },
        
        /**
         * 返回需要显示的DOM
         * @private
         * @function
         * @return {object} 需要显示的DOM
         */
        _showComponent: function(){
            return this._panel ? this._panel : this._mainDom;
        },
        
        /**
         * 显示这个组件
         * @public
         * @function
         * @return {void}
         */
        show: function(){
            var showCpnt = this._showComponent();
            this._drawData();
            showCpnt && showCpnt.show && showCpnt.show();
        },
        
        /**
         * 隐藏这个组件
         * @public
         * @function
         * @return {void}
         */
        hide: function(){
            var showCpnt = this._showComponent();
            showCpnt && showCpnt.hide && showCpnt.hide();
            if (this._parentNode) {
                Mstar.Util.Key.change(this._parentNode);
            } else {
                Mstar.Util.Key.unbind(this);
            }
        },
        
        /**
         * 进入当前项
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        enterEVT: function() {
            this.onEnter && this.onEnter(this._index);
            return true;
        },
        
        /**
         * 检查i必须为正整数且值在允许范围之内,否则返回当前index
         * @private
         * @function
         * @param {int} i 被检查的变量
         * @return {int} 检查后的数
         */
        _checki: function(i) {
            return (typeof(i) != "number" || i < 0 || i >= this._length) ? this._index : Math.floor(i); //无i则返回当前焦点页信息
        },
        
        /**
         * 将x除以y，返回商和余数
         * @private
         * @function
         * @param {int} x 被除数
         * @param {int} y 除数
         * @return {object} 格式为{n:2,r:2}的对象,q 为商,r为余数
         */
        _divide: function(x, y) {
            return {
                n: Math.floor(x / y),
                r: x % y
            };
        },
        
        /**
         * 获取i以w为宽度折叠后，当前折页的开始和结束项编号
         * @private
         * @function
         * @param {int} i 第i项，如果不传参数则默认为当前选中项。
         * @param {int} w 折叠宽度
         * @return {object} 格式为{s:2,e:2}的对象,s为开始项编号,e为结束项编号
         */
        _getse: function(i, w) {
            i = this._checki(i);
            var s = i - i % w;
            var e = s + w - 1;
            var max = this._length - 1;
            return {
                s: s,
                e: e > max ? max : e
            };
        },
        
        /**
         * 返回本菜单一页能够容纳的item数
         * @public
         * @function
         * @return {int} item数
         */
        p: function() {
            return this._rows * this._cols;
        },
        
        /**
         * i转换成 第p页,第i条 格式对象
         * @public
         * @function
         * @param {int} i 第i项，如果不传参数则默认为当前选中项。
         * @return {object} 格式为{p:1,i:2}的对象.
         *                  p:页码,从0开始;
         *                  i:传入过来的参数i在p这一页中的index,每一页从0开始,并且 i < this.p()
         */
        i2pi: function(i) {
            i = this._checki(i);
            var t = this._divide(i, this.p());
            return {
                p: t.n,
                i: t.r
            };
        },
        
        /**
         * i转换成 第p页,第r行,第i条 格式对象
         * @public
         * @function
         * @param {int} i 第i项，如果不传参数则默认为当前选中项。
         * @return {object} 格式为{p:1,r:2,i:2}的对象.
         *                  p:页码,从0开始;
         *                  r:传入过来的参数i在p这一页中的第r行,行下标从0开始,并且 r < this._rows
         *                  i:传入过来的参数i在p这一页,r这一行中的index,从0开始,并且 i < this._cols
         */
        i2pri: function(i) {
            i = this._checki(i);
            var t1 = this._divide(i, this.p());
            var t2 = this._divide(t1.r, this._cols);
            return {
                p: t1.n,
                r: t2.n,
                i: t2.r
            };
        },
        
        /**
         * i转换成 r行零i条 格式对象
         * @public
         * @function
         * @param {int} i 第i项，如果不传参数则默认为当前选中项。
         * @return {object} 格式为{r:2,i:2}的对象
         *                  r:传入过来的参数i在所有rows中第r行,行下标从0开始
         *                  i:传入过来的参数i在p这一页,r这一行中的index,从0开始,并且 i < this._cols
         */
        i2ri: function(i) {
            i = this._checki(i);
            var t = this._divide(i, this._cols);
            return {
                r: t.n,
                i: t.r
            };
        },
        
        /**
         * p页零i条 格式对象 转换成 i。(与i2pi相反)
         * @public
         * @function
         * @param {object} o 格式为{p:1,i:2}的对象
         * @return {int} 第i项，如果不传参数则默认为当前选中项。
         */
        pi2i: function(o) {
            return o.p * this.p() + o.i;
        },
        
        /**
         * p页零r行零i条 格式对象 转换成 i。(与i2pri相反)
         * @public
         * @function
         * @param {object} o 格式为{p:1,r:2,i:2}的对象
         * @return {int} 第i项，如果不传参数则默认为当前选中项。
         */
        pri2i: function(o) {
            return o.p * this.p() + o.r * this._cols + o.i;
        },
        
        /**
         * r行零i条 格式对象 转换成 i。(与i2li相反)
         * @public
         * @function
         * @param {object} o 格式为{r:2,i:2}的对象
         * @return {int} 第i项，如果不传参数则默认为当前选中项。
         */
        ri2i: function(o) {
            return o.r * this._cols + o.i;
        },
        
        /**
         * 获取页信息
         * @public
         * @function
         * @param {int} i 第i项，如果不传参数则默认为当前选中项。
         * @return {object} 格式为{s:2,e:2}的对象,s为开始项编号,e为结束项编号
         */
        pinfo: function(i) {
            return this._getse(i, this.p());
        },
        
        /**
         * 获取行信息
         * @public
         * @function
         * @param {int} i 第i项，如果不传参数则默认为当前选中项。
         * @return {object} 格式为{s:2,e:2}的对象,s为开始项编号,e为结束项编号
         */
        rinfo: function(i) {
            return this._getse(i, this._cols);
        },
        
        /**
         * 菜单跳转到第i项。
         * @public
         * @function
         * @param {int} i 第i项，如果未定义、超出范围、或者与当前项目相同，则不跳转。
         * @return {boolean} 是否跳转成功
         */
        go: function(i) {
            //过滤非法的i
            i = this._checki(i);
            //如果相同，则不产生焦点移动。
            if (this._index === i) {
                return false;
            }
            
            
            //根据情况产生不同的事件
            var l = this.i2pri(this._index);
            var n = this.i2pri(this._index = i);
            
            //触发onPageChange
            if (l.p != n.p) {
                this.checkCurrPage && this.checkCurrPage(); //DynaList中进行数据检查
                this.onPageChange && this.onPageChange(n);
            }
            //触发onLineChange
            if (l.r != n.r) {
                this.onLineChange && this.onLineChange(n);
            }
            //触发onChange
            this.onChange && this.onChange(n);
            return true;
        },
        
        /**
         * 跳转到下一项
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        rightEVT: function() {
            var max = this._length - 1;
            var n = this._index + 1;
            return this.go(n > max ? 0 : n);
        },
        
        /**
         * 跳转到下一行
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        downEVT: function() {
            var max = this._length - 1;
            var n = this._index + this._cols;
            //如果超过最大项
            if (n > max) {
                //如果当前项目在最后一行,跳转到第一行对应项,否则,跳转到最后一项
                n = this.i2ri(this._index).i === this.i2ri(max).i ? this.i2pri(n).i : max
            }
            return this.go(n);
        },
        
        /**
         * 跳转到下一页
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        pageDownEVT: function() {
            var max = this._length - 1;
            var n = this._index + this.p();
            //如果超过最大项
            if (n > max) {
                //如果当前项目在最后一页,跳转到第一页对应项,否则,跳转到最后一项
                n = this.i2pi(this._index).p === this.i2pi(max).p ? this.i2pi(n).i : max
            }
            return this.go(n);
        },
        
        /**
         * 跳转到上一项
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        leftEVT: function() {
            var max = this._length - 1;
            var n = this._index - 1;
            return this.go(n < 0 ? max : n);
        },
        
        /**
         * 跳转到上一行
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        upEVT: function() {
            var max = this._length - 1;
            var n = this._index - this._cols;
            //如果小于0
            if (n < 0) {
                //
                var d = this._index - (max % this._cols);
                n = d > 0 ? max : max + d;
            }
            return this.go(n);
        },
        
        /**
         * 跳转到上一页
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        pageUpEVT: function() {
            var max = this._length - 1;
            var n = this._index - this.p();
            //如果小于0
            if (n < 0) {
                //
                var d = this._index - (max % this.p());
                n = d > 0 ? max : max + d;
            }
            return this.go(n);
        },
        
        /**
         * @event onInit
         * 菜单被打开，执行open方法时触发
         */
        onInit: function() {
            var me = this;
            this.getItems(null,function() {
                me._drawData();
            })
        },
        /**
         * @event onDestroy
         * 菜单被关闭，执行close方法时触发
         */
        onDestroy: function() {
            this.hide();
        },
        /**
         * @event onEnter
         * 进入菜单项，执行enter方法时触发（默认回车键触发）
         */
        onEnter: function(i) {
        },
        /**
         * @event onChange
         * 选中项改变时触发
         * @param {int} i 进入的项目编号
         */
        onChange: function() {
            this._drawFocus();
        },
        /**
         * @event onLineChange
         * 选中项换行时触发
         */
        onLineChange: function() {
            this._drawFocus();
        },
        /**
         * @event onPageChange
         * 选中项换页时触发
         */
        onPageChange: function() {
            this._drawData();
        },
        /**
         * @event onKeyPress
         * 菜单被open后，有按键时触发，传入按键码
         * @param {int} key 按键码
         */
        onKeyPress: function(key) {
        },
        
        /**
         * 绘制焦点
         * @private
         * @function
         * @return {void}
         */
        _drawFocus: function() {
            var items;
            if (this._mainDom && (items = this._mainDom.find("li")).length) {
                var i = this.i2pi().i
                items.filter("."+this._focusClass).removeClass(this._focusClass);               
                items.eq(i).addClass(this._focusClass);
            }
        },
     
        /**
         * 将data中的i所在页的内容写入到列表中，并在页码中写入页码
         * @private
         * @function
         * @return {void}
         */
        _drawData: function() {
            var se = this.pinfo(); //获得i所在页的起始和结束编号
            var c = this._mainDom; //获得列表的容器，$对象
            var data = this._items; //数据
            var p = this.p() //一页的项数
            c.empty();
            var drawContent = "";
            for (var i = 0; i < p; i++) {
                var j = i + se.s;
                var t = data[j];
                if (j <= se.e) {
                    drawContent += Mstar.Util.transData(this._showLi, t, this._showLiFuncs);
                }
            }
            //填充数据
            c.html(drawContent);
            //写入页码
            this._pager && this._pager.html((this.i2pi().p + 1) + ' / ' + (this.i2pi(this._length - 1).p + 1));
            //接受键盘控制,并绘制焦点
            if (this._ctrling) {
                Mstar.Util.Key.change(this);
                //绘制焦点
                this._drawFocus();
            }
        },
        
        /**
         * 获得数据,这里调用api
         * @public
         * @function
         * @param {object} p 分页,查询等参数
         * @param {function} scb 成功回调
         */
        getItems: function(p,scb) {
           
        }
    };
    Mstar.BaseList = Mstar.inherit(Mstar.Component, tmpBaseList$);
})();
