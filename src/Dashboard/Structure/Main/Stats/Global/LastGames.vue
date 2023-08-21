<template>
	<div class="position-relative">
		<h5 class="text-value">{{ $t('message.YourLastGames') }}</h5>
		<div v-if="matches">
			<MatchCard v-for="match in matches" @click="selectMatch(match)" class="match-card" :matchData="match"/>
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
			this.$store.dispatch('stats/getPlayerMatches', { id: this.user.instat_id, page: this.page } )
		},
		data() {
			return {
				selectedMatch: null,
				page: 1
			}
		},
		methods: {
			seeMore() {
				this.page = this.page + 1
				this.$store.dispatch('stats/getPlayerMatches', { id: this.user.instat_id, page: this.page } )
			},
			selectMatch(match) {
				this.selectedMatch = match.id
				this.$emit('selectedMatch', match)
			}
		},
		computed: {
			...mapGetters({ user: 'user/user',
							matches: 'stats/playerMatches' }),
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