<template>
	<div :class="`duel-point center-center ${ isSelected() ? 'highlight' : '' }`" :style="`top:${x}%; right:${y}%; transform: translate(calc(50% ${countTranslateY(y)}), calc(-50% ${countTranslateX(x)}));`">
		<span v-if="won" class="won"></span>
		<i v-if="!won" class="pi pi-times"></i>
	</div>
</template>
 
 
<script>
	export default {
		props: [ 'x', 'y', 'won', 'selected', 'id'],
		data() {
			return {
			}
		},
		methods: {
			countTranslateX(x) {
				return x < 50 ? '+ 1px' : '- 2px'
			},
			countTranslateY(y) {
				return y < 50 ? '- 2px' : '+ 1px'
			},
			isSelected() {
				return this.selected === this.id ? true : false
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
.duel-point {
	position: absolute;
	padding: 4px;
	.won {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--stat-chart-bg);
		border-radius: 50%;
	}
	.pi-times {
		font-size: 9px;
		color: var(--color-failed);
	}
	&.highlight {
		border: 2px solid var(--color-selected);
		border-radius: 50%;
	}
}
</style>