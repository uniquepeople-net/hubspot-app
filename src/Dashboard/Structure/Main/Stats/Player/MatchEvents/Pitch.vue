<template>
	<div class="pitch-passes">
		<Pitch />		
		<Pass v-for="pass in passes" :transmitter="pass.player.shirtNumber" :receiver="pass.pass.recipient.shirtNumber" 
			  :x1="pass.location.x" :y1="pass.location.y" 
			  :x2="pass.pass.endLocation.x" :y2="pass.pass.endLocation.y" 
			  :accuracy="pass.pass.accurate" :id="pass.id"
			  @click="selectPass(pass)" :selectedPass="selectedPass"/>
	</div>
</template>
 
 
<script>
	import Pass from '../../Global/Pass.vue'
	import Pitch from '../../Vectors/Pitch.vue'

	export default {
		props: {
			events: Array,
			match: Object
		},
		data() {
			return {
				selectedPass: null
			}
		},
		methods: {
			selectPass(pass) {
				this.selectedPass = pass.id
				this.$emit( 'selectedPass', this.events.filter( item => item.id === this.selectedPass ) )
			},
		},
		computed: {
			passes() {
				if ( this.events && this.events.length > 0 ) {
					let team = this.events[0].team.id === this.match.home.teamId ? this.match.home : this.match.away
					
					this.events.map( item => {
						let transmitPlayerId = item.player.id
						let receiverPlayerId = item.pass.recipient.id
						let matchPlayers = [ ...team.formation.lineup, ...team.formation.bench ]
						
						matchPlayers.map( player => {
							if ( player.playerId === transmitPlayerId ) {
								item.player.shirtNumber = player.shirtNumber
							}
							if ( player.playerId === receiverPlayerId ) {
								item.pass.recipient.shirtNumber = player.shirtNumber
							}
						})
						return item
					})
				}
				return this.events
			}
		},
		components: { Pitch, Pass }
	}
</script>
 
 
<style lang='scss' scoped>
.pitch-passes {
	position: relative;
	width: fit-content;
	margin: auto;
	svg {
		width: 100%;
	}
}
</style>