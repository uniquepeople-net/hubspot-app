<template>

	<div class="row">
		<div class="col-12 col-lg-6">
			<MatchSelects class="mb-4"/>

			<MatchCard/>
		</div>
	
		<div class="col-12 col-lg-6 mt-4 mt-lg-0">
			<MatchCardPlayer :params="restParams"/>
		</div>
	</div>

	<PlayerStats class="mt-4" :params="params"/>

</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import MatchSelects from './MatchSelects.vue'
	import MatchCard from '../../../global/MatchCard.vue'
	import PlayerStats from './PlayerStats.vue'
	import MatchCardPlayer from '../../../global/MatchCardPlayer.vue'
	
	export default {
		computed: {
			...mapGetters({ params: 'statsData/params',
							restParams: 'statsData/restParams'}),
		},
		components: { MatchSelects, MatchCard, PlayerStats, MatchCardPlayer },
	}
</script>
 
 
<style lang='scss' scoped>

</style>