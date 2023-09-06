<template>
	<div class="pitch-lineups">
		<span class="home-formation text-x-small">{{ formations.homeData.scheme }}</span>
		<Pitch />
		<span class="away-formation text-x-small">{{ formations.awayData.scheme }}</span>
		<LineUpHead v-for="player in homePlayers" :x="'x' in player ? player.x : 0" :y="'y' in player ? player.y : 0" :position="player.position" pitchHalf="top"/>
		<LineUpHead v-for="player in awayPlayers" :x="'x' in player ? player.x : 0" :y="'y' in player ? player.y : 0" :position="player.position" pitchHalf="top"/>
	</div>
</template>
 
 
<script>
	import LineUpHead from '../../Global/LineUpHead.vue'
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
			
		},
		computed: {
			homePlayers() {
				return Helpers.positionsCoordinates(this.formations.homePlayers, 'home')
			},
			awayPlayers() {
				return Helpers.positionsCoordinates(this.formations.awayPlayers, 'away')
			}
		},
		watch: {
			formations: {
				deep: true, // Watch nested properties of formations
				handler(newValue) {
					console.log('formations changed:', newValue);
				}
			}
		},
		components: { Pitch, LineUpHead },
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

 