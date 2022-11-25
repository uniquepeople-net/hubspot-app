<template>
	<Card class="card match-card">
			<template #title>
				<div class="card-header d-flex justify-content-between">
					<h5>Player Info</h5>
					<div>
						<h5>Instat Index</h5>
						<h6 class="text-center">{{}}</h6>
					</div>
				</div>

			</template>
			<template #content>
				<DataTable :value="params" stripedRows responsiveLayout="scroll">
					<Column field="param_name" header="Parameter"></Column>
					<Column field="value" header="Value"></Column>
				</DataTable>
			</template>
		</Card>  
</template>
 
 
<script>
	export default {
		props: ['params'],
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>