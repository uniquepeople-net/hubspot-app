<template>
	<div>
		<h5 class="text-value">{{ $t('message.Lineups') }}</h5>
		<LineupsClub :club="matchData.home.team.officialName" :coach="matchData.home.coach.shortName"
					 :imgSrc="matchData.home.team.imageDataURL"/>
		
		<LineupsPitch class="my-4"/>
	
		<LineupsClub :club="matchData.away.team.officialName" :coach="matchData.away.coach.shortName"
					 :imgSrc="matchData.away.team.imageDataURL"/>
		
		<Divider class="divider-light my-4"/>

		<Substitutes :substitutesHome="matchData.home" :substitutesAway="matchData.away"/>
	</div>
</template>
 
 
<script>
	import LineupsClub from './LineupsClub.vue'
	import LineupsPitch from './LineupsPitch.vue'
	import Substitutes from './Substitutes.vue'

	export default {
		props: {
			matchData: Object
		},
		data() {
			return {
				}
		},
		methods: {
			
		},
		components: { LineupsClub, LineupsPitch, Substitutes },
	}
</script>
 
 
<style lang='scss' scoped>
</style>