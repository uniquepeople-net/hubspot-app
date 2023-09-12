<template>
	<div>
		<Pitch v-if="passes" class="mb-4" :events="passes.events" :match="match" @selectedPass="selectedPass"/>
		<PassDetails v-if="pass" :name="pass.pass.recipient.name" :time="formatTime(pass.minute, pass.second)" 
					:length="pass.pass.length" :accurate="pass.pass.accurate" :secondaryName="pass.type.secondary[0]"/>

		<LoadingIcon v-if="!passes" :title="title" />
	
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex' 
	import PassDetails from './PassDetails.vue'
	import Pitch from './Pitch.vue'
	import LoadingIcon from '../../../../../global/LoadingIcon.vue';

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
				pass: null
			}
		},
		methods: {
			selectedPass(data) {
				this.pass = data ? data[0] : null
			},
			formatTime(minute, second) {
				if ( minute && second ) {
					let minuteF = minute && minute >= 0 && minute <= 9 ? '0' + minute.toString() : minute.toString()
					let secondF = second && second >= 0 && second <= 9 ? '0' + second.toString() : second.toString()
					return minuteF + ':' + secondF
				} else {
					return '00:00'
				}
			}
		},
		computed: {
			...mapGetters({ passes: 'stats/playerPasses' })
		},
		components: { Pitch, PassDetails, LoadingIcon }
	}
</script>
 
 
<style lang='scss' scoped>
</style>