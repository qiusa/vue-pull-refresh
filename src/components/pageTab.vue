<template>
    <nav class="refresh-nav">
	    <div class="refresh-nav-box">
	    	<div class="refresh-item" v-bind:class="{active: type ==1}">
	    		<router-link to="/model0">
		    		<div class="refresh-title">
		    			模式0
		    		</div>
		    	</router-link>
	    	</div>
	    	<div class="refresh-item" v-bind:class="{active : type == 2}">
	    		<router-link to="/model1">
		    		<div class="refresh-title">
		    			模式1
		    		</div>
		    	</router-link>
	    	</div>
	    	<div class="refresh-item" v-bind:class="{active: type ==3}">
	    		<router-link to="/model2">
		    		<div class="refresh-title">
		    			模式2
		    		</div>
		    	</router-link>
	    	</div>
	    	<div class="refresh-item" v-bind:class="{active: type ==4}">
	    		<router-link to="/model3">
		    		<div class="refresh-title">
		    			模式3
		    		</div>
		    	</router-link>
	    	</div>
	    </div>
    </nav>
</template>
<script type="text/javascript">
	export default{
		props:['type']
	}
</script>