<template>

	<div class="row">
		<div class="col-12 col-lg-6">
			<MatchSelects class="mb-4" :seasons="seasons" :matches="matches"/>

			<MatchCard/>
		</div>
	
		<div class="col-12 col-lg-6 mt-4 mt-lg-0">
			<!-- <MatchCardPlayer :params="restParams"/> -->
		</div>
	</div>

	<!-- <PlayerStats class="mt-4" :params="params" v-if="show"/> -->

</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchSelects from './MatchSelects.vue'
	import MatchCard from '../../../global/MatchCard.vue'
	import PlayerStats from './PlayerStats.vue'
	import MatchCardPlayer from '../../../global/MatchCardPlayer.vue'
	
	export default {
		created() {
			this.$store.dispatch('stats/getPlayerCareer', this.user.instat_id )
			this.$store.dispatch('stats/getPlayerMatches', this.user.instat_id )
		},
		computed: {
			...mapGetters({ user: 'user/user',
							matches: 'stats/playerMatches',
							seasons: 'stats/playerCareer' }),
		},
		components: { MatchSelects, MatchCard, PlayerStats, MatchCardPlayer },
	}
</script>
 
 
<style lang='scss' scoped>

</style>