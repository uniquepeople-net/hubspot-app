<template>
	<div class="text">
		<h6 class="text-center fw-light">{{ title }}</h6>
		<div class="fw-bold text-center">{{ data1 + `${percentage ? '%' : ''}` +  ' - '  + data2 + `${percentage ? '%' : ''}` }}</div>
		<Chart type="doughnut" :data="chartData" :options="options" class="w-full md:w-30rem" />
	</div>
</template>
 
 
<script>
	export default {
		props: {
			title: String,
			data1: Number,
			data2: Number,
			percentage: Boolean,
			chartData: Array
		},
		data() {
			return {
				options: {
					rotation: '-180',
					cutout: '40%'
				},
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.text, .text h6 {
	color: var(--pink-900);
	font-size: .8rem;
}
@media(min-width: 576px) {
	.text, .text h6 {
		font-size: 1.1rem;
	}
}
</style>