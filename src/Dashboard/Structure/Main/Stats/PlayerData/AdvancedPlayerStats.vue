<template>
	<div class="player-stats">

		<PlayerStatIntro />

		<div v-for="(stat, index) in advancedStats" :key="index" :class="stat.class ? stat.class : ''">

			<PlayerStatBar v-if="stat.completeData" :title="stat.title" :data1="stat.data1" :data2="stat.data2"
								:completeData="stat.completeData" :direction="stat.direction" :successText="stat.successText"
								:failedText="stat.failedText" :key="index" :small="stat.small">

						<template v-slot:icon1>
							<Target v-if="stat.icon && stat.icon === 'target'"/>
							<Success v-if="!stat.icon" />
						</template>
						<template v-slot:icon2>
							<OffTarget v-if="stat.icon && stat.icon === 'target'"/>
							<Failed v-if="!stat.icon" />
						</template>
						
			</PlayerStatBar>

			<Divider v-if="stat.title === 'divider'" class="divider"/>
			
		</div>
		
		<h5 class="header-main mb-3">{{ $t('message.Other') }}</h5>
		
		<div v-for="(stat, index) in advStatBars" :key="index" class="mb-2">
			<PlayerStatSimpleBar :title="stat.title" :value="stat.value"/>
		</div>

	</div>
</template>
 
 
<script>
	import OffTarget from '../Vectors/OffTarget.vue';
	import Success from '../Vectors/Success.vue';
	import Target from '../Vectors/Target.vue';
	import Failed from '../Vectors/Failed.vue';
	import PlayerStatBar from './PlayerStatBar.vue';
	import PlayerStatSimpleBar from './PlayerStatSimpleBar.vue';
	import PlayerStatIntro from './PlayerStatIntro.vue';

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
					{ title: this.$i18n.t('message.Shots'), data1: this.shotsOnTarget, data2: this.shotsWide, completeData: this.shots, 
					  direction: "row", successText:  this.$i18n.t('message.OnTarget'), failedText: this.$i18n.t('message.OffTarget'), icon: 'target' },
					
					{ title: 'divider' },

					{ title: this.$i18n.t('message.Duels'), data1: this.duelsGood, data2: this.duelsBad,
					  completeData: this.duels, direction: "row" },
					
					{ title: this.$i18n.t('message.OffensiveDuels'), data1: this.offensiveDuelsGood, data2: this.offensiveDuelsBad, small: true,
					  completeData: this.offensiveDuels, direction: "column", tag: true, class: 'col-50 me-2' },

					{ title: this.$i18n.t('message.DefensiveDuels'), data1: this.stats.total.defensiveDuelsWon, data2: (this.defensiveDuels - this.defensiveDuelsGood), small: true,
					  completeData: this.stats.total.defensiveDuels, direction: "column", tag: true, class: 'col-50 ms-2' },
					
					{ title: this.$i18n.t('message.AerialDuels'), data1: this.stats.total.aerialDuelsWon, data2: (this.aerialDuels - this.aerialDuelsGood), small: true,
					  completeData: this.stats.total.aerialDuels, direction: "row" },
					
					{ title: 'divider' },

					{ title: this.$i18n.t('message.Passes'), data1: this.stats.total.successfulPasses, data2: (this.passes - this.passesGood),
					  completeData: this.passes, direction: "row"},

					{ title: this.$i18n.t('message.BackPasses'), data1: this.backPassesGood, data2: this.backPassesBad, small: true,
					  completeData: this.backPasses, direction: "column", tag: true, class: 'col-50 me-2' },
					
					{ title: this.$i18n.t('message.ForwardPasses'), data1: this.forwardPassesGood, data2: this.forwardPassesBad, small: true,
					  completeData: this.forwardPasses, direction: "column", tag: true, class: 'col-50 me-2' },
					
					{ title: this.$i18n.t('message.VerticalPasses'), data1: this.verticalPassesGood, data2: this.verticalPassesBad, small: true,
					  completeData: this.verticalPasses, direction: "row" },

					{ title: 'divider' },
				]
			},
			shots() {return this.stats.total.shots},
			shotsOnTarget() { return this.stats.total.shotsOnTarget },
			shotsWide() { return this.shots - this.shotsOnTarget  },
			duels() { return this.stats.total.duels },
			duelsGood() { return this.stats.total.duelsWon },
			duelsBad() { return this.duels - this.duelsGood },
			passes() { return this.stats.total.passes },
			passesGood() { return this.stats.total.successfulPasses },
			passesBad() { return this.passes - this.passesGood },
			aerialDuels() { return this.stats.total.aerialDuels },
			aerialDuelsGood() { return this.stats.total.aerialDuelsWon },
			aerialDuelsBad() { return this.aerialDuels - this.aerialDuelsGood },
			defensiveDuels() { return this.stats.total.defensiveDuels },
			defensiveDuelsGood() { return this.stats.total.defensiveDuelsWon },
			defensiveDuelsBad() { return this.defensiveDuels - this.defensiveDuelsGood },
			offensiveDuels() { return this.stats.total.offensiveDuels },
			offensiveDuelsGood() { return this.stats.total.offensiveDuelsWon },
			offensiveDuelsBad() { return this.offensiveDuels - this.offensiveDuelsGood },
 			backPasses() { return this.stats.total.backPasses },
			backPassesGood() { return this.stats.total.successfulBackPasses },
			backPassesBad() { return this.backPasses - this.backPassesGood },
			forwardPasses() { return this.stats.total.forwardPasses },
			forwardPassesGood() { return this.stats.total.successfulForwardPasses },
			forwardPassesBad() { return this.forwardPasses - this.forwardPassesGood },
			verticalPasses() { return this.stats.total.verticalPasses },
			verticalPassesGood() { return this.stats.total.successfulVerticalPasses },
			verticalPassesBad() { return this.verticalPasses - this.verticalPassesGood },
			advStatBars() {			
				return [
					{ title: this.$i18n.t("message.ShotAssists"), value: this.stats.total.shotAssists + this.stats.total.shotOnTargetAssists },
					{ title: this.$i18n.t("message.Fouls"), value: this.stats.total.fouls },
					{ title: this.$i18n.t("message.FoulsSuffered"), value: this.stats.total.foulsSuffered },
					{ title: this.$i18n.t("message.BlockedShots"), value: this.stats.total.shotsBlocked },
					{ title: this.$i18n.t("message.Corners"), value: this.stats.total.corners },
					{ title: this.$i18n.t("message.Crosses"), value: this.stats.total.crosses },
					{ title: this.$i18n.t("message.Dribbles"), value: this.stats.total.dribbles },
					{ title: this.$i18n.t("message.ReceivedPasses"), value: this.stats.total.receivedPass },
					{ title: this.$i18n.t("message.Offsides"), value: this.stats.total.offsides },
					{ title: this.$i18n.t("message.Losses"), value: this.stats.total.losses },
					{ title: this.$i18n.t("message.Freekicks"), value: this.stats.total.freeKicks },
					{ title: this.$i18n.t("message.AttackingActions"), value: this.stats.total.attackingActions },
					{ title: this.$i18n.t("message.DefensiveActions"), value: this.stats.total.defensiveActions },
				]
			},
		},
		components: { PlayerStatBar, Target, OffTarget, Failed, Success, PlayerStatSimpleBar, PlayerStatIntro },
	}
</script>

 
<style lang='scss' scoped>
.player-stats {
	.col-50 {
		width: calc(50% - 0.5rem);
		display: inline-block;
		margin: auto;
	}
	.divider {
		margin: 2rem 0;
	}
}
</style>