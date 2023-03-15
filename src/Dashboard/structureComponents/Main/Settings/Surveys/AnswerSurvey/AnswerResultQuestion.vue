<template>
	<Card class="card">
		<template #title>
			<div>
				<h6>{{result.title}}</h6>
			</div>
		</template>
		<template #content>
			<Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem"  />
		</template>
	</Card>
</template>
 
 
<script>
	import Chart from 'primevue/chart';

	export default {
		props: {
			result: Object
		},
		data() {
			return {
				chartData: {
					labels: [''],
					datasets: /* [
						{
							label: 'Dataset 1',
							data: [".5"],
							borderColor: '#76db9b',
							backgroundColor: '#d0e1fd',
						},
						{
							label: 'Dataset 2',
							data: ["8"],
							borderColor: '#76db9b',
							backgroundColor: '#d0e1fd',
						}
					] */this.result.count.map( r =>  {
						{
							label: ',
							data: [".5"],
							borderColor: '#76db9b',
							backgroundColor: '#d0e1fd',
						},
					})
				},
				chartOptions: {
					indexAxis: 'y',
					// Elements options apply to all of the options unless overridden in a dataset
					// In this case, we are setting the border of each horizontal bar to be 2px wide
					elements: {
						bar: {
							borderWidth: 2,
						}
					},
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
						},
						title: {
							display: false,
							text: this.result.title
						}
					}
				},
			}
		},
		methods: {
 
		},
		components: { Chart }
	}
</script>
 
 
<style lang='scss' scoped>
</style>