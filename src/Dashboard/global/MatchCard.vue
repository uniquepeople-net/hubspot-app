<template>
	<Card class="card match-card">
			<template #title>
				<div class="card-header"><h5>Match Info</h5></div>
			</template>
			<template #content>
				<div class="card-body position-relative">
					<div class="row">
						<div class="col-6 collect align-items-start">
							<h5 class="fw-light mb-md-3">{{ match.team1_name }}</h5>
							<!-- <Skeleton width="5rem" class="mb-2"></Skeleton> -->
							<img class="team-logo" :src="team1.photo" alt="">
							<!-- <Skeleton shape="circle" size="2.5rem" class="mr-2"></Skeleton> -->
						</div>

						<div class="col-6 collect align-items-end">
							<h5 class="text-end fw-light mb-md-3">{{ match.team2_name }}</h5>
							<!-- <Skeleton width="5rem" class="mb-2"></Skeleton> -->
							<img class="team-logo" :src="team2.photo" alt="">
							<!-- <Skeleton shape="circle" size="2.5rem" class="mr-2"></Skeleton> -->
						</div>
					</div>

					<div class="result position-absolute">
						<span>{{ modifyResult(match.score) }}</span>
						<p class="date mt-2">{{ matchDate( match.match_date ) }}</p>
					</div>

					<Skeleton v-if="!match" width="5rem" height="2.5rem" class="result position-absolute"></Skeleton>					
				</div>
			</template>
		</Card>  
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {

			}
		},
		methods: {
			modifyResult(data) {
				if (data) {
					let split = data.split('');
					split[1] = ' : '
					data = split.join('')
					return data
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
			...mapGetters({ match: 'stats/match',
							team1: 'stats/team1',
							team2: 'stats/team2' })
		},
		watch: {
			match: function (data) {
				if ( data.id ){
					this.$store.dispatch( "stats/getTeam", { id:data.team1_id, number: '1'} );
					this.$store.dispatch( "stats/getTeam", { id:data.team2_id, number: '2'} );
				}				
				
			}
		},

	}
</script>
 
 
<style lang='scss' scoped>
.match-card {
	//max-width: 576px;
	.team-logo {
		max-width: 60px;
	}
	.collect {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
	}
	h5 {
		font-size: 1.5rem;
	}
	.result {
		top: 85%;
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
		h5 {
			font-size: 1.2rem;
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