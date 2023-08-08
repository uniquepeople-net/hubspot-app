<template>
	<Card class="card">
		<template #content>
			<div class="card-body">
				<div class="row">
					<div class="col-12 col-sm-6 mb-3 mb-sm-0">
						<h5>{{ $t('message.Season') }}</h5>
						<Dropdown v-if="seasons" v-model="selectedSeason" :options="seasons" :optionLabel="seasons.competition" 
								  :optionValue="seasons.seasonId" :placeholder="$t('message.SelectSeason')" class="w-100" @change="selectSeason">		
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
						<h5>{{ $t('message.Match')}}</h5>
						<Dropdown v-if="matches" v-model="selectedMatch" :options="matches" 
								  :optionLabel="matches.label" class="w-100 matches"
								  :optionValue="matches.label" :placeholder="$t('message.SelectMatch')" 
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

					<div class="col-12">
						<SeasonPlayerData v-if="selectedSeason" :data="selectedSeason"/>
					</div>
					
					<Button :label="btnLabel" severity="secondary" text raised class="mt-4 mx-auto" @click="handleRedirect"/>
				</div>
			</div>
		</template>
	</Card>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import SeasonPlayerData from './SeasonPlayerData.vue';

	export default {
		components: { SeasonPlayerData },
		props: [ 'matches', 'seasons', 'btnLabel', 'btnRoute' ],
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
				this.$store.dispatch( "stats/getPalyerStats", { id: this.player.wyId, matchId: this.selectedMatch.matchId } )						
			},
			handleRedirect() {
				this.$router.push({ name: this.btnRoute })
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