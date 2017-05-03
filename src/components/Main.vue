<template>
	<div class="container">
		<div class="wrapper">
			<router-view></router-view>
		</div>
		<page-tab :type="type"></page-tab>
	</div>
</template>
<script type="text/javascript">

import style from '../style/main.scss'
import PageTab from '@/components/pageTab'
export default {
	data(){
		return {
			type: ((v)=>{
				return addSate(v.$route);
			})(this)
		}
	},
	watch: {
		// 监视路由，参数为要目标路由和当前页面的路由
		'$route' (to, from){
			var _V = this;
			_V.type = addSate(to);
		}
	},
	components: {
		PageTab
	}
}
var addSate = (arg) => {
	let _t = 1;
	if(arg.name == 'model0') _t = 1;
	if(arg.name == 'model1') _t = 2;
	if(arg.name == 'model2') _t = 3;
	if(arg.name == 'model3') _t = 4;
	return _t;
}
</script>
