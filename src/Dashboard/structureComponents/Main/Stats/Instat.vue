<template>

	<div class="row">
		<div class="col-12 col-lg-6">
			<MatchSelects class="mb-4"/>

			<MatchCard />
		</div>
	
		<div class="col-12 col-lg-6">
			<MatchCardPlayer />
		</div>
	</div>

	<PlayerStats />

</template>
 
 
<script>
	import MatchSelects from './MatchSelects.vue'
	import MatchCard from '../../../global/MatchCard.vue'
	import PlayerStats from './PlayerStats.vue'
	import MatchCardPlayer from '../../../global/MatchCardPlayer.vue'
	
	export default {
		components: { MatchSelects, MatchCard, PlayerStats, MatchCardPlayer },
	}
</script>
 
 
<style lang='scss' scoped>

</style>