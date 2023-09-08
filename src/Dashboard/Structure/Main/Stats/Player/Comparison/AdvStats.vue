<template>
	<div>
		<TabView scrollable>
			<TabPanel v-if="items" v-for="item in items" :header="item.title">
				
				<div v-for="stat in item.stats" :class="`item-stat ${stat.type === 'duplex' ? 'mt-3' : ''}`">
					<CircleStat v-if="stat.type === 'circle'" :value1="stat.valuePl1" :value2="stat.valuePl2" :percentage="stat.percentage" :title="stat.title"/>
					<StatBarSides v-if="stat.type === 'barSides'" :title="stat.title" :valueHome="stat.valuePl1" :valueAway="stat.valuePl2" />
					<StatBarDuplex v-if="stat.type === 'duplex' && checkNull(stat.valuePl1, stat.valuePl2)" :title="stat.title" :valueHome="stat.valuePl1" :valueAway="stat.valuePl2" />
				</div>				

			</TabPanel>				
		</TabView>

		<LoadingIcon v-if="(selectedMatch1 && selectedMatch2) && (!player1Stats || !player2Stats)" :title="$t('message.Stats').toLowerCase()"/>		

	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import CircleStat from '../../Global/CircleStat.vue'
	import StatBarSides from '../../Global/StatBarSides.vue';
	import StatBarDuplex from '../../Global/StatBarDuplex.vue';


	export default {
		props: {
			selectedMatch1: Object,
			selectedMatch2: Object
		},
		data() {
			return {
			}
		},
		methods: {
			checkNull( value1, value2 ) {
				if ( value1 === 0 && value2 === 0 ) {
					return false
				} else if ( value1.toString().includes(':') & value2.toString().includes(':') ) {
					if ( this.timeToNumber(value1) <= 0 && this.timeToNumber(value2) <= 0 ) {
						return false
					} else return true
				} else return true
			},
		},
		computed: {
			...mapGetters({ player1Stats: 'stats/playerStats',
							player2Stats: 'stats/player2Stats' }),
			items() { 
				let totalStatsPl1 = this.player1Stats ? this.player1Stats.total : null
				let totalStatsPl2 = this.player2Stats ? this.player2Stats.total : null
				let i18n = this.$i18n
				if ( totalStatsPl1 && totalStatsPl2 ) {
					return [
						{ title: i18n.t('message.KEYSTATS'), stats: [
							{ title: i18n.t('message.TotalAttempts'), valuePl1: totalStatsPl1.shots, valuePl2: totalStatsPl2.shots, type: "circle" },
							{ title: i18n.t('message.Goals'), valuePl1: totalStatsPl1.goals, valuePl2: totalStatsPl2.goals, type: "barSides" },
							{ title: i18n.t('message.Passes'), valuePl1: totalStatsPl1.passes, valuePl2: totalStatsPl2.passes, type: "barSides" },
							{ title: i18n.t('message.Offsides'), valuePl1: totalStatsPl1.offsides, valuePl2: totalStatsPl2.offsides, type: "barSides" },
							{ title: i18n.t('message.Fouls'), valuePl1: totalStatsPl1.fouls, valuePl2: totalStatsPl2.fouls, type: "barSides" },
							{ title: i18n.t('message.Corners'), valuePl1: totalStatsPl1.corners, valuePl2: totalStatsPl2.corners, type: "barSides"  },
							{ title: i18n.t('message.Yellowcards'), valuePl1: totalStatsPl1.yellowCards, valuePl2: totalStatsPl2.yellowCards, type: "barSides" },
							{ title: i18n.t('message.Redcards'), valuePl1: totalStatsPl1.redCards, valuePl2: totalStatsPl2.redCards, type: "barSides" },
							{ title: i18n.t('message.Assists'), valuePl1: totalStatsPl1.assists, valuePl2: totalStatsPl2.assists, type: "barSides" },
							{ title: i18n.t('message.Minutesplayed'), valuePl1: totalStatsPl1.minutesOnField, valuePl2: totalStatsPl2.minutesOnField, type: "barSides" },
						]},

						{ title: i18n.t('message.DISTRIBUTION'), stats: [
							{ title: i18n.t('message.Passes'), valuePl1: totalStatsPl1.passes, valuePl2: totalStatsPl2.passes, type: "barSides"},
							{ title: i18n.t('message.Successfulpasses') , valuePl1: totalStatsPl1.successfulPasses, valuePl2: totalStatsPl2.successfulPasses, type: "duplex"},
							{ title: i18n.t('message.SmartPasses'), valuePl1: totalStatsPl1.smartPasses, valuePl2: totalStatsPl2.smartPasses, type: "barSides" },
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.SmartPasses').toLowerCase(), valuePl1: totalStatsPl1.successfulSmartPasses , valuePl2: totalStatsPl2.successfulSmartPasses, type: "duplex"},
							{ title: i18n.t('message.Crosses'), valuePl1: totalStatsPl1.crosses, sub: [ { title: i18n.t('message.CrossesSuccessful'), valuePl1: totalStatsPl1.successfulCrosses} ] },
							{ title: i18n.t('message.PassesToFinalThird'), valuePl1: totalStatsPl1.passesToFinalThird, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.PassesToFinalThird').toLowerCase(), valuePl1: totalStatsPl1.successfulPassesToFinalThird} ] },
							{ title: i18n.t('message.ForwardPasses'), valuePl1: totalStatsPl1.forwardPasses, sub: [ { title: i18n.t('message.ForwardPassesSuccessful'), valuePl1: totalStatsPl1.successfulForwardPasses} ] },
							{ title: i18n.t('message.BackPasses'), valuePl1: totalStatsPl1.backPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.BackPasses').toLowerCase(), valuePl1: totalStatsPl1.successfulBackPasses} ] },
							{ title: i18n.t('message.ThroughPasses'), valuePl1: totalStatsPl1.throughPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.ThroughPasses').toLowerCase(), valuePl1: totalStatsPl1.successfulThroughPasses} ] },
							{ title: i18n.t('message.KeyPasses'), valuePl1: totalStatsPl1.keyPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.KeyPasses').toLowerCase(), valuePl1: totalStatsPl1.successfulKeyPasses} ] },
							{ title: i18n.t('message.VerticalPasses'), valuePl1: totalStatsPl1.verticalPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.VerticalPasses').toLowerCase(), valuePl1: totalStatsPl1.successfulVerticalPasses} ] },
							{ title: i18n.t('message.LongPasses'), valuePl1: totalStatsPl1.longPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LongPasses').toLowerCase(), valuePl1: totalStatsPl1.successfulLongPasses} ] },
							{ title: i18n.t('message.ProgressivePasses'), valuePl1: totalStatsPl1.progressivePasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.ProgressivePasses').toLowerCase(), valuePl1: totalStatsPl1.successfulProgressivePasses} ] },
							{ title: i18n.t('message.LateralPasses'), valuePl1: totalStatsPl1.lateralPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LateralPasses').toLowerCase(), valuePl1: totalStatsPl1.successfulLateralPasses} ] },
							{ title: i18n.t('message.ReceivedPasses'), valuePl1: totalStatsPl1.receivedPass },
							{ title: i18n.t('message.TouchInBox'), valuePl1: totalStatsPl1.touchInBox },
							{ title: i18n.t('message.ProgressiveRun'), valuePl1: totalStatsPl1.progressiveRun },
							{ title: i18n.t('message.Offsides'), valuePl1: totalStatsPl1.offsides },
						]},

						{ title: i18n.t('message.ATTACKING'), stats: [
							{ title: i18n.t('message.Goals'), valuePl1: totalStatsPl1.goals },
							{ title: i18n.t('message.TotalAttempts'), valuePl1: totalStatsPl1.shots, sub: [ { title: i18n.t('message.Shotsontarget'), valuePl1: totalStatsPl1.shotsOnTarget },
																									{ title: i18n.t('message.HeadShots'), valuePl1: totalStatsPl1.headShots } ] },
							{ title: i18n.t('message.Dribbles'), valuePl1: totalStatsPl1.dribbles, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.Dribbles').toLowerCase(), valuePl1: totalStatsPl1.successfulDribbles} ] },
							{ title: i18n.t('message.Corners'), valuePl1: totalStatsPl1.corners },
							{ title: i18n.t('message.Assists'), valuePl1: totalStatsPl1.assists, sub: [ { title: i18n.t('message.ShotAssists'), valuePl1: totalStatsPl1.shotAssists, nonRatio: true },
																								{ title: i18n.t('message.SecondAssists'), valuePl1: totalStatsPl1.secondAssists, nonRatio: true },
																								{ title: i18n.t('message.ThirdAssists'), valuePl1: totalStatsPl1.thirdAssists, nonRatio: true },
																								{ title: i18n.t('message.ShotOnTargetAssists'), valuePl1: totalStatsPl1.shotOnTargetAssists, nonRatio: true }, ] },
							{ title: i18n.t('message.Freekicks'), valuePl1: totalStatsPl1.freeKicks, sub: [ { title: i18n.t('message.FreeKicksOnTarget'), valuePl1: totalStatsPl1.freeKicksOnTarget },
																								{ title: i18n.t('message.DirectFreeKicks'), valuePl1: totalStatsPl1.directFreeKicks },
																								{ title: i18n.t('message.DirectFreeKicksOnTarget'), valuePl1: totalStatsPl1.directFreeKicksOnTarget },] },
							{ title: i18n.t('message.Penalties'), valuePl1: totalStatsPl1.penalties, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.Penalties').toLowerCase(), valuePl1: totalStatsPl1.successfulPenalties} ] },
							{ title: i18n.t('message.AttackingActions'), valuePl1: totalStatsPl1.attackingActions, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.AttackingActions').toLowerCase(), valuePl1: totalStatsPl1.successfulAttackingActions} ] },
							{ title: i18n.t('message.LinkupPlays'), valuePl1: totalStatsPl1.linkupPlays, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LinkupPlays').toLowerCase(), valuePl1: totalStatsPl1.successfulLinkupPlays} ] },
							{ title: i18n.t('message.Accelerations'), valuePl1: totalStatsPl1.accelerations },
							{ title: i18n.t('message.MissedBalls'), valuePl1: totalStatsPl1.missedBalls },
						]},

						{ title: i18n.t('message.DEFENDING'), stats: [
							{ title: i18n.t('message.Interceptions'), valuePl1: totalStatsPl1.interceptions },
							{ title: i18n.t('message.DefensiveActions'), valuePl1: totalStatsPl1.defensiveActions, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.DefensiveActions').toLowerCase(), valuePl1: totalStatsPl1.successfulDefensiveAction } ]},
							{ title: i18n.t('message.Recoveries'), valuePl1: totalStatsPl1.recoveries, sub: [ { title: i18n.t('message.OpponentHalfRecoveries'), valuePl1: totalStatsPl1.opponentHalfRecoveries },
																										{ title: i18n.t('message.DangerousOpponentHalfRecoveries'), valuePl1: totalStatsPl1.dangerousOpponentHalfRecoveries } ] },
							{ title: i18n.t('message.BlockedShots'), valuePl1: totalStatsPl1.shotsBlocked },
							{ title: i18n.t('message.SlidingTackles'), valuePl1: totalStatsPl1.slidingTackles, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.SlidingTackles').toLowerCase(), valuePl1: totalStatsPl1.successfulSlidingTackles } ]},
							{ title: i18n.t('message.Clearances'), valuePl1: totalStatsPl1.clearances },
						]},

						{ title: i18n.t('message.DUELS'), stats: [
							{ title: i18n.t('message.Duels'), valuePl1: totalStatsPl1.duels },
							{ title: i18n.t('message.Successfulduels'), valuePl1: totalStatsPl1.duelsWon },
							{ title: i18n.t('message.DefensiveDuels'), valuePl1: totalStatsPl1.defensiveDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.DefensiveDuels').toLowerCase(), valuePl1: totalStatsPl1.defensiveDuelsWon } ]},
							{ title: i18n.t('message.OffensiveDuels'), valuePl1: totalStatsPl1.offensiveDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.OffensiveDuels').toLowerCase(), valuePl1: totalStatsPl1.offensiveDuelsWon } ]},
							{ title: i18n.t('message.AerialDuels'), valuePl1: totalStatsPl1.aerialDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.AerialDuels').toLowerCase(), valuePl1: totalStatsPl1.aerialDuelsWon } ]},
							{ title: i18n.t('message.FieldAerialDuels'), valuePl1: totalStatsPl1.fieldAerialDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.FieldAerialDuels').toLowerCase(), valuePl1: totalStatsPl1.fieldAerialDuelsWon } ]},
							{ title: i18n.t('message.PressingDuels'), valuePl1: totalStatsPl1.pressingDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.PressingDuels').toLowerCase(), valuePl1: totalStatsPl1.pressingDuelsWon } ]},
							{ title: i18n.t('message.LooseBallDuels'), valuePl1: totalStatsPl1.looseBallDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LooseBallDuels').toLowerCase(), valuePl1: totalStatsPl1.looseBallDuelsWon } ]},
							{ title: i18n.t('message.Totallooses'), valuePl1: totalStatsPl1.losses, sub: [ { title: i18n.t('message.OwnHalfLooses'), valuePl1: totalStatsPl1.ownHalfLosses },
																									{ title: i18n.t('message.DangerousOwnHalfLooses'), valuePl1: totalStatsPl1.dangerousOwnHalfLosses }] },
						] },
						{ title: i18n.t('message.DISCIPLINARY'), stats: [
							{ title: i18n.t('message.Fouls'), valuePl1: totalStatsPl1.fouls },
							{ title: i18n.t('message.FoulsSuffered'), valuePl1: totalStatsPl1.foulsSuffered },
							{ title: i18n.t('message.Yellowcards'), valuePl1: totalStatsPl1.yellowCards },
							{ title: i18n.t('message.Redcards'), valuePl1: totalStatsPl1.redCards },
							{ title: i18n.t('message.DirectRedCards'), valuePl1: totalStatsPl1.directRedCards },
						] },
					]
				}
			}
		},
		components: { TabView, TabPanel, CircleStat, StatBarSides, StatBarDuplex }
	}
</script>
 
 
<style lang='scss' scoped>
.item-stat {
	margin-top: 2.5rem;
}
</style>