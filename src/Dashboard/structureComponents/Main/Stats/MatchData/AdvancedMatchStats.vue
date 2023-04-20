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
	</div>
</template>
 
 
<script>
import AdvancedMatchStatsChart from './AdvancedMatchStatsChart.vue'
	export default {
	components: { AdvancedMatchStatsChart },
		props: {
			stats: Object
		},
		mounted() {
			this.possessionData = this.chartData(this.team1Possesion, this.team2Possesion)
			this.shotsData = this.chartData(this.team1Shots, this.team2Shots)
			this.passesData = this.chartData(this.team1Passes, this.team2Passes)
		},
		data() {
			return {
				team1Possesion: this.stats.possession.team1.possessionPercent,
				team2Possesion: this.stats.possession.team2.possessionPercent,
				possessionData: null,
				team1Shots: this.stats.general.team1.shotsOnTarget,
				team2Shots: this.stats.general.team2.shotsOnTarget,
				shotsData: null,
				team1Passes: this.stats.passes.team1.passes,
				team2Passes: this.stats.passes.team2.passes,
				passesData: null,				
			}
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
		watch: {
			stats: function (data) {
				this.team1Possesion = this.stats.possession.team1.possessionPercent
				this.team2Possesion = this.stats.possession.team2.possessionPercent
				this.team1Shots = this.stats.general.team1.shotsOnTarget
				this.team2Shots = this.stats.general.team2.shotsOnTarget
				this.team1Passes = this.stats.passes.team1.passes,
				this.team2Passes = this.stats.passes.team2.passes,
				this.possessionData = this.chartData(this.team1Possesion, this.team2Possesion)
				this.shotsData = this.chartData(this.team1Shots, this.team2Shots)
				this.passesData = this.chartData(this.team1Passes, this.team2Passes)
			},
		}
	}
</script>
 
 
<style lang='scss' scoped>
</style>