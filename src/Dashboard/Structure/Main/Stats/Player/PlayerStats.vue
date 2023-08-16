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
	import { mapGetters } from 'vuex'
	import Comparison from './Comparison/Comparison.vue'
	import LastGames from '../Global/LastGames.vue'
	import MatchEvents from './MatchEvents/MatchEvents.vue'
	import MatchStats from './MatchStats.vue'
	import PlayerInfo from './PlayerInfo.vue'
	
	export default {
		created() {
			this.$store.dispatch('stats/getPlayerCareer', this.user.instat_id )
		},
		data() {
			return {
				}
		},
		methods: {
			
		},
		computed: {
			...mapGetters({ user: 'user/user' })
		},
		components: { PlayerInfo, LastGames, MatchStats, MatchEvents, Comparison }
	}
</script>
 
<style lang='scss' scoped>
</style>