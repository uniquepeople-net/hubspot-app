<template>
	<Card class="card">
		<template #title>
			<div class="d-flex justify-content-between align-items-center">
				<h6>{{result.title}}</h6>
				<i v-if="!toggle" @click="handleToggle()" class="bi bi-toggle-off"></i>
				<i v-if="toggle" @click="handleToggle()" class="bi bi-toggle-on"></i>
			</div>
		</template>
		<template #content>
			<Chart v-if="!toggle" type="bar" :data="chartData" :options="chartOptions" class="h-30rem"  />
			<div v-if="toggle">
				<small class="d-block" v-for="(item, key) in sortedResults()">{{key + ': ' + item}}</small>
			</div>
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
				toggle: false,
				chartData: {
					labels: [''],
					datasets: this.dataArray()
				},
				chartOptions: {
					/* scales: {
						xAxes: [{
							ticks: {
								beginAtZero: true,
								min: 700
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								max: 1000
							}
						}]
					}, */
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
					aspectRatio: 1,				
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
								useBorderRadius: true,
								borderRadius: 20,
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
						let points = this.result.type_id === 5 ? ' points' : '';
						data.push({
							label: res + points + ' - ' + this.result.count[res],
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
			},
			handleToggle() {
				this.toggle = !this.toggle
			},
			sortedResults() {
				let countResults = this.result.count
				if ( countResults ) {
					const sortedObj = Object.fromEntries(
						Object.entries(countResults)
							.sort((a, b) => b[1] - a[1])
					);
					return sortedObj
				}
			}
		},
		components: { Chart }
	}
</script>
 
 
<style lang='scss' scoped>
.bi-toggle-on, .bi-toggle-off {
	cursor: pointer;
	font-size: 2rem;
}
.bi-toggle-on {	
	color: var(--green-600);
}
</style>