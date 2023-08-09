<template>
	<div>
		<BackButton :title="$t('message.Stats')" class="mb-4" route="my-board"/>
		<div class="row justify-content-center">
			<div class="col-12 col-lg-6">
				<MatchSelects class="mb-4" :seasons="seasons" :matches="matches" 
							  :btnLabel="$t('message.MatchStats')" btnRoute="match"/>

				<PlayerStatsData v-if="match" :id="user.instat_id" :matchId="match.wyId"/>
				<div v-if="!match" class="text-center mt-5">
					<StatMessage />
				</div>

				<PLayerSeasonStats />
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchSelects from '../MatchSelects.vue'
	import PlayerStatsData from './PlayerStatsData.vue';
	import StatMessage from '../StatMessage.vue'
	import PLayerSeasonStats from './PLayerSeasonStats.vue';
	import BackButton from '../../../../global/BackButton.vue';

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ user: 'user/user',
							match: 'stats/matchDetails',
							matches: 'stats/playerMatches',
							seasons: 'stats/playerCareer' }),
		},
		components: { MatchSelects, PlayerStatsData, StatMessage, PLayerSeasonStats, BackButton },
	}
</script>
 
 
<style lang='scss' scoped>
</style>