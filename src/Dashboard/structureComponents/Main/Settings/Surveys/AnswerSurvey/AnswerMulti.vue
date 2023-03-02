<template>
	<div>
		<h5>{{question.title}}</h5>
		<small>Choose max. {{ this.question.max_to_choose }} answers </small>

		<div class="checkbox-wrapper my-4 ps-2">
			<div class="field-checkbox my-2" v-for="(item, index) in items">
	            <Checkbox :inputId="item" :name="item" :value="item" v-model="selectedValues" 
						  :disabled="checkMaxChoosed(item)"/>
	            <label :for="item" :class="`ms-2 ${checkMaxChoosed(item) ? 'opacity-35' : ''}`">{{item}}</label>
	        </div>
		</div>

		<div v-for="(input, index) in question.opened_answers" class="col-12 mb-4" :key="index">
			<InputText class="w-100" v-model="selectedInputs[index]" :disabled="checkMaxChoosed(selectedInputs[index])" :key="index"/>
		</div>

	</div>
</template>
 
 
<script>
	import { debounce } from 'lodash';
	import Checkbox from 'primevue/checkbox';
	import AnswerOpen from './AnswerOpen.vue';

	export default {
		props: {
			question: Object
		},
		data() {
			return {
				items: [],
				selectedValues: [],
				selectedInputs: [],
			}
		},
		created() {
			this.question.multi_answers.map( (q , index) =>  {
				this.items.push(q) 
			})
		},
		mounted() {
			this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...this.selectedInputs, ...this.selectedValues], question: this.question })
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
				this.$store.dispatch("surveys/setFulfilledSurvey", { value: [...this.selectedInputs, ...this.selectedValues], question: this.question })
			}, 100),

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
	}
}
.opacity-35 {
	opacity: .35;
}
</style>