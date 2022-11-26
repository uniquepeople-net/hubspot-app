<template>
	<div class="stats">
		<Dialog v-model:visible="displayModal" :header="dialog.title" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
				:style="{width: '50vw'}" :modal="true" :dismissableMask="true">		
			<DataTable :value="params[dialog.params]" stripedRows responsiveLayout="scroll">
				<Column field="param_name" header="Parameter"></Column>
				<Column field="value" header="Value"></Column>
			</DataTable>
		</Dialog>
	
		<div class="row">
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart v-if="params.passes" :accurate="params.passes_acc" :inacurate="params.passes_inacc" 
						   title="Passes" :accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
						   @getData="getChartData"/>
			</div>
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart v-if="params.shots" :accurate="params.shots_target" :inacurate="params.shots_wide" 
							title="Shots" :accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
							@getData="getChartData"/>
			</div>
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart v-if="params.challenges" :accurate="params.challenges_won" :inacurate="params.challenges_lost" 
							title="Challenges" :accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
							@getData="getChartData"/>
			</div>
			<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
				<StatChart v-if="params.tackles" :accurate="params.tackles_all" :inacurate="params.tackles_lost" 
						   title="Tackles" :accColor="getRandom(chartColors)" :inaccColor="chartColorInnacurate"
							@getData="getChartData"/>
			</div>
		</div>

	</div>
</template>
 
 
<script>
	import StatChart from '../../../global/StatChart.vue'

	export default {
		props: ['params'],
		data() {
			return {
				displayModal: false,
				//chartColors: ['#67595E', '#05445E', '#189AB4', '#211522', '#613659', '#3A4A3D', '#96AD90', '#171515', '#6F5B3E'  ]
				chartColors: [/*'#8675ff'*/ '#008bd0'],
				chartColorInnacurate: '#dcdff2',
				dialog: {
					title: null,
					params: null,
				},
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
				this.dialog.title = data[0]
				this.dialog.params = data[0].toLowerCase();
				
				this.openModal()
			}
		},
		
		components: { StatChart }
	}
</script>
 
 
<style lang='scss'>

</style>