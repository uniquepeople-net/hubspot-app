<template>
	<Card class="card match-card">
			<template #title>
				<div class="card-header d-flex justify-content-between">
					<h5>Player Info</h5>
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