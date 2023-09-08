<template>
	<GridCard class="stat-bar-sides" bgSize="3.5rem" :repeat="true" padding=".5rem 1rem">
		<template #content>
			<div class="data">
				<span class="text-gt-bold">{{ value1 }}</span>
				<span class="text-data px-3 text-center">{{ title }}</span>
				<span class="text-gt-bold">{{ value2 }}</span>
			</div>
			<div class="color-bar">
				<span class="item-value1" :style="`width:${widthValue(value1, value2)}%;`"></span>
				<span v-if="addSpace(value1, value2)" class="item-space"></span>
				<span class="item-value2" :style="`width:${widthValue(value2, value1)}%;`"></span>
			</div>
		</template>
	</GridCard>
</template>
 
 
<script>
	import GridCard from '../../../../global/GridCard.vue'
	
	export default {
		props: ['value1', 'value2', 'title'],
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
.stat-bar-sides {
	position: relative;
	.data {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.color-bar {
		display: flex;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 6px;
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