<template>
	<div class="goal-net">
		<img src="../../../../../../../assets/images/Goal-Net-c.png" alt="" width="366">
		<span v-for="shot in shots" class="shot" 
			  :style="`top:${scoreZones(shot.shot.goalZone)[0].top}; left:${scoreZones(shot.shot.goalZone)[0].left}; 
			  		    transform-origin: center center;
    					transform: translate(-50%, -50%);`"><!-- {{shot.shot.goalZone}} -->
			<Football :color="checkShot(shot.shot)"/>
		</span>

		<!-- <span class="shot" 
			  :style="`top:${scoreZones('otl')[0].top}; left:${scoreZones('otl')[0].left}; 
			  		    transform-origin: center center;
    					transform: translate(-50%, -50%);`">
			<Football />
		</span> -->
		
	</div>
</template>
 
 
<script>
import Football from '../../Vectors/Football.vue'
	export default {
	components: { Football },
		props: {
			shots: Array,
		},
		data() {
			return {
			}
		},
		methods: {
			checkShot(shot) {
				if ( shot.isGoal ) {
					return 'green'
				} else if ( !shot.onTarget ) {
					return 'red'
				}
			},
			scoreZones(zone) {
				return Helpers.scoreZones( zone )
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.goal-net {
	position: relative;
	.shot {
		position: absolute;
	}
}
</style>