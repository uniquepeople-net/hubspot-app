<template>
	<div>
		<h5>{{question.title}}</h5>
		<small>Choose and/or write max. {{ this.question.max_to_choose }} answers </small>

		<div class="checkbox-wrapper mt-4">
			<div class="field-checkbox my-3 position-relative" v-for="(item, index) in items" :key="index" :class="`${checkMaxChoosed(item) ? 'opacity-35' : ''}`">
	            <Checkbox :inputId="item" :name="item" :value="item" v-model="selectedValues" 
						  :disabled="checkMaxChoosed(item)"/>
	            <label :for="item" @click="handleClick(index)" :class="{ 'active': activeCheckbox.includes(index) }">{{item}}</label>
	        </div>
		</div>

		<div v-for="(input, index) in question.opened_answers" class="col-12 mb-3" :key="index">
			<InputText :class="`w-100 ${activeInput.includes(index) ? 'active' : '' }`" @input="handleInput(index, $event.target.value)"
						v-model="selectedInputs[index]" :disabled="checkMaxChoosed(selectedInputs[index])" :key="index"/>
		</div>

	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import Checkbox from 'primevue/checkbox';
	import AnswerOpen from './AnswerOpen.vue';

	export default {
		props: {
			question: Object,
			step: Number
		},
		data() {
			return {
				items: [],
				selectedValues: [],
				selectedInputs: [],
				activeCheckbox: [],
				activeInput: [],

			}
		},
		created() {
			this.question.multi_answers.map( (q , index) =>  {
				this.items.push(q) 
			})
		},
		mounted() {
			this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...this.selectedInputs, ...this.selectedValues], question: this.question, step: this.step })
		},	
		methods: {
			checkMaxChoosed(item) {
				let checkArr = []
				let checkboxes = this.selectedValues
				let inputs = this.selectedInputs.filter( f => f )

				checkArr = [ ...checkboxes, ...inputs ]

				if ( this.question.type_id === 4 && (checkArr.length === this.question.max_to_choose) ) {

					if ( !checkArr.includes(item) ) {
						return true
					} else {
						return false
					}
				}

				if ( checkboxes.length === this.question.max_to_choose ) {
					return !checkboxes.includes(item) ? true : false
				}
			},
			handleChange() {
				this.updateValue()
			},
			updateValue: debounce(function () {
				this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...this.selectedInputs, ...this.selectedValues], question: this.question, step: this.step })
			}, 100),
			handleClick(index){
				if (this.activeCheckbox.includes(index)) { 
					this.activeCheckbox = this.activeCheckbox.filter( a => a !== index )
				} else {
					this.activeCheckbox.push(index)
				}
			},
			handleInput(index, value) {
				if ( value !== '' ) {
					if ( this.activeInput.includes(index) ) {
						return
					} else {
						this.activeInput.push(index)
					}
				} else {
					this.activeInput = this.activeInput.filter( a => a !== index )
				}
			}
		},
		watch: {
			selectedInputs: {
				handler: function(data) {
					this.handleChange()
				},
				deep: true
			},
			selectedValues: {
				handler: function( data ) {
					this.handleChange()
				},
				deep: true
			}
		},
		components: { Checkbox, AnswerOpen },
	}
</script>
 
 
<style lang='scss' scoped>
.field-checkbox {
	& :deep(.p-checkbox-box), & :deep(.p-checkbox) {
		width: 25px;
		height: 25px;
		position: absolute;
		visibility: hidden;
		z-index: -1;
	}
	& :deep(label) {
		width: 100%;
		padding: 0.5rem 0.5rem;
		border: 1px solid #ced4da;
		border-radius: 3px;
		cursor: pointer;
	}
	& :deep(.p-checkbox-box).p-checkbox-checked + & :deep(label) {
		font-weight: bold;
	}
}
.opacity-35 {
	opacity: .35;
	pointer-events: none;
}
.active {
  	background-color: var(--gray-200);
}
</style>