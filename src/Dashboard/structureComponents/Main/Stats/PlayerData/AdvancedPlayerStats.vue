<template>
	<div>
		<div v-for="(stat, index) in advancedStats">

			<PlayerStatBar v-if="stat.title !== 'divider'" :title="stat.title" :data1="stat.data1" :data2="stat.data2"
							:completeData="stat.completeData" :direction="stat.direction" :successText="stat.successText"
							:failedText="stat.failedText" :key="index" :small="stat.small">

					<template v-slot:icon1><Target /></template>
					<template v-slot:icon2><OffTarget /></template>

			</PlayerStatBar>

			<Divider v-if="stat.title === 'divider'" class="my-4"/>
			
		</div>
		
		<!-- <Divider class="my-4"/>

		<PlayerStatBar :title="$t('message.Duels')" :data1="duelsGood" :data2="duelsBad"
								:completeData="duels" direction="row" >
						<template v-slot:icon1><Success /></template>
						<template v-slot:icon2><Failed /></template>
	
		</PlayerStatBar>

		<div class="row">
			<div class="col-6">
				<PlayerStatBar :title="$t('message.OffensiveDuels')" :data1="offensiveDuelsGood" :data2="offensiveDuelsBad"
								:completeData="offensiveDuels" direction="column" :small="true">
						<template v-slot:icon1><Success /></template>
						<template v-slot:icon2><Failed /></template>
				</PlayerStatBar>
			</div>

			<div class="col-6">
				<PlayerStatBar :title="$t('message.DefensiveDuels')" :data1="defensiveDuelsGood" :data2="defensiveDuelsBad"
								:completeData="defensiveDuels" direction="column" :small="true">
						<template v-slot:icon1><Success /></template>
						<template v-slot:icon2><Failed /></template>
				</PlayerStatBar>
			</div>
		</div>

		<PlayerStatBar :title="$t('message.AerialDuels')" :data1="aerialDuelsGood" :data2="aerialDuelsBad"
								:completeData="aerialDuels" direction="row" :small="true">
				<template v-slot:icon1><Success /></template>
				<template v-slot:icon2><Failed /></template>
		</PlayerStatBar>

		<Divider class="my-5"/>

 		<div class="row mt-3">
			<div class="col-4">
				<AdvancedMatchStatsChart :title="$t('message.AerialDuels')" :data1="aerialDuelsGood" :data2="aerialDuelsBad"
										 :percentage="false" :chartData="aerialDuelsData" 
										 :complete="true" :completeData="aerialDuels"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart :title="$t('message.DefensiveDuels')" :data1="defensiveDuelsGood" :data2="defensiveDuelsBad"
										 :percentage="false" :chartData="defensiveDuelsData" 
										 :complete="true" :completeData="defensiveDuels"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart :title="$t('message.OffensiveDuels')" :data1="offensiveDuelsGood" :data2="offensiveDuelsBad"
										 :percentage="false" :chartData="offensiveDuelsData" 
										 :complete="true" :completeData="offensiveDuels"/>
			</div>
		</div>
		<div class="mt-3">
			<AdvancedPlayerStatsBar v-for="stat in advStatBars2" :title="stat.label" :value="stat.value"/>
		</div>
		<div class="row mt-3">
			<div class="col-4">
				<AdvancedMatchStatsChart :title="$t('message.BackPasses')" :data1="backPassesGood" :data2="backPassesBad"
										 :percentage="false" :chartData="backPassesData" 
										 :complete="true" :completeData="backPasses"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart :title="$t('message.ForwardPasses')" :data1="forwardPassesGood" :data2="forwardPassesBad"
										 :percentage="false" :chartData="forwardPassesData" 
										 :complete="true" :completeData="forwardPasses"/>
			</div>
			<div class="col-4">
				<AdvancedMatchStatsChart :title="$t('message.VerticalPasses')" :data1="verticalPassesGood" :data2="verticalPassesBad"
										 :percentage="false" :chartData="verticalPassesData" 
										 :complete="true" :completeData="verticalPasses"/>
			</div>
		</div> -->
	</div>
</template>
 
 
<script>
	import AdvancedMatchStatsBar from '../MatchData/AdvancedMatchStatsBar.vue'
	import AdvancedMatchStatsChart from '../MatchData/AdvancedMatchStatsChart.vue'
import Failed from '../Vectors/Failed.vue';
	import OffTarget from '../Vectors/OffTarget.vue';
import Success from '../Vectors/Success.vue';
	import Target from '../Vectors/Target.vue';
	import AdvancedPlayerStatsBar from './AdvancedPlayerStatsBar.vue';
	import PlayerStatBar from './PlayerStatBar.vue';

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
			advancedStats() {
				return [
					{ title: this.$i18n.t('message.Shots'), data1: this.stats.total.shotsOnTarget, data2: (this.shots - this.shotsOnTarget),
					completeData: this.stats.total.shots, direction: "row", successText:  this.$i18n.t('message.OnTarget'), failedText: this.$i18n.t('message.OffTarget') },
					
					{ title: 'divider' },

					{ title: this.$i18n.t('message.Duels'), data1: this.stats.total.duelsWon, data2: (this.duels - this.duelsGood),
					completeData: this.stats.total.duels, direction: "row" },
					
					{ title: this.$i18n.t('message.OffensiveDuels'), data1: this.stats.total.offensiveDuelsWon, data2: (this.offensiveDuels - this.offensiveDuelsGood), small: true,
					completeData: this.stats.total.offensiveDuels, direction: "column" },
					
					{ title: this.$i18n.t('message.DefensiveDuels'), data1: this.stats.total.defensiveDuelsWon, data2: (this.defensiveDuels - this.defensiveDuelsGood), small: true,
					completeData: this.stats.total.defensiveDuels, direction: "column" },
					
					
				]
			},
			
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
					{ label: this.$i18n.t("message.ShotAssists"), value: this.stats.total.shotAssists + this.stats.total.shotOnTargetAssists },
					{ label: this.$i18n.t("message.BlockedShots"), value: this.stats.total.shotsBlocked },
					{ label: this.$i18n.t("message.Corners"), value: this.stats.total.corners },
					{ label: this.$i18n.t("message.Crosses"), value: this.stats.total.crosses },
					{ label: this.$i18n.t("message.Fouls"), value: this.stats.total.fouls },
					{ label: this.$i18n.t("message.FoulsSuffered"), value: this.stats.total.foulsSuffered },
					{ label: this.$i18n.t("message.Dribbles"), value: this.stats.total.dribbles },
				]
			},
			advStatBars2() {			
				return [
					{ label: this.$i18n.t("message.ReceivedPasses"), value: this.stats.total.receivedPass },
					{ label: this.$i18n.t("message.Offsides"), value: this.stats.total.offsides },
					{ label: this.$i18n.t("message.Losses"), value: this.stats.total.losses },
					{ label: this.$i18n.t("message.Freekicks"), value: this.stats.total.freeKicks },
					{ label: this.$i18n.t("message.AttackingActions"), value: this.stats.total.attackingActions },
					{ label: this.$i18n.t("message.DefensiveActions"), value: this.stats.total.defensiveActions },
				]
			}
		},
		components: { AdvancedMatchStatsChart, AdvancedPlayerStatsBar, PlayerStatBar, Target, OffTarget, Failed, Success },
	}
</script>

 
<style lang='scss' scoped>
</style>