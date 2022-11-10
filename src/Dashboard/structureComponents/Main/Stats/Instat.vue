<template>

	<MatchSelects class="mb-4"/>

	<MatchCard />

	<div class="row">
		<div class="col-6 col-sm-6 col-md-4 col-lg-3">
			<StatChart :accurate="50" :inacurate="15" title="Passes" :accColor="getRandom(chartColors)" :inaccColor="getRandom(chartColors)"/>
		</div>
		<div class="col-6 col-sm-6 col-md-4 col-lg-3">
			<StatChart :accurate="30" :inacurate="20" title="Shots" :accColor="getRandom(chartColors)" :inaccColor="getRandom(chartColors)"/>
		</div>
		<div class="col-6 col-sm-6 col-md-4 col-lg-3">
			<StatChart :accurate="11" :inacurate="3" title="Challenges" :accColor="getRandom(chartColors)" :inaccColor="getRandom(chartColors)"/>
		</div>
	</div>

</template>
 
 
<script>
	import MatchSelects from './MatchSelects.vue'
	import MatchCard from '../../../global/MatchCard.vue'
	import StatChart from '../../../global/StatChart.vue'

	
	export default {
		components: { StatChart, MatchSelects, MatchCard },
		data() {
			return {
				chartColors: ['#67595E', '#05445E', '#189AB4', '#211522', '#613659', '#3A4A3D', '#96AD90', '#171515', '#6F5B3E'  ]
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