<template>

	<div class="row">
		<div class="col-12 col-lg-6">
			<MatchSelects class="mb-4" :seasons="seasons" :matches="matches"/>

			<MatchCard/>
		</div>
	
		<div class="col-12 col-lg-6 mt-4 mt-lg-0">
			<MatchCardPlayer :params="restParams"/>
		</div>
	</div>

	<PlayerStats class="mt-4" :params="params" v-if="show"/>

</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchSelects from './MatchSelects.vue'
	import MatchCard from '../../../global/MatchCard.vue'
	import PlayerStats from './PlayerStats.vue'
	import MatchCardPlayer from '../../../global/MatchCardPlayer.vue'
	
	export default {
		created() {
			this.$store.dispatch('statsData/getPlayerStats')
			this.$store.dispatch('statsData/getPlayerData')
		},
		computed: {
			...mapGetters({ params: 'statsData/params',
							restParams: 'statsData/restParams',
							seasons: 'statsData/seasons',
							matches: 'statsData/matches',
							show: 'statsData/playerStatsComponent'}),
		},
		components: { MatchSelects, MatchCard, PlayerStats, MatchCardPlayer },
	}
</script>
 
 
<style lang='scss' scoped>

</style>