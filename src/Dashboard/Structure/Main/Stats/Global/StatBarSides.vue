<template>
	<GridCard class="stat-bar-sides" bgSize="3.5rem" :repeat="true" padding=".5rem 1rem">
		<template #content>
			<div class="data">
				<span class="text-gt-bold">45</span>
				<span class="text-data">Totla</span>
				<span class="text-gt-bold">11</span>
			</div>
			<div class="color-bar">
				<span class="item-value1" :style="`width:${widthValue(45, 11)}%;`"></span>
				<span class="item-value2" :style="`width:${widthValue(11, 45)}%;`"></span>
			</div>
		</template>
	</GridCard>
</template>
 
 
<script>
	import GridCard from '../../../../global/GridCard.vue'
	
	export default {
		data() {
			return {
			}
		},
		methods: {
			widthValue( value1, value2 ) {
				let sum = value1 / ((value1 + value2) / 100)

				return sum
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
}
</style>