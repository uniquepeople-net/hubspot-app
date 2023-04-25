<template>
	<div>
		<h4 class="mb-4">Player Stats</h4>
		<div class="row">
			<div class="col-12 col-lg-6">
				<MatchSelects class="mb-4" :seasons="seasons" :matches="matches" 
							  btnLabel="Match stats" btnRoute="match"/>

				<PlayerStatsData v-if="match" :id="user.instat_id" :matchId="match.wyId"/>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchSelects from '../MatchSelects.vue'
	import PlayerStatsData from './PlayerStatsData.vue';

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
		components: { MatchSelects, PlayerStatsData },
	}
</script>
 
 
<style lang='scss' scoped>
</style>