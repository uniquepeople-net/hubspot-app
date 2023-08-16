<template>
	<div class="position-relative">
		<h5 class="text-value">{{ $t('message.YourLastGames') }}</h5>
		<div v-if="matches">
			<MatchCard />
			<MatchCard />
			<MatchCard />
			<div class="text-center see-more w-100">
				<span class="text-sm-bold"><u>{{ $t('message.SeeMore') }}</u></span>
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
			}
		},
		methods: {
			
		},
		computed: {
			...mapGetters({ user: 'user/user',
							matches: 'stats/playerMatches' }),
			matchesLimit() {
				return this.matches.splice(0, 3)
			}
		},
		components: { MatchCard, LoadingIcon }
	}
</script>
 
 
<style lang='scss' scoped>
.see-more {
	position: absolute;
	padding-top: 3rem;
	bottom: 1.8rem;
	background: linear-gradient(0deg, rgba(255,255,255,0.9122023809523809) 61%, rgba(255,255,255,0) 100%);
	cursor: pointer;
}
</style>