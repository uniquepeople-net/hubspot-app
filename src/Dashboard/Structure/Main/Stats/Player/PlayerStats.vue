<template>
	<div>
		<PlayerInfo class="mt-3"/>
		<Divider class="my-4 divider-light"/>
		<BackButton v-if="specificMatch" :title="$t('message.YourLastGames')" @click="lastGames" class="backbtn-lastgames"/>
		<LastGames v-if="!specificMatch" @selectedMatch="selectedMatch"/>
		<MatchCard v-if="specificMatch" :matchData="match"/>
		<MatchStats v-if="matchId && user && specificMatch" :matchId="matchId" :id="user.instat_id"/>
		<MatchEvents v-if="matchId && specificMatch" :matchId="matchId"/>
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
	import BackButton from '../../../../global/BackButton.vue'
	
	export default {
		created() {
			//this.$store.dispatch('stats/getPlayerCareer', this.user.instat_id )
		},
		data() {
			return {
				specificMatch: false,
				match: null,
				matchId: null
			}
		},
		methods: {
			selectedMatch(match) {
				this.match = match
				this.matchId = match.matchId
				this.specificMatch = true
			},
			lastGames() {
				this.specificMatch = false
			},

		},
		computed: {
			...mapGetters({ user: 'user/user' })
		},
		components: { PlayerInfo, LastGames, MatchStats, MatchEvents, Comparison, MatchCard, BackButton }
	}
</script>
 
<style lang='scss' scoped>
.backbtn-lastgames {
	margin-bottom: 1rem;
	:deep(h3) {
		font-size: 1rem;	
	}
}
</style>