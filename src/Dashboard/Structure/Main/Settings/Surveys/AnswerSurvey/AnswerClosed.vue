<template>
	<div>
		<h5 class="mb-5">{{question.title}}</h5>
		<SelectButton v-model="value" :options="options" aria-labelledby="single" class="closed-btns"/> 
		<p v-if="question.notice" class="mt-4">{{ question.notice }}</p>
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
:deep(.p-selectbutton) {
	display: flex;
	.p-button {
		flex: 1;
		max-width: 10rem;
		margin: 0 1rem;
		border: 1px solid var(--header-light-color);
	}
	.p-button:not(:last-child) {
		border-right: 1px solid var(--header-light-color);
	}
	.p-buttonset .p-button:not(:last-child), .p-buttonset .p-button:not(:last-child):hover {
		border-right: 1px solid var(--header-light-color);
	}
	.p-button.p-highlight {
		background: var(--main-dark);
	}
	.p-button.p-highlight:hover {
		border-color: var(--main-dark) ;
	}
}

</style>