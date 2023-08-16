<template>
	<div>
		<PlayerInfo class="mt-3"/>
		<Divider class="my-4 divider-light"/>
		<LastGames />
		<MatchStats />
		<MatchEvents />
		<Comparison />
	</div>
</template>
 
 
<script>
	import Comparison from './Comparison/Comparison.vue'
	import LastGames from '../Global/LastGames.vue'
	import MatchEvents from './MatchEvents/MatchEvents.vue'
	import MatchStats from './MatchStats.vue'
	import PlayerInfo from './PlayerInfo.vue'
	
	export default {
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { PlayerInfo, LastGames, MatchStats, MatchEvents, Comparison }
	}
</script>
 
<style lang='scss' scoped>
</style>