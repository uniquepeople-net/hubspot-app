<template>
	<div>
		<div class="center-center">
			<Button :label="$t('message.FindPlayer').toUpperCase()" class="btn-border my-3 fw-bold" 
					icon="pi pi-search" iconPos="right" @click="showFindPlayerModal" />
			
			<Dialog v-model:visible="findPlayerModal" :style="{ width: '100%', maxWidth: '586px' }" :position="'top'" 
					modal :dismissableMask="true" :closable="false" :showHeader="false" class="m-0 find-player-modal">
				<Search v-if="!noAccess" class="mt-3" :storeAction="'getSearchedPlayers'" :storeData="'b'" @addPlayer="addPlayer" type="other"/>
				<NoAccess v-if="noAccess" :title="$t('message.NoOtherPlayersAccess')"/>
			</Dialog>
		</div>

		<PlayerInfo class="mt-3" :playerData="playerDetailsOther ? playerDetailsOther : playerDetails"/>
		<Divider class="my-4 divider-light"/>
		<BackButton v-if="specificMatch" :title="$t('message.YourLastGames')" @click="lastGames" class="backbtn-lastgames"/>

		<LastGames v-if="!specificMatch && matches" @selectedMatch="selectedMatch" 
				   :matches="matches" :playerId="playerDetailsOther ? playerDetailsOther.wyId : user.instat_id"/>
		
		<MatchCard v-if="specificMatch" :matchData="match" :goals="true"/>

		<MatchStats v-if="matchId && ( user.instat_id || playerDetailsOther.wyId ) && specificMatch" :matchId="matchId" 
					:id="playerDetailsOther ? playerDetailsOther.wyId : user.instat_id"/>

		<MatchEvents v-if="matchId && specificMatch" :matchId="matchId"  :matchData="match"
					 :playerId="playerDetailsOther ? playerDetailsOther.wyId : user.instat_id" />

		<SeasonStats v-if="matches.length > 0 && !specificMatch" :lastMatch="matches[0]" 
					 :playerId="playerDetailsOther ? playerDetailsOther.wyId : user.instat_id" />

		<Comparison class="mt-4" />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Comparison from './Comparison/Comparison.vue'
	import LastGames from '../Global/LastGames.vue'
	import MatchEvents from './MatchEvents/MatchEvents.vue'
	import MatchStats from './MatchStats.vue'
	import PlayerInfo from './PlayerInfo.vue'
	import MatchCard from '../Global/MatchCard.vue'
	import BackButton from '../../../../global/BackButton.vue'
	import SeasonStats from './SeasonStats.vue'
	import Search from './Comparison/Search.vue'
	import NoAccess from './Comparison/NoAccess.vue'
	
	export default {
		created() {
			this.fetchMatches()
		},
		data() {
			return {
				specificMatch: false,
				match: null,
				matchId: null,
				findPlayerModal: false,
				noAccess: false
			}
		},
		methods: {
			fetchMatches(other = false) {
				this.$store.dispatch('stats/getPlayerMatches', { id: this.playerDetailsOther ? this.playerDetailsOther.wyId : this.user.instat_id, page: 1, other: other } )
			},
			selectedMatch(match) {
				this.match = match
				this.matchId = match.matchId
				this.specificMatch = true
			},
			lastGames() {
				this.specificMatch = false
			},
			showFindPlayerModal() {
				this.findPlayerModal = true
			},
			addPlayer(event) {
				if ( this.user.membership_id !== 3 ) {
					this.noAccess = true
					return
				}
				this.specificMatch = null
				this.findPlayerModal = false
				this.$store.commit('stats/SETPLAYERDETAILSOTHER', event)			
			}
		},
		computed: {
			...mapGetters({ user: 'user/user',
							matches: 'stats/playerMatches',
							playerDetails: 'stats/playerDetails',
							playerDetailsOther: 'stats/playerDetailsOther' })
		},
		watch: {
			playerDetailsOther: function(data) {
				this.fetchMatches(true)
			}
		},
		components: { PlayerInfo, LastGames, MatchStats, MatchEvents, Comparison, MatchCard, BackButton, SeasonStats, Search, NoAccess }
	}
</script>
 
<style lang='scss' scoped>
.backbtn-lastgames {
	margin-bottom: 1rem;
	:deep(h3) {
		font-size: 1rem;	
	}
}
.find-player-modal {
	:deep(.p-dialog-content) {
		border-radius: 1rem;
	}
}
</style>