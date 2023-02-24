<template>
	<div>
		<h5>{{question.title}}</h5>
		<small>Choose max. {{ this.question.max_to_choose }} answers </small>

		<div class="checkbox-wrapper my-4 ps-2">
			<div class="field-checkbox my-2" v-for="(item, index) in items">
	            <Checkbox :inputId="item" :name="item" :value="item" v-model="selectedValues" 
						  :disabled="checkMaxChoosed(item)"/>
	            <label :for="item" class="ms-2">{{item}}</label>
	        </div>
		</div>

		<AnswerOpen v-if="question.type_id === 4" :question="question" :onlyInputs="true"/>

	</div>
</template>
 
 
<script>
	import Checkbox from 'primevue/checkbox';
	import AnswerOpen from './AnswerOpen.vue';

	export default {
		props: {
			question: Object
		},
		data() {
			return {
				selectedValues: []
			}
		},
		methods: {
			checkMaxChoosed(item) {
				if ( this.selectedValues.length === this.question.max_to_choose ) {
					return !this.selectedValues.includes(item) ? true : false
				}
			}
		},
		computed: {
			items() {
				let items = []
				this.question.multi_answers.map( (q , index) =>  {
					items.push(q) 
				})
				return items 
			},
			inputItems() {
				let inputs = Array.from(Array(this.question.opened_answers))
				return inputs
			}
		},
		watch: {
			selectedValues: function (data) {
				if (data.length === 3 ) {
					console.log(this.selectedValues)	
				}
			},
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
</style>