<template>
	<div class="goal-net">
		<img src="../../../../../../../assets/images/Goal-Net-c.png" alt="" width="366">
		<span v-for="(shot, index) in shotsData" class="shot d-flex" @click="selectShot(shot)"
			  :style="`top:${shot.shot.position.top}; left:${shot.shot.position.left}; 
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
				shotsData: this.shotsDataHandler()
			}
		},
		methods: {
			shotsDataHandler() {
				const mutatedShots = this.shots.map( shot => {
					shot.shot.position = this.scoreZones( shot.shot.goalZone )
					return shot
				})
				return this.shots
			},
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
			scoreZones(zone) {
							
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

				switch (zone) {
					case 'bc':
						return {top: topOut, left: '-10000%'  }
					case 'gb':
						return {top: remInsideFull , left: half  }
					case 'gbr':
						return {top: remInsideFull , left: twoThirds }
					case 'gc':
						return {top: half, left: half }
					case 'gl':
						return {top: half, left: third }
					case 'glb':
						return {top: remInsideFull, left: third }
					case 'gr':
						return {top: half, left: twoThirds }
					case 'gt':
						return {top: third, left: half }
					case 'gtl':
						return {top: third, left: third }
					case 'gtr':
						return {top: third, left: twoThirds }
					case 'obr':
						return {top: remInsideFull, left: remOutside }
					case 'ol':
						return {top: half, left: remInsideNull }
					case 'olb':
						return {top: remInsideFull, left: remInsideNull }
					case 'or':
						return {top: half, left: remOutside }
					case 'ot':
						return {top: topOut, left: half }
					case 'otl':
						return {top: topOut, left: remInsideNull }
					case 'otr':
						return {top: topOut, left: remOutside }
					case 'pbr':
						return {top: twoThirds, left: postRight }
					case 'pl':
						return {top: half, left: postLeft  }
					case 'plb':
						return {top: twoThirds, left: postLeft }
					case 'pr':
						return {top: half, left: postRight }
					case 'pt':
						return {top: postTop, left: half }
					case 'ptl':
						return {top: postTop, left: postLeft }
					case 'ptr':
						return {top: postTop, left: postRight}
				
					default:
						return {top: half, left: half }
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