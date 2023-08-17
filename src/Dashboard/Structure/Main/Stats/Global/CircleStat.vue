<template>
	<div class="circle-stat">
		<span class="text-value">
			{{ value1 }}
			<span>{{percentage ? '%' : ''}}</span>	
		</span>
		<StatChart :accurate="value1" :inacurate="value2" :title="title" :dialogStat="false" :percentage="percentage"/>
		<span class="text-value">
			{{ value2 }}
			<span>{{percentage ? '%' : ''}}</span>	
		</span>
	</div>
</template>
 
 
<script>
	import StatChart from '../../../../global/StatChart.vue'
	
	export default {
		props: {
			value1: Number,
			value2: Number,
			title: String,
			percentage: Boolean
		},
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { StatChart },
	}
</script>
 
 
<style lang='scss' scoped>
.circle-stat {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>