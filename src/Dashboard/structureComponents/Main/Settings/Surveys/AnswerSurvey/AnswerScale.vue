<template>
	<div>
		<h5 class="mb-5">{{question.title}}</h5>
		<Rating v-model="value" :stars="question.opinion_sc_levels" onIcon="bi bi-star-fill" offIcon="bi bi-star" :cancel="false"/>
	</div>
</template>
 
 
<script>
	import Rating from 'primevue/rating';

	export default {
		props: {
			question: Object
		},
		mounted() {
			this.$store.dispatch("surveys/setFulfilledSurvey", { scale_value: this.value, question: this.question })	
		},	
		data() {
			return {
				value: null
			}
		},
		watch: {
			value: function(data) {
				this.$store.dispatch("surveys/setFulfilledSurvey", { scale_value: this.value, question: this.question })	
			}
		},
		components: { Rating }
	}
</script>
 
 
<style lang='scss' scoped>
</style>