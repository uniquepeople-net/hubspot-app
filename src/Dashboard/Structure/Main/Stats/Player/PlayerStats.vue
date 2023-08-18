<template>
	<div>
		<PlayerInfo class="mt-3"/>
		<Divider class="my-4 divider-light"/>
		<LastGames v-if="!specificMatch" @selectedMatch="selectedMatch"/>
		<MatchCard v-if="specificMatch"/>
		<MatchStats v-if="matchId && user" :matchId="matchId" :id="user.instat_id"/>
		<MatchEvents v-if="matchId" :matchId="matchId"/>
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
	import MatchCard from '../../../../global/MatchCard.vue'
	
	export default {
		created() {
			//this.$store.dispatch('stats/getPlayerCareer', this.user.instat_id )
		},
		data() {
			return {
				specificMatch: false,
				matchId: null
			}
		},
		methods: {
			selectedMatch(id) {
				this.matchId = id
				this.specificMatch = true
			}
		},
		computed: {
			...mapGetters({ user: 'user/user' })
		},
		components: { PlayerInfo, LastGames, MatchStats, MatchEvents, Comparison, MatchCard }
	}
</script>
 
<style lang='scss' scoped>
</style>