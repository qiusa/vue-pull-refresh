<template>
	<div>
		<v-refresh 
		:on-class = "'model-scroll'"
		:on-mode = "0"
		:on-more = "success"  
		:on-tip = "tip"
		:on-tip-show = "true"
		:on-infinite = "infinite"
		:on-refresh = "refresh" >
			<ul class="model-list">
				<li v-for="(i,index) in item">
					<span>{{i}}</span>
				</li>
			</ul>
		</v-refresh>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				item: 7,
				success: true,
				tip: '主人看我,看我干嘛'
			}
		},
		methods:{
			infinite : function(){
				var _V = this;
				/*	这里是模拟ajax或者什么其他的请求数据延迟的情况，
				*	所以我随便延迟了1秒，不然加载成功很快，过渡的
				*	文字提示可能看都看不到
				*/
				setTimeout(()=>{
					_V.item += 1;
					_V.success = false;
				},1000);
			},
			refresh : function(){
				var _V = this;
				/*	这里是模拟ajax或者什么其他的请求数据延迟的情况，
				*	所以我随便延迟了1秒，不然加载成功很快，过渡的
				*	文字提示可能看都看不到
				*/
				setTimeout(()=>{
					_V.item += 1;
					_V.success = false;
				},1000);
			}
		}
	}
</script>