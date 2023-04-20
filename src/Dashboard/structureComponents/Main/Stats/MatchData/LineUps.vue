<template>
	<div>
		<div class="d-flex justify-content-evenly team-btns">
			<Button :label="team1.team.name" severity="secondary" @click="handleTeam('1')"
				:outlined="teamCheck ? false : true" raised rounded class="me-2"/>
			<Button :label="team2.team.name" severity="secondary" @click="handleTeam('2')"
				:outlined="teamCheck ? true : false" raised rounded class="ms-2"/>
		</div>
		<div class="mt-4 lineup">
			<p :class="`m-0 p-2 ${index % 2 === 0 ? 'bg' : ''}`" v-for="(pos, index) in getSelectedTeam().formation.lineup" >
				<!-- <span class="me-1">{{pos.shirtNumber}}</span> -->
				<span class="fw-semibold">{{pos.player.firstName + ' ' + pos.player.lastName }}</span>
				<span v-if="Number(pos.yellowCards) > 0"><i class="bi bi-file-fill yellow mx-1"></i></span>
				<span v-if="Number(pos.redCards) > 0"><i class="bi bi-file-fill red mx-1"></i></span>
				<img v-for="goal in Number(pos.goals)  + Number(pos.ownGoals)" class="soccer-ball mx-1" src="../../../../../../assets/images/football.png" alt="">

				<span v-if="pos.inside" class="substitute">
					<!-- <i class="bi bi-arrow-up arrow-up"></i> -->
					<i class="bi bi-arrow-down arrow-down"></i>
					({{ pos.inside.minute + "' " + pos.inside.shortName }})
				</span>
			
			</p>
		</div>

		<div class="mt-3 lineup">
			<h6 class="text-center">Substitutions</h6>
			<p :class="`m-0 p-2 ${index % 2 === 0 ? 'bg' : ''}`" v-for="(pos, index) in getSelectedTeam().formation.bench" >
				<!-- <span class="me-1">{{pos.shirtNumber}}</span> -->
				<span class="fw-semibold">{{pos.player.firstName + ' ' + pos.player.lastName }}</span>
				<span v-if="Number(pos.yellowCards) > 0"><i class="bi bi-file-fill yellow"></i></span>
				<span v-if="Number(pos.redCards) > 0"><i class="bi bi-file-fill red"></i></span>
				<img v-for="goal in Number(pos.goals)  + Number(pos.ownGoals)" class="soccer-ball mx-1" src="../../../../../../assets/images/football.png" alt="">

				<span v-if="pos.outside" class="substitute">
					<i class="bi bi-arrow-up arrow-up"></i>
					({{ pos.outside.minute + "' " + pos.outside.shortName }})
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
.lineup {
	font-size: .8rem;
	.substitute {
		font-size: .7rem;
		color: var(--gray-00);
	}
}
</style>