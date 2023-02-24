<template>
	<div>{{ this.$route.params.survey_id }}</div>
</template>
 
 
<script>

	export default {
		created() {
			this.$store.dispatch("surveys/specificSurvey", this.id)
		},
		data() {
			return {
				id: this.$route.params.survey_id
			}
		},
		methods: {
		},
	}
</script>
 
 
<style lang='scss' scoped>
</style>