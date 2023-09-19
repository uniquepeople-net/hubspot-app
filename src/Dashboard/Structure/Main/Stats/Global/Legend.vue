<template>
	<div class="legend d-flex align-items-center justify-content-between mt-1 w-100 mx-auto">
		
		<span v-for="legend in legends" class="mx-1 center-center" >
			<i :class="`${legend.icon} icon`" :style="`color:${legend.color};`"></i>
			<span class="ms-1 text-x-small">{{ legend.title }}</span>
		</span>
			
	</div>
</template>
 
 
<script>
	export default {
		props: {
			legends: Array
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>

 
<style lang='scss' scoped>
.legend {
	max-width: 370px;
	.icon {
		font-size: 13px;
	}
}
</style>