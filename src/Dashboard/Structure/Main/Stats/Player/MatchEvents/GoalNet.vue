<template>
	<div class="goal-net">
		<img src="../../../../../../../assets/images/Goal-Net-c.png" alt="" width="366">
		<span v-for="(shot, index) in shots" class="shot d-flex" @click="selectShot(shot)"
			  :style="`top:${scoreZones(shot.shot.goalZone, id, 'top')[0].top}; left:${scoreZones(shot.shot.goalZone, id, 'left')[0].left}; 
			  		    transform-origin: center center;
    					transform: translate(-50%, -50%);
						${selectedBg(shot.id)  && 'z-index:99;'}
						${selectedBg(shot.id) && 'border: 2px solid ' + selectedBg(shot.id) }; border-radius:50%;`">
			<Football :color="checkShot(shot.shot)" size="17" />
		</span>
	</div>
</template>
 
 
<script>
import Football from '../../Vectors/Football.vue'
	export default {
		props: {
			shots: Array,
			selectedShotId: Number
		},
		data() {
			return {
				topOut: null,
				half: null,
				third: null,
				twoThirds: null,
				remInsideFull: null,
				remOutside: null,
				remInsideNull: null,
			}
		},
		methods: {
			checkShot(shot) {
				if ( shot.isGoal ) {
					return 'var(--color-success)'
				} else if ( !shot.onTarget ) {
					return 'var(--color-failed)'
				} else if ( shot.onTarget ) {
					return 'var(--stat-chart-bg)'
				}
			},
			randomBetweenRange( min, max ) {
				return Math.floor(Math.random() * (max - min)) + min;
			},
			selectedBg(id) {
				let selectedBg = ''
				if (this.selectedShotId && id && this.selectedShotId === id ) {
					selectedBg = 'var(--color-selected)'
					return selectedBg
				} else {
					return false
				}
			},
			selectShot(shot) {
				this.$emit('selectShot', shot)
			},
			scoreZones(zone, id, key) {
							
				let topOut = `${this.randomBetweenRange( -5, -25 ).toString()}%`
				let half = `${this.randomBetweenRange( 33, 66 ).toString()}%`
				let third = `${this.randomBetweenRange( 3, 100/3 ).toString()}%`
				let twoThirds = `${this.randomBetweenRange( (100/3)*2, 97 ).toString()}%`
				let remInsideFull = `calc(${this.randomBetweenRange( 66, 97 ).toString()}%)`
				let remOutside = `calc(${this.randomBetweenRange( 103, 104.5 ).toString()}%)`
				let remInsideNull = `calc(${this.randomBetweenRange( -4.5, -3 ).toString()}%)`
				let postTop = '0%'
				let postLeft = '1%'
				let postRight = '99%'
			
				if ( !this.selectedShotId ) {					
					/* this.topOut = !this.topOut && topOut
					this.half = !this.half && half
					this.third = !this.third && third
					this.twoThirds = !this.twoThirds && twoThirds
					this.remInsideFull = !this.remInsideFull && remInsideFull
					this.remOutside = !this.remOutside && remOutside
					this.remInsideNull = !this.remInsideNull && remInsideNull */
				}

				/* this.shots.map( shot => {
					if ( shot.shot.id === id ) {
						return { ...shot, shot.shot[key] =  }
					}
					
				}) */

				switch (zone) {
					case 'bc':
						return [{top: this.topOut ? this.topOut : topOut, left: '-10000%'  }]
					case 'gb':
						return [{top: this.remInsideFull ? this.remInsideFull : remInsideFull , left: this.half ? this.half : half  }]
					case 'gbr':
						return [{top: this.remInsideFull ? this.remInsideFull : remInsideFull , left: this.twoThirds ? this.twoThirds : twoThirds }]
					case 'gc':
						return [{top: this.half ? this.half : half, left: this.half ? this.half : half }]
					case 'gl':
						return [{top: this.half ? this.half : half, left: this.third ? this.third : third }]
					case 'glb':
						return [{top: this.remInsideFull ? this.remInsideFull : remInsideFull, left: this.third ? this.third : third }]
					case 'gr':
						return [{top: this.half ? this.half : half, left: this.twoThirds ? this.twoThirds : twoThirds }]
					case 'gt':
						return [{top: this.third ? this.third : third, left: this.half ? this.half : half }]
					case 'gtl':
						return [{top: this.third ? this.third : third, left: this.third ? this.third : third }]
					case 'gtr':
						return [{top: this.third ? this.third : third, left: this.twoThirds ? this.twoThirds : twoThirds }]
					case 'obr':
						return [{top: this.remInsideFull ? this.remInsideFull : remInsideFull, left: this.remOutside ? this.remOutside : remOutside }]
					case 'ol':
						return [{top: this.half ? this.half : half, left: this.remInsideNull ? this.remInsideNull : remInsideNull }]
					case 'olb':
						return [{top: this.remInsideFull ? this.remInsideFull : remInsideFull, left: this.remInsideNull ? this.remInsideNull : remInsideNull }]
					case 'or':
						return [{top: this.half ? this.half : half, left: this.remOutside ? this.remOutside : remOutside }]
					case 'ot':
						return [{top: this.topOut ? this.topOut : topOut, left: this.half ? this.half : half }]
					case 'otl':
						return [{top: this.topOut ? this.topOut : topOut, left: this.remInsideNull ? this.remInsideNull : remInsideNull }]
					case 'otr':
						return [{top: this.topOut ? this.topOut : topOut, left: this.remOutside ? this.remOutside : remOutside }]
					case 'pbr':
						return [{top: this.twoThirds ? this.twoThirds : twoThirds, left: postRight }]
					case 'pl':
						return [{top: this.half ? this.half : half, left: postLeft  }]
					case 'plb':
						return [{top: this.twoThirds ? this.twoThirds : twoThirds, left: postLeft }]
					case 'pr':
						return [{top: this.half ? this.half : half, left: postRight }]
					case 'pt':
						return [{top: postTop, left: this.half ? this.half : half }]
					case 'ptl':
						return [{top: postTop, left: postLeft }]
					case 'ptr':
						return [{top: postTop, left: postRight}]
				
					default:
						return [{top: this.half ? this.half : half, left: this.half ? this.half : half }]
				}
				
				//return Helpers.scoreZones( zone )
			}
		},
		components: { Football },
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