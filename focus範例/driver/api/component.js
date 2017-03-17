(function() {
    /**
     * @class Mstar.Component
     * 组件顶层类,抽象类,所以组件继承自此类 <br/>
     * @author allen sun
     * @version 1.0.1
     */
    /**
     * @constructor
     * @param {Object} options 创建component需要的参数.
     <pre><code>
     var cpt = new Mstar.Component({
     _mainDom : '#list'
     });
     </code></pre>
     */
    Mstar.Component = function(options) {

        /**
         *	@cfg {String/Object} _mainDom <b>必须的</b>:组件需要操作的dom,可以是string类型的<b>#id</b>,也可以是jquery object.
         <pre><code>
         var cpt = new Mstar.Component({
         _mainDom : '#list'
         });
         </code></pre>
         *或者
         <pre><code>
         var cpt = new Mstar.Component({
         _mainDom : $('#list')
         });
         </code></pre>
         */
        this._visible = false;
        this._keyboardSwitch = true;
        this._mouseSwitch = false;

        //初始化配置
        if(options) {
            Mstar.apply(this, options);
        }

        this._initComponent();
    };


    Mstar.Component.prototype = {
        /**
         * 初始化组件
         * @private
         * @function
         * @return {boolean} 返回组件是否可见;如果没有设置,默认返回false;
         */
        _initComponent : function() {
            if(!this._mainDom) {
                throw new Error("no mainDom");
            } else {
                if( typeof this._mainDom == "string") {
                    this._mainDom = $(this._mainDom);
                }
            }

        },

        /**
         * 获得组件可见性
         * @public
         * @function
         * @return {boolean} 返回组件是否可见;如果没有设置,默认返回false;
         */
        getVisible : function getVisible() {
            return this._visible;
        },

        /**
         * 返回组件是否响应键盘事件的状态
         * @public
         * @function
         * @return {boolean} 返回组件是否响应键盘事件;如果没有设置,默认返回true;
         */
        getKeyboardSwitchState : function getKeyboardSwitchState() {
            return this._keyboardSwitch;
        },

        /**
         * 设置组件是否响应键盘事件的状态
         * @public
         * @function
         * @param {boolean} s 设置组件是否响应键盘事件;true 为响应,false 为不响应
         * @return {void}
         */
        setKeyboardSwitchState : function setKeyboardSwitchState(s) {( typeof s == 'boolean') && (this._keyboardSwitch = s);
        },

        /**
         * 设置组件是否响应鼠标事件
         * @public
         * @function
         * @return {boolean} 返回组件是否响应鼠标事件;如果没有设置,默认返回false;
         */
        getMouseSwitch : function getMouseSwitch() {
            return this._mouseSwitch;
        },

        /**
         * 设置组件是否响应鼠标事件
         * @public
         * @function
         * @param {boolean} s 设置组件是否响应鼠标事件;true 为响应,false 为不响应
         * @return {void}
         */
        setMouseSwitch : function setMouseSwitch(s) {( typeof s == 'boolean') && (this._mouseSwitch = s);
        },

        /**
         * 按键处理函数
         * @public
         * @function
         * @param {Number} key 键码
         * @return {void}
         */
        keyPress : function(key) {
            //默认按键响应
            if(this._keyboardSwitch) {
                switch (key) {
                    case keyCodeArr.up:
                        this.upEVT && this.upEVT();
                        break;
                    case keyCodeArr.down:
                        this.downEVT && this.downEVT();
                        break;
                    case keyCodeArr.left:
                        this.leftEVT && this.leftEVT();
                        break;
                    case keyCodeArr.right:
                        this.rightEVT && this.rightEVT();
                        break;
                    case keyCodeArr.pageUp:
                        this.pageUpEVT && this.pageUpEVT();
                        break;
                    case keyCodeArr.pageDn:
                        this.pageDownEVT && this.pageDownEVT();
                        break;
                    case keyCodeArr.enter:
                        this.enterEVT && this.enterEVT();
                        break;
                    case keyCodeArr.red:
                        this.redEVT && this.redEVT();
                        break;
                    case keyCodeArr.green:
                        this.greenEVT && this.greenEVT();
                        break;
                    case keyCodeArr.yellow:
                        this.yellowEVT && this.yellowEVT();
                        break;
                    case keyCodeArr.blue:
                        this.blueEVT && this.blueEVT();
                        break;
                    case keyCodeArr.exit:
                        this.exitEVT && this.exitEVT();
                        break;
                }
                this.onKeyPress && this.onKeyPress(key);
            }
        },

        /**
         * 开启这个控件,加载数据等操作(在init方法或init所调用的方法中,_visibel必须设为true)
         * @public
         * @function
         * @return {void}
         */
        init : function() {
        },

        /**
         * 显示这个插件,单纯的显示出这个控件(在show方法或show所调用的方法中,_visibel必须设为true)
         * @public
         * @function
         * @return {void}
         */
        show : function() {
        },

        /**
         * 关闭控件(析构)(在destroy方法或destroy所调用的方法中,_visibel必须设为false)
         * @public
         * @function
         * @return {void}
         */
        destroy : function() {
        },

        /**
         * 隐藏这个插件(在hide方法或hide所调用的方法中,_visibel必须设为false)
         * @public
         * @function
         * @return {void}
         */
        hide : function() {
        },

        /**
         * 跳转到下一项(键盘右键)
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        rightEVT : function() {
        },

        /**
         * 跳转到下一行(键盘下键)
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        downEVT : function() {
        },

        /**
         * 跳转到上一项(键盘左键)
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        leftEVT : function() {
        },

        /**
         * 跳转到上一行(键盘上键)
         * @public
         * @function
         * @return {boolean} 是否跳转成功
         */
        upEVT : function() {
        },

        /**
         * 键盘红键
         * @public
         * @function
         * @return {void}
         */
        redEVT : function() {
        },

        /**
         * 键盘绿键
         * @public
         * @function
         * @return {void}
         */
        greenEVT : function() {
        },

        /**
         * 键盘黄键
         * @public
         * @function
         * @return {void}
         */
        yellowEVT : function() {
        },

        /**
         * 键盘蓝键
         * @public
         * @function
         * @return {void}
         */
        blueEVT : function() {
        },
        
        /**
         * 键盘返回键
         * @public
         * @function
         * @return {void}
         */
        exitEVT: function(){
            this.keyCtrlOut();
        },

        /**
         * 键盘控制进入这个对象
         * @public
         * @function
         * @return {void}
         */
        keyCtrlIn : function() {
        },

        /**
         * 键盘控制离开这个对象
         * @public
         * @function
         * @return {void}
         */
        keyCtrlOut : function() {
            if(this._parentNode){
                //如果有上级对象,将键盘控制交给上级
                Mstar.Util.Key.change(this._parentNode);
            } else {
                //如果没有上级对象,则退出wgt
                Mstar.Util.Key.jsExit();
            }
        },

        /**
         * @event onKeyEventBinded
         * 当这个控件绑定了键盘事件后
         */
        onKeyEventBinded : function() {
        },

        /**
         * @event onKeyEventUnbinded
         * 当这个控件解除了键盘事件后
         */
        onKeyEventUnbinded : function() {
        }

    }
})();
