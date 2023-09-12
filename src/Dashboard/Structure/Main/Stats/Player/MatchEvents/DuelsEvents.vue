<template>
	<div class="center-center flex-column">
		<div class="position-relative">
			<Pitch v-if="duels" />
			<Duel v-if="duels" v-for="duel in duels.events" :x="duel.location.x" :selected="selectedDuel ? selectedDuel.id : null"
				  :y="duel.location.y" :won="checkDuel(duel)" @click="specificDuel(duel)" :id="duel.id"/>
		</div>
		<div class="duel-desc d-flex align-items-center justify-content-between mt-1">
			<span class="ms-2 me-3">
				<span class="won"></span>
				<span class="ms-2">{{$t('message.Successful').toLowerCase()}}</span>
			</span>
			<span class="ms-3 me-2">
				<i class="pi pi-times"></i>
				<span class="ms-2">{{$t('message.Unsuccessful').toLowerCase()}}</span>
			</span>
		</div>

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
	
	export default {
		props: {
			match: Object,
			primaryParam: String,
			playerId: Number,
			matchId: Number,
			title: String
		},
		created() {
			this.$store.dispatch('stats/getPlayerEvent', { matchId: this.matchId, playerId: this.playerId, primary: this.primaryParam/* , secondary: 'offensive_duel' */ })
		},
		data() {
			return {
				selectedDuel: null
			}
		},
		methods: {
			// check various types of duels that are successful
			checkDuel(data) {
				if ( data.aerialDuel ) {
					return data.aerialDuel.firstTouch ? true : false
				}
				if ( data.groundDuel ) {
					if ( data.groundDuel.duelType === "defensive_duel" ) {
						return data.groundDuel.stoppedProgress /* && data.groundDuel.recoveredPossession */ ? true : false
					} 
					return data.groundDuel.keptPossession /* && data.groundDuel.progressedWithBall */ ? true : false 
				}
				if ( 'secondary' in data.type && data.type.secondary.includes('recovery') || data.type.secondary.includes('foul_suffered') ) {
					return true
				}
				if ( data.carry ) {	
					return data.carry.progression > 0 ? true : false 
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
				if ( minute !== null && second !== null ) {
					let minuteF = minute && minute >= 0 && minute <= 9 ? '0' + minute.toString() : minute.toString()
					let secondF = second && second >= 0 && second <= 9 ? '0' + second.toString() : second.toString()
					return minuteF + ':' + secondF
				} else {
					return '00:00'
				}
			}

		},
		computed: {
			...mapGetters({ duels: 'stats/playerDuels' })
		},
		components: { Pitch, LoadingIcon, Duel, DuelDetails, Pitch }
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