<template>
	<div class="field col-12 md:col-3">
		<label for="horizontal">Number of opened answers</label>
		<InputNumber inputId="horizontal" showButtons buttonLayout="horizontal" :step="1"
			decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" 
			decrementButtonIcon="pi pi-minus" mode="decimal" :min="1" :change="handleNumberValue()"
			v-model="value" :class="{'p-invalid':submitted && value < 1}" :max="20"/>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import InputNumber from 'primevue/inputnumber'

	export default {
		props: { 
			id: String,
			question: Object,
			submitted: Boolean,
		},
		mounted() {			
			if ( this.question ) {
				this.value = this.question.opened_answers ? this.question.opened_answers : this.value
			}
			this.$store.dispatch("surveys/setNewSurvey", { open_value: this.value, qId: this.id })
		},
		data() {
			return {
				value: 1
			}
		},
		methods: {
			handleNumberValue() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch("surveys/setNewSurvey", { open_value: this.value, qId: this.id })
			}, 100),
		},
		components: { InputNumber }
	}
</script>
 
 
<style lang='scss' scoped>
.field {
	max-width: 15rem;
	margin: auto;
}
</style>