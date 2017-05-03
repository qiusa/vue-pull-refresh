<template>
	<div>
		<v-refresh 
		:on-class = "'model-scroll'"
		:on-mode = "3">
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
				item: 8
			}
		}
	}
</script>