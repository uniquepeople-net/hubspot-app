<template>
	<div>
		<h5 class="text-value">{{ $t('message.Lineups') }}</h5>
		<LineupsClub :club="matchData.home.team.officialName" :coach="matchData.home.coach.shortName"
					 :imgSrc="matchData.home.team.imageDataURL"/>
		
		<LineupsPitch class="my-4" v-if="formations" :formations="formations"/>
		<LoadingIcon v-if="!formations"/>
	
		<LineupsClub :club="matchData.away.team.officialName" :coach="matchData.away.coach.shortName"
					 :imgSrc="matchData.away.team.imageDataURL"/>
		
		<Divider class="divider-light my-4"/>

		<Substitutes :substitutesHome="matchData.home" :substitutesAway="matchData.away"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../../../global/LoadingIcon.vue'
	import LineupsClub from './LineupsClub.vue'
	import LineupsPitch from './LineupsPitch.vue'
	import Substitutes from './Substitutes.vue'

	export default {
		created() {
			this.$store.dispatch('stats/getMatchFormations', { id: this.matchData.matchId, homeId: this.matchData.home.teamId, awayId: this.matchData.away.teamId } )	
		},
		props: {
			matchData: Object
		},
		data() {
			return {
				}
		},
		methods: {
			
		},
		computed: {
			...mapGetters({ formations: 'stats/formations' })
		},
		components: { LineupsClub, LineupsPitch, Substitutes, LoadingIcon },
	}
</script>
 
 
<style lang='scss' scoped>
</style>