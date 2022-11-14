<template>
	<div class="stats">
		<Dialog v-model:visible="displayModal" :header="dialog.title" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
				:style="{width: '50vw'}" :modal="true" :dismissableMask="true">		
			<DataTable :value="stats" stripedRows responsiveLayout="scroll">
				<Column field="name" header="Parameter"></Column>
				<Column field="value" header="Value"></Column>
			</DataTable>
		</Dialog>
	
		<div class="row">
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart :accurate="50" :inacurate="15" title="Passes" 
						   :accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
						   @getData="getChartData"/>
			</div>
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart :accurate="30" :inacurate="20" title="Shots" 
							:accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
							@getData="getChartData"/>
			</div>
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart :accurate="11" :inacurate="3" title="Challenges" 
							:accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
							@getData="getChartData"/>
			</div>
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart :accurate="71" :inacurate="1" title="Tackles" 
							:accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
							@getData="getChartData"/>
			</div>
		</div>
	</div>
</template>
 
 
<script>
	import StatChart from '../../../global/StatChart.vue'

	export default {
		data() {
			return {
				displayModal: false,
				//chartColors: ['#67595E', '#05445E', '#189AB4', '#211522', '#613659', '#3A4A3D', '#96AD90', '#171515', '#6F5B3E'  ]
				chartColors: [/*'#8675ff'*/ '#008bd0'],
				chartColorInnacurate: '#dcdff2',
				dialog: {
					title: null,
					accurate: null,
					inaccurate: null,
				},
				stats: [
					{ name: 'Passes', value: 65},
					{ name: 'Passes accurate', value: 50},
					{ name: 'Passes inaccurate', value: 15},
					{ name: 'Passes', value: 65},
					{ name: 'Passes accurate', value: 50},
					{ name: 'Passes inaccurate', value: 15},
					{ name: 'Passes', value: 65},
					{ name: 'Passes accurate', value: 50},
					{ name: 'Passes inaccurate', value: 15}
				]
			}
		},
		methods: {
			openModal() {
            	this.displayModal = true;
			},
			getRandom(arr) {
				return arr[Math.floor(Math.random() * arr.length)]
			},
			getChartData(data) {
				//console.log(data)
				this.dialog.title = data[0]
				this.dialog.accurate = data[1]
				this.dialog.inaccurate = data[2]
				
				this.openModal()
			},
		},
		components: { StatChart }
	}
</script>
 
 
<style lang='scss'>

</style>