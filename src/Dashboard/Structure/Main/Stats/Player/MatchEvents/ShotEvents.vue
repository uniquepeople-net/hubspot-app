<template>
	<div class="center-center flex-column">
		<div class="position-relative">
			<Pitch v-if="shots" />
			<Shot v-if="shots" v-for="shot in shots.events" 
					:x1="shot.location.x" :y1="shot.location.y" 
					:x2="100" :y2="50" :accuracy="shot.shot.onTarget" :id="shot.id"
					@click="selectShot(shot)" :selectedShot="selectedShot" :goal="shot.shot.isGoal"/>
			
		</div>
		<GoalNet v-if="shots" :shots="shots.events" class="mt-5 mb-4"/>
		
		<ShotDetails v-if="selectedShot" class="mt-3 w-100" :name="opponentName(selectedShot)" :time="formatTime(selectedShot.minute, selectedShot.second)" 
					:length="''" :accurate="checkShot(selectedShot.shot)" :secondaryName="selectedShot.type.secondary[0]"/>
		
		<LoadingIcon v-if="!shots" :title="$t('message.Shots').toLowerCase()"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Pitch from '../../Vectors/Pitch.vue';
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';
	import Shot from './Shot.vue';
	import GoalNet from './GoalNet.vue';
	import ShotDetails from './ShotDetails.vue';

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
			this.$store.dispatch('stats/getPlayerEvent', { matchId: this.matchId, playerId: this.playerId, primary: this.primaryParam })
		},
		data() {
			return {
				shot: null,
				selectedShot: null
			}
		},
		methods: {
			selectShot(data) {
				this.selectedShot = data
			},
			opponentName(data) {
				return data.shot && data.shot.goalkeeper ? data.shot.goalkeeper.name : ''
			},
			formatTime(minute, second) {
				return Helpers.formatTime(minute, second) 
			},
			checkShot(shot) {
				if ( !shot.onTarget ) {
					return false
				} 
				if ( shot.isGoal ) {
					return 'goal'
				} else {
					return true
				}
			}
		},
		computed: {
			...mapGetters({ shots: 'stats/playerShots' })
		},
		components: { Pitch, LoadingIcon, Shot, GoalNet, ShotDetails }
	}
</script>
 
 
<style lang='scss' scoped>
</style>