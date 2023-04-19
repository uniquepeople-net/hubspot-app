<template>
	<div>
		<div class="d-flex justify-content-evenly team-btns">
			<Button :label="team1.team.name" severity="secondary" @click="handleTeam('1')"
				:outlined="teamCheck ? false : true" raised rounded class="me-2"/>
			<Button :label="team2.team.name" severity="secondary" @click="handleTeam('2')"
				:outlined="teamCheck ? true : false" raised rounded class="ms-2"/>
		</div>
		<div class="mt-4">
			<p :class="`m-0 p-2 ${index % 2 === 0 ? 'bg' : ''}`" v-for="(pos, index) in getSelectedTeam().formation.lineup" >
				<span>{{pos.player.shirtNumber}}</span>{{pos.player.firstName + ' ' + pos.player.lastName }}
				<!-- <i v-for="cards in Number(pos.yellowCards)" class="bi bi-file-fill yellow"></i> -->
				<img v-for="goal in Number(pos.goals)  + Number(pos.ownGoals)" class="soccer-ball mx-1" src="../../../../../../assets/images/football.png" alt="">

				<span>
					<i class="bi bi-arrow-up arrow-up"></i>
					<i class="bi bi-arrow-down arrow-down"></i>
				</span>
			
			</p>
		</div>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex';

	export default {
		props: ['matchId'],
		data() {
			return {
				teamCheck: true,
				selectedTeam: 'team1'
			}
		},
		methods: {
			getSelectedTeam() {
				return this.selectedTeam === 'team1' ? this.team1 : this.team2;
			},
			handleTeam(num) {
				if ( !this.selectedTeam.includes(num) ) {
					this.teamCheck = !this.teamCheck
				}
				this.selectedTeam = 'team' + num
			}
		},
		computed: {
			...mapGetters({ team1: 'stats/team1',
							team2: 'stats/team2' })
		}
	}
</script>
 
 
<style lang='scss' scoped>
.team-btns {
	:deep(.p-button) {
		font-size: .8rem;
	}
}
.bg {
	background: var(--gray-100);
}
.red {
	color: var(--red-600);
}
.yellow {
	color: var(--yellow-400);
}
.soccer-ball {
	width: 15px;
}
.arrow-up {
  	color: var(--green-500);
}

.arrow-down {
  	color: var(--red-600);
}
</style>