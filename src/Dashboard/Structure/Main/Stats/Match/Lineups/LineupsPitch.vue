<template>
	<div class="pitch-lineups">
		<Pitch />
		<TShirtNumber v-for="player in players" :number="3" :x="16" :y="19" :position="player.position" pitchHalf="top"/>
	</div>
</template>
 
 
<script>
	import TShirtNumber from '../../Global/TShirtNumber.vue'
	import Pitch from '../../Vectors/Pitch.vue'

	export default {
		data() {
			return {
				players: [
					{
						"9485": {
							"playerId": 9485,
							"position": "gk"
						}
					},
					{
						"288081": {
							"playerId": 288081,
							"position": "lcb"
						}
					},
					{
						"445146": {
							"playerId": 445146,
							"position": "rcmf"
						}
					},
					{
						"8975": {
							"playerId": 8975,
							"position": "amf"
						}
					},
					{
						"381390": {
							"playerId": 381390,
							"position": "rb"
						}
					},
					{
						"62216": {
							"playerId": 62216,
							"position": "lb"
						}
					},
					{
						"106": {
							"playerId": 106,
							"position": "lcmf"
						}
					},
					{
						"445123": {
							"playerId": 445123,
							"position": "cf"
						}
					},
					{
						"11240": {
							"playerId": 11240,
							"position": "rcb"
						}
					},
					{
						"62285": {
							"playerId": 62285,
							"position": "rw"
						}
					},
					{
						"62210": {
							"playerId": 62210,
							"position": "lw"
						}
					}
				],
			}
		},
		methods: {
			
		},
		components: { Pitch, TShirtNumber },
	}
</script>
 
 
<style lang='scss' scoped>
.pitch-lineups {
	position: relative;
	width: fit-content;
	margin: auto;
	svg {
		width: 100%;
	}
}
</style>