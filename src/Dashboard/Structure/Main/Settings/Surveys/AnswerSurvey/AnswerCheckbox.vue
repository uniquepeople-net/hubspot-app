<template>
	<div class="answer-checkbox">
		<h5 class="mb-5">{{question.title}}</h5>
		<div class="d-flex align-items-center">
			<Checkbox v-model="checkbox" :binary="true" :change="handleChange()"/>
			<div v-html="question.checkbox_label" class="label"></div>
		</div>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import Checkbox from 'primevue/checkbox'

	export default {
		props: {
			question: Object,
			step: Number
		},
		data() {
			return {
				checkbox: false
			}
		},
		mounted() {
			this.$store.dispatch("surveys/setFulfilledSurvey", { checkbox: this.checkbox, question: this.question, step: this.step })
		},
		methods: {
			handleChange() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch("surveys/setFulfilledSurvey", { checkbox: this.checkbox, question: this.question, step: this.step })
			}, 100),
		},
		components: { Checkbox }
	}
</script>
 
 
<style lang='scss' scoped>
.answer-checkbox {
	:deep(.p-checkbox) {
		margin-bottom: 1rem;
		margin-right: .5rem;
	}
}
</style>