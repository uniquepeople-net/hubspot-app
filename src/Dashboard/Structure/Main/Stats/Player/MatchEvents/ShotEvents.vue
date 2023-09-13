<template>
	<div class="center-center flex-column">
		<div class="position-relative">
			<Pitch v-if="shots" />
			<Shot v-if="shots" v-for="shot in shots.events" 
					:x1="shot.location.x" :y1="shot.location.y" 
					:x2="100" :y2="50" :accuracy="shot.shot.onTarget" :id="shot.id"
					@click="selectShot(shot)" :selectedShot="selectedShot" :goal="shot.shot.isGoal"/>
			
		</div>
		<GoalNet v-if="selectedShot" :shot="selectedShot" :zone="selectedShot.shot.goalZone"/>
		<LoadingIcon v-if="!shots" :title="$t('message.Shots').toLowerCase()"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Pitch from '../../Vectors/Pitch.vue';
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';
	import Shot from './Shot.vue';
	import GoalNet from './GoalNet.vue';

	export default {
		props: {
			match: Object,
			primaryParam: String,
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
			}
		},
		computed: {
			...mapGetters({ shots: 'stats/playerShots' })
		},
		components: { Pitch, LoadingIcon, Shot, GoalNet }
	}
</script>
 
 
<style lang='scss' scoped>
</style>