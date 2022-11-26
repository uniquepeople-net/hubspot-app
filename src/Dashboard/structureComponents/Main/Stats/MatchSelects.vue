<template>
	<Card class="card">
		<template #content>
			<div class="card-body">
				<div class="row">
					<div class="col-12 col-sm-6 mb-3 mb-sm-0">
						<h5>Season</h5>
						<Dropdown v-model="selectedSeason" :options="seasons" optionLabel="season_name" 
								  optionValue="season_id" placeholder="Select Season" class="w-100"/>
					</div>
					
					<div class="col-12 col-sm-6">
						<h5>Match</h5>
						<Dropdown v-model="selectedMatch" :options="matches" optionLabel="matchData" 
								  optionValue="match_id" placeholder="Select Match" 
								  class="w-100" @change="selectMatch"/>
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		props: [ 'seasons', 'matches' ],
		created() {
			this.$store.dispatch( "stats/getMatches" );
		},
		data() {
			return {
				selectedMatch: null,
				selectedSeason: null,
			}
		},
		methods: {
			selectMatch() {
				this.$store.dispatch( "statsData/getPlayerStats", this.selectedMatch )
				this.$store.dispatch( "statsData/getMatch", this.selectedMatch )								
			},
			fitMatches(data, arr) {
				if ( data ) {
					this.matchesArr = []					
					data.map( item => {
						this.matchesArr.push({ name: item.title + ' (' + item.score + ')', id: item.id })
					})
					this.matchesArr.reverse()
					this.selectedMatch = this.matchesArr[0].id		
				}
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	:deep(.p-card-content) {
		padding: 0;
	}
}
</style>