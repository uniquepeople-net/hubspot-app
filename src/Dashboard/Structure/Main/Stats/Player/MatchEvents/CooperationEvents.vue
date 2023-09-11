<template>
	<div>
		<Pitch />
		<Cooperation />
	</div>
</template>
 
 
<script>
	import { mapGetters } from 'vuex'
	import Pitch from '../../Vectors/Pitch.vue'
	import Cooperation from './Cooperation.vue'

	export default {
		props: {
			data: Object,
			match: Object
		},
		created() {
			this.$store.dispatch('stats/getMatchFormations', { id: this.match.matchId, homeId: this.match.home.teamId, awayId: this.match.away.teamId } )	

			if ( this.data && this.data.events.length > 0 ) {
					let events = this.data.events
					let team = events[0].team.id === this.match.home.teamId ? this.match.home : this.match.away
					
					events.map( item => {
						let transmitPlayerId = item.player.id
						let receiverPlayerId = item.pass.recipient.id
						let matchPlayers = [ ...team.formation.lineup, ...team.formation.bench ]
						
						console.log(matchPlayers)
						

						matchPlayers.map( player => {
							if ( player.playerId === transmitPlayerId ) {
								item.player.shirtNumber = player.shirtNumber
								item.player.position = player.position
							}
							if ( player.playerId === receiverPlayerId ) {
								item.pass.recipient.shirtNumber = player.shirtNumber
								item.pass.recipient.position = player.position
							}
						})
						return item
					})

					// Create an object to store recipient counts
					const recipientCounts = {};

					// Iterate through the array of objects
					events.forEach((event) => {
						if (event.pass && event.pass.recipient) {
							const recipientId = event.pass.recipient.id;
							if (recipientCounts[recipientId]) {
							recipientCounts[recipientId]++;
							} else {
							recipientCounts[recipientId] = 1;
							}
						}
					});

					// Add the counts to each recipient's object
					const recipientsWithCounts = events.map((event) => {
						if (event.pass && event.pass.recipient) {
							const recipientId = event.pass.recipient.id;
							const recipientCount = recipientCounts[recipientId] || 0;
							
							event.pass.recipient.cooperation = recipientCount
							return event
						}
						return null;
					});

					console.log(recipientsWithCounts)
					

					return events
				}
		},
		data() {
			return {
				}
		},
		methods: {
			
		},
		computed: {
			passes() {
				if ( this.data && this.data.events.length > 0 ) {
					let events = this.data.events
					let team = events[0].team.id === this.match.home.teamId ? this.match.home : this.match.away
					
					events.map( item => {
						let transmitPlayerId = item.player.id
						let receiverPlayerId = item.pass.recipient.id
						let matchPlayers = [ ...team.formation.lineup, ...team.formation.bench ]
						
						matchPlayers.map( player => {
							if ( player.playerId === transmitPlayerId ) {
								item.player.shirtNumber = player.shirtNumber
								item.player.position = player.position
							}
							if ( player.playerId === receiverPlayerId ) {
								item.pass.recipient.shirtNumber = player.shirtNumber
								item.pass.recipient.position = player.position
							}
						})
						return item
					})

					console.log('posi:', events)
					

					// Create an object to store recipient counts
					const recipientCounts = {};

					// Iterate through the array of objects
					events.forEach((event) => {
						if (event.pass && event.pass.recipient) {
							const recipientId = event.pass.recipient.id;
							if (recipientCounts[recipientId]) {
							recipientCounts[recipientId]++;
							} else {
							recipientCounts[recipientId] = 1;
							}
						}
					});

					// Add the counts to each recipient's object
					const recipientsWithCounts = events.map((event) => {
						if (event.pass && event.pass.recipient) {
							const recipientId = event.pass.recipient.id;
							const recipientCount = recipientCounts[recipientId] || 0;
							
							event.pass.recipient.cooperation = recipientCount
							return event
						}
						return null;
					});

					console.log(recipientsWithCounts)
					

					return events
				}
			}
		},
		computed: {
			...mapGetters({ formations: 'stats/formations' })
		},
		components: { Pitch, Cooperation },
	}
</script>
 
<style lang='scss' scoped>
</style>