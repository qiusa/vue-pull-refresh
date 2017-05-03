<template>
	<div class="scroll-box" :class= "onClass" v-touch>
		<div class="scroll-shift">
			<div class="pull-down-tab" v-if="onMode != 3 && onMode != 2  && onTipShow">
				<span class="pull-tip down" v-if="!isPullDown">下拉刷新</span>
				<span class="unlash-tip" v-if="isPullDown && !isRefresh">松开刷新数据</span>
				<span class="refresh-tip" v-if="isPullDown && isRefresh">{{refreshTip}}</span>
			</div>
			<div class="pull-content">
				<slot>
		        </slot>
			</div>
	        <div class="pull-tab" v-if="onMode != 3 && onMode != 1 && onTipShow">
	        	<span class="pull-tip" v-if="!isPull">上拉加载更多</span>
	        	<span class="refresh-tip" v-if="isPull">{{refreshTip}}</span>
	        </div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	props:{
		onClass:{								//	增加自定义样式名,注：监听内容更改onContentChange并定位到顶部需要传递onClass参数
			type:String,
			default: '',
			required:false
		},
		onTipShow:{								//	是否显示tip
			type: Boolean,
			default: true,
			required: false
		},
		onTip:{									//	加载状态提示语
			type: String,
			default: '加载成功',
			required: false
		},
		onMore: { 								//	决定本次上拉或者下拉是否状态是否完成，我才不管你请求成功与否
			type: Boolean,
			default: false,
			required: true
		},
		onContentChange: { 						//	pull-content里面的内容是否更改
			type: Boolean,						//	注：监听内容更改onContentChange并定位到顶部需要传递onClass参数
			default: false,
			required: false
		},
		onMode: {								//	监听模式，0:下拉刷新，上拉加载更多,1:下拉刷新,
			type: Number,						//	2:上拉加载更多,3:不出发上拉加载和下拉刷新
			default: 0,
			required: false
		},
		onInfinite : {							//	上拉执行的函数
			type: Function,
			default: function(){},
			required: false
		},
		onRefresh: {							//	下拉执行的函数
			type: Function,
			default: function(){},
			required: false
		}
	},
	data(){
		return{
			start:{								//	事件初始化位置信息
				x: 0,
				y: 0
			},
			pullCunt: 0, 						//	限制上拉加载更多函数每次只执行一次
			transformVal: [0,0],				//	应用transform之后的x、y数值
			state: 0,							//	判断监听状态0:不做处理，1:下拉刷新，2:上拉加载更多
			isPull: false, 						//  是否在上拉加载更多
			isPullDown: false, 					//	是否在下拉刷新
			isRefresh : false, 					//	是否松开加载数据中
			refreshTip: '加载中……'				//	tip内容
		}
	},
	methods:{
		getTouchPosition(e) {
		  	e = e.originalEvent || e;

		  	if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
		    	return {
		      		x: e.targetTouches[0].pageX,
		      		y: e.targetTouches[0].pageY
		    	};
		  	} else {
		    	return {
		      		x: e.pageX,
		      		y: e.pageY
		    	};
		  	}
		},
		fnTranslate : function(dom,distance){
		    var result = '';
		    result = '0px,'+distance+'px';
		    dom.css({
		        '-webkit-transform':'translate('+result+')',
		        '-moz-transform':'translate('+result+')',
		        '-ms-transform':'translate('+result+')',
		        '-o-transform':'translate('+result+')',
		        'transform':'translate('+result+')'
		    });
		},
		fnTransition : function(dom,type){
            dom.css({
                '-webkit-transition':'all  '+(type == 1 ? '0s': '0.5s') +' cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                'transition':'all '+(type == 1 ? '0s': '0.5s') +' cubic-bezier(0.22, 0.69, 0.72, 0.88)'
            });
        },
		getTransform : function (el) {
		    var results = el.css('-webkit-transform').replace(/[d]/g,',').replace(/[^0-9\-\.,]/g,'').split(',');

		    if(!results || results.length == 1) return [0,0];
		    return results.slice(4, 6);
		},
		dataReset : function(){
			var _V = this;
			_V.isPullDown = false;
			_V.isRefresh = false;
			_V.isPull = false;
			_V.state = 0;
			_V.refreshTip = "加载中……";
		},
		judgeSuccess : function(){
			var _V = this,
				t,t1;
			if(!_V.onMore){
				_V.refreshTip = _V.onTip;
				t = setTimeout( ()=>{
					clearTimeout(t);
					_V.onMore = true;
					_V.pullCunt = 0;
					_V.fnTranslate($('.scroll-box').find('.scroll-shift'),0);
					t1 = setTimeout( ()=> {
						clearTimeout(t1);
						_V.dataReset();
					},505)
				},300);
			}
		}
	},
	watch:{
		onMore: function(n,o){
			this.judgeSuccess();
		},
		onContentChange: function(n,o){
			let box = this.onClass;

			if(!$('.'+box).length) return;
			
			this.fnTranslate($('.'+box).find('.pull-content'),0);
			this.onContentChange = false;
		}
	},
	directives:{
		'touch':function (el, binding, vnode){
			var _V = vnode.context,
				container = $(el).find('.scroll-shift'),
				content = $(el).find('.pull-content'),
				isScrolling = 1;

			var TOUCHSTART, TOUCHMOVE, TOUCHEND;
			if(typeof(window.ontouchstart) != 'undefined') {
			    TOUCHSTART = 'touchstart';
			    TOUCHEND = 'touchend';
			    TOUCHMOVE = 'touchmove';

			} else if(typeof(window.onmspointerdown) != 'undefined') {
			    TOUCHSTART = 'MSPointerDown';
			    TOUCHEND = 'MSPointerUp';
			    TOUCHMOVE = 'MSPointerMove';
			} else {
			    TOUCHSTART = 'mousedown';
			    TOUCHEND = 'mouseup';
			    TOUCHMOVE = 'mousemove';
			}

			if (el.addEventListener) {
			  	el.addEventListener(TOUCHSTART,fnTouchStart,false); 
			  	el.addEventListener(TOUCHMOVE,fnTouchMove,false); 
			  	el.addEventListener(TOUCHEND,fnTouchEnd,false); 
			} else if (el.attachEvent)  {
			  	el.attachEvent(TOUCHSTART,fnTouchStart); 
			  	el.attachEvent(TOUCHMOVE,fnTouchMove); 
			  	el.attachEvent(TOUCHEND,fnTouchEnd);
			}
			function fnTouchStart(e){
				_V.start = _V.getTouchPosition(e);
				_V.transformVal = _V.getTransform(content);
				_V.fnTransition(container,1);
				isScrolling = undefined;
				//_V.dataReset();
			}
			function fnTouchMove(e){
				if (e.preventDefault) e.preventDefault();
				else e.returnValue = false;

				if(typeof isScrolling != 'undefined') return;

				let move = _V.getTouchPosition(e),
					diff = {
						x: move.x - _V.start.x,
						y: move.y - _V.start.y
					};
				let containerHeight = container.height(),
					contentHeight = content.height(),
					transBox = contentHeight - containerHeight
					;
				let moveTop = diff.y+parseInt(_V.transformVal[1],10);

				if(moveTop >= 0) {
					// console.log('麻了隔壁，到顶了');

					_V.fnTranslate(content,0);
					_V.fnTranslate(container,moveTop);

					if(_V.onMode == 2 || _V.onMode == 3) return;

					if(moveTop >= 30){
						_V.isPullDown = true;
						_V.isRefresh = false;
						_V.state = 1;
						// console.log('到顶了你TMD还在拉')
					}else{
						_V.dataReset();
					}

				}else if(moveTop <= -transBox){
					// console.log('诶，我说，到底了');

					if(transBox<= 0) {
						_V.fnTranslate(content,0);
						_V.fnTranslate(container,moveTop);
					}
					else {
						_V.fnTranslate(content,-transBox);
						_V.fnTranslate(container,moveTop+transBox);
					}

					
					if(_V.onMode == 1 || _V.onMode == 3) return;

					if(moveTop+transBox <= -30){
						_V.isPull = true;
						_V.state = 2;
						if(_V.pullCunt == 0){
							_V.pullCunt = 1;
							_V.onInfinite();
						}
						// console.log('到底了你TMD什么意思')
					}else{
						_V.dataReset();
					}
				}else{
					_V.fnTranslate(content,moveTop);
					_V.dataReset();
				}
			}
			function fnTouchEnd(e){
				/*
					_V.state 代表数据加载模式,
					0	不做任何处理
					1	下拉刷新
					2	上拉加载更多
				*/
				isScrolling = 1;
				_V.fnTransition(container,2);
				if(_V.state == 0){
					_V.fnTranslate(container,0);
					return;
				} 
				if(_V.state == 1){
					if(_V.onTipShow) _V.fnTranslate(container,30);
					else _V.fnTranslate(container,0);

					_V.isRefresh = true;
					if(_V.pullCunt == 0){
						_V.pullCunt = 1;
						_V.onRefresh();
					}
				}
				if(_V.state == 2){
					if(_V.onTipShow) _V.fnTranslate(container,-30);
					else _V.fnTranslate(container,0);
				}
			}
		}
	}
}
</script>