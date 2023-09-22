<template>
	<div>
		<BackButton v-if="specificMatch" :title="$t('message.YourLastGames')" @click="lastGames" class="my-4 backbtn-lastgames"/>
		<LastGames v-if="!specificMatch" @selectedMatch="selectedMatch" class="mt-4"
					:matches="matches" :playerId="playerDetailsOther ? playerDetailsOther.wyId : user.instat_id"/>
		<MatchCard v-if="specificMatch" :matchData="match" :goals="true"/>
		<LineUps v-if="specificMatch" class="mt-4" :matchData="match"/>
		<AdvStats v-if="matchId && specificMatch" :match="match"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import MatchCard from '../../../../global/MatchCard.vue'
	import LastGames from "../Global/LastGames.vue"
	import AdvStats from './AdvStats/AdvStats.vue'
	import LineUps from './Lineups/Lineups.vue'
	import BackButton from '../../../../global/BackButton.vue'

	export default {
		created() {
			this.fetchMatches()
		},
		data() {
			return {
				specificMatch: false,
				match: null,
				matchId: null
			}
		},
		methods: {
			fetchMatches(other = false) {
				this.$store.dispatch('stats/getPlayerMatches', { id: this.user.instat_id, page: 1 } )
			},
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
			...mapGetters({ user: 'user/user',
							matches: 'stats/playerMatches',
							playerDetailsOther: 'stats/playerDetailsOther' })
		},
		components: { LastGames, LineUps, AdvStats, MatchCard, BackButton }
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