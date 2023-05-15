<template>
	<div class="text">
		<h6 class="text-center fw-normal">
			{{ title }} <span v-if="complete"> ({{ completeData }})</span>
		</h6>
		<div class="fw-bold text-center">{{ data1 + `${percentage ? '%' : ''}` +  ' - '  + data2 + `${percentage ? '%' : ''}` }}</div>
		<Chart type="doughnut" :data="chartData" :options="options" class="w-full md:w-30rem chart-chart" />
	</div>
</template>
 
 
<script>
	export default {
		props: {
			title: String,
			data1: Number,
			data2: Number,
			percentage: Boolean,
			chartData: Object,
			complete: Boolean,
			completeData: Number
		},
		data() {
			return {
				options: {
					rotation: '-180',
					cutout: '40%'
				},
			}
		}
	}
</script>
 
 
<style lang='scss' scoped>
.text, .text h6 {
	color: var(--pink-900);
	font-size: .8rem;
	.chart-chart {
		margin: auto;
		max-width: 170px;
	}
}
@media(min-width: 576px) {
	.text, .text h6 {
		font-size: 1.1rem;
	}
}
</style>