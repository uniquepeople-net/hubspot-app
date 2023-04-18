<template>
	<Card class="card">
		<template #content>
			<div class="card-body">
				<div class="row">
					<div class="col-12 col-sm-6 mb-3 mb-sm-0">
						<h5>Season</h5>
						<Dropdown v-if="seasons" v-model="selectedSeason" :options="seasons" :optionLabel="seasons.competition" 
								  :optionValue="seasons.seasonId" placeholder="Select Season" class="w-100" @change="selectSeason">		
							<template #value="slotProps">
								<div v-if="slotProps.value" class="flex align-items-center">
									<div>{{ slotProps.value.competition.name }}</div>
								</div>
								<span v-else>
									{{ slotProps.placeholder }}
								</span>
							</template>

							<template #option="slotProps">
								<div style="font-size:.9rem;display: flex;justify-content: space-between;">
									{{slotProps.option.competition.name }}
									<small>{{slotProps.option.season.name}}</small>
								</div>
							</template>
						</Dropdown>
					
						<Skeleton v-else height="2rem" class="mb-2"></Skeleton>
					</div>
					
					<div class="col-12 col-sm-6">
						<h5>Match</h5>
						<Dropdown v-if="matches" v-model="selectedMatch" :options="matches" 
								  :optionLabel="matches.label" class="w-100 matches"
								  :optionValue="matches.label" placeholder="Select Match" 
								  inputClass="matches-dropdown" @change="selectMatch">
							<template #value="slotProps">
								<div v-if="slotProps.value" class="flex align-items-center">
									<div>{{ slotProps.value.label }}</div>
								</div>
								<span v-else>
									{{ slotProps.placeholder }}
								</span>
							</template>
							<template #option="slotProps">
								<div style="font-size:.9rem;">
									{{ slotProps.option.label }}
								</div>
							</template>
						</Dropdown> 

						<Skeleton v-else height="2rem" class="mb-2"></Skeleton>
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		props: [ 'matches', 'seasons' ],
		data() {
			return {
				selectedMatch: null,
				selectedSeason: null,
			}
		},
		methods: {
			selectSeason() {
				this.selectedMatch = null
				this.$store.dispatch( "stats/getPlayerMatchesBySeason", { userId: this.player.wyId, seasonId: this.selectedSeason.seasonId});						
			},
			selectMatch() {
				this.$store.dispatch( "stats/getMatchDetails", this.selectedMatch.matchId );						
			}
		},
		computed: {
			...mapGetters({ player: 'stats/playerDetails' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	:deep(.p-card-content) {
		padding: 0;
	}
	
}
.matches {
	:deep(.match-item) {
		font-size: .5rem;
	}
}

</style>