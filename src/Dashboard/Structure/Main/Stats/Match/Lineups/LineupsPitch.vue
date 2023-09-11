<template>
	<div class="pitch-lineups">
		<span class="home-formation text-x-small">{{ formations.homeData.scheme }}</span>
		<Pitch />
		<span class="away-formation text-x-small">{{ formations.awayData.scheme }}</span>
		<TshirtNumber v-for="player in homePlayers" :x="'x' in player ? player.x : 0" :y="'y' in player ? player.y : 0" color="home"
					:position="player.position" :number="player.details.shirtNumber" :name="player.details.player.shortName"/>
		<TshirtNumber v-for="player in awayPlayers" :x="'x' in player ? player.x : 0" :y="'y' in player ? player.y : 0" color="away"
					:position="player.position" :number="player.details.shirtNumber" :name="player.details.player.shortName"/>
	</div>
</template>
 
 
<script>
	import TshirtNumber from '../../Global/TshirtNumber.vue'
	import Pitch from '../../Vectors/Pitch.vue'

	export default {
		props: {
			formations: Object
		},
		data() {
			return {

			}
		},
		methods: {
			getValue( object ,value) {
				if ( value in object ) {
					return object.value
				} else return 0
			}	
		},
		computed: {
			homePlayers() {
				return Helpers.positionsCoordinates(this.formations.homePlayers, 'home')
			},
			awayPlayers() {
				return Helpers.positionsCoordinates(this.formations.awayPlayers, 'away')
			}
		},
		components: { Pitch, TshirtNumber },
	}
</script>
 
 
<style lang='scss' scoped>
.pitch-lineups {
	position: relative;
	width: fit-content;
	margin: auto;
	.home-formation, .away-formation {
		position: absolute;
	}
	.home-formation {
		bottom: 100%;
	}
	.away-formation {
		top: 100%;
	}
	svg {
		width: 100%;
	}
}
</style>

 