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
			question: Object
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
		methods: {
 
		},
		components: { SelectButton }
	}
</script>
 
 
<style lang='scss' scoped>
</style>