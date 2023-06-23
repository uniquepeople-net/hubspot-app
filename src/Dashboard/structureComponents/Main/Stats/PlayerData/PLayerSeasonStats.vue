<template>
	<div class="season-stats my-5 mx-3 mx-lg-auto" >
		<div v-if="currentSeason">
			<h5 class="text-gt-bold">{{ $t('message.Playerstats') }}</h5>
			<h6 class="header-main">{{ $t('message.ThisSeason') }}:</h6>
			<div class="row g-2">
				<div class="col-6">
					<StatItemCard :title="$t('message.Matches')" :value="currentSeason.appearances">
						<template v-slot:icon>
							<Stadion />
						</template>
					</StatItemCard>
				</div>
				<div class="col-6">
					<StatItemCard :title="$t('message.Goals')" :value="currentSeason.goal">
						<template v-slot:icon>
							<FootballPurple />
						</template>
					</StatItemCard>
				</div>
				<div class="col-12">
					<StatItemCard :title="$t('message.Minutesplayed')" :value="currentSeason.minutesPlayed">
						<template v-slot:icon>
							<TimeWatch />	
						</template>
					</StatItemCard>
				</div>
				<div class="col-6">
					<StatItemCard :title="$t('message.Yellowcards')" :value="currentSeason.yellowCard">
						<template v-slot:icon>
							<YellowCard />	
						</template>
					</StatItemCard>
				</div>
				<div class="col-6">
					<StatItemCard :title="$t('message.Redcards')" :value="currentSeason.redCards">
						<template v-slot:icon>
							<RedCard />	
						</template>
					</StatItemCard>
				</div>
			</div>
		</div>
		<LoadingIcon v-if="!currentSeason"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import StatItemCard from './StatItemCard.vue'
	import Stadion from '../Vectors/Stadion.vue'
	import FootballPurple from '../Vectors/FootballPurple.vue'
	import LoadingIcon from '../../../../global/LoadingIcon.vue'
	import TimeWatch from '../Vectors/TimeWatch.vue'
	import YellowCard from '../Vectors/YellowCard.vue'
	import RedCard from '../Vectors/RedCard.vue'

	export default {
		created() {
			this.$store.dispatch('stats/getPlayerCareer', this.user.instat_id )
		},
		data() {
			return {
				}
		},
		methods: {
			
			},
		computed: {
			...mapGetters({ user: 'user/user',
							currentSeason: 'stats/currentSeason' })
		},
		components: { StatItemCard, Stadion, FootballPurple, LoadingIcon, TimeWatch, YellowCard, RedCard },
	}
</script>
 
 
<style lang='scss' scoped>
.season-stats {
	margin: 2rem 1rem;
	max-width: 992px;
}
</style>