<template>
	<Card class="card match-card" v-if="match">
			<!-- <template #title>
				<div class="card-header"><h5>{{ displayMatchStats ? 'Match Info' : 'Player Info'}}</h5></div>
			</template> -->
			<template #content>
				<div  class="card-body">
					<div class="row position-relative">
						<div class="col-5 collect ps-0">
							<img v-if="team1" class="team-logo" :src="team1.team.imageDataURL ? team1.team.imageDataURL : ''" alt="">
							<h6 class="team-name fw-bold mb-md-3 text-center">{{ team1.team.officialName }}</h6>
						</div>
						<div class="col-2"></div>
						<div class="col-5 collect pe-0">
							<img v-if="team2" class="team-logo" :src="team2.team.imageDataURL ? team2.team.imageDataURL : ''" alt="">
							<h6 class="team-name text-center fw-bold mb-md-3">{{ team2.team.officialName }}</h6>
						</div>

						<div class="col-6 mt-3">
							<Scorers :scorers="scorersTeam1" position="right"/>
						</div>

						<div class="col-6 mt-3">
							<Scorers :scorers="scorersTeam2" position="left"/>
						</div>

						<div class="result position-absolute">
							<p class="date mb-1">{{ matchDate(match.dateutc) }}</p>
							<span>{{ modifyResult(match.label) }}</span>
						</div>
					</div>					

					<AdvancedData class="mt-5" :id="match.wyId" v-if="displayMatchStats"/>

					<AdvancedDataPlayer class="mt-5" :id="match.wyId" v-if="!displayMatchStats"/>

					<Skeleton v-if="!match" width="5rem" height="2.5rem" class="result position-absolute"></Skeleton>					
				</div>
			</template>
		</Card>  
</template>
 
 
<script>
	import { mapGetters } from 'vuex';
	import AdvancedData from '../structureComponents/Main/Stats/MatchData/AdvancedData.vue';
	import AdvancedDataPlayer from '../structureComponents/Main/Stats/PlayerData/AdvancedDataPlayer.vue';
	import Scorers from '../structureComponents/Main/Stats/MatchData/Scorers.vue';

	export default {
		props: ['displayMatchStats'],
		methods: {
			modifyResult(data) {
				if (data) {
					let split = data.split(',');
					return split[1]
				}
				return data
			},
			matchDate(data) {
				if (data) {
					let date = new Date(data)
					return date.toLocaleString(['sk-SK'], { day: 'numeric', month: 'numeric', year: 'numeric' , hour: '2-digit', minute: '2-digit'})
				}
			}
		},
		computed: {
			...mapGetters({ match: 'stats/matchDetails',
							team1: 'stats/team1',
							team2: 'stats/team2',
							scorersTeam1: 'stats/scorersTeam1',
							scorersTeam2: 'stats/scorersTeam2' })
		},
		components: { Scorers, AdvancedData, AdvancedDataPlayer }
	}
</script>
 
 
<style lang='scss' scoped>
.match-card {
	//max-width: 576px;
	.team-logo {
		max-width: 80px;
		margin-bottom: 1rem;
	}
	.team-name {
		font-size: 1.2rem;
	}
	.collect {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h5 {
		font-size: 1.5rem;
	}
	.result {
		top: 1.5rem;
		right: 0;
		left: 0;
		margin-left: auto;
		margin-right: auto;
		transform: translateY(-50%);
		width: fit-content;
		text-align: center;
		span {
			padding: 0.4rem 1rem;
			background: #495057;
			color: #f8f9fa;
			border-radius: 8px;
			font-weight: 700;
			font-size: 1.8rem;
			display: inline-block;			
		}
		.date {
			text-align: center;
			font-size: .7rem;
		}
	}
}
@media( max-width: 576px ) {
	.match-card {
		.team-logo {
			max-width: 50px;
		}
		.team-name {
			font-size: 1rem;
		}
		.result {
			span {
				padding: 0.3rem .9rem;
				font-size: 1.3rem;
			}
		}
	}
}
</style>