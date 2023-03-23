<template>
	<div class="select-question">
		<div class="row my-4 mx-auto">
			<div class="col-12 col-lg-6">
				<span class="p-float-label">
					<InputText id="value1" :change="handleInput()"
								v-model="options[0]" :class="{'p-invalid':submitted && !options[0] }"/>
					<label for="value1">Value "true"</label>
					
				</span>
			</div>

			<div class="col-12 col-lg-6 mt-4 mt-lg-0">
				<span class="p-float-label">
					<InputText id="value2" :change="handleInput()"
								v-model="options[1]" :class="{'p-invalid':submitted && !options[1] }"/>
					<label for="value2">Value "false"</label>
					
				</span>
			</div>
			<!-- <SelectButton v-model="valueDefault" :options="options" aria-labelledby="single" class="mt-4"/> -->
		</div>
	</div>
</template>
 

<script>
	import { debounce } from 'lodash';
	import SelectButton from 'primevue/selectbutton';

	export default {
		props: { 
			id: String,
			question: Object,
			submitted: Boolean 
		},
		mounted() {
			if ( this.question ) {				
				this.options = this.question.closed_answers ? this.question.closed_answers : this.options
				this.valueDefault = this.question.closed_answs_default
			}
			this.$store.dispatch("surveys/setNewSurvey", { options: this.options, value_default: this.valueDefault, qId: this.id })		},
		data() {
			return {
				valueDefault: '',
				options: ['', ''],
			}
		},
		methods: {
			handleInput() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch("surveys/setNewSurvey", { options: this.options, value_default: this.valueDefault, qId: this.id })
			}, 100),
		},
		components: { SelectButton }
	}
</script>
 
 
<style lang='scss' scoped>
.select-question {
	.row {
		max-width: 576px;
	}
}
</style>