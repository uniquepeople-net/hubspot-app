<template>
	<div>
		<div class="row">
			<div class="col-4">
				<AdvancedMatchStatsChart title="Shots" :data1="shotsOnTarget" :data2="shotsWide"
										 :percentage="false" :chartData="possessionData" 
										 :complete="true" :completeData="shots"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Duels" :data1="duelsGood" :data2="duelsBad"
										 :percentage="false" :chartData="duelsData" 
										 :complete="true" :completeData="duels"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Passes" :data1="passesGood" :data2="passesBad"
										 :percentage="false" :chartData="passesData" 
										 :complete="true" :completeData="passes"/>
			</div>
		</div>
		<div class="mt-3">
			<AdvancedPlayerStatsBar v-for="stat in advStatBars" :title="stat.label" :value="stat.value"/>
		</div>
		<div class="row mt-3">
			<div class="col-4">
				<AdvancedMatchStatsChart title="Aerial Duels" :data1="aerialDuelsGood" :data2="aerialDuelsBad"
										 :percentage="false" :chartData="aerialDuelsData" 
										 :complete="true" :completeData="aerialDuels"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Defensive Duels" :data1="defensiveDuelsGood" :data2="defensiveDuelsBad"
										 :percentage="false" :chartData="defensiveDuelsData" 
										 :complete="true" :completeData="defensiveDuels"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Offensive Duels" :data1="offensiveDuelsGood" :data2="offensiveDuelsBad"
										 :percentage="false" :chartData="offensiveDuelsData" 
										 :complete="true" :completeData="offensiveDuels"/>
			</div>
		</div>
		<div class="mt-3">
			<AdvancedPlayerStatsBar v-for="stat in advStatBars2" :title="stat.label" :value="stat.value"/>
		</div>
		<div class="row mt-3">
			<div class="col-4">
				<AdvancedMatchStatsChart title="Back Passes" :data1="backPassesGood" :data2="backPassesBad"
										 :percentage="false" :chartData="backPassesData" 
										 :complete="true" :completeData="backPasses"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Forward passes" :data1="forwardPassesGood" :data2="forwardPassesBad"
										 :percentage="false" :chartData="forwardPassesData" 
										 :complete="true" :completeData="forwardPasses"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart title="Vertical passes" :data1="verticalPassesGood" :data2="verticalPassesBad"
										 :percentage="false" :chartData="verticalPassesData" 
										 :complete="true" :completeData="verticalPasses"/>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import AdvancedMatchStatsBar from '../MatchData/AdvancedMatchStatsBar.vue'
	import AdvancedMatchStatsChart from '../MatchData/AdvancedMatchStatsChart.vue'
	import AdvancedPlayerStatsBar from './AdvancedPlayerStatsBar.vue';
	
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
							backgroundColor: [documentStyle.getPropertyValue('--cyan-600'),documentStyle.getPropertyValue('--gray-300')],
						}
					]					
				}
			}
		},
		computed: { 
			shots() {return this.stats.total.shots},
			shotsOnTarget() { return this.stats.total.shotsOnTarget },
			shotsWide() { return this.shots - this.shotsOnTarget  },
			possessionData() { return this.chartData(this.shotsOnTarget, this.shotsWide) },
			duels() { return this.stats.total.duels },
			duelsGood() { return this.stats.total.duelsWon },
			duelsBad() { return this.duels - this.duelsGood },
			duelsData() { return this.chartData(this.duelsGood, this.duelsBad) },
			passes() { return this.stats.total.passes },
			passesGood() { return this.stats.total.successfulPasses },
			passesBad() { return this.passes - this.passesGood },
			passesData() { return this.chartData(this.passesGood, this.passesBad) },
			aerialDuels() { return this.stats.total.aerialDuels },
			aerialDuelsGood() { return this.stats.total.aerialDuelsWon },
			aerialDuelsBad() { return this.aerialDuels - this.aerialDuelsGood },
			aerialDuelsData() { return this.chartData(this.aerialDuelsGood, this.aerialDuelsBad) },
			defensiveDuels() { return this.stats.total.defensiveDuels },
			defensiveDuelsGood() { return this.stats.total.defensiveDuelsWon },
			defensiveDuelsBad() { return this.defensiveDuels - this.defensiveDuelsGood },
			defensiveDuelsData() { return this.chartData(this.defensiveDuelsGood, this.defensiveDuelsBad) },
			offensiveDuels() { return this.stats.total.offensiveDuels },
			offensiveDuelsGood() { return this.stats.total.offensiveDuelsWon },
			offensiveDuelsBad() { return this.offensiveDuels - this.offensiveDuelsGood },
			offensiveDuelsData() { return this.chartData(this.offensiveDuelsGood, this.offensiveDuelsBad) },
			backPasses() { return this.stats.total.backPasses },
			backPassesGood() { return this.stats.total.successfulBackPasses },
			backPassesBad() { return this.backPasses - this.backPassesGood },
			backPassesData() { return this.chartData(this.backPassesGood, this.backPassesBad) },
			forwardPasses() { return this.stats.total.forwardPasses },
			forwardPassesGood() { return this.stats.total.successfulForwardPasses },
			forwardPassesBad() { return this.forwardPasses - this.forwardPassesGood },
			forwardPassesData() { return this.chartData(this.forwardPassesGood, this.forwardPassesBad) },
			verticalPasses() { return this.stats.total.verticalPasses },
			verticalPassesGood() { return this.stats.total.successfulVerticalPasses },
			verticalPassesBad() { return this.verticalPasses - this.verticalPassesGood },
			verticalPassesData() { return this.chartData(this.verticalPassesGood, this.verticalPassesBad) },
			advStatBars() {			
				return [
					{ label: 'Shot Assists', value: this.stats.total.shotAssists + this.stats.total.shotOnTargetAssists },
					{ label: 'Blocked Shots', value: this.stats.total.shotsBlocked },
					{ label: 'Corners', value: this.stats.total.corners },
					{ label: 'Crosses', value: this.stats.total.crosses },
					{ label: 'Fouls', value: this.stats.total.fouls },
					{ label: 'Fouls Suffered', value: this.stats.total.foulsSuffered },
					{ label: 'Dribbles', value: this.stats.total.dribbles },
				]
			},
			advStatBars2() {			
				return [
					{ label: 'Received Passes', value: this.stats.total.receivedPass },
					{ label: 'Offsides', value: this.stats.total.offsides },
					{ label: 'Losses', value: this.stats.total.losses },
					{ label: 'Free Kicks', value: this.stats.total.freeKicks },
					{ label: 'Attacking Actions', value: this.stats.total.attackingActions },
					{ label: 'Defensive Actions', value: this.stats.total.defensiveActions },
				]
			}
		},
		components: { AdvancedMatchStatsChart, AdvancedPlayerStatsBar },
	}
</script>
 
 
<style lang='scss' scoped>
</style>