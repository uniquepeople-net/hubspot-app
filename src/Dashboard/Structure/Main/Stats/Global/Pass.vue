<template>
	<div class="pitch-pass" 
		:style="`transform:rotate(${calculateAngle( x1, y1, x2, y2 )}deg); 
				 top: calc(${x1}%); left: calc(100% - ${y1}%); width:${passWidth(x1, y1, x2, y2)}`">
		
		<span class="transmitter text-sm-num center-center">
			<span :style="`transform:rotate(-${calculateAngle( x1, y1, x2, y2 ) }deg);`">{{ transmitter }}</span>
		</span>
		<span class="pass center-center">
			<span></span>
		</span>
		<i class="bi bi-caret-right-fill icon-arrow"></i>
		<span class="receiver text-sm-num center-center" :style="`transform:rotate(-${calculateAngle( x1, y1, x2, y2 ) }deg);`">{{ receiver }}</span>
	
	</div>
</template>
 
 
<script>
	export default {
		props: ['receiver', 'transmitter', 'x1', 'y1', 'x2', 'y2'],
		data() {
			return {
			}
		},
		methods: {
			calculateAngle(x1, y1, x2, y2) {
				const deltaX = (x2 - x1) * 1.4016;
				const deltaY = y2 - y1;

				let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90

				angle = (angle + 360) % 360;

				return angle
			},
			passWidth(x1, y1, x2, y2) {
				let angle = this.calculateAngle( x1, y1, x2, y2 )

				let halfMaxWidth = 19.5 / 2; // Half of the maximum width (9.75)
				let width = Math.sqrt(Math.pow((x2 - x1) * 1.4016, 2) + Math.pow(y2 - y1, 2))
 
				/* if ( widthCounted > 51 ) {
					halfMaxWidth = 19.5
				} */

				// Map the angle to the width pattern
				/* let result;
				if (angle >= 0 && angle <= 90) {
					result = (angle / 90) * halfMaxWidth * 2;
				} else if (angle > 90 && angle <= 180) {
					result = halfMaxWidth * 2 - ((angle - 90) / 90) * halfMaxWidth * 2;
				} else if (angle > 180 && angle <= 270) {
					result = (angle - 180) / 90 * halfMaxWidth * 2;
				} else {
					result = halfMaxWidth * 2 - ((angle - 270) / 90) * halfMaxWidth * 2;
				} */

				/* if ( widthCounted > 50 ) {
					result = result * 2.5 
				} */

				//return result + '%';
				

				//let increase = (19.5 / 90) * angle
				
				return width + '%'			
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
			height: 3px;
			background: var(--color-success);
		}
	}
	.receiver, .transmitter {
		position: absolute;
		color: var(--main-white);
		border-radius: 50%;
		width: 24px;
		height: 24px;
	}
	.transmitter {
		background: var(--stat-chart-bg);
		left: -12px;
	}
	.receiver {
		right: 0;
		background: var(--main-dark);
		right: -12px;
	}
	.icon-arrow {
		position: absolute;
		right: 8px;
		color: var(--color-success);
	}
}
</style>