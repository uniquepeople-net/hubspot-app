<template>
	<div>
		<h4 class="mb-4">Match Stats</h4>
		<div class="row justify-content-center">
			<div class="col-12 col-lg-6">
				<MatchSelects class="mb-4" :seasons="seasons" :matches="matches"
							  btnLabel="Player stats" btnRoute="player"/>

				<MatchCard :displayMatchStats="true"/>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchSelects from '../MatchSelects.vue'
	import MatchCard from '../../../../global/MatchCard.vue'
	import PlayerStats from '../PlayerData/PlayerStats.vue'
	import MatchCardPlayer from '../../../../global/MatchCardPlayer.vue'

	export default {
		data() {
			return {
			}
		},
		methods: {
 
		},
		computed: {
			...mapGetters({ matches: 'stats/playerMatches',
							seasons: 'stats/playerCareer' }),
		},
		components: { MatchSelects, MatchCard, PlayerStats, MatchCardPlayer },
	}
</script>
 
 
<style lang='scss' scoped>
</style>