<template>
	<div class="position-relative">
		<h5 class="text-value mb-4">{{ $t('message.YourLastGames') }}</h5>
		<div v-if="matches && matches.length > 0">

			<MatchCard v-for="match in matches.slice(0, showMatches)" class="match-card" 
					   :matchData="match" :goals="false" @click="selectMatch(match)"/>
			
			<div class="text-center see-more w-100">
				<Button class="text-sm-bold" link :label="$t('message.SeeMore')" @click="seeMore" :loading="loading" />
			</div>
			
		</div>

		<Divider class="divider-light mt-0"/>
		
		<LoadingIcon v-if="!matches || matches.length === 0" :title="$t('message.Matches')"/>
	</div>
</template>
 
 
<script>
	import LoadingIcon from '../../../../global/LoadingIcon.vue'
	import MatchCard from "./MatchCard.vue"

	export default {
		props: {
			matches: Array,
			playerId: Number,
		},
		data() {
			return {
				selectedMatch: null,
				showMatches: localStorage.getItem('showMatches') ? Number(localStorage.getItem('showMatches')) : 5,
				page: 1,
				loading: false,
			}
		},
		methods: {
			seeMore() {
				this.page = this.matches.length / 10
				
				if ( this.matches.length - this.showMatches !== 0 ) {
					this.showMatches = this.showMatches + 5
					localStorage.setItem('showMatches', this.showMatches)
					this.loading = false
				} else {				
					this.page = this.page + 1
					this.loading = true
					this.showMatches = this.showMatches + 5
					localStorage.setItem('showMatches', this.showMatches)
					this.$store.dispatch('stats/getPlayerMatches', { id: this.playerId, page: this.page } )
				}
			},
			selectMatch(match) {
				this.selectedMatch = match.id
				this.$emit('selectedMatch', match)
			}
		},
		watch: {
			matches: function(data) {
				this.loading = false
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
	:deep(.p-button.p-button-link) {
		color: var(--main-dark);
		text-decoration: underline;
	}
	:deep(.p-button.p-button-link:enabled:focus) {
		box-shadow: unset;
	}
}
</style>