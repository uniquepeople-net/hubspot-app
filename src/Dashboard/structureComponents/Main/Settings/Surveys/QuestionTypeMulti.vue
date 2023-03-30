<template>
	<div class="my-4">
		<div class="multi-question row">
			<div v-for="(item, index) in values" :key="item.id" class="col-12 col-lg-6 my-4 d-flex align-items-center">
				<InputText :id="item.id" placeholder="Value" class="d-inline-block" :change="handleChange()"
						   v-model="item.value" :class="{'p-invalid':submitted && !item.value}" />
				<Button icon="bi bi-dash-lg" class="p-button-rounded p-button-danger p-button-text" 
						@click="removeItem(item.id)"/>
			</div>
		</div>
		<div class="row justify-content-between">
			<div v-if="type === 3 || type === 4" class="d-flex flex-column add-item">
				<span>Add item</span>
				<Button icon="bi bi-plus-lg" class="p-button-rounded p-button-success p-button-outlined" 
						@click="addItem"/>
			</div>
	
			<div v-if="type === 4" class="opened-questions">
				<QuestionTypeOpen :id="id" :question="question" @value="valueOpen"/>
			</div>

			<div class="max-choosed" v-if="type === 3 || type === 4">
				<label for="maxChoosed">Max. questions to choose</label>
				<InputNumber inputId="maxChoosed" v-model="maxChoosed" showButtons mode="decimal" 
							 :min="1" :max="values.length + opened_value_child" :change="handleChange()"
							 :class="{'p-invalid':submitted && maxChoosed < 1}"/>
		    </div>

			<div class="opinion-levels" v-if="type === 5">
				<label for="levels">Scale levels</label>
				<InputNumber inputId="levels" v-model="levels" showButtons mode="decimal" 
							 :min="1" :max="20" :change="handleChange()"
							 :class="{'p-invalid':submitted && levels < 1}"/>
			</div>
		</div>
	</div>
</template>
 
<script>
	import { required, numeric, minValue } from "@vuelidate/validators";
	import { useVuelidate } from "@vuelidate/core";	
	import { debounce } from 'lodash';
	import uniqueId from 'lodash/uniqueId';
	import QuestionTypeOpen from './QuestionTypeOpen.vue';
	import InputNumber from 'primevue/inputnumber'

	export default {
		props: { 
			id: Number,
			type: Number,
			question: Object,
			submitted: Boolean
		},
		mounted() {
			if ( this.question ) {
				this.question.multi_answers && this.question.multi_answers.map( answ => {
					this.values.push( { value: answ, id: uniqueId() } )
				})
				this.maxChoosed = this.question.max_to_choose ? this.question.max_to_choose : this.maxChoosed
				this.levels = this.question.opinion_sc_levels ? this.question.opinion_sc_levels : this.levels
				this.opened_value = this.question.opened_answers ? this.question.opened_answers : null
			}			

			this.$store.dispatch("surveys/setNewSurvey",  {
					...( this.type == 3 || this.type === 4 ? {
							multi_values: this.values,
							max_choosed: this.maxChoosed,
						} : null),
					...( this.type === 5 ? {
							levels: this.levels
						} : null),
					index: this.id
				} )
		},
		data() {
			return {
				values: [],
				maxChoosed: 0,
				levels: 1,
				opened_value: null,
				opened_value_child: 1
			}
		},
		methods: {
			addItem() {
				if (this.values.length < 10) {
					let newObj = { value: '', id: uniqueId()}
					this.values = [...this.values, newObj] 
					this.maxChoosed = this.values.length
				} else {
					return
				}
			},
			removeItem(index) {
				this.values = this.values.filter( q => q.id !== index )
				this.maxChoosed = this.values.length

				this.$store.dispatch("surveys/setNewSurvey",  { multi_values: this.values, max_choosed: this.maxChoosed, index: this.id } )
			},
			max() {
				return this.values.length
			},
			handleChange() {
				this.updateValue()
			},
			
			updateValue: debounce(function () {
				
				let dataObj = {
					...( this.type == 3 || this.type === 4 ? {
							multi_values: this.values,
							max_choosed: this.maxChoosed,
						} : null),
					...( this.type === 5 ? {
							levels: this.levels
						} : null),
					index: this.id
				}
				
				this.$store.dispatch("surveys/setNewSurvey",  dataObj )
			
			}, 100),
			valueOpen(value) {
				this.opened_value_child = value
			}
		},
		components: { QuestionTypeOpen, InputNumber },
	}
</script>
 
 
<style lang='scss' scoped>
.add-item {
	max-width: 8rem;
	margin-right: 2rem;
}
.max-choosed, .opened-questions {
	max-width: 15rem;
	//margin-right: 2rem;
}
.opinion-levels {
	max-width: 15rem;
}
</style>