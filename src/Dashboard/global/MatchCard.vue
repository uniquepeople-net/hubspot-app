<template>
	<div>
		<Card class="card match-card">
			<template #content>
				<div  class="card-body">
					<div class="row position-relative w-100 mx-auto">
						<div class="col-4 collect ps-0">
							<img class="team-logo" :src="matchData.home.team.imageDataURL" alt="" />
							<h6 class="text-sm-bold fw-bold mb-md-3 text-center px-1">{{ matchData.home.team.officialName }}</h6>
						</div>
						<div class="col-4"></div>
						<div class="col-4 collect pe-0">
							<img class="team-logo" :src="matchData.away.team.imageDataURL" alt="" />
							<h6 class="text-sm-bold text-center fw-bold mb-md-3 px-1">{{ matchData.away.team.officialName }}</h6>
						</div>
	
						<div class="result position-absolute">
							<p class="date mb-1">{{ matchDate(matchData.date) }}</p>
							<span class="span-result px-0">
								<span>{{ score(matchData.home) }}</span>
								<span class="p-0 px-1">:</span>
								<span>{{ score(matchData.away) }}</span>
							</span>
						</div>
					</div>		

					<div v-if="goals" class="row gx-5 mt-3">
						<div class="col-6 d-flex justify-content-end">
							<span class="w-auto d-inline-block">
								<div v-for="scorer in matchData.scorersHome">
										<Football v-for="goal in Number(scorer.goals)" class="me-1"/>
										<Football v-for="goal in Number(scorer.ownGoals)" class="me-1" color="red"/>
										<span class="text-des-small ms-2">{{scorer.player.shortName}}</span>
								</div>
							</span>
						</div>
						<div class="col-6">
							<div v-for="scorer in matchData.scorersAway" >
								<Football v-for="goal in Number(scorer.goals)" class="me-1"/>
								<Football v-for="goal in Number(scorer.ownGoals)" class="me-1" color="red"/>
								<span class="text-des-small ms-2">{{scorer.player.shortName}}</span>
							</div>
						</div>
					</div>			
	
					<Divider class="divider-light"/>				
				</div>
			</template>
		</Card> 
	</div>
</template>
 
 
<script>
	import AdvancedData from '../Structure/Main/Stats/MatchData/AdvancedData.vue';
	import AdvancedDataPlayer from '../Structure/Main/Stats/PlayerData/AdvancedDataPlayer.vue';
	import Scorers from '../Structure/Main/Stats/MatchData/Scorers.vue';
	import QuestionMark from '../Structure/Main/Stats/Vectors/QuestionMark.vue';
	import Football from '../Structure/Main/Stats/Vectors/Football.vue';

	export default {
		props: {
			matchData: Object,
			goals: Boolean
		},
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
			},
			score(data) {
				if ( data.scoreP !== 0 ) {
					return data.scoreP
				} else if ( data.scoreET !== 0 ) {
					return data.scoreET
				} else return data.score
			}
		},
		components: { Scorers, AdvancedData, AdvancedDataPlayer, QuestionMark, Football }
	}
</script>
 
<style lang='scss' scoped>
.match-card {
	border: 0;
	box-shadow: unset;
	:deep(.p-card-body) {
		padding: 0;
	}
	.team-logo {
		max-width: 50px;
		margin-bottom: .25rem;
	}
	.collect {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h5 {
		font-size: 1.5rem;
	}
	.own-goal {
		path {
			stroke: red;
		}
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
		span.span-result {
			padding: 0.3rem 1rem;
			width: auto;
			min-width: 94px;
			background:var(--main-dark);
			color: #f8f9fa;
			border-radius: 8px;
			font-weight: 700;
			font-size: 1.5rem;
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
			max-width: 40px;
		}
		.result {
			span {
				padding: 0.3rem .9rem;
				font-size: 1.3rem;
			}
		}
		:deep(.card-body) {
			padding: 0;
		}
	}
}
</style>