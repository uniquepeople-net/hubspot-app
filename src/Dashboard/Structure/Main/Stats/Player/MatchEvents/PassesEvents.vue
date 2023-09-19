<template>
	<div>
		<Pitch v-if="passes" :events="passes.events" :match="match" @selectedPass="selectedPass"/>

		<Legend v-if="passes" :legends="legends" class="mb-4"/>

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
	import Legend from '../../Global/Legend.vue';

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
				pass: null,
				legends: [
					{ icon: 'bi bi-arrow-right', title: this.$i18n.t('message.Successful').toLowerCase(), color: 'var(--color-success)' },
					{ icon: 'bi bi-arrow-right', title: this.$i18n.t('message.Unsuccessful').toLowerCase(), color: 'var(--color-failed)' },
				]
			}
		},
		methods: {
			selectedPass(data) {
				this.pass = data ? data[0] : null
			},
			formatTime(minute, second) {
				return Helpers.formatTime(minute, second) 
			}
		},
		computed: {
			...mapGetters({ passes: 'stats/playerPasses' })
		},
		components: { Pitch, PassDetails, LoadingIcon, Legend }
	}
</script>
 
 
<style lang='scss' scoped>
</style>