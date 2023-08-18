<template>
	<span class="lh-1 d-flex justify-content-between sub-stat-bar">
		<span class="text-sm-notice center-center">{{ title }}</span>
		<span class="text-gt-bold">
			<span class="text-data-bold color-main">{{ value }}</span>
			<span v-if="!nonRatio" class="text-data-bold color-light">/{{ total }}</span>
		</span>
		<div v-if="!nonRatio" class="chart-bar d-flex">
			<span :style="`width: ${calculateValue(value, total)}%`" class="bar bg-succes"></span>
			<span :style="`width: ${calculateValue( total - value , total)}%`" :class="`${ calculateValue( total - value , total) < 100 ? 'ms-1' : ''} bar bg-failed`"></span>
		</div>
	</span>
</template>
 
 
<script>
	import PlayerStatBar from '../PlayerData/PlayerStatBar.vue'
	export default {
		props: [ 'title', 'value', 'total', 'nonRatio' ],
		data() {
			return {
				}
		},
		methods: {
			calculateValue( value, total ) {
				return (value * 100) / total
			}
		},
		components: { PlayerStatBar },
	}
</script>
 
 
<style lang='scss' scoped>
.sub-stat-bar {
	flex-wrap: wrap;
	.chart-bar {
		flex-basis: 100%;
	}
	.bar {
		height: 3px;
		display: inline-block;
	}
	.bg-succes {
		background: var(--stat-chart-bg);
	}
	.bg-failed {
		background: var(--text-light-color);
	}
}
</style>