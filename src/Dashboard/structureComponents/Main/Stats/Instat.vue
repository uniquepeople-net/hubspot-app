<template>

	<MatchSelects class="mb-4"/>

	<MatchCard />

	<PlayerStats />

</template>
 
 
<script>
	import MatchSelects from './MatchSelects.vue'
	import MatchCard from '../../../global/MatchCard.vue'
	import PlayerStats from './PlayerStats.vue'
	
	export default {
		components: { MatchSelects, MatchCard, PlayerStats },
	}
</script>
 
 
<style lang='scss' scoped>

</style>