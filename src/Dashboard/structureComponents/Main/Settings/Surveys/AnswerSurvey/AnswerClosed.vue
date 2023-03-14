<template>
	<div>
		<h5 class="mb-5">{{question.title}}</h5>
		<SelectButton v-model="value" :options="options" aria-labelledby="single" /> 
	</div>
</template>
 
 
<script>
	import SelectButton from 'primevue/selectbutton';

	export default {
		props: {
			question: Object,
			step: Number
		},
		data() {
			return {
				value: this.question.closed_answs_default,
				options: [
					this.question.closed_answers[0], 
					this.question.closed_answers[1]
				],
			}
		},
		mounted() {
			this.$store.dispatch("surveys/setFulfilledSurvey", { closed_value: this.value, question: this.question, step: this.step })
		},
		watch: {
			value: function(data) {
				this.$store.dispatch("surveys/setFulfilledSurvey", { closed_value: this.value, question: this.question, step: this.step })	
			}
		},
		components: { SelectButton }
	}
</script>
 
 
<style lang='scss' scoped>
</style>