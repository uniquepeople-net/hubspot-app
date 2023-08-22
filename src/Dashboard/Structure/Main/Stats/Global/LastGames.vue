<template>
	<div class="position-relative">
		<h5 class="text-value mb-4">{{ $t('message.YourLastGames') }}</h5>
		<div v-if="matches">

			<MatchCard v-for="match in matches.slice(0, showMatches)" @click="selectMatch(match)" class="match-card" :matchData="match"/>
			
			<div class="text-center see-more w-100">
				<!-- <span class="text-sm-bold" @click="seeMore"><u>{{ $t('message.SeeMore') }}</u></span> -->
				<Button class="text-sm-bold" link :label="$t('message.SeeMore')" @click="seeMore" :loading="loading" />
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
				showMatches: 5,
				page: 1,
				loading: false
			}
		},
		methods: {
			seeMore() {
				this.page = this.matches.length / 10
				
				if ( this.matches.length - this.showMatches !== 0 ) {
					this.showMatches = this.showMatches + 5
					this.loading = false
				} else {				
					this.page = this.page + 1
					this.loading = true
					this.showMatches = this.showMatches + 5
					this.$store.dispatch('stats/getPlayerMatches', { id: this.user.instat_id, page: this.page } )
				}
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