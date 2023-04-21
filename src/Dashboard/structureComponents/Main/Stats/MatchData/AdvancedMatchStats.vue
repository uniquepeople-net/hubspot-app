<template>
	<div>
		<div class="row">
			<div class="col-4">
				<AdvancedMatchStatsChart title="Ball Possession" :data1="team1Possesion" :data2="team2Possesion"
										 :percentage="true" :chartData="possessionData" />
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Shots on target" :data1="team1Shots" :data2="team2Shots"
										 :percentage="false" :chartData="shotsData" />
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Completed passest" :data1="team1Passes" :data2="team2Passes"
										 :percentage="false" :chartData="passesData" />
			</div>
		</div>
		<div class="mt-3">
			<AdvancedMatchStatsBar v-for="stat in advStatBars" :title="stat.label" :values="stat.values"/>
		</div>
	</div>
</template>
 
 
<script>
	import AdvancedMatchStatsBar from './AdvancedMatchStatsBar.vue'
	import AdvancedMatchStatsChart from './AdvancedMatchStatsChart.vue'
	
	export default {
		props: {
			stats: Object
		},
		methods: {
			chartData(data1, data2) {
				const documentStyle = getComputedStyle(document.body);
				return {
					datasets: [
						{
							data: [data1, data2],
							backgroundColor: [documentStyle.getPropertyValue('--pink-900'),documentStyle.getPropertyValue('--pink-700')],
						}
					]					
				}
			}
		},
		computed: { 
			team1Possesion() { return this.stats.possession.team1.possessionPercent },
			team2Possesion() { return this.stats.possession.team2.possessionPercent },
			possessionData() { return this.chartData(this.team1Possesion, this.team2Possesion) },
			team1Shots() { return this.stats.general.team1.shotsOnTarget },
			team2Shots() { return this.stats.general.team2.shotsOnTarget },
			shotsData() { return this.chartData(this.team1Shots, this.team2Shots) },
			team1Passes() { return this.stats.passes.team1.passes },
			team2Passes() { return this.stats.passes.team2.passes },
			passesData() { return this.chartData(this.team1Passes, this.team2Passes) },
			advStatBars() {			
				return [
					{ label: 'Total Attempts', values: { team1: this.stats.general.team1.shots, team2: this.stats.general.team2.shots } },
					{ label: 'Fouls', values: { team1: this.stats.general.team1.fouls, team2: this.stats.general.team2.fouls } },
					{ label: 'Corners', values: { team1: this.stats.general.team1.corners, team2: this.stats.general.team2.corners } },
					{ label: 'Offsides', values: { team1: this.stats.general.team1.offsides, team2: this.stats.general.team2.offsides } },
					{ label: 'Free kicks', values: { team1: this.stats.general.team1.freeKicks, team2: this.stats.general.team2.freeKicks } },
					{ label: 'Successful duels', values: { team1: this.stats.duels.team1.duelsSuccessful, team2: this.stats.duels.team2.duelsSuccessful } },
					{ label: 'Total looses', values: { team1: this.stats.transitions.team1.lossesTotal, team2: this.stats.transitions.team2.lossesTotal } },
					{ label: 'Successful passes', values: { team1: this.stats.passes.team1.passesSuccessful, team2: this.stats.passes.team2.passesSuccessful } },
				]
			}	
		},
		components: { AdvancedMatchStatsChart, AdvancedMatchStatsBar },
	}
</script>
 
 
<style lang='scss' scoped>
</style>