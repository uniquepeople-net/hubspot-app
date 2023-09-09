<template>
	<div>
		<TabView scrollable>
			<TabPanel v-if="items" v-for="item in items" :header="item.title">
				
				<div v-for="stat in item.stats" :class="`item-stat ${stat.type === 'duplex' ? 'mt-3' : ''}`">
					<CircleStat v-if="stat.type === 'circle'" :value1="stat.valuePl1" :value2="stat.valuePl2" :percentage="stat.percentage" :title="stat.title"/>
					<StatBarSides v-if="stat.type === 'barSides'" :title="stat.title" :valueHome="stat.valuePl1" :valueAway="stat.valuePl2" />
					<StatBarDuplex v-if="stat.type === 'duplex'" :title="stat.title" :valueHome="stat.valuePl1" :valueAway="stat.valuePl2" />
				</div>				

			</TabPanel>				
		</TabView>

		<LoadingIcon v-if="(selectedMatch1 && selectedMatch2) && ( !player1Stats || !player2Stats)" :title="$t('message.Stats').toLowerCase()"/>		

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
			/* checkNull( value1, value2 ) {
				if ( value1 === 0 && value2 === 0 ) {
					return false
				} else if ( value1.toString().includes(':') & value2.toString().includes(':') ) {
					if ( this.timeToNumber(value1) <= 0 && this.timeToNumber(value2) <= 0 ) {
						return false
					} else return true
				} else return true
			}, */
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
							{ title: i18n.t('message.Crosses'), valuePl1: totalStatsPl1.crosses, valuePl2: totalStatsPl2.crosses, type: "barSides" },
							{ title: i18n.t('message.CrossesSuccessful'), valuePl1: totalStatsPl1.successfulCrosses, valuePl2: totalStatsPl2.successfulCrosses, type: "duplex" },
							{ title: i18n.t('message.PassesToFinalThird'), valuePl1: totalStatsPl1.passesToFinalThird, valuePl2: totalStatsPl2.passesToFinalThird, type: "barSides" },
							{ title: i18n.t('message.PassesToFinalThirdSuccessful'), valuePl1: totalStatsPl1.successfulPassesToFinalThird, valuePl2: totalStatsPl2.successfulPassesToFinalThird, type: "duplex"},
							{ title: i18n.t('message.ForwardPasses'), valuePl1: totalStatsPl1.forwardPasses, valuePl2: totalStatsPl2.forwardPasses, type: "barSides"},
							{ title: i18n.t('message.ForwardPassesSuccessful'), valuePl1: totalStatsPl1.successfulForwardPasses, valuePl2: totalStatsPl2.successfulForwardPasses, type: "duplex" },
							{ title: i18n.t('message.BackPasses'), valuePl1: totalStatsPl1.backPasses, valuePl2: totalStatsPl2.backPasses, type: "barSides"},
							{ title: i18n.t('message.BackPassesSuccessful'), valuePl1: totalStatsPl1.successfulBackPasses, valuePl2: totalStatsPl2.successfulBackPasses, type: "duplex" },
							{ title: i18n.t('message.ThroughPasses'), valuePl1: totalStatsPl1.throughPasses, valuePl2: totalStatsPl2.throughPasses, type: "barSides"},
							{ title: i18n.t('message.ThroughPassesSuccessful'), valuePl1: totalStatsPl1.successfulThroughPasses, valuePl2: totalStatsPl2.successfulThroughPasses, type: "duplex" },
							{ title: i18n.t('message.KeyPasses'), valuePl1: totalStatsPl1.keyPasses, valuePl2: totalStatsPl2.keyPasses, type: "barSides"},
							{ title: i18n.t('message.KeyPassesSuccessful'), valuePl1: totalStatsPl1.successfulKeyPasses, valuePl2: totalStatsPl2.successfulKeyPasses, type: "duplex" },
							{ title: i18n.t('message.VerticalPasses'), valuePl1: totalStatsPl1.verticalPasses, valuePl2: totalStatsPl2.verticalPasses, type: "barSides"},
							{ title: i18n.t('message.VerticalPassesSuccessful'), valuePl1: totalStatsPl1.successfulVerticalPasses, valuePl2: totalStatsPl2.successfulVerticalPasses, type: "duplex" },
							{ title: i18n.t('message.LongPasses'), valuePl1: totalStatsPl1.longPasses, valuePl2: totalStatsPl2.longPasses, type: "barSides"},
							{ title: i18n.t('message.LongPassesSuccessful'), valuePl1: totalStatsPl1.successfulLongPasses, valuePl2: totalStatsPl2.successfulLongPasses, type: "duplex" },
							{ title: i18n.t('message.ProgressivePasses'), valuePl1: totalStatsPl1.progressivePasses, valuePl2: totalStatsPl2.progressivePasses, type: "barSides"},
							{ title: i18n.t('message.ProgressivePassesSuccessful'), valuePl1: totalStatsPl1.successfulProgressivePasses, valuePl2: totalStatsPl2.successfulProgressivePasses, type: "duplex" },
							{ title: i18n.t('message.LateralPasses'), valuePl1: totalStatsPl1.lateralPasses, valuePl2: totalStatsPl2.lateralPasses, type: "barSides"},
							{ title: i18n.t('message.LateralPassesSuccessful'), valuePl1: totalStatsPl1.successfulLateralPasses, valuePl2: totalStatsPl2.successfulLateralPasses, type: "duplex" },
							{ title: i18n.t('message.ReceivedPasses'), valuePl1: totalStatsPl1.receivedPass, valuePl2: totalStatsPl2.receivedPass, type: "barSides"},
							{ title: i18n.t('message.TouchInBox'), valuePl1: totalStatsPl1.touchInBox, valuePl2: totalStatsPl2.touchInBox, type: "barSides"},
							{ title: i18n.t('message.ProgressiveRun'), valuePl1: totalStatsPl1.progressiveRun, valuePl2: totalStatsPl2.progressiveRun, type: "barSides"},
							{ title: i18n.t('message.Offsides'), valuePl1: totalStatsPl1.offsides, valuePl2: totalStatsPl2.offsides, type: "barSides"},
						]},

						{ title: i18n.t('message.ATTACKING'), stats: [
							{ title: i18n.t('message.Goals'), valuePl1: totalStatsPl1.goals, valuePl2: totalStatsPl2.goals, type: "barSides" },
							{ title: i18n.t('message.TotalAttempts'), valuePl1: totalStatsPl1.shots, valuePl2: totalStatsPl2.shots, type: "barSides"},
							{ title: i18n.t('message.Shotsontarget'), valuePl1: totalStatsPl1.shotsOnTarget, valuePl2: totalStatsPl2.shotsOnTarget, type: "duplex" },
							{ title: i18n.t('message.HeadShots'), valuePl1: totalStatsPl1.headShots, valuePl2: totalStatsPl2.headShots, type: "duplex" },
							{ title: i18n.t('message.Dribbles'), valuePl1: totalStatsPl1.dribbles, valuePl2: totalStatsPl2.dribbles, type: "barSides"}, 
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.Dribbles').toLowerCase(), valuePl1: totalStatsPl1.successfulDribbles, valuePl2: totalStatsPl2.successfulDribbles, type: "duplex" },
							{ title: i18n.t('message.Corners'), valuePl1: totalStatsPl1.corners, valuePl2: totalStatsPl2.corners, type: "barSides"  },
							{ title: i18n.t('message.Assists'), valuePl1: totalStatsPl1.assists, valuePl2: totalStatsPl2.assists, type: "barSides"}, 
							{ title: i18n.t('message.SecondAssists'), valuePl1: totalStatsPl1.secondAssists, valuePl2: totalStatsPl2.secondAssists, type: "duplex" },
							{ title: i18n.t('message.ThirdAssists'), valuePl1: totalStatsPl1.thirdAssists, valuePl2: totalStatsPl2.thirdAssists, type: "duplex" },
							{ title: i18n.t('message.ShotAssists'), valuePl1: totalStatsPl1.shotAssists, valuePl2: totalStatsPl2.shotAssists, type: "barSides" },
							{ title: i18n.t('message.ShotOnTargetAssists'), valuePl1: totalStatsPl1.shotOnTargetAssists, valuePl2: totalStatsPl2.shotOnTargetAssists, type: "duplex" },
							{ title: i18n.t('message.Freekicks'), valuePl1: totalStatsPl1.freeKicks, valuePl2: totalStatsPl2.freeKicks, type: "barSides"}, 
							{ title: i18n.t('message.FreeKicksOnTarget'), valuePl1: totalStatsPl1.freeKicksOnTarget, valuePl2: totalStatsPl2.freeKicksOnTarget, type: "duplex" },
							{ title: i18n.t('message.DirectFreeKicks'), valuePl1: totalStatsPl1.directFreeKicks, valuePl2: totalStatsPl2.directFreeKicks, type: "barSides" },
							{ title: i18n.t('message.DirectFreeKicksOnTarget'), valuePl1: totalStatsPl1.directFreeKicksOnTarget, valuePl2: totalStatsPl2.directFreeKicksOnTarget, type: "duplex" },
							{ title: i18n.t('message.Penalties'), valuePl1: totalStatsPl1.penalties, valuePl2: totalStatsPl2.penalties, type: "barSides"}, 
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.Penalties').toLowerCase(), valuePl1: totalStatsPl1.successfulPenalties, valuePl2: totalStatsPl2.successfulPenalties, type: "duplex" },
							{ title: i18n.t('message.AttackingActions'), valuePl1: totalStatsPl1.attackingActions, valuePl2: totalStatsPl2.attackingActions, type: "barSides"}, 
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.AttackingActions').toLowerCase(), valuePl1: totalStatsPl1.successfulAttackingActions, valuePl2: totalStatsPl2.successfulAttackingActions, type: "duplex"},
							{ title: i18n.t('message.LinkupPlays'), valuePl1: totalStatsPl1.linkupPlays, valuePl2: totalStatsPl2.linkupPlays, type: "barSides"}, 
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.LinkupPlays').toLowerCase(), valuePl1: totalStatsPl1.successfulLinkupPlays, valuePl2: totalStatsPl2.successfulLinkupPlays, type: "duplex"},
							{ title: i18n.t('message.Accelerations'), valuePl1: totalStatsPl1.accelerations, valuePl2: totalStatsPl2.accelerations, type: "barSides" },
							{ title: i18n.t('message.MissedBalls'), valuePl1: totalStatsPl1.missedBalls, valuePl2: totalStatsPl2.missedBalls, type: "barSides" },
						]},

						{ title: i18n.t('message.DEFENDING'), stats: [
							{ title: i18n.t('message.Interceptions'), valuePl1: totalStatsPl1.interceptions, valuePl2: totalStatsPl2.interceptions, type: "barSides" },
							{ title: i18n.t('message.DefensiveActions'), valuePl1: totalStatsPl1.defensiveActions, valuePl2: totalStatsPl2.defensiveActions, type: "barSides" },
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.DefensiveActions').toLowerCase(), valuePl1: totalStatsPl1.successfulDefensiveAction, valuePl2: totalStatsPl2.successfulDefensiveAction, type: "duplex" },
							{ title: i18n.t('message.Recoveries'), valuePl1: totalStatsPl1.recoveries, valuePl2: totalStatsPl2.recoveries, type: "barSides" },
							{ title: i18n.t('message.OpponentHalfRecoveries'), valuePl1: totalStatsPl1.opponentHalfRecoveries, valuePl2: totalStatsPl2.opponentHalfRecoveries, type: "barSides" },
							{ title: i18n.t('message.DangerousOpponentHalfRecoveries'), valuePl1: totalStatsPl1.dangerousOpponentHalfRecoveries , valuePl2: totalStatsPl2.dangerousOpponentHalfRecoveries, type: "duplex" },
							{ title: i18n.t('message.BlockedShots'), valuePl1: totalStatsPl1.shotsBlocked, valuePl2: totalStatsPl2.shotsBlocked, type: "barSides" },
							{ title: i18n.t('message.SlidingTackles'), valuePl1: totalStatsPl1.slidingTackles, valuePl2: totalStatsPl2.slidingTackles, type: "barSides" },
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.SlidingTackles').toLowerCase(), valuePl1: totalStatsPl1.successfulSlidingTackles, valuePl2: totalStatsPl2.successfulSlidingTackles, type: "duplex" },
							{ title: i18n.t('message.Clearances'), valuePl1: totalStatsPl1.clearances, valuePl2: totalStatsPl2.clearances, type: "barSides" },
						]},

						{ title: i18n.t('message.DUELS'), stats: [
							{ title: i18n.t('message.Duels'), valuePl1: totalStatsPl1.duels, valuePl2: totalStatsPl2.duels, type: "circle"  },
							{ title: i18n.t('message.Successfulduels'), valuePl1: totalStatsPl1.duelsWon, valuePl2: totalStatsPl2.duelsWon, type: "duplex"  },
							{ title: i18n.t('message.DefensiveDuels'), valuePl1: totalStatsPl1.defensiveDuels, valuePl2: totalStatsPl2.defensiveDuels, type: "barSides"  },
							{ title: i18n.t('message.DefensiveDuelsSuccessful'), valuePl1: totalStatsPl1.defensiveDuelsWon, valuePl2: totalStatsPl2.defensiveDuelsWon, type: "duplex" },
							{ title: i18n.t('message.OffensiveDuels'), valuePl1: totalStatsPl1.offensiveDuels, valuePl2: totalStatsPl2.offensiveDuels, type: "barSides"  },
							{ title: i18n.t('message.OffensiveDuelsSuccessful'), valuePl1: totalStatsPl1.offensiveDuelsWon, valuePl2: totalStatsPl2.offensiveDuelsWon, type: "duplex" },
							{ title: i18n.t('message.AerialDuels'), valuePl1: totalStatsPl1.aerialDuels, valuePl2: totalStatsPl2.aerialDuels, type: "barSides"  },
							{ title: i18n.t('message.AerialDuelsSuccessful'), valuePl1: totalStatsPl1.aerialDuelsWon, valuePl2: totalStatsPl2.aerialDuelsWon, type: "duplex" },
							{ title: i18n.t('message.FieldAerialDuels'), valuePl1: totalStatsPl1.fieldAerialDuels, valuePl2: totalStatsPl2.fieldAerialDuels, type: "barSides"  },
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.FieldAerialDuels').toLowerCase(), valuePl1: totalStatsPl1.fieldAerialDuelsWon, valuePl2: totalStatsPl2.fieldAerialDuelsWon, type: "duplex" },
							{ title: i18n.t('message.PressingDuels'), valuePl1: totalStatsPl1.pressingDuels, valuePl2: totalStatsPl2.pressingDuels, type: "barSides"  },
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.PressingDuels').toLowerCase(), valuePl1: totalStatsPl1.pressingDuelsWon, valuePl2: totalStatsPl2.pressingDuelsWon, type: "duplex" },
							{ title: i18n.t('message.LooseBallDuels'), valuePl1: totalStatsPl1.looseBallDuels, valuePl2: totalStatsPl2.looseBallDuels, type: "barSides"  },
							{ title: i18n.t('message.Successful') + ' ' + i18n.t('message.LooseBallDuels').toLowerCase(), valuePl1: totalStatsPl1.looseBallDuelsWon, valuePl2: totalStatsPl2.looseBallDuelsWon, type: "duplex" },
							{ title: i18n.t('message.Totallooses'), valuePl1: totalStatsPl1.losses, valuePl2: totalStatsPl2.losses, type: "barSides"  },
							{ title: i18n.t('message.OwnHalfLooses'), valuePl1: totalStatsPl1.ownHalfLosses, valuePl2: totalStatsPl2.ownHalfLosses, type: "barSides"  },
							{ title: i18n.t('message.DangerousOwnHalfLooses'), valuePl1: totalStatsPl1.dangerousOwnHalfLosses, valuePl2: totalStatsPl2.dangerousOwnHalfLosses, type: "barSides"  },
						] },
						{ title: i18n.t('message.DISCIPLINARY'), stats: [
							{ title: i18n.t('message.Fouls'), valuePl1: totalStatsPl1.fouls, valuePl2: totalStatsPl2.fouls, type: "barSides"  },
							{ title: i18n.t('message.FoulsSuffered'), valuePl1: totalStatsPl1.foulsSuffered, valuePl2: totalStatsPl2.foulsSuffered, type: "barSides"  },
							{ title: i18n.t('message.Yellowcards'), valuePl1: totalStatsPl1.yellowCards, valuePl2: totalStatsPl2.yellowCards, type: "barSides"  },
							{ title: i18n.t('message.Redcards'), valuePl1: totalStatsPl1.redCards, valuePl2: totalStatsPl2.redCards, type: "barSides"  },
							{ title: i18n.t('message.DirectRedCards'), valuePl1: totalStatsPl1.directRedCards, valuePl2: totalStatsPl2.directRedCards, type: "barSides"  },
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