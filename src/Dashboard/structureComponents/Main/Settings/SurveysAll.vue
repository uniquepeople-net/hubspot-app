<template>
	<div>
		<h4 class="mb-4">Surveys</h4>
		<Button label="Add New Survey" icon="pi pi-book" class="p-button-raised p-button-info mt-4" @click="addNewSurvey"/>
	</div>
</template>
 
 
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			addNewSurvey() {
				this.$router.push({name: 'add-new-survey'})			
			}
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>