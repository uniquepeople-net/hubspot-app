<template>
	<div class="center-center flex-column">
		<div class="position-relative">
			<Pitch v-if="shots" />
			<Shot v-if="shots" v-for="shot in shots.events" 
					:x1="shot.location.x" :y1="shot.location.y" 
					:x2="100" :y2="50" :accuracy="shot.shot.onTarget" :id="shot.id"
					:blockedShot="shot.shot.goalZone === 'bc' ? true : false"
					@click="selectShot(shot)" :selectedShot="selectedShot" :goal="shot.shot.isGoal"/>
			
		</div>

		<Legend v-if="shots" :legends="legends"/>

		<Divider class="divider-light" />
		
		<GoalNet v-if="shots" :shots="shots.events" class="mt-5 mb-4" :selectedShotId="selectedShot ? selectedShot.id : null" @selectShot="goalNetSelectShot"/>
		
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
			this.$store.dispatch('stats/getPlayerEvent', { matchId: this.matchId, playerId: this.playerId, primary: this.primaryParam })
		},
		data() {
			return {
				shot: null,
				selectedShot: null,
				legends: [
					{ icon: 'bi bi-arrow-right', title: this.$i18n.t('message.Goal').toLowerCase(), color: 'var(--color-success)' },
					{ icon: 'bi bi-arrow-right', title: this.$i18n.t('message.OnTarget').toLowerCase(), color: 'var(--stat-chart-bg)' },
					{ icon: 'bi bi-arrow-right', title: this.$i18n.t('message.OffTarget').toLowerCase(), color: 'var(--color-failed)' },
					{ icon: 'bi bi-x', title: this.$i18n.t('message.BlockedShot').toLowerCase(), color: 'var(--main-dark)' },
				]
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
				if ( shot.goalZone === 'bc' ) {
					return { title:  this.$i18n.t('message.BlockedShot'), icon: 'CircleCheckBlue' }
				}
				if ( !shot.onTarget ) {
					return { title:  this.$i18n.t('message.Inaccurate'), icon: 'CircleFailed' }
				} 
				if ( shot.isGoal ) {
					return { title:  this.$i18n.t('message.Goal'), icon: 'Football' }
				}
				if ( shot.onTarget && !shot.isGoal ) {
					return { title:  this.$i18n.t('message.Accurate'), icon: 'CircleCheckBlue' }
				}
			},
			goalNetSelectShot(data) {
				this.selectedShot = data
			}
		},
		computed: {
			...mapGetters({ shots: 'stats/playerShots' })
		},
		components: { Pitch, LoadingIcon, Shot, GoalNet, ShotDetails, Legend }
	}
</script>
 
 
<style lang='scss' scoped>

</style>