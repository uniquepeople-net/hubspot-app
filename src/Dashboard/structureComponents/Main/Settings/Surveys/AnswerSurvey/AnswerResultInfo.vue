<template>
	<div>
		<Card class="card">
			<template #title>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5><span class="fw-normal">{{survey.name}}</span></h5>
				</div>
			</template>
		</Card>
	</div>
</template>
 
 
<script>
	export default {
		props: {
			survey: Object
		},
		data() {
			return {
			}
		},
		methods: {
 
		},
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 768px;
	margin: auto;
}
</style>