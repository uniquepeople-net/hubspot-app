<template>

	<MatchSelects />

	<StatChart :accurate="50" :inacurate="15" title="Passes" :accColor="getRandom(chartColors)"/>
	<StatChart :accurate="30" :inacurate="20" title="Shots" :accColor="getRandom(chartColors)"/>
	<StatChart :accurate="11" :inacurate="3" title="Challenges" :accColor="getRandom(chartColors)"/>

</template>
 
 
<script>
	import StatChart from '../../../global/StatChart.vue'
import MatchSelects from './MatchSelects.vue'

	
	export default {
		components: { StatChart, MatchSelects },
		data() {
			return {
				chartColors: ['#EBF5F7', '#5BB0BA', '#B2C4CB', '#F3F3E7', '#96AD90', '#3A4A3D', '#478C5C'  ]
			}
		},
		methods: {
			getRandom(arr) {
				return arr[Math.floor(Math.random() * arr.length)]
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>

</style>