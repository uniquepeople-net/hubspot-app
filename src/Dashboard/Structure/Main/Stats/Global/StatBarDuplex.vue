<template>
	<GridCard class="stat-bar-duplex" :gradient="160" bgSize="3.5rem" padding=".5rem 1rem">
		<template #content>
			<div class="row">
				<div class="data col-6">
					<span class="text-data">
						{{ title }}
					</span>
				</div>
				<div class="col-6">
					<div class="duplex-chart">
						<div class="d-flex justify-content-between">
							<span class="header-main-bold">{{ valueHome }}</span>
							<span class="header-main-bold">{{ valueAway }}</span>	
						</div>
						<div class="chart-bar">
							<span class="item-value1" :style="`width:${widthValue(valueHome, valueAway)}%;`"></span>
							<span v-if="addSpace(valueHome, valueAway)" class="item-space"></span>
							<span class="item-value2" :style="`width:${widthValue(valueAway, valueHome)}%;`"></span>
						</div>
					</div>
				</div>
			</div>
		</template>
	</GridCard>
</template>
 
 
<script>
	import GridCard from '../../../../global/GridCard.vue'

	export default {
		props: ['title', 'valueHome', 'valueAway'],
		data() {
			return {
			}
		},
		methods: {
			widthValue( value1, value2 ) {
				if ( value1.toString().includes(':') ) {
					value1 = this.timeToNumber(value1)
				}
				if ( value2.toString().includes(':') ) {
					value2 = this.timeToNumber(value2)
				}

				let sum = value1 / ((value1 + value2) / 100)

				return sum
			},
			addSpace( value1, value2 ) {
				if ( value1 <= 0 || value2 <= 0 ) {
					return false
				} else return true
			},
			timeToNumber(time) {
				const [minutes, seconds] = time.toString().split(":").map(Number);
				const fractionOfMinute = seconds / 60;
				const result = Number(minutes + fractionOfMinute);
				return result
			}
		},
		components: { GridCard }
	}
</script>
 
 
<style lang='scss' scoped>
.stat-bar-duplex {
	.duplex-chart {
		position: relative;
		padding: 0;
	}
	.data {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.chart-bar {
		display: flex;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 4px;
	}
	.item-value1, .item-value2 {
		height: 100%;
		display: inline-block;
	}
	.item-value1 {
		background: var(--stat-chart-bg);
	}
	.item-value2 {
		background: var(--main-dark);
	}
	.item-space {
		width: .2rem;
		background: var(--main-white);
	}
}
</style>