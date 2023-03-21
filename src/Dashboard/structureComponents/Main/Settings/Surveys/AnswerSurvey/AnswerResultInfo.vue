<template>
	<div>
		<Card class="card">
			<template #title>
				<div class="card-header d-flex justify-content-between align-items-center">
					<h5><span class="fw-normal">{{survey.name}}</span></h5>
				</div>
			</template>
			<template #content>
				<div>
					Completed surveys: {{ survey.count }}
				</div>
				<Divider />
				<div v-for="group in survey.hashes">
					{{ decrypt(group.hash) + ' - ' + group.count  + ' / ' + group.max_limit}}
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
			decrypt(phrase) {
				return Helpers.decryptAes(phrase)
			},
		},
	}
</script>
 
 
<style lang='scss' scoped>
.card {
	max-width: 768px;
	margin: auto;
}
</style>