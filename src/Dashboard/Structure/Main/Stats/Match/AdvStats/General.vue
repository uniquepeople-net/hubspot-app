<template>
	<div>
		<CircleStat :value1="45" :value2="55" :percentage="true" title="Possession"/>
		<StatBarSides />
	</div>
</template>
 
 
<script>
	import CircleStat from '../../Global/CircleStat.vue'
	import StatBarSides from '../../Global/StatBarSides.vue'
	
	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { CircleStat, StatBarSides },
	}
</script>
 
 
<style lang='scss' scoped>
</style>