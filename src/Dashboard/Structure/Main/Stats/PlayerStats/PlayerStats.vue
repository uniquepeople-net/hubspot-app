<template>
	<div>
		<PlayerInfo class="mt-3"/>
		<Divider class="my-4 divider-light"/>
		<LastGames />
		<MatchStats />
		<MatchEvents />
	</div>
</template>
 
 
<script>
	import LastGames from './LastGames.vue'
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
		components: { PlayerInfo, LastGames, MatchStats, MatchEvents }
	}
</script>
 
<style lang='scss' scoped>
</style>