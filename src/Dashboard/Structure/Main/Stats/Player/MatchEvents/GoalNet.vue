<template>
	<div class="goal-net">
		<img src="../../../../../../../assets/images/Goal-Net-c.png" alt="" width="366">
		<span v-for="shot in shots" class="shot d-flex" @click="selectShot(shot)"
			  :style="`top:${scoreZones(shot.shot.goalZone)[0].top}; left:${scoreZones(shot.shot.goalZone)[0].left}; 
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
				topOut: `${this.randomBetweenRange( -5, -25 ).toString()}%`,
				half: `${this.randomBetweenRange( 33, 66 ).toString()}%`,
				third: `${this.randomBetweenRange( 3, 100/3 ).toString()}%`,
				twoThirds: `${this.randomBetweenRange( (100/3)*2, 97 ).toString()}%`,
				remInsideFull: `calc(${this.randomBetweenRange( 66, 97 ).toString()}%)`,
				remOutside: `calc(${this.randomBetweenRange( 103, 104.5 ).toString()}%)`,
				remInsideNull: `calc(${this.randomBetweenRange( -4.5, -3 ).toString()}%)`,
				postTop: '0%',
				postLeft: '1%',
				postRight: '99%',
			}
		},
		methods: {
			checkShot(shot) {
				if ( shot.isGoal ) {
					return 'green'
				} else if ( !shot.onTarget ) {
					return 'red'
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
				switch (zone) {
					case 'bc':
						return [{top: this.topOut, left: '-10000%'}]
					case 'gb':
						return [{top: this.remInsideFull, left: this.half}]
					case 'gbr':
						return [{top: this.remInsideFull, left: this.twoThirds}]
					case 'gc':
						return [{top: this.half, left: this.half}]
					case 'gl':
						return [{top: this.half, left: this.third}]
					case 'glb':
						return [{top: this.remInsideFull, left: this.third}]
					case 'gr':
						return [{top: this.half, left: this.twoThirds}]
					case 'gt':
						return [{top: this.third, left: this.half}]
					case 'gtl':
						return [{top: this.third, left: this.third}]
					case 'gtr':
						return [{top: this.third, left: this.twoThirds}]
					case 'obr':
						return [{top: this.remInsideFull, left: this.remOutside}]
					case 'ol':
						return [{top: this.half, left: this.remInsideNull}]
					case 'olb':
						return [{top: this.remInsideFull, left: this.remInsideNull}]
					case 'or':
						return [{top: this.half, left: this.remOutside}]
					case 'ot':
						return [{top: this.topOut, left: this.half}]
					case 'otl':
						return [{top: this.topOut, left: this.remInsideNull}]
					case 'otr':
						return [{top: this.topOut, left: this.remOutside}]
					case 'pbr':
						return [{top: this.twoThirds, left: this.postRight}]
					case 'pl':
						return [{top: this.half, left: this.postLeft}]
					case 'plb':
						return [{top: this.twoThirds, left: this.postLeft}]
					case 'pr':
						return [{top: this.half, left: this.postRight}]
					case 'pt':
						return [{top: this.postTop, left: this.half}]
					case 'ptl':
						return [{top: this.postTop, left: this.postLeft}]
					case 'ptr':
						return [{top: this.postTop, left: this.postRight}]
				
					default:
						return [{top: this.half, left: this.half}]
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