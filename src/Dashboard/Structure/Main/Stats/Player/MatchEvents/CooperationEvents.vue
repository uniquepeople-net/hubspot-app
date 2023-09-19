<template>
	<div>
		<Pitch v-if="recipients"/>
		<Cooperation />

		<LoadingIcon v-if="!recipients"/>
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

				const recipients = events && events.map( event => {
					const recipient = event.pass.recipient;
					if (recipient && recipient.id !== 0) {
						event.pass.recipient.countPass = recipientCount[recipient.id]
						return event.pass.recipient
					}
				});
				return recipients;
			},
			// Add shirt number to recipient
			addShirtNum(recipients, players) {
				recipients.map( item => {
					players.map( player => {
						if ( player && item && player.playerId === item.id ){
							return { ...item, shirtNumber: player.shirtNumber }
						}
					})
					return item
				})

				const uniqueObjects = {};
				const result = [];

				for (const obj of recipients) {
					if (obj && !uniqueObjects[obj.id]) {
					uniqueObjects[obj.id] = true;
					result.push(obj);
					}
				}

				return result;

			}
		},
		computed: {
			...mapGetters({ passes: 'stats/playerPasses',
							playerDetails: 'stats/playerDetails' }),
			recipients() {
				let recipients = this.countRecipients(this.passes ? this.passes.events : null )
				
				let teamId = this.playerDetails.currentTeamId
				let teamFormation = this.passes && this.passes.match.teamsData[teamId].formation

				if ( teamFormation ) {

					let playingPlayers = [ ...teamFormation.lineup, ...teamFormation.bench ]
					
					let recipientsWithNumbers = this.addShirtNum( recipients, playingPlayers )
					console.log(recipientsWithNumbers)
					 		
				} else return null

			}
		},
		components: { Pitch, Cooperation, LoadingIcon },
	}
</script>
 
<style lang='scss' scoped>
</style>