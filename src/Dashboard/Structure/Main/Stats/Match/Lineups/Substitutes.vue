<template>
	<div>
		<h5 class="text-value">{{ $t('message.Substitutes') }}</h5>
		<div class="team-btns d-flex">			
			<Button severity="secondary" @click="switchTeam('1')"
					:outlined="teamCheck === '1' ? false : true" raised rounded :class="`club-btn btn-home ${ teamCheck === '1'? 'active-btn' : '' }`">
				<div class="d-flex align-items-center">
					<img class="team-logo" :src="substitutesHome.team.imageDataURL" alt="">
					<span class="ms-2 text-sm-notice ">{{ substitutesHome.team.officialName }}</span>
				</div>
			</Button>
			<Button severity="secondary" @click="switchTeam('2')"
					:outlined="teamCheck === '2' ? true : false" raised rounded :class="`club-btn btn-guest ${ !teamCheck === '2' ? 'active-btn' : '' }`">
				<div class="d-flex align-items-center">
					<img class="team-logo" :src="substitutesAway.team.imageDataURL" alt="">
					<span class="ms-2 text-sm-notice">{{ substitutesAway.team.officialName }}</span>
				</div>
			</Button>
		</div>

		<div class="mt-3 substitutions">
			<div v-for="player in (teamCheck === '1' ? substitutesHome.formation.bench : substitutesAway.formation.bench)" class="">
				<span class="text-description d-flex justify-content-between data">
					<span>
						<span v-if="'outside' in player">{{ player.outside.shortName }}</span>
					</span>
					<span class="d-flex align-items-center text-smd-message">
						{{ '(' }}					
						<span v-if="'outside' in player">{{ player.outside.minute}}'&nbsp;</span>  
						<span>{{ player.player.shortName + ')' }}</span>
						<ArrowUp v-if="'outside' in player" class="mx-1"/>	
					</span>
				</span>
				<Divider class="my-1"/>
			</div>
		</div>

	</div>
</template>
 
 
<script>
	import ArrowUp from '../../Vectors/ArrowUp.vue'
	
	export default {
		props: {
			substitutesHome: Object,
			substitutesAway: Object
		},
		data() {
			return {
				teamCheck: '1',
				selectedTeam: 'team1'
			}
		},
		methods: {
			switchTeam(team) {
				this.teamCheck = team
			}
		},
		components: { ArrowUp }
	}
</script>
 
 
<style lang='scss' scoped>
.team-btns {
	position: relative;
	height: 55px;
	:deep(.p-button) {
		font-size: .8rem;
	}
	.btn-home {
		left: 0;
		padding-right: 3rem;
	}
	.btn-guest {
		right: 0;
		padding-left: 3rem;
	}
	.team-logo {
		width: 30px;
	}
	.club-btn {
		position: absolute;
		color: var(--text-light-color);
		width: calc(50% + 1.4rem);
		max-width: calc(50% + 1.4rem) !important;
		height: 100%;
		text-align: left;
		box-shadow: unset;
		border: 1px solid var(--main-dark);
		background: var(--card-bg);
	}
	.club-btn:enabled:hover, 
	.club-btn:enabled:focus,
	.club-btn:enabled:active {
		color: var(--main-white);
		background: var(--main-dark);
		box-shadow: unset;
		border: 1px solid var(--main-dark);
	}
	.active-btn {
		color: var(--main-white);
		background: var(--main-dark);
		border: 1px solid var(--main-dark);
		display: inline-block;
		z-index: 50;
	}
}
.substitutions {
	.number {
		display: inline-flex;
		justify-content: center;
		width: 23px;
	}
	.data {
		height: 1.9rem;
	}
}

</style>