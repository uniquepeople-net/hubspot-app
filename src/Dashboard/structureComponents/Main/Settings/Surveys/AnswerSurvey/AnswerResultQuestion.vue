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
		beforeUnmount() {
			this.$store.dispatch("surveys/resetSpecificResults")
		},
		data() {
			return {
				chartData: {
					labels: [''],
					datasets: this.dataArray()
				},
				chartOptions: {
					scales: {
						xAxes: [{
							ticks: {
								beginAtZero: true,
								min: 700 // set the minimum height to 100
							}
						}]
					},
					indexAxis: 'y',
					// Elements options apply to all of the options unless overridden in a dataset
					// In this case, we are setting the border of each horizontal bar to be 2px wide
					elements: {
						bar: {
							borderWidth: 0,
							pointStyle: 'cross',
							borderRadius: 5,
							barThickness: 20
						},
						point: {
							pointStyle: 'star',
						}
					},
					responsive: true,
					maintainAspectRatio: true,
					aspectRatio: 1.5,				
					plugins: {
						legend: {
							position: 'bottom',
							align: 'start',
							labels: {
								boxHeight: 10,
								boxWidth: 15,
								usePointStyle: false,
								pointStyleWidth: 5,
								pointStyle: 'star',
								/* useBorderRadius: true,
								borderRadius: 20, */
							}
						},
						title: {
							display: false,
							text: this.result.title
						},
					}
				},
				
			}
		},
		methods: {
			dataArray() {
				let colorPallete = ['#52414c', '#596157', '#5b8c5a', '#cfd186', '#e3655b',
							   '#c7522a', '#e5c185', '#fbf2c4', '#74a892', '#008585',
							   '#d1dbe4', '#a3b7ca', '#7593af', '#476f95', '#194a7a',
							   '#1A2902', '#344C11', '#778D45', '#AEC09A', '#AEC670',
							   '#583E26', '#A78B71', '#F7C815', '#EC9704', '#9C4A1A']
				let data = []
				if ( this.result.count ) {
					for(const res in this.result.count) {
						data.push({
							label: res + ' - ' + this.result.count[res],
							data: [this.result.count[res]],
							backgroundColor: this.randomColor(colorPallete),
						})
					}
					let complet = data.reduce( (a,b) => a + Number(b.data[0]), 0)
					data.sort( (a, b) => b.data[0] - a.data[0] )
				}
				return data
			},
			randomColor(colorPallete) {
				let random = colorPallete[Math.floor(Math.random()*colorPallete.length)]
				return random
			}
		},
		components: { Chart }
	}
</script>
 
 
<style lang='scss' scoped>
</style>