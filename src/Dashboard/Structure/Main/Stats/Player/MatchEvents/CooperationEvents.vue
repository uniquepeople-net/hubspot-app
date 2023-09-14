<template>
	<div>
		<Pitch v-if="passesCounted"/>
		<Cooperation />

		<LoadingIcon v-if="!passesCounted"/>
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import LoadingIcon from '../../../../../global/LoadingIcon.vue'
	import Pitch from '../../Vectors/Pitch.vue'
	import Cooperation from './Cooperation.vue'

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
		updated() {
			console.log(this.passesCounted)
			
		},
		data() {
			return {
			}
		},
		methods: {
			// Count number of passes with specific recipient 
			countRecipients(events) {
				const recipientCount = {};
				
				events && events.forEach(event => {
					const recipient = event.pass.recipient;
					if (recipient && recipient.id !== 0) {
						if (!recipientCount[recipient.id]) {
							recipientCount[recipient.id] = 0;
						}
						recipientCount[recipient.id]++;
					}
				});

				events && events.map( event => {
					const recipient = event.pass.recipient;
					if (recipient && recipient.id !== 0) {
						event.pass.recipient.countPass = recipientCount[recipient.id]
						return event
					}
				});
				
				return events;
			},
		},
		computed: {
			...mapGetters({ passes: 'stats/playerPasses' }),
			passesCounted() {
				let passesCounted = this.countRecipients(this.passes ? this.passes.events : null )
				
				return passesCounted		
			}
		},
		components: { Pitch, Cooperation, LoadingIcon },
	}
</script>
 
<style lang='scss' scoped>
</style>