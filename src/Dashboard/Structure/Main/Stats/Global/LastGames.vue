<template>
	<div class="position-relative">
		<h5 class="text-value">{{ $t('message.YourLastGames') }}</h5>
		<div v-if="matches">
			<MatchCard v-for="match in matchesLimit" @click="selectMatch(match.matchId)" class="match-card"/>
			<div class="text-center see-more w-100">
				<span class="text-sm-bold" @click="seeMore"><u>{{ $t('message.SeeMore') }}</u></span>
			</div>
			<Divider class="divider-light mt-0"/>
		</div>
		<LoadingIcon v-if="!matches" :title="$t('message.Matches')"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../../global/LoadingIcon.vue'
	import MatchCard from "../../../../global/MatchCard.vue"

	export default {
		created() {
			this.$store.dispatch('stats/getPlayerMatches', this.user.instat_id )
		},
		data() {
			return {
				seeMatches: 6,
				selectedMatch: null
			}
		},
		methods: {
			seeMore() {
				this.seeMatches = this.seeMatches + 3
			},
			selectMatch(id) {
				this.selectedMatch = id
				this.$emit('selectedMatch', this.selectedMatch)
			}
		},
		computed: {
			...mapGetters({ user: 'user/user',
							matches: 'stats/playerMatches' }),
			matchesLimit() {
				let showedMatches = this.matches.slice(0, this.seeMatches)
				this.selectedMatch = showedMatches[0].matchId
				/* showedMatches.map( item => {
					this.$store.dispatch('stats/getMatchDetails', item.matchId )
				}) */
				return showedMatches
			}
		},
		components: { MatchCard, LoadingIcon }
	}
</script>
 
 
<style lang='scss' scoped>
.match-card {
	cursor: pointer;
}
.see-more {
	position: absolute;
	padding-top: 3rem;
	bottom: 1.8rem;
	background: linear-gradient(0deg, rgba(255,255,255,0.9122023809523809) 61%, rgba(255,255,255,0) 100%);
	cursor: pointer;
}
</style>