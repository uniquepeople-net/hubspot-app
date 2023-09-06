<template>
	<div class="mt-5">
		<h5 class="text-value">{{ $t('message.MatchStats') }}</h5>

		<TabView scrollable>
			<TabPanel v-if="stats" v-for="item in items" :header="item.title">
				
				<div v-for="stat in item.stats" :class="`item-stat ${stat.type === 'duplex' ? 'mt-3' : ''}`">
					<CircleStat v-if="stat.type === 'circle'" :value1="stat.valueHome" :value2="stat.valueAway" :percentage="stat.percentage" :title="stat.title"/>
					<StatBarSides v-if="stat.type === 'barSides'" :title="stat.title" :valueHome="stat.valueHome" :valueAway="stat.valueAway" />
					<StatBarDuplex v-if="stat.type === 'duplex' && checkNull(stat.valueHome, stat.valueAway)" :title="stat.title" :valueHome="stat.valueHome" :valueAway="stat.valueAway" />
				</div>				

			</TabPanel>				
		</TabView>

		<LoadingIcon v-if="!stats" :title="$t('message.Stats').toLowerCase()"/>			

		<Divider class="divider-light mt-1"/>

	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import General from './General.vue'
	import GridCard from '../../../../../global/GridCard.vue';
	import CircleStat from '../../Global/CircleStat.vue';
	import StatBarSides from '../../Global/StatBarSides.vue';
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';
	import StatBarDuplex from '../../Global/StatBarDuplex.vue';

	export default {
		props: [ 'match' ],
		created() {
			this.$store.dispatch('stats/getMatchStats', { id: this.match.matchId, homeId: this.match.home.teamId, awayId: this.match.away.teamId } )
		},
		data() {
			return {}
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
			timeToNumber(time) {
				const [minutes, seconds] = time.toString().split(":").map(Number);
				const fractionOfMinute = seconds / 60;
				const result = Number(minutes + fractionOfMinute);
				return result
			}
		},
		computed: {
			...mapGetters({ stats: 'stats/matchStats' }),
			items() {
				let i18n = this.$i18n
				let general = this.stats.general
				let passes = this.stats.passes
				let attacks = this.stats.attacks
				let possession = this.stats.possession
				let flanks = this.stats.flanks
				let defence = this.stats.defence
				let duels = this.stats.duels
				let transitions = this.stats.transitions
				return [
					{ title: this.$i18n.t('message.General').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.BallPossession'), valueHome: possession.home.possessionPercent, valueAway: possession.away.possessionPercent, type: 'circle', percentage: true },
							{ title: i18n.t('message.Goals'), valueHome: general.home.goals, valueAway: general.away.goals, type: 'barSides'},
							{ title: i18n.t('message.TotalAttempts'), valueHome: general.home.shots, valueAway: general.away.shots, type: 'barSides'},
							{ title: i18n.t('message.AttackingActions'), valueHome: attacks.home.total, valueAway: attacks.away.total, type: 'barSides'},
							{ title: i18n.t('message.Freekicks'), valueHome: general.home.freeKicks, valueAway: general.away.freeKicks, type: 'barSides'},
							{ title: i18n.t('message.Passes'), valueHome: passes.home.passes, valueAway: passes.away.passes, type: 'barSides'},
							{ title: i18n.t('message.Corners'), valueHome: general.home.corners, valueAway: general.away.corners, type: 'barSides'},
							{ title: i18n.t('message.Offsides'), valueHome: general.home.offsides, valueAway: general.away.offsides, type: 'barSides'},
							{ title: i18n.t('message.Fouls'), valueHome: general.home.fouls, valueAway: general.away.fouls, type: 'barSides'},
							{ title: i18n.t('message.Yellowcards'), valueHome: general.home.yellowCards, valueAway: general.away.yellowCards, type: 'barSides'},
							{ title: i18n.t('message.Redcards'), valueHome: general.home.redCards, valueAway: general.away.redCards, type: 'barSides'},
						]
					},
					{ title: this.$i18n.t('message.Shots').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.TotalAttempts'), valueHome: general.home.shots, valueAway: general.away.shots, type: 'barSides'},
							{ title: i18n.t('message.Shotsontarget'), valueHome: general.home.shotsOnTarget, valueAway: general.away.shotsOnTarget, type: 'barSides' },
							{ title: i18n.t('message.ShotsWide'), valueHome: general.home.shotsWide, valueAway: general.away.shotsWide, type: 'barSides' },
							{ title: i18n.t('message.BlockedShots'), valueHome: general.home.shotsBlocked, valueAway: general.away.shotsBlocked, type: 'barSides' },
							{ title: i18n.t('message.ShotsOutsideBox'), valueHome: general.home.shotsOutsideBox, valueAway: general.away.shotsOutsideBox, type: 'barSides' },
							{ title: i18n.t('message.ShotsOutsideBoxOnTarget'), valueHome: general.home.shotsOutsideBoxOnTarget, valueAway: general.away.shotsOutsideBoxOnTarget, type: 'barSides' },
							{ title: i18n.t('message.ShotsOnPost'), valueHome: general.home.shotsOnPost, valueAway: general.away.shotsOnPost, type: 'barSides' },
							{ title: i18n.t('message.ShotsFromBox'), valueHome: general.home.shotsFromBox, valueAway: general.away.shotsFromBox, type: 'barSides' },
							{ title: i18n.t('message.ShotsFromDangerZone'), valueHome: general.home.shotsFromDangerZone, valueAway: general.away.shotsFromDangerZone, type: 'barSides' },
							{ title: i18n.t('message.Freekicks'), valueHome: general.home.freeKicks, valueAway: general.away.freeKicks, type: 'barSides'},
						]
					},
					{ title: this.$i18n.t('message.Passes').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.Passes'), valueHome: passes.home.passes, valueAway: passes.away.passes, type: 'circle', percentage: false},
							{ title: i18n.t('message.Successfulpasses'), valueHome: passes.home.passesSuccessful, valueAway: passes.away.passesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.ForwardPasses'), valueHome: passes.home.forwardPasses, valueAway: passes.away.forwardPasses, type: 'barSides'},
							{ title: i18n.t('message.ForwardPassesSuccessful'), valueHome: passes.home.forwardPassesSuccessful, valueAway: passes.away.forwardPassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.BackPasses'), valueHome: passes.home.backPasses, valueAway: passes.away.backPasses, type: 'barSides'},
							{ title: i18n.t('message.BackPassesSuccessful'), valueHome: passes.home.backPassesSuccessful, valueAway: passes.away.backPassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.ProgressivePasses'), valueHome: passes.home.progressivePasses, valueAway: passes.away.progressivePasses, type: 'barSides'},
							{ title: i18n.t('message.ProgressivePassesSuccessful'), valueHome: passes.home.progressivePassesSuccessful, valueAway: passes.away.progressivePassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.LongPasses'), valueHome: passes.home.longPasses, valueAway: passes.away.longPasses, type: 'barSides'},
							{ title: i18n.t('message.LongPassesSuccessful'), valueHome: passes.home.longPassesSuccessful, valueAway: passes.away.longPassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.ThroughPasses'), valueHome: passes.home.throughPasses, valueAway: passes.away.throughPasses, type: 'barSides'},
							{ title: i18n.t('message.ThroughPassesSuccessful'), valueHome: passes.home.throughPassesSuccessful, valueAway: passes.away.throughPassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.PassesToFinalThird'), valueHome: passes.home.passToFinalThirds, valueAway: passes.away.passToFinalThirds, type: 'barSides'},
							{ title: i18n.t('message.PassesToFinalThirdSuccessful'), valueHome: passes.home.passToFinalThirdsSuccessful, valueAway: passes.away.passToFinalThirdsSuccessful, type: 'barSides'},
							{ title: i18n.t('message.PassesToPenalty'), valueHome: passes.home.passToPenaltyAreas, valueAway: passes.away.passToPenaltyAreas, type: 'barSides'},
							{ title: i18n.t('message.PassesToPenaltySuccessful'), valueHome: passes.home.passToPenaltyAreasSuccessful, valueAway: passes.away.passToPenaltyAreasSuccessful, type: 'barSides'},
							{ title: i18n.t('message.VerticalPasses'), valueHome: passes.home.verticalPasses, valueAway: passes.away.verticalPasses, type: 'barSides'},
							{ title: i18n.t('message.VerticalPassesSuccessful'), valueHome: passes.home.verticalPassesSuccessful, valueAway: passes.away.verticalPassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.KeyPasses'), valueHome: passes.home.keyPasses, valueAway: passes.away.keyPasses, type: 'barSides'},
							{ title: i18n.t('message.KeyPassesSuccessful'), valueHome: passes.home.keyPassesSuccessful, valueAway: passes.away.keyPassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.LateralPasses'), valueHome: passes.home.lateralPasses, valueAway: passes.away.lateralPasses, type: 'barSides'},
							{ title: i18n.t('message.LateralPassesSuccessful'), valueHome: passes.home.lateralPassesSuccessful, valueAway: passes.away.lateralPassesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.Assists'), valueHome: passes.home.assists, valueAway: passes.away.assists, type: 'barSides'},
							
							{ title: i18n.t('message.Crosses'), valueHome: passes.home.crossesTotal, valueAway: passes.away.crossesTotal, type: 'circle', percentage: false},
							{ title: i18n.t('message.CrossesSuccessful'), valueHome: passes.home.crossesSuccessful, valueAway: passes.away.crossesSuccessful, type: 'barSides'},
							{ title: i18n.t('message.CrossesBlocked'), valueHome: passes.home.crossesBlocked, valueAway: passes.away.crossesBlocked, type: 'barSides'},
							{ title: i18n.t('message.CrossesLow'), valueHome: passes.home.crossesLow, valueAway: passes.away.crossesLow, type: 'barSides'},
							{ title: i18n.t('message.CrossesHigh'), valueHome: passes.home.crossesHigh, valueAway: passes.away.crossesHigh, type: 'barSides'},
							{ title: i18n.t('message.CrossesFromRightFlank'), valueHome: passes.home.crossesFromRightFlank, valueAway: passes.away.crossesFromRightFlank, type: 'barSides'},
							{ title: i18n.t('message.CrossesFromRightFlankSuccessful'), valueHome: passes.home.crossesFromRightFlankSuccessful, valueAway: passes.away.crossesFromRightFlankSuccessful, type: 'barSides'},
							{ title: i18n.t('message.CrossesFromLeftFlank'), valueHome: passes.home.crossesFromLeftFlank, valueAway: passes.away.crossesFromLeftFlank, type: 'barSides'},
							{ title: i18n.t('message.CrossesFromLeftFlankSuccessful'), valueHome: passes.home.crossesFromLeftFlankSuccessful, valueAway: passes.away.crossesFromLeftFlankSuccessful, type: 'barSides'},

							{ title: i18n.t('message.ThrowIns'), valueHome: general.home.totalThrowIns, valueAway: general.away.totalThrowIns, type: 'circle', percentage: false},
							{ title: i18n.t('message.RightThrowIns'), valueHome: general.home.rightThrowIns, valueAway: general.away.rightThrowIns, type: 'barSides'},
							{ title: i18n.t('message.LeftThrowIns'), valueHome: general.home.leftThrowIns, valueAway: general.away.leftThrowIns, type: 'barSides'},
						]
					},
					{ title: this.$i18n.t('message.BallPossession').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.BallPossession'), valueHome: possession.home.possessionPercent, valueAway: possession.away.possessionPercent, type: 'circle', percentage: true },
							{ title: i18n.t('message.Dribbles'), valueHome: general.home.dribbles, valueAway: general.away.dribbles, type: 'barSides'},
							{ title: i18n.t('message.TouchInBox'), valueHome: general.home.touchesInBox, valueAway: general.away.touchesInBox, type: 'barSides'},
							{ title: i18n.t('message.PurePossessionTime'), valueHome: possession.home.purePossessionTime, valueAway: possession.away.purePossessionTime, type: 'barSides'},
							{ title: i18n.t('message.AvgPossessionTime'), valueHome: possession.home.avgPossessionDuration, valueAway: possession.away.avgPossessionDuration, type: 'barSides'},
							{ title: i18n.t('message.ReachingOpponentHalf'), valueHome: possession.home.reachingOpponentHalf, valueAway: possession.away.reachingOpponentHalf, type: 'barSides'},
							{ title: i18n.t('message.ReachingOpponentBox'), valueHome: possession.home.reachingOpponentBox, valueAway: possession.away.reachingOpponentBox, type: 'barSides'},
							
							{ title: i18n.t('message.PossessionPercent'), valueHome: possession.home.possessionPercent, valueAway: possession.away.possessionPercent, type: 'barSides'},
							{ title: i18n.t('message.BallPossession') + " 1'-15'", valueHome: possession.home['possession1-15'], valueAway: possession.away['possession1-15'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 16'-30'", valueHome: possession.home['possession16-30'], valueAway: possession.away['possession16-30'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 31'-45'", valueHome: possession.home['possession31-45'], valueAway: possession.away['possession31-45'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 46'-60'", valueHome: possession.home['possession46-60'], valueAway: possession.away['possession46-60'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 61'-75'", valueHome: possession.home['possession61-75'], valueAway: possession.away['possession61-75'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 76'-90'", valueHome: possession.home['possession76-90'], valueAway: possession.away['possession76-90'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 91'-105'", valueHome: possession.home['possession91-105'], valueAway: possession.away['possession91-105'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 106'-120'", valueHome: possession.home['possession106-120'], valueAway: possession.away['possession106-120'], type: 'duplex'},

							{ title: i18n.t('message.PossessionMinutes'), valueHome: possession.home.purePossessionTime, valueAway: possession.away.purePossessionTime, type: 'barSides'},
							{ title: i18n.t('message.BallPossession') + " 1'-15'", valueHome: possession.home['minutesOfPossession1-15'], valueAway: possession.away['minutesOfPossession1-15'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 16'-30'", valueHome: possession.home['minutesOfPossession16-30'], valueAway: possession.away['minutesOfPossession16-30'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 31'-45'", valueHome: possession.home['minutesOfPossession31-45'], valueAway: possession.away['minutesOfPossession31-45'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 46'-60'", valueHome: possession.home['minutesOfPossession46-60'], valueAway: possession.away['minutesOfPossession46-60'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 61'-75'", valueHome: possession.home['minutesOfPossession61-75'], valueAway: possession.away['minutesOfPossession61-75'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 76'-90'", valueHome: possession.home['minutesOfPossession76-90'], valueAway: possession.away['minutesOfPossession76-90'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 91'-105'", valueHome: possession.home['minutesOfPossession91-105'], valueAway: possession.away['minutesOfPossession91-105'], type: 'duplex'},
							{ title: i18n.t('message.BallPossession') + " 106'-120'", valueHome: possession.home['minutesOfPossession106-120'], valueAway: possession.away['minutesOfPossession106-120'], type: 'duplex'},
						]
					},
					{ title: this.$i18n.t('message.Attack').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.AttackingActions'), valueHome: attacks.home.total, valueAway: attacks.away.total, type: 'circle'},
							{ title: i18n.t('message.PositionalAttacks'), valueHome: attacks.home.positionalAttack, valueAway: attacks.away.positionalAttack, type: 'barSides'},
							{ title: i18n.t('message.PositionalAttacksWithShots'), valueHome: attacks.home.positionalWithShots, valueAway: attacks.away.positionalWithShots, type: 'barSides'},
							{ title: i18n.t('message.CounterAttacks'), valueHome: attacks.home.counterAttacks, valueAway: attacks.away.counterAttacks, type: 'barSides'},
							{ title: i18n.t('message.Freekicks'), valueHome: general.home.freeKicks, valueAway: general.away.freeKicks, type: 'barSides'},
							{ title: i18n.t('message.FreekicksWithShots'), valueHome: attacks.home.freeKicksWithShot, valueAway: attacks.away.freeKicksWithShot, type: 'barSides'},
							{ title: i18n.t('message.Corners'), valueHome: general.home.corners, valueAway: general.away.corners, type: 'barSides'},
							{ title: i18n.t('message.CornersWithShot'), valueHome: attacks.home.cornersWithShot, valueAway: attacks.away.cornersWithShot, type: 'barSides'},
							{ title: i18n.t('message.CenterAttacks'), valueHome: flanks.home.centerAttacks, valueAway: flanks.away.centerAttacks, type: 'barSides'},
							{ title: i18n.t('message.RightFlankAttacks'), valueHome: flanks.home.rightFlankAttacks, valueAway: flanks.away.rightFlankAttacks, type: 'barSides'},
							{ title: i18n.t('message.LeftFlankAttacks'), valueHome: flanks.home.leftFlankAttacks, valueAway: flanks.away.leftFlankAttacks, type: 'barSides'},
						]
					},
					{ title: this.$i18n.t('message.Defence').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.Tackles'), valueHome: defence.home.tackles, valueAway: defence.away.tackles, type: 'barSides'},
							{ title: i18n.t('message.Interceptions'), valueHome: defence.home.interceptions, valueAway: defence.away.interceptions, type: 'barSides'},
							{ title: i18n.t('message.Clearances'), valueHome: defence.home.clearances, valueAway: defence.away.clearances, type: 'barSides'},
							{ title: i18n.t('message.PPDA'), valueHome: defence.home.ppda, valueAway: defence.away.ppda, type: 'barSides'},
						]
					},
					{ title: this.$i18n.t('message.Duels').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.Duels'), valueHome: duels.home.duels, valueAway: duels.away.duels, type: 'circle'},
							{ title: i18n.t('message.ChallengeIntensity'), valueHome: duels.home.challengeIntensity, valueAway: duels.away.challengeIntensity, type: 'barSides'},
							{ title: i18n.t('message.Successfulduels'), valueHome: duels.home.duelsSuccessful, valueAway: duels.away.duelsSuccessful, type: 'barSides'},
							{ title: i18n.t('message.DefensiveDuels'), valueHome: duels.home.defensiveDuels, valueAway: duels.away.defensiveDuels, type: 'barSides'},
							{ title: i18n.t('message.DefensiveDuelsSuccessful'), valueHome: duels.home.defensiveDuelsSuccessful, valueAway: duels.away.defensiveDuelsSuccessful, type: 'barSides'},
							{ title: i18n.t('message.OffensiveDuels'), valueHome: duels.home.offensiveDuels, valueAway: duels.away.offensiveDuels, type: 'barSides'},
							{ title: i18n.t('message.OffensiveDuelsSuccessful'), valueHome: duels.home.offensiveDuelsSuccessful, valueAway: duels.away.offensiveDuelsSuccessful, type: 'barSides'},
							{ title: i18n.t('message.AerialDuels'), valueHome: duels.home.aerialDuels, valueAway: duels.away.aerialDuels, type: 'barSides'},
							{ title: i18n.t('message.AerialDuelsSuccessful'), valueHome: duels.home.aerialDuelsSuccessful, valueAway: duels.away.aerialDuelsSuccessful, type: 'barSides'},
							{ title: i18n.t('message.LooseBallDuels'), valueHome: duels.home.looseBallDuels, valueAway: duels.away.looseBallDuels, type: 'barSides'},
							{ title: i18n.t('message.LooseBallDuelsSuccessful'), valueHome: duels.home.looseBallDuelsSuccessful, valueAway: duels.away.looseBallDuelsSuccessful, type: 'barSides'},
							{ title: i18n.t('message.GroundDuels'), valueHome: duels.home.groundDuels, valueAway: duels.away.groundDuels, type: 'barSides'},
							{ title: i18n.t('message.GroundDuelsSuccessful'), valueHome: duels.home.groundDuelsSuccessful, valueAway: duels.away.groundDuelsSuccessful, type: 'barSides'},
							{ title: i18n.t('message.Dribbles'), valueHome: general.home.dribbles, valueAway: general.away.dribbles, type: 'barSides'},
						]
					},
					{ title: this.$i18n.t('message.Transitions').toUpperCase(), 
						stats: [
							{ title: i18n.t('message.Recoveries'), valueHome: transitions.home.recoveriesTotal, valueAway: transitions.away.recoveriesTotal, type: 'circle'},
							{ title: i18n.t('message.RecoveriesHigh'), valueHome: transitions.home.recoveriesHigh, valueAway: transitions.away.recoveriesHigh, type: 'barSides'},
							{ title: i18n.t('message.RecoveriesMedium'), valueHome: transitions.home.recoveriesMedium, valueAway: transitions.away.recoveriesMedium, type: 'barSides'},
							{ title: i18n.t('message.RecoveriesLow'), valueHome: transitions.home.recoveriesLow, valueAway: transitions.away.recoveriesLow, type: 'barSides'},
							{ title: i18n.t('message.OpponentHalfRecoveries'), valueHome: transitions.home.opponentHalfRecoveries, valueAway: transitions.away.opponentHalfRecoveries, type: 'barSides'},
							{ title: i18n.t('message.Totallooses'), valueHome: transitions.home.lossesTotal, valueAway: transitions.away.lossesTotal, type: 'circle'},
							{ title: i18n.t('message.LossesHigh'), valueHome: transitions.home.lossesHigh, valueAway: transitions.away.lossesHigh, type: 'barSides'},
							{ title: i18n.t('message.LossesMedium'), valueHome: transitions.home.lossesMedium, valueAway: transitions.away.lossesMedium, type: 'barSides'},
							{ title: i18n.t('message.LossesLow'), valueHome: transitions.home.lossesLow, valueAway: transitions.away.lossesLow, type: 'barSides'},
							{ title: i18n.t('message.OwnHalfLooses'), valueHome: transitions.home.ownHalfLosses, valueAway: transitions.away.ownHalfLosses, type: 'barSides'},
						]
					}
				]
			} 
		},
		components: { TabView, TabPanel, General, GridCard, CircleStat, StatBarSides, LoadingIcon, StatBarDuplex }
	}
</script>
 
 
<style lang='scss' scoped>
.item-stat {
	margin-top: 2.5rem;
}
</style>

