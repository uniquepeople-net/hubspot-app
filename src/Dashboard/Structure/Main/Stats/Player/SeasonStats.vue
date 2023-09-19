<template>
	<div class="mt-4">
		<h5 class="text-value">{{ $t('message.YourSeasonStats') }}</h5>
		<TabView scrollable>
			<TabPanel v-if="seasonStats && seasonStats.hasOwnProperty('total')" v-for="item in items" :header="item.title">
				<GridCard v-if="seasonStats" v-for="stat in item.stats" :gradient="160" class="individual-stat mb-3" bgSize="4rem" padding=".5rem 1rem">
					<template #content>
						<StatBarMain :title="stat.title" :value="stat.value"/>
						<Divider v-if="stat.sub" class="divider my-1" />
						<StatBarSub v-if="stat.sub" v-for="sub in stat.sub" :title="sub.title" :value="sub.value" :total="stat.value" :nonRatio="sub.nonRatio"/>
					</template>	
				</GridCard>	
			</TabPanel>	
		</TabView>

		<LoadingIcon v-if="!seasonStats"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import TabView from 'primevue/tabview';
	import TabPanel from 'primevue/tabpanel';
	import GridCard from '../../../../global/GridCard.vue';
	import StatBarMain from '../Global/StatBarMain.vue';
	import StatBarSub from '../Global/StatBarSub.vue';
	import LoadingIcon from '../../../../global/LoadingIcon.vue';

	export default {
		props: {
			lastMatch: Object,
			playerId: Number
		},
		created() {
			this.$store.dispatch('stats/getSeasonStats', { playerId: this.playerId, seasonId: this.lastMatch.seasonId } )
		},	
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ seasonStats: 'stats/seasonStats' }),
			items() { 
				let totalStats = this.seasonStats.total
				let i18n = this.$i18n
				return [
							{ title: i18n.t('message.KEYSTATS'), stats: [
								{ title: i18n.t('message.Goals'), value: totalStats.goals },
								{ title: i18n.t('message.TotalAttempts'), value: totalStats.shots },
								{ title: i18n.t('message.Passes'), value: totalStats.passes },
								{ title: i18n.t('message.Offsides'), value: totalStats.offsides },
								{ title: i18n.t('message.Fouls'), value: totalStats.fouls },
								{ title: i18n.t('message.Assists'), value: totalStats.assists },
								{ title: i18n.t('message.Minutesplayed'), value: totalStats.minutesOnField },
							]},

							{ title: i18n.t('message.DISTRIBUTION'), stats: [
								{ title: i18n.t('message.Passes'), value: totalStats.passes, sub: [ { title: i18n.t('message.Successfulpasses') , value: totalStats.successfulPasses} ] },
								{ title: i18n.t('message.SmartPasses'), value: totalStats.smartPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.SmartPasses').toLowerCase(), value: totalStats.successfulSmartPasses} ] },
								{ title: i18n.t('message.Crosses'), value: totalStats.crosses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.Crosses').toLowerCase(), value: totalStats.successfulCrosses} ] },
								{ title: i18n.t('message.PassesToFinalThird'), value: totalStats.passesToFinalThird, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.PassesToFinalThird').toLowerCase(), value: totalStats.successfulPassesToFinalThird} ] },
								{ title: i18n.t('message.ForwardPasses'), value: totalStats.forwardPasses, sub: [ { title: i18n.t('message.ForwardPassesSuccessful'), value: totalStats.successfulForwardPasses} ] },
								{ title: i18n.t('message.BackPasses'), value: totalStats.backPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.BackPasses').toLowerCase(), value: totalStats.successfulBackPasses} ] },
								{ title: i18n.t('message.ThroughPasses'), value: totalStats.throughPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.ThroughPasses').toLowerCase(), value: totalStats.successfulThroughPasses} ] },
								{ title: i18n.t('message.KeyPasses'), value: totalStats.keyPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.KeyPasses').toLowerCase(), value: totalStats.successfulKeyPasses} ] },
								{ title: i18n.t('message.VerticalPasses'), value: totalStats.verticalPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.VerticalPasses').toLowerCase(), value: totalStats.successfulVerticalPasses} ] },
								{ title: i18n.t('message.LongPasses'), value: totalStats.longPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LongPasses').toLowerCase(), value: totalStats.successfulLongPasses} ] },
								{ title: i18n.t('message.ProgressivePasses'), value: totalStats.progressivePasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.ProgressivePasses').toLowerCase(), value: totalStats.successfulProgressivePasses} ] },
								{ title: i18n.t('message.LateralPasses'), value: totalStats.lateralPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LateralPasses').toLowerCase(), value: totalStats.successfulLateralPasses} ] },
								{ title: i18n.t('message.ReceivedPasses'), value: totalStats.receivedPass },
								{ title: i18n.t('message.TouchInBox'), value: totalStats.touchInBox },
								{ title: i18n.t('message.ProgressiveRun'), value: totalStats.progressiveRun },
								{ title: i18n.t('message.Offsides'), value: totalStats.offsides },
							]},

							{ title: i18n.t('message.ATTACKING'), stats: [
								{ title: i18n.t('message.Goals'), value: totalStats.goals },
								{ title: i18n.t('message.TotalAttempts'), value: totalStats.shots, sub: [ { title: i18n.t('message.Shotsontarget'), value: totalStats.shotsOnTarget },
																										  { title: i18n.t('message.HeadShots'), value: totalStats.headShots } ] },
								{ title: i18n.t('message.Dribbles'), value: totalStats.dribbles, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.Dribbles').toLowerCase(), value: totalStats.successfulDribbles} ] },
								{ title: i18n.t('message.Corners'), value: totalStats.corners },
								{ title: i18n.t('message.Assists'), value: totalStats.assists, sub: [ { title: i18n.t('message.ShotAssists'), value: totalStats.shotAssists, nonRatio: true },
																									  { title: i18n.t('message.SecondAssists'), value: totalStats.secondAssists, nonRatio: true },
																									  { title: i18n.t('message.ThirdAssists'), value: totalStats.thirdAssists, nonRatio: true },
																									  { title: i18n.t('message.ShotOnTargetAssists'), value: totalStats.shotOnTargetAssists, nonRatio: true }, ] },
								{ title: i18n.t('message.Freekicks'), value: totalStats.freeKicks, sub: [ { title: i18n.t('message.FreeKicksOnTarget'), value: totalStats.freeKicksOnTarget },
																									  { title: i18n.t('message.DirectFreeKicks'), value: totalStats.directFreeKicks },
																									  { title: i18n.t('message.DirectFreeKicksOnTarget'), value: totalStats.directFreeKicksOnTarget },] },
								{ title: i18n.t('message.Penalties'), value: totalStats.penalties, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.Penalties').toLowerCase(), value: totalStats.successfulPenalties} ] },
								{ title: i18n.t('message.AttackingActions'), value: totalStats.attackingActions, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.AttackingActions').toLowerCase(), value: totalStats.successfulAttackingActions} ] },
								{ title: i18n.t('message.LinkupPlays'), value: totalStats.linkupPlays, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LinkupPlays').toLowerCase(), value: totalStats.successfulLinkupPlays} ] },
								{ title: i18n.t('message.Accelerations'), value: totalStats.accelerations },
								{ title: i18n.t('message.MissedBalls'), value: totalStats.missedBalls },
							]},

							{ title: i18n.t('message.DEFENDING'), stats: [
								{ title: i18n.t('message.Interceptions'), value: totalStats.interceptions },
								{ title: i18n.t('message.DefensiveActions'), value: totalStats.defensiveActions, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.DefensiveActions').toLowerCase(), value: totalStats.successfulDefensiveAction } ]},
								{ title: i18n.t('message.Recoveries'), value: totalStats.recoveries, sub: [ { title: i18n.t('message.OpponentHalfRecoveries'), value: totalStats.opponentHalfRecoveries },
																											{ title: i18n.t('message.DangerousOpponentHalfRecoveries'), value: totalStats.dangerousOpponentHalfRecoveries } ] },
								{ title: i18n.t('message.BlockedShots'), value: totalStats.shotsBlocked },
								{ title: i18n.t('message.SlidingTackles'), value: totalStats.slidingTackles, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.SlidingTackles').toLowerCase(), value: totalStats.successfulSlidingTackles } ]},
								{ title: i18n.t('message.Clearances'), value: totalStats.clearances },
							]},

							{ title: i18n.t('message.DUELS'), stats: [
								{ title: i18n.t('message.Duels'), value: totalStats.duels },
								{ title: i18n.t('message.Successfulduels'), value: totalStats.duelsWon },
								{ title: i18n.t('message.DefensiveDuels'), value: totalStats.defensiveDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.DefensiveDuels').toLowerCase(), value: totalStats.defensiveDuelsWon } ]},
								{ title: i18n.t('message.OffensiveDuels'), value: totalStats.offensiveDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.OffensiveDuels').toLowerCase(), value: totalStats.offensiveDuelsWon } ]},
								{ title: i18n.t('message.AerialDuels'), value: totalStats.aerialDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.AerialDuels').toLowerCase(), value: totalStats.aerialDuelsWon } ]},
								{ title: i18n.t('message.FieldAerialDuels'), value: totalStats.fieldAerialDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.FieldAerialDuels').toLowerCase(), value: totalStats.fieldAerialDuelsWon } ]},
								{ title: i18n.t('message.PressingDuels'), value: totalStats.pressingDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.PressingDuels').toLowerCase(), value: totalStats.pressingDuelsWon } ]},
								{ title: i18n.t('message.LooseBallDuels'), value: totalStats.looseBallDuels, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.LooseBallDuels').toLowerCase(), value: totalStats.looseBallDuelsWon } ]},
								{ title: i18n.t('message.Totallooses'), value: totalStats.losses, sub: [ { title: i18n.t('message.OwnHalfLooses'), value: totalStats.ownHalfLosses },
								 																		 { title: i18n.t('message.DangerousOwnHalfLooses'), value: totalStats.dangerousOwnHalfLosses }] },
							] },
							{ title: i18n.t('message.DISCIPLINARY'), stats: [
								{ title: i18n.t('message.Fouls'), value: totalStats.fouls },
								{ title: i18n.t('message.FoulsSuffered'), value: totalStats.foulsSuffered },
								{ title: i18n.t('message.Yellowcards'), value: totalStats.yellowCards },
								{ title: i18n.t('message.Redcards'), value: totalStats.redCards },
								{ title: i18n.t('message.DirectRedCards'), value: totalStats.directRedCards },
							] },
						]
			}
		},
		components: { TabView, TabPanel, GridCard, StatBarMain, StatBarSub, LoadingIcon }
	}
</script>
 
 
<style lang='scss' scoped>
</style>