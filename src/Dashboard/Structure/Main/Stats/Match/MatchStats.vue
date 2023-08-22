<template>
	<div>
		<BackButton v-if="specificMatch" :title="$t('message.YourLastGames')" @click="lastGames" class="my-4 backbtn-lastgames"/>
		<LastGames v-if="!specificMatch" @selectedMatch="selectedMatch" class="mt-4"/>
		<MatchCard v-if="specificMatch" :matchData="match" />
		<LineUps />
		<AdvStats />
	</div>
</template>
 
 
<script>
	import MatchCard from '../../../../global/MatchCard.vue'
	import LastGames from "../Global/LastGames.vue"
	import AdvStats from './AdvStats/AdvStats.vue'
	import LineUps from './Lineups/Lineups.vue'
	import BackButton from '../../../../global/BackButton.vue'

	export default {
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