<template>
	<div class="center-center flex-column">
		<div class="position-relative">
			<Pitch v-if="duels" />
			<Duel v-if="duels" v-for="duel in duels.events" :x="duel.location.x" :selected="selectedDuel ? selectedDuel.id : null"
				  :y="duel.location.y" :won="checkDuel(duel)" @click="specificDuel(duel)" :id="duel.id"/>
		</div>

		<Legend v-if="duels" :legends="legends"/>

		<DuelDetails v-if="selectedDuel" class="mt-3 w-100" :name="opponentName(selectedDuel)" :time="formatTime(selectedDuel.minute, selectedDuel.second)" 
					:length="''" :accurate="checkDuel(selectedDuel)" :secondaryName="selectedDuel.type.secondary[0]" />

		<LoadingIcon v-if="!duels" :title="title"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';
	import Pitch from '../../Vectors/Pitch.vue';
	import Duel from './Duel.vue';
	import DuelDetails from './DuelDetails.vue';
	import Legend from '../../Global/Legend.vue';
	
	export default {
		props: {
			match: Object,
			primaryParam: String,
			secondaryParam: String,
			playerId: Number,
			matchId: Number,
			title: String
		},
		created() {
			this.$store.dispatch('stats/getPlayerEvent', { matchId: this.matchId, playerId: this.playerId, primary: this.primaryParam, secondary: this.secondaryParam ? this.secondaryParam : null })
		},
		data() {
			return {
				selectedDuel: null,
				legends: [
					{ icon: 'bi bi-record-fill', title: this.$i18n.t('message.Successful').toLowerCase(), color: 'var(--stat-chart-bg)' },
					{ icon: 'bi bi-x', title: this.$i18n.t('message.Unsuccessful').toLowerCase(), color: 'var(--color-failed)' },
				]
			}
		},
		methods: {
			// check various types of duels that are successful
			checkDuel(data) {
				if ( 'secondary' in data.type && data.type.secondary.includes('foul_suffered') ) {
					return true
				}
				if ( 'secondary' in data.type && data.type.secondary.includes('loss') ) {
					return false
				}
				if ( data.carry ) {
					return data.carry.progression > 0 ? true : false
				}
				if ( data.aerialDuel ) {
					return data.aerialDuel.firstTouch ? true : false
				}
				if ( data.groundDuel ) {
					if ( data.groundDuel.duelType === "defensive_duel" ) {
						return data.groundDuel.keptPossession || ( data.groundDuel.stoppedProgress && data.groundDuel.recoveredPossession) ? true : false
					} 
					if ( data.groundDuel.duelType === 'dribble' ) {
						return data.groundDuel.keptPossession && data.groundDuel.progressedWithBall ? true : false
					}
					if ( data.groundDuel.duelType === 'offensive_duel' ) {
						return data.groundDuel.keptPossession ? true : false
					}
					return data.groundDuel.keptPossession /* && data.groundDuel.progressedWithBall */ ? true : false 
				}
				return false
			},
			specificDuel(data) {
				this.selectedDuel = data
			},
			opponentName(data) {
				return data.groundDuel ? data.groundDuel.opponent.name : ( data.aerialDuel ? data.aerialDuel.opponent.name : '' )
			},
			formatTime(minute, second) {
				return Helpers.formatTime(minute, second) 
			}

		},
		computed: {
			...mapGetters({ duels: 'stats/playerDuels' })
		},
		components: { Pitch, LoadingIcon, Duel, DuelDetails, Pitch, Legend }
	}
</script>
 
 
<style lang='scss' scoped>
.duel-desc {
	.won {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--stat-chart-bg);
		border-radius: 50%;
	}
	.pi-times {
		font-size: 9px;
		color: var(--color-failed);
	}
}
</style>