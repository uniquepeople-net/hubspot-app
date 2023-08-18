<template>
	<div class="mt-4">
		<h5 class="text-value">{{ $t('message.YourMatchStats') }}</h5>
		<TabView scrollable="true">
			<TabPanel v-if="stats && stats.hasOwnProperty('total')" v-for="item in items" :header="item.title">

				<GridCard v-for="stat in item.stats" :gradient="160" class="individual-stat mb-3" bgSize="4rem" padding=".5rem 1rem">
					<template #content>
						<StatBarMain :title="stat.title" :value="stat.value"/>
						<Divider v-if="stat.sub" class="divider my-1" />
						<StatBarSub v-if="stat.sub" v-for="sub in stat.sub" :title="sub.title" :value="sub.value" :total="stat.value" :nonRatio="sub.nonRatio"/>
					</template>	
				</GridCard>	
				
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
	import GridCard from '../../../../global/GridCard.vue';
	import StatBarMain from '../Global/StatBarMain.vue';
	import StatBarSub from '../Global/StatBarSub.vue';
	import LoadingIcon from '../../../../global/LoadingIcon.vue';

	export default {
		props: [ 'matchId', 'id' ],
		created() {
			this.$store.dispatch('stats/getPalyerStats', { id: this.id, matchId: this.matchId } )
		},
		data() {
			return {
			}
		},
		methods: {

		},
		computed: {
			...mapGetters({ stats: 'stats/playerStats' }),
			items() { 
				let totalStats = this.stats.total
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
								{ title: i18n.t('message.ForwardPasses'), value: totalStats.forwardPasses, sub: [ { title: i18n.t('message.Successful') + ' ' + i18n.t('message.ForwardPasses').toLowerCase(), value: totalStats.successfulForwardPasses} ] },
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
							]},

							{ title: i18n.t('message.DUELS'),  },
							{ title: i18n.t('message.DISCIPLINARY'),  },
						]
			}
		},
		components: { TabView, TabPanel, GridCard, StatBarMain, StatBarSub, LoadingIcon }
	}
</script>

 
<style lang='scss' scoped>
.individual-stat {
	border-radius: var(--btn-border-radius);
	:deep(.p-divider-horizontal)::before {
		border-top: 1px solid var(--main-dark);
	}
}
</style>

