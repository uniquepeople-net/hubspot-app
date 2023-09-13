<template>
	<div class="pitch-pass"
		:style="`transform:rotate(${calculateAngle( x1, y1, x2, y2 )}deg); 
				 top: calc(${x1}%); left: calc(100% - ${y1}%); width:${passWidth(x1, y1, x2, y2)};
				 ${overAll && 'z-index:99;'}`">
		
		<span class="transmitter text-x-small center-center" :style="`${selectedBg && 'border: 2px solid ' + selectedBg };`">
			<span v-if="transmitter" :style="`transform:rotate(-${calculateAngle( x1, y1, x2, y2 ) }deg);`">{{ transmitter }}</span>
		</span>
		<span class="pass center-center" :style="`background: ${selectedBg}`">
			<span :style="`background:${passBg};`"></span>
		</span>
		<i class="pi pi-angle-right icon-arrow" 
		   :style="`color:${passBg}; right:${ accuracy && receiver ? '0' : '-6' }px`">
		   </i>
		
		<span v-if="accuracy && receiver" class="receiver text-x-small center-center" 
			  :style="`transform:rotate(-${calculateAngle( x1, y1, x2, y2 ) }deg); ${selectedBg && 'border: 2px solid ' + selectedBg };`">		  
			  {{ receiver }}
		</span>
	</div>
</template>
 
 
<script>
	export default {
		props: ['receiver', 'transmitter', 'x1', 'y1', 'x2', 'y2', 'accuracy', 'goal', 'selectedShot', 'id'],
		data() {
			return {
				overAll: false
			}
		},
		methods: {
			calculateAngle(x1, y1, x2, y2) {
				return Helpers.calculateAngle(x1, y1, x2, y2)
			},
			passWidth(x1, y1, x2, y2) {
				return Helpers.lineWidth(x1, y1, x2, y2)		
			},
			calculateMove() {
				let angle = this.calculateAngle( this.x1, this.y1, this.x2, this.y2 )
				let result
				if (angle >= 0 && angle <= 90) {
					result = 12;
				} else if (angle > 90 && angle <= 180) {
					result = 12;
				} else if (angle > 180 && angle <= 270) {
					result = (angle - 180) / 90 * halfMaxWidth * 2;
				} else {
					result = halfMaxWidth * 2 - ((angle - 270) / 90) * halfMaxWidth * 2;
				}

				return result
			}
		},
		computed: {
			passBg() {
				let bgColor = ''
				if ( this.accuracy && !this.goal ) {
					bgColor = 'var(--stat-chart-bg)'
				} else if (this.accuracy && this.goal) {
					bgColor = 'var(--color-success)'
				} else {
					bgColor = 'var(--color-failed)'
				}
				return bgColor
			},
			selectedBg() {
				let selectedBg = ''
				if ( this.selectedPass === this.id ) {
					selectedBg = 'var(--color-selected)',
					this.overAll = true
				} else {
					this.overAll = false
				}
				return selectedBg
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.pitch-pass {
	position: absolute;
	transform-origin: 0% 0%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	.pass {
		height: 8px;
		flex: 1;
		span {
			width: 100%;
			height: 2px;
		}
	}
	.transmitter {
		position: absolute;
		color: var(--main-white);
		border-radius: 50%;
		width: 10px;
		height: 10px;
	}
	.transmitter {
		background: var(--stat-chart-bg);
		left: -12px;
	}
	.icon-arrow {
		position: absolute;
	}
}
</style>