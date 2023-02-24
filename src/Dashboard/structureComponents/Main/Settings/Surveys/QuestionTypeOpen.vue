<template>
	<div class="field col-12 md:col-3">
		<label for="horizontal">Number of opened answers</label>
		<InputNumber inputId="horizontal" v-model="value" showButtons buttonLayout="horizontal" :step="1"
			decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" 
			decrementButtonIcon="pi pi-minus" mode="decimal" :min="1" :change="handleNumberValue()"/>
	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import InputNumber from 'primevue/inputnumber'

	export default {
		props: [ 'id' ],
		mounted() {
			this.$store.dispatch("surveys/setNewSurvey", { open_value: this.value, id: this.id })
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